# Create the database instance.
mysql_database node['awesome_customers_rhel']['database']['dbname'] do
  connection(
    :host => node['awesome_customers_rhel']['database']['host'],
    :username => node['awesome_customers_rhel']['database']['root_username'],
    :password => node['awesome_customers_rhel']['database']['root_password']
  )
  action :create
end

# Add a database user.
mysql_database_user node['awesome_customers_rhel']['database']['admin_username'] do
  connection(
    :host => node['awesome_customers_rhel']['database']['host'],
    :username => node['awesome_customers_rhel']['database']['root_username'],
    :password => node['awesome_customers_rhel']['database']['root_password']
  )
  password node['awesome_customers_rhel']['database']['admin_password']
  database_name node['awesome_customers_rhel']['database']['dbname']
  host node['awesome_customers_rhel']['database']['host']
  action [:create, :grant]
end