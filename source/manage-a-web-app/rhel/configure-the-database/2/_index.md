## 2. Create the database

Now we can set up the database. We'll name our database `products`.

Let's continue the pattern we've learned of directly stating the configuration we want, and then going back and factoring our data from our policy.

To set up your database, we'll use the `mysql_database` resource, which comes from the `database` cookbook. The configuration code might look like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Create the database instance.
mysql_database 'products' do
  connection(
    :host => '127.0.0.1',
    :username => 'root',
    :password => 'learnchef_mysql'
  )
  action :create
end
```

This code:

* configures a database named `products`.
* specifies that user connections are allowed from IP address 127.0.0.1 (localhost).
* gives ownership of the database to `root` and assigns the initial password.

[WARN] Remember to never hard-code passwords in your recipes. We'll replace it with our decryption mechanism shortly.

### Refactor the database configuration

Let's factor your data so that your recipe is more reusable. We'll factor out the database name and the connection info (host name and user name).

Append the following to your default attributes file, <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/attributes/default.rb
default['awesome_customers']['database']['dbname'] = 'products'
default['awesome_customers']['database']['host'] = '127.0.0.1'
default['awesome_customers']['database']['username'] = 'root'
```

The entire file looks like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/attributes/default.rb
default['awesome_customers']['user'] = 'web_admin'
default['awesome_customers']['group'] = 'web_admin'

default['awesome_customers']['name'] = 'customers'
default['awesome_customers']['config'] = 'customers.conf'

default['apache']['docroot_dir'] = '/var/www/customers/public_html'

default['iptables']['install_rules'] = false

default['awesome_customers']['passwords']['secret_path'] = '/tmp/encrypted_data_bag_secret'

default['awesome_customers']['database']['dbname'] = 'products'
default['awesome_customers']['database']['host'] = '127.0.0.1'
default['awesome_customers']['database']['username'] = 'root'
```

Replace your hard-coded values with your custom attributes, like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Create the database instance.
mysql_database node['awesome_customers']['database']['dbname'] do
  connection(
    :host => node['awesome_customers']['database']['host'],
    :username => node['awesome_customers']['database']['username'],
    :password => 'learnchef_mysql'
  )
  action :create
end
```

Finally, replace the hard-coded password with our decryption mechanism.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Create the database instance.
mysql_database node['awesome_customers']['database']['dbname'] do
  connection(
    :host => node['awesome_customers']['database']['host'],
    :username => node['awesome_customers']['database']['username'],
    :password => root_password_data_bag_item['password']
  )
  action :create
end
```

Here, we want to use the database root password, so we reuse the value of `root_password_data_bag_item['password']`.

<code class="file-path">database.rb</code> now looks like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Configure the mysql2 Ruby gem.
mysql2_chef_gem 'default' do
  action :install
end

# Configure the MySQL client.
mysql_client 'default' do
  action :create
end

# Load the secrets file and the encrypted data bag item that holds the root password.
password_secret = Chef::EncryptedDataBagItem.load_secret("#{node['awesome_customers']['passwords']['secret_path']}")
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
```
