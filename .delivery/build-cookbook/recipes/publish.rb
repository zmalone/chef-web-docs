include_recipe 'delivery-truck::publish'

include_recipe 'cia_infra::bundler_install_deps'

execute 'build the site' do
  command 'bundle exec middleman build --clean --verbose'
  environment(
    'PATH' => '/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games',
    'HOME' => node['delivery']['workspace']['cache'],
    'CHEF_LAB_URL' => 'https://lab.chef.io'
  )
  cwd node['delivery']['workspace']['repo']
end

cia_delivery_publish_artifact 'lc-rally'
