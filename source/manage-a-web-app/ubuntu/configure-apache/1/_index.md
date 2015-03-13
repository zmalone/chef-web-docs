## 1. Reference the apache2 cookbook

We'll load the `apache2` cookbook just like we did the `apt` cookbook. Append the line `depends 'apache2', '~> 3.0.1'` to <code class="file-path">metadata.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/web_application/metadata.rb
name             'web_application'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures web_application'
long_description 'Installs/Configures web_application'
version          '0.1.0'

depends 'apt', '~> 2.6.1'
depends 'apache2', '~> 3.0.1'
```
