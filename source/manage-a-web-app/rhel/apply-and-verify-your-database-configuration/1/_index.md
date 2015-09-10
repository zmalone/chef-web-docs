## 1. Use Berkshelf to install your dependencies

Initially, you ran `berks install` to install the cookbooks on your workstation. Because you added new dependencies to your cookbook, run `berks install` again to install them.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks install
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Installing database (4.0.6)
Using awesome_customers (0.1.0) from source at .
Installing chef-sugar (3.1.1)
Installing apt (2.7.0)
Installing build-essential (2.2.3)
Using iptables (1.0.0)
Installing mariadb (0.3.0)
Using httpd (0.2.18)
Installing mysql (6.0.24)
Installing mysql2_chef_gem (1.0.2)
Installing openssl (4.2.0)
Installing postgresql (3.4.16)
Installing rbac (1.0.3)
Using selinux (0.9.0)
Installing smf (2.2.7)
Installing yum (3.6.1)
Installing yum-epel (0.6.2)
Installing yum-mysql-community (0.1.17)
```

You'll see that Berkshelf downloaded `mysql2_chef_gem` `mysql`, `database`, and their dependencies.

<hr>

### Sidebar: berks install versus berks update

The `berks install` command downloads any new cookbooks that you don't have on your workstation.

There's also the `berks update` command, which updates cookbooks and their dependencies. For example, recall that when you used the _pessimistic version constraint_ `~>` when you referenced the `mysql` cookbook.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/metadata.rb
[...]
depends 'mysql', '~> 6.0.17'
[...]
```

This tells Chef that we want the latest version of the `mysql` cookbook that is greater than or equal to `6.0.17` but less than `6.1.0`. Say you're using version `6.0.17` of the `mysql` cookbook and version `6.0.18` is released. The `berks update` command will retrieve the updated version and update the cookbook dependency graph.

The `berks update` command updates versions specified by the pessimistic `~>`, greater than `>`, or greater than or equal to `>=` constraints.

Recall that under [Semantic Versioning](http://semver.org), version numbers are typically written as MAJOR.MINOR.PATCH, where:

* MAJOR specifies a change that's incompatible with previous versions.
* MINOR specifies new functionality that's backwards-compatible with previous versions.
* PATCH specifies backwards-compatible bug fixes.

When you update your dependent cookbook versions, always test and verify that they continue to behave as you expect. Although the pessimistic constraint is a good way to pick up bug fixes, the `>` and `>=` constraints will update any newer MINOR or MAJOR versions that are available.
