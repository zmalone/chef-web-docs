## 2. Run the selinux::permissive recipe

The `selinux::permissive` recipe does everything we need to ensure that SELinux is running in permissive mode. To run this recipe, add the line `include_recipe 'selinux::permissive'` to the beginning of your cookbook's default recipe, <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/default.rb
include_recipe 'selinux::permissive'
include_recipe 'web_application::user'
include_recipe 'web_application::webserver'
```

[COMMENT] Remember, order matters when you write and run recipes. That's why we run the `selinux::permissive` recipe before everything else.
