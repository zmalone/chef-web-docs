## 3. Write the user recipe

Now that we've defined our attributes, let's write the `user` recipe. Add the following to <code class="file-path">user.rb</code>.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/user.rb
group node['web_application']['group']

user node['web_application']['user'] do
  group node['web_application']['group']
  system true
  shell '/bin/bash'
end
```

Note that we use `default['web_application']['user']` to define the attribute in the attributes file and `node['web_application']['user']` to reference it in the recipe.

[COMMENT] One advantage to this approach is that you can now reuse this recipe in another cookbook &ndash; all you need to do is override the `node['web_application']['group']` and `node['web_application']['user']` attributes in your cookbook.
