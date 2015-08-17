## 4. Install IIS and the ASP.NET module

Now we need to install the ASP.NET module. Before you install the ASP.NET module, you'll need to install these components in this order:

* ISAPI Filters
* ISAPI Extensions
* .NET Framework 3.5 Features
* ASP.NET 4.5 prerequisites
* .NET Extensibility 4.5

[COMMENT] How did we know that these are the prerequisite requirements? We used the documentation and experimentation to research the minimum set of features that are required to install the ASP.NET module. With Chef, it's your task to define which components you need to configure and the order in which to do so. And because it's code, you're documenting the requirements in a way that's repeatable, testable, and can evolve as needed over time.

Append this to <code class="file-path">webserver.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Install prerequisite features for IIS-ASPNET45.
%w(IIS-ISAPIFilter IIS-ISAPIExtensions NetFx3ServerFeatures NetFx4Extended-ASPNET45 IIS-NetFxExtensibility45).each do |f|
  windows_feature f do
    action :install
  end
end
```

In Ruby, `%w` is a shorthand way of creating an array of strings. This notation does not require the use of quotation marks or commas. The above code is the same as this:

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Install prerequisite features for IIS-ASPNET45.
windows_feature 'IIS-ISAPIFilter' do
  action :install
end

windows_feature 'IIS-ISAPIExtensions' do
  action :install
end

windows_feature 'NetFx3ServerFeatures' do
  action :install
end

windows_feature 'NetFx4Extended-ASPNET45' do
  action :install
end

windows_feature 'IIS-NetFxExtensibility45' do
  action :install
end
```

Now you can install the ASP.NET module. Append this to <code class="file-path">webserver.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Install the ASP.NET module.
windows_feature 'IIS-ASPNET45' do
  action :install
end
```
