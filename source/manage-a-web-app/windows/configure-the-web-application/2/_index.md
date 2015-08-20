## 2. Download an unpack a prebuilt version of the ASP.NET Customers web app

Now let's write code to download the Customers web app and unpack it in the [IIS directory].

ASP.NET projects typically go through a build process that generates the files and .NET assemblies that [perform the logic.] In practice, you might have a build process that runs when either manually or automatically when code is committed to the app's source code repository. When the build succeeds, you might then have a second process that runs your Chef cookbooks to deploy the updated app to your test or production environment.

For learning purposes, we've [provided a prebuilt version](https://github.com/learn-chef/manage-a-web-app-windows/releases/tag/v0.1.0) of the Customers web app on GitHub that your `awesome_customers` cookbook can download and install.

We're going to reference the directories that hold the Customers app and site locations multiple times, so let's create variables that we can reuse.

Append the following to <code class="file-path">webserver.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Define the local app and site locations.
app_directory = 'C:\inetpub\apps\Customers'
site_directory = 'C:\inetpub\sites\Customers'
```

To download and unzip the prebuilt application, we'll use the `windows_zipfile` resource that's provided by the [windows](https://supermarket.chef.io/cookbooks/windows) cookbook. We don't need to add the `windows` cookbook to our metadata file because the `sql_server` cookbook already depends on the `windows` cookbook and loads it for us.

Append the following to <code class="file-path">webserver.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Download the built Customers application and unzip it to the app directory.
windows_zipfile app_directory do
  source 'https://github.com/learn-chef/manage-a-web-app-windows/releases/download/v0.1.0/Customers.zip'
  action :unzip
  not_if { ::File.exists?(app_directory) }
end
```

The `not_if` part of the resource ensures that the zip file is unpacked only when the destination directory doesn't exist.

[COMMENT] You can find the source code for the Customers app [on GitHub](https://github.com/learn-chef/manage-a-web-app-windows/tree/master/app). If you want to experiment with it, build it by XXX, and then copy it to a location on your network that your node can access.
