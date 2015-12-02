load_delivery_chef_config
aws_creds = encrypted_data_bag_item_for_environment('cia-creds','chef-secure')

site_name = 'learn'
domain_name = 'chef.io'

if node['delivery']['change']['stage'] == 'delivered'
  bucket_name = node['delivery']['change']['project'].gsub(/_/, '-')
  fqdn = "#{site_name}.#{domain_name}"
else
  bucket_name = "#{node['delivery']['change']['project'].gsub(/_/, '-')}-#{node['delivery']['change']['stage']}"
  fqdn = "#{site_name}-#{node['delivery']['change']['stage']}.#{domain_name}"
end

route53_record fqdn do
  name "#{fqdn}."
  value 'g.global-ssl.fastly.net'
  aws_access_key_id aws_creds['access_key_id']
  aws_secret_access_key aws_creds['secret_access_key']
  type 'CNAME'
  zone_id aws_creds['route53'][domain_name]
  sensitive true
end

route53_record "learn-#{node['delivery']['change']['stage']}.getchef.com" do
  name "learn-#{node['delivery']['change']['stage']}.getchef.com."
  value 'g.global-ssl.fastly.net'
  aws_access_key_id aws_creds['access_key_id']
  aws_secret_access_key aws_creds['secret_access_key']
  type 'CNAME'
  zone_id aws_creds['route53'][domain_name]
  sensitive true
end

Chef_Delivery::ClientHelper.leave_client_mode_as_delivery
