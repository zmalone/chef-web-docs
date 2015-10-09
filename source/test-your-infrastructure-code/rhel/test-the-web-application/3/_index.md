## Verify the code adheres to the style guide

### RuboCop

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ rubocop recipes
Inspecting 5 files
C...C

Offenses:

recipes/database.rb:16:81: C: Line is too long. [85/80]
# Load the secrets file and the encrypted data bag item that holds the root password.
                                                                                ^^^^^
recipes/database.rb:17:81: C: Line is too long. [111/80]
password_secret = Chef::EncryptedDataBagItem.load_secret(node['awesome_customers']['passwords']['secret_path'])
                                                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
recipes/database.rb:18:81: C: Line is too long. [119/80]
root_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'sql_server_root_password', password_secret)
                                                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
recipes/database.rb:29:5: C: Use the new Ruby 1.9 hash syntax.
    :host => node['awesome_customers']['database']['host'],
    ^^^^^^^^
recipes/database.rb:30:5: C: Use the new Ruby 1.9 hash syntax.
    :username => node['awesome_customers']['database']['username'],
    ^^^^^^^^^^^^
recipes/database.rb:31:5: C: Use the new Ruby 1.9 hash syntax.
    :password => root_password_data_bag_item['password']
    ^^^^^^^^^^^^
recipes/database.rb:37:81: C: Line is too long. [112/80]
user_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'db_admin_password', password_secret)
                                                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
recipes/database.rb:42:5: C: Use the new Ruby 1.9 hash syntax.
    :host => node['awesome_customers']['database']['host'],
    ^^^^^^^^
recipes/database.rb:43:5: C: Use the new Ruby 1.9 hash syntax.
    :username => node['awesome_customers']['database']['username'],
    ^^^^^^^^^^^^
recipes/database.rb:44:5: C: Use the new Ruby 1.9 hash syntax.
    :password => root_password_data_bag_item['password']
    ^^^^^^^^^^^^
recipes/database.rb:62:81: C: Line is too long. [287/80]
  command "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{user_password_data_bag_item['password']} -D #{node['awesome_customers']['database']['dbname']} < #{node['awesome_customers']['database']['seed_file']}"
                                                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
recipes/database.rb:63:9: C: Put one space between the method name and the first argument.
  not_if  "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{user_password_data_bag_item['password']} -D #{node['awesome_customers']['database']['dbname']} -e 'describe customers;'"
        ^^
recipes/database.rb:63:81: C: Line is too long. [256/80]
  not_if  "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{user_password_data_bag_item['password']} -D #{node['awesome_customers']['database']['dbname']} -e 'describe customers;'"
                                                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
recipes/webserver.rb:24:81: C: Line is too long. [89/80]
# Load the secrets file and the encrypted data bag item that holds the database password.
                                                                                ^^^^^^^^^
recipes/webserver.rb:25:81: C: Line is too long. [111/80]
password_secret = Chef::EncryptedDataBagItem.load_secret(node['awesome_customers']['passwords']['secret_path'])
                                                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
recipes/webserver.rb:26:81: C: Line is too long. [112/80]
user_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'db_admin_password', password_secret)
                                                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
recipes/webserver.rb:34:13: C: Redundant curly braces around a hash parameter.
  variables({
            ^
recipes/webserver.rb:35:5: C: Use the new Ruby 1.9 hash syntax.
    :database_password => user_password_data_bag_item['password']
    ^^^^^^^^^^^^^^^^^^^^^
recipes/webserver.rb:35:5: C: Use 2 spaces for indentation in a hash, relative to the first position after the preceding left parenthesis.
    :database_password => user_password_data_bag_item['password']
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
recipes/webserver.rb:36:3: C: Indent the right brace the same as the first position after the preceding left parenthesis.
  })
  ^

5 files inspected, 20 offenses detected
```

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ foodcritic recipes

```

FOODCRITIC IS CLEAN

WE SEE TWO THEMES - LONG LINES AND OLD HASH SYNTAX

#### Fix long lines

SIMPLY IGNORE THESE

ADD .rubocop.yml to chef-repo so can be used by all cookbooks

```ruby
# ~/chef-repo/.rubocop.yml
Metrics/LineLength:
  Enabled: false
```

RUN RUBOCOP AGAIN

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ rubocop recipes
Inspecting 5 files
C...C

Offenses:

recipes/database.rb:29:5: C: Use the new Ruby 1.9 hash syntax.
    :host => node['awesome_customers']['database']['host'],
    ^^^^^^^^
recipes/database.rb:30:5: C: Use the new Ruby 1.9 hash syntax.
    :username => node['awesome_customers']['database']['username'],
    ^^^^^^^^^^^^
recipes/database.rb:31:5: C: Use the new Ruby 1.9 hash syntax.
    :password => root_password_data_bag_item['password']
    ^^^^^^^^^^^^
recipes/database.rb:42:5: C: Use the new Ruby 1.9 hash syntax.
    :host => node['awesome_customers']['database']['host'],
    ^^^^^^^^
recipes/database.rb:43:5: C: Use the new Ruby 1.9 hash syntax.
    :username => node['awesome_customers']['database']['username'],
    ^^^^^^^^^^^^
recipes/database.rb:44:5: C: Use the new Ruby 1.9 hash syntax.
    :password => root_password_data_bag_item['password']
    ^^^^^^^^^^^^
recipes/database.rb:63:9: C: Put one space between the method name and the first argument.
  not_if  "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{user_password_data_bag_item['password']} -D #{node['awesome_customers']['database']['dbname']} -e 'describe customers;'"
        ^^
recipes/webserver.rb:34:13: C: Redundant curly braces around a hash parameter.
  variables({
            ^
recipes/webserver.rb:35:5: C: Use the new Ruby 1.9 hash syntax.
    :database_password => user_password_data_bag_item['password']
    ^^^^^^^^^^^^^^^^^^^^^
recipes/webserver.rb:35:5: C: Use 2 spaces for indentation in a hash, relative to the first position after the preceding left parenthesis.
    :database_password => user_password_data_bag_item['password']
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
recipes/webserver.rb:36:3: C: Indent the right brace the same as the first position after the preceding left parenthesis.
  })
  ^

5 files inspected, 11 offenses detected
```

GETTING THERE!

#### Use the Ruby 1.9 hash syntax

OLD

```
my_hash = { :key => 'value' }
```

NEW

```
my_hash = { key: 'value' }
```

FIX WEBSERVER

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
httpd_service 'customers' do
  mpm 'prefork'
  action [:create, :start]
end

# Add the site configuration.
httpd_config 'customers' do
  instance 'customers'
  source 'customers.conf.erb'
  notifies :restart, 'httpd_service[customers]'
end

# Create the document root directory.
directory node['awesome_customers']['document_root'] do
  recursive true
end

# Load the secrets file and the encrypted data bag item that holds the database password.
password_secret = Chef::EncryptedDataBagItem.load_secret(node['awesome_customers']['passwords']['secret_path'])
user_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'db_admin_password', password_secret)

# Write the home page.
template "#{node['awesome_customers']['document_root']}/index.php" do
  source 'index.php.erb'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
  variables({
    database_password: user_password_data_bag_item['password']
  })
end

# Install the mod_php5 Apache module.
httpd_module 'php' do
  instance 'customers'
end

# Install php5-mysql.
package 'php-mysql' do
  action :install
  notifies :restart, 'httpd_service[customers]'
end
```

FIX DATABASE

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
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
    host: node['awesome_customers']['database']['host'],
    username: node['awesome_customers']['database']['username'],
    password: root_password_data_bag_item['password']
  )
  action :create
end

# Load the encrypted data bag item that holds the database user's password.
user_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'db_admin_password', password_secret)

# Add a database user.
mysql_database_user node['awesome_customers']['database']['app']['username'] do
  connection(
    host: node['awesome_customers']['database']['host'],
    username: node['awesome_customers']['database']['username'],
    password: root_password_data_bag_item['password']
  )
  password user_password_data_bag_item['password']
  database_name node['awesome_customers']['database']['dbname']
  host node['awesome_customers']['database']['host']
  action [:create, :grant]
end

# Write schema seed file to filesystem.
cookbook_file node['awesome_customers']['database']['seed_file'] do
  source 'create-tables.sql'
  owner 'root'
  group 'root'
  mode '0600'
end

# Seed the database with a table and test data.
execute 'initialize database' do
  command "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{user_password_data_bag_item['password']} -D #{node['awesome_customers']['database']['dbname']} < #{node['awesome_customers']['database']['seed_file']}"
  not_if  "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{user_password_data_bag_item['password']} -D #{node['awesome_customers']['database']['dbname']} -e 'describe customers;'"
end
```

RUN RUBOCOP

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ rubocop recipes
Inspecting 5 files
C...C

Offenses:

recipes/database.rb:63:9: C: Put one space between the method name and the first argument.
  not_if  "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{user_password_data_bag_item['password']} -D #{node['awesome_customers']['database']['dbname']} -e 'describe customers;'"
        ^^
recipes/webserver.rb:34:13: C: Redundant curly braces around a hash parameter.
  variables({
            ^
recipes/webserver.rb:35:5: C: Use 2 spaces for indentation in a hash, relative to the first position after the preceding left parenthesis.
    database_password: user_password_data_bag_item['password']
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
recipes/webserver.rb:36:3: C: Indent the right brace the same as the first position after the preceding left parenthesis.
  })
  ^

5 files inspected, 4 offenses detected
```

FOUR LEFT!

#### Resolve the other error

* C: Put one space between the method name and the first argument.
* C: Redundant curly braces around a hash parameter.
* C: Indent the right brace the same as the first position after the preceding left parenthesis.

Let's fix these!

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
[...]

# Seed the database with a table and test data.
execute 'initialize database' do
  command "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{user_password_data_bag_item['password']} -D #{node['awesome_customers']['database']['dbname']} < #{node['awesome_customers']['database']['seed_file']}"
  not_if "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{user_password_data_bag_item['password']} -D #{node['awesome_customers']['database']['dbname']} -e 'describe customers;'"
end
```

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
[...]

# Write the home page.
template "#{node['awesome_customers']['document_root']}/index.php" do
  source 'index.php.erb'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
  variables(
    database_password: user_password_data_bag_item['password']
  )
end

[...]
```

RUN RUBOCOP

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ rubocop recipes
Inspecting 5 files
.....

5 files inspected, no offenses detected
```

woot!

### Foodcritic

Run one more time, just to ensure no new violations were introduced.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ foodcritic recipes

```
