## 1. Increment the cookbook's version

Like before, we'll follow the Semantic Versioning scheme and increment our cookbook's version number.

Modify the `version` field in <code class="file-path">metadata.rb</code> from '0.2.0' to '0.3.0', like this.

```bash
# ~/chef-repo/cookbooks/web_application/metadata.rb
name             'web_application'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures web_application'
long_description 'Installs/Configures web_application'
version          '0.3.0'
```
