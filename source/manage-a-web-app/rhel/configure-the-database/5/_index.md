## 5. Set the database recipe to run

Append an `include_recipe` statement to your default recipe, <code class="file-path">default.rb</code>. The entire file will look like this.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/default.rb
include_recipe 'selinux::permissive'
include_recipe 'web_application::user'
include_recipe 'web_application::webserver'
include_recipe 'web_application::database'
```
