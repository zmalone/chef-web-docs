include_recipe 'delivery-truck::provision'

static_site = cia_infra_static_site 'lc-rally' do
  restricted true
end

cia_infra_cdn 'lc-rally' do
  host_name 'lc-rally'
  domain_name 'chef.co'
  bucket_name static_site.bucket_name
  restricted true
end
