## 5. Set the database recipe to run

Append an `include_recipe` statement to your default recipe, <code class="file-path">default.rb</code>. The entire file will look like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/default.rb
include_recipe 'selinux::permissive'
include_recipe 'awesome_customers::user'
include_recipe 'awesome_customers::webserver'
include_recipe 'awesome_customers::database'
```
