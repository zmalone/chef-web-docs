include_recipe 'build-cookbook::_handler'
include_recipe 'chef-sugar::default'
include_recipe 'delivery-truck::provision'

load_delivery_chef_config

fastly_creds = encrypted_data_bag_item_for_environment('cia-creds','fastly')

ENV['AWS_CONFIG_FILE'] = File.join(node['delivery']['workspace']['root'], 'aws_config')

require 'chef/provisioning/aws_driver'
with_driver 'aws'

aws_s3_bucket bucket_name do
  enable_website_hosting true
  website_options :index_document => {
    :suffix => "index.html"
  },
  :error_document => {
    :key => "error.html"
  }
end

### Fastly Setup
fastly_service = fastly_service fqdn do
  api_key fastly_creds['api_key']
  sensitive true
end

fastly_domain fqdn do
  api_key fastly_creds['api_key']
  service fastly_service.name
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

fastly_backend bucket_name do
  api_key fastly_creds['api_key']
  service fastly_service.name
  address "#{bucket_name}.s3-website-us-east-1.amazonaws.com"
  port 80
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

ignore_old_domains = fastly_condition 'Ignore_Old_Domains' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  statement "req.http.host != \"#{old_learn_fqdn}\" || req.http.host != \"#{old_opscode_fqdn}\""
  type 'request'
  priority 20
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

fastly_request_setting 'force_ssl' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  request_condition ignore_old_domains.name
  force_ssl true
  default_host "#{bucket_name}.s3-website-us-east-1.amazonaws.com"
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

fastly_gzip 'standard_gzip' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  extensions 'css js html eot ico otf ttf json'
  sensitive true
  content_types [
    'text/html',
    'application/x-javascript',
    'text/css',
    'application/javascript',
    'text/javascript',
    'application/json',
    'application/vnd.ms-fontobject',
    'application/x-font-opentype',
    'application/x-font-truetype',
    'application/x-font-ttf',
    'application/xml',
    'font/eot',
    'font/opentype',
    'font/otf',
    'image/svg+xml',
    'image/vnd.microsoft.icon',
    'text/plain',
    'text/xml'
  ].join(" ")
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

fastly_s3_logging 's3_logging' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  gzip_level 9
  access_key fastly_creds['logging']['s3']['access_key']
  secret_key fastly_creds['logging']['s3']['secret_key']
  bucket_name fastly_creds['logging']['s3']['bucket_name']
  path "/#{fqdn}"
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

embargo = fastly_condition 'embargo' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  type 'request'
  statement 'geoip.country_code == "CU" || geoip.country_code == "SD" || geoip.country_code == "SY" || geoip.country_code == "KP" || geoip.country_code == "IR"'
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

fastly_response 'embargo' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  request_condition embargo.name
  status 404
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

fastly_header 'Strict-Transport-Security' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  type 'response'
  dst 'http.Strict-Transport-Security'
  src '"max-age= 7776000; includeSubDomains"'
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

fastly_header 'X-Frame-Options' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  type 'response'
  dst 'http.X-Frame-Options'
  src '"SAMEORIGIN"'
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

### Fastly Old Learn Redirects
fastly_domain old_learn_fqdn do
  api_key fastly_creds['api_key']
  service fastly_service.name
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

fastly_domain old_opscode_fqdn do
  api_key fastly_creds['api_key']
  service fastly_service.name
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

old_learn_redirect = fastly_condition 'Old_Learn_Redirect' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  statement "req.http.host == \"#{old_learn_fqdn}\" || req.http.host == \"#{old_opscode_fqdn}\""
  type 'request'
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

fastly_response 'Redirect_old_Learn' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  request_condition old_learn_redirect.name
  status 301
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

old_learn_301 = fastly_condition 'Old_Learn_301' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  statement "(req.http.host == \"#{old_learn_fqdn}\" || req.http.host == \"#{old_opscode_fqdn}\") && resp.status == 301"
  type 'response'
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end

fastly_header 'Old_Learn' do
  api_key fastly_creds['api_key']
  service fastly_service.name
  response_condition old_learn_301.name
  type 'response'
  dst 'http.location'
  src "\"https://#{fqdn}\" req.url"
  priority 10
  sensitive true
  notifies :activate_latest, "fastly_service[#{fqdn}]", :delayed
end
### End Fastly Old Learn Redirects

include_recipe 'build-cookbook::_dns'
