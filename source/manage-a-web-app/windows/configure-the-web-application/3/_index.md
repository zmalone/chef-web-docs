## 3. Create an IIS application pool, web site, and application

The `webserver` recipe is set up to download and extract the Customers application. The next step is to add an IIS application pool, application, and web site to host it. Let's start with the application pool.

### Create the application pool

To create the application pool, we'll use the `iis_pool` resource that's provided by the `iis` cookbook.

Append the following code to your `webserver` recipe to create an application pool named `Products`.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Create the Products app pool.
iis_pool 'Products' do
  runtime_version '4.0'
  action :add
end
```

The `runtime_version` attribute specifies that the application pool uses the .NET Framework 4 runtime.

### Create the web site

To add the web site, we'll use the `iis` cookbook's `iis_site` resource. By default, ASP.NET applications run under a user in the `IIS_IUSRS` group, so we also need to provide read rights to that group.

We want the web site to be accessible over HTTP on port 80 and run in the `Products` application pool. The `iis_site` resource provides attributes that define those settings.

Append the following code to your `webserver` recipe to create the <code class="file-path">C:\inetpub\sites</code> directory, assign access rights, and create a web site named `Customers`.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
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
```

### Create the application

The final step is to create the IIS application. To do so, we'll use the `iis_app` resource.

Append the following code to your `webserver` recipe to create an application named `Customers` that runs in the `Products` application pool.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Create the Customers app.
iis_app 'Customers' do
  application_pool 'Products'
  path '/Products'
  physical_path app_directory
  action :add
end
```

The `path` attribute defines the virtual path &ndash; the path you enter into your web browser. The `physical_path` attribute defines the location of the application on the server, in our case <code class="file-path">C:\inetpub\apps\Customers</code>.

Your final `webserver` recipe looks like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Enable the IIS role.
dsc_script 'Web-Server' do
  code <<-EOH
  WindowsFeature InstallWebServer
  {
    Name = "Web-Server"
    Ensure = "Present"
  }
  EOH
end

# Install ASP.NET 4.5.
dsc_script 'Web-Asp-Net45' do
  code <<-EOH
  WindowsFeature InstallDotNet45
  {
    Name = "Web-Asp-Net45"
    Ensure = "Present"
  }
  EOH
end

# Install the IIS Management Console.
dsc_script 'Web-Mgmt-Console' do
  code <<-EOH
  WindowsFeature InstallIISConsole
  {
    Name = "Web-Mgmt-Console"
    Ensure = "Present"
  }
  EOH
end

# Remove the default web site.
include_recipe 'iis::remove_default_site'

# Define the local app and site locations.
app_directory = 'C:\inetpub\apps\Customers'
site_directory = 'C:\inetpub\sites\Customers'

# Download the built Customers application and unzip it to the app directory.
windows_zipfile app_directory do
  source 'https://github.com/learn-chef/manage-a-web-app-windows/releases/download/v0.1.0/Customers.zip'
  action :unzip
  not_if { ::File.exists?(app_directory) }
end

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
