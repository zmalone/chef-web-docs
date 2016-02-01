## 3. Create a MySQL database user

Like we did for your Apache site's default home page, let's assign a user to your database who has just enough permissions to modify the system.

We created the Apache user in two separate steps. First, we used the `user` resource to create the user. Then we used the `owner` attribute to specify this user as the owner of the home page. However, for our database, the `database` cookbook provides the `mysql_database_user` resource that does everything for us.

Setting up a user named `db_admin` might look like this. Don't write any code yet &ndash; just follow along.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/recipes/database.rb
# Add a database user.
mysql_database_user 'db_admin' do
  connection(
    :host => '127.0.0.1',
    :username => 'root',
    :password => 'learnchef_mysql'
  )
  password 'database_password'
  database_name 'products'
  host '127.0.0.1'
  action [:create, :grant]
end
```

We already have most of the node attributes we need to make this more reusable. We also need the name of the database user and the password.

### Refactor the MySQL database user configuration

Append the following to your default attributes file, <code class="file-path">default.rb</code>.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/attributes/default.rb
default['awesome_customers']['database']['app']['username'] = 'db_admin'
```

The entire file looks like this.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/attributes/default.rb
default['awesome_customers']['user'] = 'web_admin'
default['awesome_customers']['group'] = 'web_admin'

default['awesome_customers']['document_root'] = '/var/www/customers/public_html'

default['awesome_customers']['enabled_firewall_rules'] = %w(firewall_http firewall_sshd)

default['awesome_customers']['passwords']['secret_path'] = '/etc/chef/encrypted_data_bag_secret'

default['awesome_customers']['database']['dbname'] = 'products'
default['awesome_customers']['database']['host'] = '127.0.0.1'
default['awesome_customers']['database']['username'] = 'root'

default['awesome_customers']['database']['app']['username'] = 'db_admin'
```

Your resource now looks like this after we apply your new node attributes.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/recipes/database.rb
# Add a database user.
mysql_database_user node['awesome_customers']['database']['app']['username'] do
  connection(
    :host => node['awesome_customers']['database']['host'],
    :username => node['awesome_customers']['database']['username'],
    :password => root_password_data_bag_item['password']
  )
  password 'database_password'
  database_name node['awesome_customers']['database']['dbname']
  host node['awesome_customers']['database']['host']
  action [:create, :grant]
end
```

The final thing to do is the replace the hard-coded database password with the value in our encrypted data bag.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/recipes/database.rb
# Load the encrypted data bag item that holds the database user's password.
user_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'db_admin_password', password_secret)

# Add a database user.
mysql_database_user node['awesome_customers']['database']['app']['username'] do
  connection(
    :host => node['awesome_customers']['database']['host'],
    :username => node['awesome_customers']['database']['username'],
    :password => root_password_data_bag_item['password']
  )
  password user_password_data_bag_item['password']
  database_name node['awesome_customers']['database']['dbname']
  host node['awesome_customers']['database']['host']
  action [:create, :grant]
end
```

Append the `mysql_database_user` resource to your database recipe, making the entire file look like this.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/recipes/database.rb
# Configure the mysql2 Ruby gem.
mysql2_chef_gem 'default' do
  action :install
end

# Configure the MySQL client.
mysql_client 'default' do
  action :create
end

# Load the secrets file and the encrypted data bag item that holds the root password.
password_secret = Chef::EncryptedDataBagItem.load_secret(node['awesome_customers']['passwords']['secret_path'])
root_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'sql_server_root_password', password_secret)

# Configure the MySQL service.
mysql_service 'default' do
  initial_root_password root_password_data_bag_item['password']
  action [:create, :start]
end

# Create the database instance.
mysql_database node['awesome_customers']['database']['dbname'] do
  connection(
    :host => node['awesome_customers']['database']['host'],
    :username => node['awesome_customers']['database']['username'],
    :password => root_password_data_bag_item['password']
  )
  action :create
end

# Load the encrypted data bag item that holds the database user's password.
user_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'db_admin_password', password_secret)

# Add a database user.
mysql_database_user node['awesome_customers']['database']['app']['username'] do
  connection(
    :host => node['awesome_customers']['database']['host'],
    :username => node['awesome_customers']['database']['username'],
    :password => root_password_data_bag_item['password']
  )
  password user_password_data_bag_item['password']
  database_name node['awesome_customers']['database']['dbname']
  host node['awesome_customers']['database']['host']
  action [:create, :grant]
end
```
