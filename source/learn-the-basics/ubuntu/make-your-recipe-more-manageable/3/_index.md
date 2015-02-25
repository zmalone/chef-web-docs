## 3. Update the recipe to reference the HTML template

Write out the recipe, <code class="file-path">default.rb</code>, like this.

```ruby
# ~/chef-repo/cookbooks/learn_chef_apache2/recipes/default.rb
package 'apache2'

service 'apache2' do
  action [:start, :enable]
end

template '/var/www/html/index.html' do
  source 'index.html.erb'
end
```
