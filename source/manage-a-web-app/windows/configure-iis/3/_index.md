## 3. Install ASP.NET 4.5

Now let's install ASP.NET 4.5. This will allow us to run our web application in a later step. We'll use the same format to install ASP.NET as we did to enable the IIS role.

Add the following to your `webserver` recipe.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
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
```

<hr>

### Sidebar: A quick look at dsc_resource

Systems running Windows PowerShell 5.0 can use [dsc_resource](https://docs.chef.io/resource_dsc_resource.html) to define DSC resources.

Here's what the `dsc_script` resource you just wrote might look like using `dsc_resource`.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
dsc_resource 'Web-Asp-Net45' do
  resource :windowsfeature
  property :name, 'Web-Asp-Net45'
  property :ensure, 'Present'
end
```

`dsc_resource` resources more closely resemble other Chef resources and don't require use of here documents, so they can be written using less code.

[WARN] Windows PowerShell 5.0 and `dsc_resource` are still under development. Refer to the [dsc_resource documentation](https://docs.chef.io/resource_dsc_resource.html) for more information on its status and restrictions.
