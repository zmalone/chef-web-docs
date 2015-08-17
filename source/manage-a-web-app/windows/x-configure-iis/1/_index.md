## 1. Reference the windows cookbook

You don't need to manually download cookbooks from Chef Supermarket to use them. You'll learn how to automatically download cookbooks in a bit, but the first step is to reference the cookbooks you want to load.

The way you load one cookbook from inside another is to reference it in your cookbook's metadata file, <code class="file-path">metadata.rb</code>. To use the `windows` cookbook, append the line `depends 'windows', '~> 1.38.1'` to <code class="file-path">metadata.rb</code>, making the entire file look like this.


```ruby
# ~/chef-repo/cookbooks/awesome_customers/metadata.rb
name             'awesome_customers'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version          '0.1.0'

depends 'windows', '~> 1.38.1'
```

We also specify the version of the `windows` cookbook we want to use. Specifying, or _pinning_, the cookbook version helps you lock down functionality to a certain point in time. When a newer version of a cookbook is released, you can first verify and test that version before you deploy it to production. That way, you can adopt the latest changes and functionality when you're ready.

How did we know to specify version `1.38.1`? One way is by reading the latest version from the `windows` cookbook's [page](https://supermarket.chef.io/cookbooks/windows) on Supermarket.

![The windows cookbook version](misc/supermarket_windows_version.png)

Another way to get version information is through the `knife cookbook site show` command. The following command retrieves information for the `windows` cookbook and searches the result for the latest version.

On a Windows workstation, you would run:

```ps
# ~/chef-repo
$ knife cookbook site show windows | findstr latest_version
latest_version:     https://supermarket.chef.io/api/v1/cookbooks/windows/versions/1.38.1
```

On Linux or Mac OS, you would run:

```bash
# ~/chef-repo
$ knife cookbook site show windows | grep latest_version
latest_version:     https://supermarket.chef.io/api/v1/cookbooks/windows/versions/1.38.1
```

There are [multiple ways to specify version constraints](http://docs.chef.io/cookbook_versions.html). The `~>` syntax, called the _pessimistic version constraint_, tells Chef that we want the latest version of the `windows` cookbook that is greater than or equal to `1.38.1` but less than `1.39.0`. The third digit in a Chef cookbook's version typically relates to bug fixes or patches that are compatible with prior versions.

[COMMENT] For this tutorial, just to ensure that what you see matches the output that is shown, we recommend that you use the versions that we specify, even if a newer version is available.
