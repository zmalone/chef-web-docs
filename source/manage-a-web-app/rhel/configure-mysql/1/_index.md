## 1. Reference the cookbooks we'll use

We'll load the MySQL cookbooks just like we did the `httpd`, `iptables`, and `selinux` cookbooks. Append two `depends` statements to <code class="file-path">metadata.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/metadata.rb
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
depends 'mysql2_chef_gem', '~> 1.0.1'
depends 'mysql', '~> 6.0.17'
```
