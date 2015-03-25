## 6. Set the webserver recipe to run

To run the `webserver` recipe, append an `include_recipe` line to your cookbook's default recipe, just like you did for the `apt` cookbook's default recipe and your `user` recipe. Make the entire default recipe look like this.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/default.rb
include_recipe 'apt::default'
include_recipe 'web_application::user'
include_recipe 'web_application::webserver'
```
