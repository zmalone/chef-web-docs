## 3. Refactor the PHP application

We'll do one final bit of refactoring to modify the PHP script to use custom node attributes and the encrypted database password.

First, we need to make the database password available to the PHP template.

In <code class="file-path">webserver.rb</code>, before the `template` resource for the home page, add code to load the secrets file and the encrypted data bag item that holds the database password, just like you did when you set up the database.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Load the secrets file and the encrypted data bag item that holds the database password.
password_secret = Chef::EncryptedDataBagItem.load_secret("#{node['awesome_customers']['passwords']['secret_path']}")
user_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'db_admin_password', password_secret)
```

Now modify the `template` resource that follows to pass the decrypted database password to the template.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Write a default home page.
template "#{node['awesome_customers']['document_root']}/index.php" do
  source 'index.php.erb'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
  variables({
    :database_password => user_password_data_bag_item['password']
  })
end
```

[RUBY] The [variables](https://docs.chef.io/resource_template.html#variables) attribute is a [Hash](http://ruby-doc.org/core-2.1.1/Hash.html) of values.

In <code class="file-path">index.php.erb</code>, find the part of the PHP program that looks like this.

```php
<?php
// ~/chef-repo/cookbooks/awesome_customers/templates/default/index.php.erb
$servername = "127.0.0.1";
$username = "db_admin";
$password = "database_password";
$dbname = "products";
```

Replace the values of the variables with the appropriate node attributes and the variable for the database password, like this:

```php
<?php
// ~/chef-repo/cookbooks/awesome_customers/templates/default/index.php.erb
$servername = "<%= node['awesome_customers']['database']['host'] %>";
$username = "<%= node['awesome_customers']['database']['app']['username'] %>";
$password = "<%= @database_password %>";
$dbname = "<%= node['awesome_customers']['database']['dbname'] %>";
```
