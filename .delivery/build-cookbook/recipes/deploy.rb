cia_infra_static_site 'chef-web-learn' do
  action :deploy
  redirect_file File.join(node['delivery']['workspace']['repo'], 'config', 'redirects.json')
end

cia_infra_cdn 'chef-web-learn' do
  action [:deploy, :purge_all]
  host_name 'learn'
  domain_name 'chef.io'
end
