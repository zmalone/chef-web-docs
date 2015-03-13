## 2. Create the database

Now that we have MySQL configured, let's set up the database. We'll name our database `products`.

Let's continue the pattern by directly stating the configuration we want, and then going back and factoring our data from our policy.

To set up our database, we'll use the `mysql_database` resource, which comes from the `database` cookbook. The configuration code might look like this.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/database.rb
# Create the database instance
mysql_database 'products' do
  connection({
    :host => '127.0.0.1',
    :username => 'root',
    :password => 'learnchef_mysql'
  })
  action :create
end
```

This code:

* configures a database named `products`.
* specifies that user connections are allowed from IP address 127.0.0.1 (localhost).
* gives ownership of the database to `root` and assigns its initial password.

[WARN] Remember, we're using hard-coding passwords for learning, but it's not a recommended practice!

### Refactor the database configuration

Let's factor our the data parts so that our recipe is more reusable. We'll factor out the database name and the connection info (host name, user name, and password).

Append the following to your default attributes file, <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/web_application/attributes/default.rb
default['web_application']['database']['dbname'] = 'products'
default['web_application']['database']['host'] = '127.0.0.1'
default['web_application']['database']['username'] = 'root'
default['web_application']['database']['password'] = node['mysql']['server_root_password']
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
```

Replace our hard-coded values with our custom attributes, like this.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/database.rb
# Create the database instance
mysql_database node['web_application']['database']['dbname'] do
  connection({
    :host => node['web_application']['database']['host'],
    :username => node['web_application']['database']['username'],
    :password => node['web_application']['database']['password']
  })
  action :create
end
```

<code class="file-path">database.rb</code> now looks like this.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/database.rb
# Configure the mysql2 Ruby gem
mysql2_chef_gem 'default' do
  action :install
end

# Configure the MySQL client
mysql_client 'default' do
  action :create
end

# Configure the MySQL service
mysql_service 'default' do
  initial_root_password node['mysql']['server_root_password']
  action [:create, :start]
end

# Create the database instance
mysql_database node['web_application']['database']['dbname'] do
  connection({
    :host => node['web_application']['database']['host'],
    :username => node['web_application']['database']['username'],
    :password => node['web_application']['database']['password']
  })
  action :create
end
```
