## 5. Set the firewall recipe to run

Append an `include_recipe` line to your cookbook's default recipe to set the `firewall` recipe to run. The entire file looks like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/default.rb
include_recipe 'selinux::permissive'
include_recipe 'awesome_customers::user'
include_recipe 'awesome_customers::webserver'
include_recipe 'awesome_customers::firewall'
```
