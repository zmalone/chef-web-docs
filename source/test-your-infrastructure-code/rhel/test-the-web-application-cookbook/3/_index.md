## 3. Verify the awesome_customers cookbook adheres to the style guide

Now that you have automated testing that verifies that the `awesome_customers` cookbook behaves as you expect and properly defines its resources, let's run the lint tools RuboCop and Foodcritic against it to verify that it adheres to the style guide and avoids potential defects.

Let's start by moving to your cookbook's root directory and running RuboCop and Foodcritic on all files in the <code class="file-path">recipes</code> directory. That will give us a sense of how many potential issues there are to fix.

```bash
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
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
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
$ foodcritic recipes

```

The Foodcritic run discovered no issues. However, the RuboCop run discovered 20 convention issues in two of the five recipe files &ndash; <code class="file-path">webserver.rb</code> and <code class="file-path">database.rb</code>.

In practice, you would typically start by resolving the most severe issues first (such as errors) and then move back and resolve less severe issues (such as warnings and convention issues). RuboCop discovered only convention issues, so we don't need to prioritize our work by severity.

A common next step is to identify common themes among the reported issues. The two issues that occur most often are:

* `C: Line is too long.`
* `C: Use the new Ruby 1.9 hash syntax.`

Let's resolve those issues first to narrow things down.

### Fix long lines

Let's say that our organization does not wish to adhere to the standard maximum line length of 80, and that any line length is acceptable. We can simply configure RuboCop to ignore maximum line length.

RuboCop's [default rules](https://github.com/bbatsov/rubocop/blob/master/config/default.yml) tells us that the [Metrics/LineLength](https://github.com/bbatsov/rubocop/blob/master/config/default.yml#L802) rule defines the maximum line length.

```ruby
# default.yml
Metrics/LineLength:
  Max: 80
  # To make it possible to copy or click on URIs in the code, we allow lines
  # contaning a URI to be longer than Max.
  AllowURI: true
  URISchemes:
    - http
    - https
```

To disable this rule, create a file named <code class="file-path">.rubocop.yml</code> at the root of your Chef repo and add the following code. We create the file in this location so that any other cookbooks in the same repo can share the same custom rules.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/.rubocop.yml
Metrics/LineLength:
  Enabled: false
```

This code disables the `Metrics/LineLength` rule.

Run RuboCop a second time to verify that the line length violation no longer appears.

```bash
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
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

The line length violation no longer appears, and our change introduced no new violations.

Let's move on to the next most frequent violation &ndash; not using the Ruby 1.9 Hash syntax.

### Use the Ruby 1.9 Hash syntax

Recall that a Ruby [Hash](http://docs.ruby-lang.org/en/2.0.0/Hash.html) is a collection of key-value pairs. Ruby provides multiple ways to declare Hash values. Prior to Ruby 1.9, Hash values are defined like this.

```ruby
h = { :password => 'fake_password' }
```

This is often referred to as _Hash rocket_ syntax.

Ruby 1.9 introduced this new syntax, often called _JSON-style_ or _colon_ syntax.

```ruby
h = { password: 'fake_password' }
```

The community style guide prefers the new style, when possible.

Let's convert our code that uses the Hash rocket style to use the new style. We'll convert code that looks like this:

```ruby
:database_password => user_password_data_bag_item['password']
```

to look like this:

```ruby
database_password: user_password_data_bag_item['password']
```

We'll start with the `websever` recipe. Write out <code class="file-path">webserver.rb</code> like this.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
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

Now let's fix the `database` recipe. Write out <code class="file-path">database.rb</code> like this.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/recipes/database.rb
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

Run RuboCop to verify the changes.

```bash
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
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

We've successfully updated our Hash values to use the new syntax. Now let's resolve the four remaining RuboCop violations.

### Resolve the remaining violations

Here are the remaining violations.

* `C: Put one space between the method name and the first argument.`
* `C: Redundant curly braces around a hash parameter.`
* `C: Indent the right brace the same as the first position after the preceding left parenthesis.`

The first violation states that two much whitespace separates a method name from its first argument. Verify this in the `execute` resource in your `database` recipe.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/recipes/database.rb
not_if  "mysql -h #{node['awesome_customers']['database']['host']} -u
```

Now remove the extra space from your `database` recipe. The entire `execute` resources now looks like this.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# [...]

# Seed the database with a table and test data.
execute 'initialize database' do
  command "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{user_password_data_bag_item['password']} -D #{node['awesome_customers']['database']['dbname']} < #{node['awesome_customers']['database']['seed_file']}"
  not_if "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{user_password_data_bag_item['password']} -D #{node['awesome_customers']['database']['dbname']} -e 'describe customers;'"
end
```

The second error, `C: Redundant curly braces around a hash parameter.`, relates to the fact that both parenthesis and curly braces are used to define a Hash value. Although the following code blocks are equivalent, the second form is preferred because it is more concise.

```ruby
variables({
  database_password: user_password_data_bag_item['password']
})
```

```ruby
variables(
  database_password: user_password_data_bag_item['password']
)
```

Update your `webserver` recipe to use the recommended Hash syntax, like this.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# [...]

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

# [...]
```

The final violation, `C: Indent the right brace the same as the first position after the preceding left parenthesis.` appears to not be relevant anymore because we removed the right curly brace in question.

So let's run RuboCop to get the latest status on our cookbook.

```bash
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
$ rubocop recipes
Inspecting 5 files
.....

5 files inspected, no offenses detected
```

Terrific! RuboCop now reports zero offenses. Although each change might seem minor, cumulatively they can go a long way to ensuring that the code is readable and maintainable as the project evolves. A clean RuboCop and Foodcritic run also builds confidence that the code is free of many common defects.

Run Foodcritic one last time to ensure that the fixes for the RuboCop violations didn't introduce any new Foodcritic violations.

```bash
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
$ foodcritic recipes

```
