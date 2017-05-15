include_recipe 'delivery-truck::provision'

static_site = cia_infra_static_site 'chef-web-learn'

cia_infra_cdn 'chef-web-learn' do
  host_name 'learn'
  domain_name 'chef.io'
  endpoint static_site.fqdn
end
