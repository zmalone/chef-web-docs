## 4. Set the database recipe to run

Now that we've written code to install SQL Server and set up our database, let's set the `database` receipe to run.

Append an `include_recipe` statement to your default recipe, <code class="file-path">default.rb</code>. The entire file will look like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/default.rb
include_recipe 'awesome_customers::webserver'
include_recipe 'awesome_customers::database'
```
