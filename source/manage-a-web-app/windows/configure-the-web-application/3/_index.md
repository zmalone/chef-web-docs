## 3. Create an IIS app pool, app, and site [to run your web application on]

[TODO: Intro app pool, site, app more clearly]

Now that we've set up the Customers web app [to be downloaded and installed], let's create an [app pool, site, and app]

Append the following code to your `webserver` recipe.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Create the Products app pool.
iis_pool 'Products' do
  runtime_version '4.0'
  action :add
end

# Create the site directory and give IIS_IUSRS read rights.
directory site_directory do
  rights :read, 'IIS_IUSRS'
  recursive true
  action :create
end

# Create the Customers site.
iis_site 'Customers' do
  protocol :http
  port 80
  path site_directory
  application_pool 'Products'
  action [:add, :start]
end

# Create the Customers app.
iis_app 'Customers' do
  application_pool 'Products'
  path '/Products'
  physical_path app_directory
  action :add
end
```
