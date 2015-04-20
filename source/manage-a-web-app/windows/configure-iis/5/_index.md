## 5. Set the webserver recipe to run

For our web application project, we'll use what's called the _application cookbook pattern_. An application cookbook typically contains multiple recipes, where each recipe configures one part of the system. The default recipe, <code class="file-path">default.rb</code>, lists these recipes in the order needed to build your application or service.

The `apt` cookbook's default recipe does everything we need to ensure the `apt` cache is up to date. To run this recipe, add the following to your cookbook's default recipe, <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/default.rb
include_recipe 'web_application::webserver'
```
