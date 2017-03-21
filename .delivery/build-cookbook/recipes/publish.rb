include_recipe 'delivery-truck::publish'

include_recipe 'cia_infra::bundler_install_deps'

execute 'npm install' do
  command 'npm install'
  environment(
    'PATH' => '/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games',
    'HOME' => node['delivery']['workspace']['cache']
  )
  cwd node['delivery']['workspace']['repo']
end

execute 'build the site' do
  command 'bundle exec middleman build --clean --verbose'
  environment(
    'PATH' => '/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games',
    'HOME' => node['delivery']['workspace']['cache'],
    'CHEF_LAB_URL' => 'https://lab.chef.io',
    'NODE_ENV' => 'production',
    'API_ENDPOINT' => 'https://learnchef-backend-acceptance.chef.io'
  )
  timeout_s 7200
  cwd node['delivery']['workspace']['repo']
end

cia_delivery_publish_artifact 'lc-rally' do
  build_path 'build'
end
