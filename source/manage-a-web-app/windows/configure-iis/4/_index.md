## 4. Install the IIS Management Console

Although you might not require it on a production system, let's install the IIS Management Console, the user interface for IIS management. You'll later use the IIS Management Console to verify your web server configuration. We'll use the same format as we did for the IIS role and ASP.NET.

Append this to <code class="file-path">webserver.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
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
```

You're entire `webserver` recipe looks like this.

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
```
