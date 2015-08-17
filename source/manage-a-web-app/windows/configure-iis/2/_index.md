## 2. Enable the IIS role

Here's how you might use PowerShell DSC to enable the IIS role.

```powershell
WindowsFeature InstallWebServer
{
  Name = "Web-Server"
  Ensure = "Present"
}
```

To incorporate this DSC code in your Chef recipe, you use the [dsc_script](https://docs.chef.io/resource_dsc_script.html) resource.

Add the following to your `webserver` recipe.

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
```

The `code` attribute defines the code for the DSC configuration script. We use what's called a [here document](https://en.wikibooks.org/wiki/Ruby_Programming/Here_documents), or _heredoc_, to express multiple lines of text &ndash; in this case our PowerShell code &ndash; more naturally. The `<<-EOH` part declares the start of the heredoc, and the `EOH` part ends, or terminates, it.

[COMMENT] The advantage to using `dsc_script` over `powershell_script` is that you don't have to provide a guard (a `not_if` or `only_if` attribute) to ensure that the configuration is applied only when needed &ndash; PowerShell DSC takes care of that for you. `powershell_script` is still useful for systems that don't support DSC or when you have PowerShell code that you've already written and tested.
