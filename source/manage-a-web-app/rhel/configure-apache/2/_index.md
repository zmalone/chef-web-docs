## 2. Write the webserver recipe

Remember, our goals for configuring Apache are to:

* install the Apache package and start and enable its service.
* create and enable our custom site.
* create a default home page for our site.

We'll call our custom site `customers`, and we'll store it in the <code class="file-path">/var/www/customers/public_html</code> directory.

The first step is to create the recipe file, <code class="file-path">webserver.rb</code>. Run the following command to generate it.

```bash
# ~/chef-repo
$ chef generate recipe cookbooks/awesome_customers webserver
Compiling Cookbooks...
Recipe: code_generator::recipe
[...]
  * template[cookbooks/awesome_customers/recipes/webserver.rb] action create
    - create new file cookbooks/awesome_customers/recipes/webserver.rb
    - update content in file cookbooks/awesome_customers/recipes/webserver.rb from none to bc6813
    (diff output suppressed by config)
```

Although we're not yet set up to run PHP code, we can create an initial home page named <code class="file-path">index.php</code> that contains plain HTML as a placeholder. Earlier, we set up a user, `web_admin`, who has access to the site's content. We'll configure the home page so that the `web_admin` user has read and write access, and everyone else has read-only access.

We'll use the `httpd_service` and `httpd_config` resources, which are defined by the `httpd` cookbook, to set up the `customer` site.

The `httpd_service` resource ensures that the Apache package is installed and gets the service up and running. The `httpd_config` resource copies the configuration file for the `customers` site to the appropriate location. For the home page, we'll use the `file` resource that you're already familiar with.

Write out <code class="file-path">webserver.rb</code> like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Install Apache and start the service.
httpd_service 'customers' do
  mpm 'prefork'
  action :create
end

# Add the site configuration.
httpd_config 'customers' do
  instance 'customers'
  source 'customers.conf.erb'
  notifies :restart, 'httpd_service[customers]'
end

# Create the document root directory.
directory '/var/www/customers/public_html' do
  recursive true
end

# Write a default home page.
file '/var/www/customers/public_html/index.php' do
  content '<html>This is a placeholder</html>'
  mode '0644'
  owner 'web_admin'
  group 'web_admin'
end
```

The `httpd_service` resource supports multiple simultaneous Apache instances that you can identify and manage. The name `customers` will produce a service named `apache2-customers`.

[COMMENT] PHP [must be run](http://www.php.net/manual/en/faq.installation.php#faq.installation.apache2) in a single-threaded [Multi-Processing Module](http://httpd.apache.org/docs/2.2/mpm.html), or MPM. Therefore, we set the `mpm` attribute to use the [prefork](http://httpd.apache.org/docs/2.2/mod/prefork.html) module.
