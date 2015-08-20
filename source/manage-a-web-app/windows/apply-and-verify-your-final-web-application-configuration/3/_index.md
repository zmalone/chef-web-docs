## 3. Increment the cookbook's version

To enable Berkshelf to upload the updated `awesome_customers` cookbook, we need to update its version in the metadata.

Most Chef cookbooks follow the [Semantic Versioning](http://semver.org) scheme. Your cookbook is compatible with the previous version &ndash; we simply added functionality &ndash; so we'll bump the middle number.

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

depends 'sql_server', '~> 2.4.0'
depends 'iis', '~> 4.1.1'
```

We need to run `berks update` one more time to update the dependency tree.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks update
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using windows (1.38.1)
Using chef-sugar (3.1.1)
Using chef_handler (1.2.0)
Using iis (4.1.1)
Using openssl (4.3.2)
Using sql_server (2.4.0)
Using awesome_customers (0.3.0) from source at .
```
