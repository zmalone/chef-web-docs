## 1. Use Berkshelf to install your dependencies

Initially, you ran `berks install` to install the cookbooks on your workstation. Because you added a new dependency to your cookbook &ndash; the `iis` cookbook &ndash; run `berks install` again to install it and any of its dependencies.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks install
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using awesome_customers (0.2.0) from source at .
Using chef-sugar (3.1.1)
Using chef_handler (1.2.0)
Installing iis (4.1.1)
Using openssl (4.3.2)
Using sql_server (2.4.0)
Using windows (1.38.1)
```

You'll see that Berkshelf downloaded the `iis` cookbook. The `iis` cookbook depends on the `windows` cookbook, but that dependency was resolved when Berkshelf downloaded the `sql_server` cookbook, which also depends on `windows`.

<hr>

### Sidebar: berks install versus berks update

The `berks install` command downloads any new cookbooks that you don't have on your workstation.

There's also the `berks update` command, which updates cookbooks and their dependencies. For example, recall that you used the _pessimistic version constraint_ `~>` when you referenced the `sql_server` cookbook.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/metadata.rb
[...]
depends 'sql_server', '~> 2.4.0'
[...]
```

This tells Chef that we want the latest version of the `sql_server` cookbook that is greater than or equal to `2.4.0` but less than `2.5.0`. Say you're using version `2.4.0` of the `sql_server` cookbook and version `2.4.1` is released. The `berks update` command will retrieve the updated version and update the cookbook dependency graph.

The `berks update` command updates versions specified by the pessimistic `~>`, greater than `>`, or greater than or equal to `>=` constraints.

Recall that under [Semantic Versioning](http://semver.org), version numbers are typically written as MAJOR.MINOR.PATCH, where:

* MAJOR specifies a change that's incompatible with previous versions.
* MINOR specifies new functionality that's backwards-compatible with previous versions.
* PATCH specifies backwards-compatible bug fixes.

When you update your dependent cookbook versions, always test and verify that they continue to behave as you expect. Although the pessimistic constraint is a good way to pick up bug fixes, the `>` and `>=` constraints will update any newer MINOR or MAJOR versions that are available.
