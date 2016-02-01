## 1. Reference the iptables cookbook

First, modify <code class="file-path">metadata.rb</code> to load the `iptables` cookbook.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/metadata.rb
name             'awesome_customers'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version          '0.1.0'

depends 'httpd', '~> 0.2.18'
depends 'selinux', '~> 0.9.0'
depends 'iptables', '~> 1.0.0'
```
