## 4. Set the user recipe to run

To run the `user` recipe, add an `include_recipe` line to your cookbook's default recipe. Make the entire default recipe look like this.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/default.rb
include_recipe 'web_application::user'
```
