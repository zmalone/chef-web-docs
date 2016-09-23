mysql_service 'default' do
  initial_root_password node['awesome_customers_rhel']['database']['root_password']
  action [:create, :start]
end