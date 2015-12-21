## 3. Update the recipe to reference the HTML template

Write out the recipe, <code class="file-path">default.rb</code>, like this.

```ruby
# ~/chef-repo/cookbooks/learn_chef_httpd/recipes/default.rb
package 'httpd'

service 'httpd' do
  action [:enable, :start]
end

template '/var/www/html/index.html' do
  source 'index.html.erb'
end
```
