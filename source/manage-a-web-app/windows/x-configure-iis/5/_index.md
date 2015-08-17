## 5. Set the webserver recipe to run

For our web application project, we'll use what's called the _application cookbook pattern_. An application cookbook typically contains multiple recipes, where each recipe configures one part of the system. The default recipe, <code class="file-path">default.rb</code>, lists these recipes in the order needed to build your application or service.

To run your `webserver` recipe, add the following to your cookbook's default recipe, <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/default.rb
include_recipe 'awesome_customers::webserver'
```
