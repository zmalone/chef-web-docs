## 6. Set the firewall and webserver recipes to run

To run the `firewall` and `webserver` recipes, append an `include_recipe` line for each to your cookbook's default recipe, just like you did for the `apt` cookbook's default recipe and your `user` recipe. Make the entire default recipe look like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/default.rb
include_recipe 'apt::default'
include_recipe 'awesome_customers::user'
include_recipe 'firewall::default'
include_recipe 'awesome_customers::webserver'
```

The `firewall` cookbook's default recipe enables the firewall. It also opens port 22 to incoming traffic because we set the `node['firewall']['allow_ssh']` attribute to `true` ([see the source code](https://github.com/opscode-cookbooks/firewall/blob/master/recipes/default.rb).)
