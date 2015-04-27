## 3. Install the Web Server role

To install the IIS Web Server role, add the following `windows_feature` resource to <code class="file-path">webserver.rb</code>, like this.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/webserver.rb
# Install the Web Server role.
windows_feature 'IIS-WebServerRole' do
  action :install
end
```
