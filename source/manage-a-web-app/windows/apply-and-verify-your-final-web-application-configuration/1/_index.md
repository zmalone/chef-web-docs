## 1. Use Berkshelf to update your dependencies

Initially, you ran `berks install` to install the cookbooks on your workstation. This time run `berks update` to install the cookbooks that you do not yet have.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks update
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using apache2 (3.0.1)
Installing build-essential (2.2.0)
Installing database (4.0.3)
Using awesome_customers (0.1.0) from source at .
Using apt (2.6.1)
Installing chef-sugar (3.0.1)
Using firewall (0.11.8)
Using iptables (0.14.1)
Installing mariadb (0.2.12)
Using logrotate (1.9.1)
Installing mysql (6.0.17)
Installing mysql2_chef_gem (1.0.1)
Installing openssl (4.0.0)
Installing postgresql (3.4.18)
Installing rbac (1.0.2)
Installing smf (2.2.6)
Installing yum (3.5.3)
Installing yum-epel (0.6.0)
Installing yum-mysql-community (0.1.14)
```

You'll see that Berkshelf downloaded `mysql2_chef_gem` `mysql`, `database`, and their dependencies.


-----

## 1. Increment the cookbook's version

Like before, we'll follow the Semantic Versioning scheme and increment our cookbook's version number.

Modify the `version` field in <code class="file-path">metadata.rb</code> from '0.2.0' to '0.3.0', like this.

```bash
# ~/chef-repo/cookbooks/awesome_customers/metadata.rb
name             'awesome_customers'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version          '0.3.0'
```
