## 3. Install MySQL

Now that we've referenced the `sql_server` cookbook from our cookbook's metadata and set up the node attributes we need to override, we're ready to install SQL Server.

The `sql_server` cookbook provides a recipe named `server` that does everything for us. So all we need to do is run that recipe from our `database` recipe.

Add the following to <code class="file-path">database.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Install SQL Server.
include_recipe 'sql_server::server'
```
