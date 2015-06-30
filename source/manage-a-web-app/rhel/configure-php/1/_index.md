## 1. Install PHP

Recall that your `webserver` recipe looks like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Install Apache and start the service.
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

# Write the home page.
file "#{node['awesome_customers']['document_root']}/index.php" do
  content '<html>This is a placeholder</html>'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
end
```

The `httpd` cookbook defines the `httpd_module` resource, which installs Apache modules. In <code class="file-path">webserver.rb</code>, append this `httpd_module` resource to install the `mod_php5` Apache module.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Install the mod_php5 Apache module.
httpd_module 'php' do
  instance 'customers'
end
```

Now append a `package` resource to install `php5-mysql`.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Install php5-mysql.
package 'php-mysql' do
  action :install
  notifies :restart, 'httpd_service[customers]'
end
```

The entire file looks like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
#
# Cookbook Name:: awesome_customers
# Recipe:: webserver
#
# Copyright (c) 2015 The Authors, All Rights Reserved.
# Install Apache and start the service.
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

# Write the home page.
file "#{node['awesome_customers']['document_root']}/index.php" do
  content '<html>This is a placeholder</html>'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
end

# Write the home page.
template "#{node['awesome_customers']['document_root']}/index.php" do
  source 'index.php.erb'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
  variables({
    :database_password => user_password_data_bag_item['password']
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

Apache needs to be restarted to enable PHP to use the `php5-mysql` package. To do that, we use the [notifies](https://docs.chef.io/resource_common.html#notifications) attribute. The `notifies` attribute performs the `:restart` action on the `httpd-customers` service. But it does so only when it needs to; that is, only when the `package` resource actually performs the `:install` action.
