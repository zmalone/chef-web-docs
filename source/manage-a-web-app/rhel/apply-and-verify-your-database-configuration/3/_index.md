## 3. Increment the cookbook's version

To enable Berkshelf to upload the updated `awesome_customers` cookbook, we need to update its version in the metadata.

Most Chef cookbooks follow the [Semantic Versioning](http://semver.org) scheme. Your cookbook is compatible with the previous version &ndash; we simply added functionality &ndash; so we'll bump the middle number.

Modify the `version` field in <code class="file-path">metadata.rb</code> from '0.1.0' to '0.2.0', like this.

```bash
# ~/chef-repo/cookbooks/awesome_customers/metadata.rb
name             'awesome_customers'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version          '0.2.0'

depends 'apache2', '~> 3.0.1'
depends 'iptables', '~> 0.14.1'
depends 'selinux', '~> 0.9.0'
depends 'mysql2_chef_gem', '~> 1.0.1'
depends 'mysql', '~> 6.0.17'
depends 'database', '~> 4.0.3'
```

We need to run `berks update` one more time to update the dependency tree.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks update
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using apache2 (3.0.1)
Using apt (2.7.0)
Using chef-sugar (3.0.1)
Using build-essential (2.2.1)
Using database (4.0.3)
Using iptables (0.14.1)
Using logrotate (1.9.1)
Using mariadb (0.3.0)
Using mysql (6.0.18)
Using mysql2_chef_gem (1.0.1)
Using openssl (4.0.0)
Using postgresql (3.4.18)
Using rbac (1.0.2)
Using selinux (0.9.0)
Using smf (2.2.6)
Using awesome_customers (0.2.0) from source at .
Using yum (3.5.3)
Using yum-epel (0.6.0)
Using yum-mysql-community (0.1.14)
```
