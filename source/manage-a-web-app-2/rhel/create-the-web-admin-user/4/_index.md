## 4. Set the user recipe to run

To run the `user` recipe, add an `include_recipe` line to your cookbook's default recipe. Make the entire default recipe look like this.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/recipes/default.rb
include_recipe 'awesome_customers::user'
```
