## 1. Reference the database cookbook

Like you did before, append a `depends` statement for the `database` cookbook to <code class="file-path">metadata.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/web_application/metadata.rb
name             'web_application'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures web_application'
long_description 'Installs/Configures web_application'
version          '0.1.0'

depends 'apache2', '~> 3.0.1'
depends 'iptables', '~> 0.14.1'
depends 'selinux', '~> 0.9.0'
depends 'mysql2_chef_gem', '~> 1.0.1'
depends 'mysql', '~> 6.0.17'
depends 'database', '~> 4.0.3'
```
