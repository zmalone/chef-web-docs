## 1. Reference the iptables cookbook

First, modify <code class="file-path">metadata.rb</code> to load the `iptables` cookbook.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/metadata.rb
name             'awesome_customers'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version          '0.1.0'

depends 'httpd', '~> 0.2.14'
depends 'iptables', '~> 1.0.0'
```
