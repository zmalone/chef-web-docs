## 1. Disable the default IIS web site

We don't need the default web site that comes with IIS, so let's disable it.

An easy way to do so is to use the [iis](https://supermarket.chef.io/cookbooks/iis) cookbook from Chef Supermarket. The `iis` cookbook defines resources that help you manage IIS, which we'll use later.

We'll load the `iis` cookbook just like we did the `sql_server` cookbook. Append a `depends` statement to <code class="file-path">metadata.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/metadata.rb
name             'awesome_customers'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version          '0.2.0'

depends 'sql_server', '~> 2.4.0'
depends 'iis', '~> 4.1.1'
```

Now let's remove the default site. The `iis` cookbook provides a recipe named `remove_default_site` that does this for us. All you need to do is include this recipe in your cookbook.

Append the following code to <code class="file-path">webserver.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Remove the default web site.
include_recipe 'iis::remove_default_site'
```

This recipe uses the `iis_site` and `iis_pool` resources that the `iis` cookbook defines to stop and delete the default web site and app pool.

```ruby
# remove_default_site.rb
iis_site 'Default Web Site' do
  action [:stop, :delete]
end

iis_pool 'DefaultAppPool' do
  action [:stop, :delete]
end
```
