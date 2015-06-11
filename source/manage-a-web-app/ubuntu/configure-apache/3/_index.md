## 3. Refactor the webserver recipe

For this project, let's say that the location of the home page &ndash; <code class="file-path">/srv/apache/customers</code> &ndash; and its owner &ndash; `web_admin` &ndash; might change. To make this recipe more manageable, let's factor out those parts into custom node attributes.

To do so, you'll go back to your attributes file, <code class="file-path">default.rb</code>, and create a few custom attributes to describe these parts.

We've already defined the user name and group for your site's content. Let's add another node attribute that defines the path to the document root.

Modify <code class="file-path">default.rb</code> like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/attributes/default.rb
default['awesome_customers']['user'] = 'web_admin'
default['awesome_customers']['group'] = 'web_admin'

default['awesome_customers']['document_root'] = '/var/www/customers/public_html'
```

Now we have values to use in our recipe. It's time to write out our recipe file. Modify <code class="file-path">webserver.rb</code>  like this.

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

[RUBY] The double quotes in this recipe specifies that _string interpolation_ should be performed. String interpolation enables you to replace placeholders within a string with the values they represent. Placeholders can be variables or any block of Ruby code.
