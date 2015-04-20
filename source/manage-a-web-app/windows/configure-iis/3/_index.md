## 3. Install the Web Server role

To make this recipe more manageable and reusable, we can factor out these parts:

* the name of the web app &ndash; `customers`.
* the name of the configuration file &ndash; `customers.conf`.
* the location of the default home page &ndash; `/srv/apache/customers/`.
* the owner and group name of the home page &ndash; `web_admin`.

Let's go back to your attributes file, <code class="file-path">default.rb</code>, and create a few custom attributes to describe these parts.

We've already defined the user name and group for your site's content. The `apache2` cookbook defines an attribute named `node['apache']['docroot_dir']` that describes the document root, so all we have to do is override it. We'll need to also define our site's name and the name of its configuration file.

Modify <code class="file-path">default.rb</code> like this.

```ruby
# ~/chef-repo/cookbooks/web_application/attributes/default.rb
default['web_application']['user'] = 'web_admin'
default['web_application']['group'] = 'web_admin'

default['web_application']['name'] = 'customers'
default['web_application']['config'] = 'customers.conf'

default['apache']['docroot_dir'] = '/srv/apache/customers'
```

Now we have values to use in our recipe. It's time to write out our recipe file. Modify <code class="file-path">webserver.rb</code>  like this.


```ruby
# ~/chef-repo/cookbooks/web_application/recipes/webserver.rb
# Install the Web Server role.
windows_feature 'IIS-WebServerRole' do
  action :install
end
```

[RUBY] The double quotes in this recipe specifies that _string interpolation_ should be performed. String interpolation enables you to replace placeholders within a string with the values they represent. Placeholders can be variables or any block of Ruby code.
