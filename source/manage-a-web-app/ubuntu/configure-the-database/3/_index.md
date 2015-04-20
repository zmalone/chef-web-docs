## 3. Create a MySQL database user

Like we did for your Apache site's default home page, let's assign a user to your database who has just enough permissions to modify the system.

We created the Apache user in two separate steps. First, we used the `user` resource to create the user. Then we used the `owner` attribute to specify this user as the owner of the home page. However, for our database, the `database` cookbook provides the `mysql_database_user` resource that does everything for us.

Setting up a user named `db_admin` might look like this. Don't write any code yet &ndash; just follow along.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/database.rb
# Add a database user.
mysql_database_user 'db_admin' do
  connection(
    :host => '127.0.0.1',
    :username => 'root',
    :password => 'learnchef_mysql'
  )
  password 'customers_password'
  database_name 'products'
  host '127.0.0.1'
  action [:create, :grant]
end
```

We already have most of the node attributes we need to make this more reusable. We also need the name of the database user and the password.

### Refactor the MySQL database user configuration

Append the following to your default attributes file, <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/web_application/attributes/default.rb
default['web_application']['database']['app']['username'] = 'db_admin'
default['web_application']['database']['app']['password'] = 'customers_password'
```

The entire file looks like this.

```ruby
# ~/chef-repo/cookbooks/web_application/attributes/default.rb
default['web_application']['user'] = 'web_admin'
default['web_application']['group'] = 'web_admin'

default['web_application']['name'] = 'customers'
default['web_application']['config'] = 'customers.conf'

default['apache']['docroot_dir'] = '/srv/apache/customers'

default['mysql']['server_root_password'] = 'learnchef_mysql'

default['web_application']['database']['dbname'] = 'products'
default['web_application']['database']['host'] = '127.0.0.1'
default['web_application']['database']['username'] = 'root'
default['web_application']['database']['password'] = node['mysql']['server_root_password']

default['web_application']['database']['app']['username'] = 'db_admin'
default['web_application']['database']['app']['password'] = 'customers_password'
```

Your resource now looks like this after we apply your new node attributes.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/database.rb
# Add a database user.
mysql_database_user node['web_application']['database']['app']['username'] do
  connection(
    :host => node['web_application']['database']['host'],
    :username => node['web_application']['database']['username'],
    :password => node['web_application']['database']['password']
  )
  password node['web_application']['database']['app']['password']
  database_name node['web_application']['database']['dbname']
  host node['web_application']['database']['host']
  action [:create, :grant]
end
```

Append the `mysql_database_user` resource to your database recipe, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/database.rb
# Configure the mysql2 Ruby gem.
mysql2_chef_gem 'default' do
  action :install
end

# Configure the MySQL client.
mysql_client 'default' do
  action :create
end

# Configure the MySQL service.
mysql_service 'default' do
  initial_root_password node['mysql']['server_root_password']
  action [:create, :start]
end

# Create the database instance.
mysql_database node['web_application']['database']['dbname'] do
  connection(
    :host => node['web_application']['database']['host'],
    :username => node['web_application']['database']['username'],
    :password => node['web_application']['database']['password']
  )
  action :create
end

# Add a database user.
mysql_database_user node['web_application']['database']['app']['username'] do
  connection(
    :host => node['web_application']['database']['host'],
    :username => node['web_application']['database']['username'],
    :password => node['web_application']['database']['password']
  )
  password node['web_application']['database']['app']['password']
  database_name node['web_application']['database']['dbname']
  host node['web_application']['database']['host']
  action [:create, :grant]
end
```
