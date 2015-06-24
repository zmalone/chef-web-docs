## 5. Enable inbound traffic to your web site

Depending on how your server is configured, it may be necessary to open port 80 (HTTP) to incoming traffic. Let's make sure that port 80 is open by configuring the firewall rules.

The easiest way to set a firewall rule is to use the [firewall](https://supermarket.chef.io/cookbooks/firewall) cookbook from Chef Supermarket.

First, modify <code class="file-path">metadata.rb</code> to load the `firewall` cookbook.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/metadata.rb
name             'awesome_customers'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version          '0.1.0'

depends 'apt', '~> 2.6.1'
depends 'httpd', '~> 0.2.14'
depends 'firewall', '~> 0.11.8'
```

Now edit <code class="file-path">webserver.rb</code> to use the `firewall_rule` resource, which is provided by the `firewall` cookbook, to open port 80 to incoming traffic.

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

# Write the home page.
file "#{node['awesome_customers']['document_root']}/index.php" do
  content '<html>This is a placeholder</html>'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
end

# Open port 80 to incoming traffic.
firewall_rule 'http' do
  port 80
  protocol :tcp
  action :allow
end
```
