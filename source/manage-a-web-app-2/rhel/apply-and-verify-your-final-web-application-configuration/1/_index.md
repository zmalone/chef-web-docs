## 1. Increment the cookbook's version

Like before, we'll follow the Semantic Versioning scheme and increment our cookbook's version number.

Modify the `version` field in <code class="file-path">metadata.rb</code> from '0.2.0' to '0.3.0', like this.

```bash
# ~/learn-chef/cookbooks/awesome_customers_rhel/metadata.rb
name             'awesome_customers'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version          '0.3.0'
```
