## 3. Write the user recipe

Now that we've defined our attributes, let's write the `user` recipe. Add the following to <code class="file-path">user.rb</code>.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/recipes/user.rb
group node['awesome_customers']['group']

user node['awesome_customers']['user'] do
  group node['awesome_customers']['group']
  system true
  shell '/bin/bash'
end
```

Note that we use `default['awesome_customers']['user']` to define the attribute in the attributes file and `node['awesome_customers']['user']` to reference it in the recipe.

[COMMENT] One advantage to this approach is that you can now reuse this recipe in another cookbook &ndash; all you need to do is override the `node['awesome_customers']['group']` and `node['awesome_customers']['user']` attributes in your cookbook.
