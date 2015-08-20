## 2. Download and extract a prebuilt version of the Customers web app

Now let's write code to download the Customers web application and extract it to the <code class="file-path">C:\inetpub</code> directory, which is commonly used to store web applications.

ASP.NET applications are commonly built into a _web deployment package_, which contains your site's static content &ndash; such as HTML, CSS, and image files &ndash; and server-side code. In practice, you might manually build the package and copy the result to a staging area. Or you might have an automated process that builds and stages the package when code is checked in to source control. You might then have a second process &ndash; either manual or automated &ndash; that runs your Chef cookbooks to deploy the updated application to your test or production environment when the build succeeds.

For learning purposes, we've [provided a prebuilt version](https://github.com/learn-chef/manage-a-web-app-windows/releases/tag/v0.1.0) of the Customers web application on GitHub so you don't have to build it yourself.

It's common to place IIS applications in the <code class="file-path">C:\inetpub\apps</code> directory and site configuration in the <code class="file-path">C:\inetpub\sites</code> directory. We're going to reference these directories multiple times, so let's create variables that we can reuse.

Append the following to <code class="file-path">webserver.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Define the local app and site locations.
app_directory = 'C:\inetpub\apps\Customers'
site_directory = 'C:\inetpub\sites\Customers'
```

To download and extract the prebuilt application, we'll use the `windows_zipfile` resource that's provided by the [windows](https://supermarket.chef.io/cookbooks/windows) cookbook. We don't need to add the `windows` cookbook to our metadata file because the `sql_server` cookbook already depends on the `windows` cookbook and loads it for us.

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

The `not_if` part of the resource ensures that the zip file is extracted only when the destination directory doesn't exist. In practice, you might store the current version as a node attribute and update the application and the node attribute when the version changes. We'll show an example of that in a future tutorial.

[COMMENT] You can find the source code for the Customers application [on GitHub](https://github.com/learn-chef/manage-a-web-app-windows/tree/master/app). If you want to experiment with it, you can use Visual Studio to [create a deployment package](https://msdn.microsoft.com/en-us/library/dd465323.aspx), copy the .zip file to a location on your network that your node can access, and update your recipe to download and extract that file.
