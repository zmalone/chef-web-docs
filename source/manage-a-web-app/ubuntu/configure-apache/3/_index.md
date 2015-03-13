## 3. Refactor the webserver recipe

To make this recipe more manageable and reusable, we can factor out these parts:

* the name of the web app &ndash; `customers`.
* the name of the configuration file &ndash; `customers.conf`.
* the location of the default home page &ndash; `/srv/apache/customers/`.
* the owner and group name of the home page &ndash; `web_admin`.

Let's go back to our attributes file, <code class="file-path">default.rb</code>, and create a few custom attributes to describe these parts.

We've already defined the user name and group for our site's content. The `apache2` cookbook already defines an attribute named `node['apache']['docroot_dir']` that describes the document root, so all we have to do is override it. We'll need to also define our site's name and the name of its configuration file.

Modify <code class="file-path">default.rb</code> like this.

```ruby
# ~/chef-repo/cookbooks/web_application/attributes/default.rb
default['web_application']['user'] = 'web_admin'
default['web_application']['group'] = 'web_admin'

default['web_application']['name'] = 'customers'
default['web_application']['config'] = 'customers.conf'

default['apache']['docroot_dir'] = '/srv/apache/customers'
```

Now we have values to use in our recipe. Now it's time to write out our recipe file. Modify <code class="file-path">webserver.rb</code>  like this.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/webserver.rb
# install Apache and configure its service
include_recipe 'apache2::default'

# create and enable our custom site
web_app node['web_application']['name'] do
  template "#{node['web_application']['config']}.erb"
end

# create the document root
directory node['apache']['docroot_dir'] do
  recursive true
end

# write a default home page
file "#{node['apache']['docroot_dir']}/index.php" do
  content '<html>This is a placeholder</html>'
  mode '0644'
  owner node['web_application']['user']
  group node['web_application']['group']
end
```

[RUBY] The double quotes in this recipe specifies that _string interpolation_ should be performed. String interpolation enables you to replace placeholders within a string with the values they represent. Placeholders can be variables or any block of Ruby code.
