cia_infra_static_site 'lc-rally' do
  action :deploy
  restricted true
end

cia_infra_cdn 'lc-rally' do
  action [:deploy, :purge_all]
  host_name 'lc-rally'
  domain_name 'chef.co'
end
