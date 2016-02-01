## 3. List the firewall rules in a node attribute

Now modify your default attributes file to list the firewall rules we want to apply.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/attributes/default.rb
default['awesome_customers']['enabled_firewall_rules'] = %w(firewall_http firewall_sshd)
```

The entire file now looks like this.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/attributes/default.rb
default['awesome_customers']['user'] = 'web_admin'
default['awesome_customers']['group'] = 'web_admin'

default['awesome_customers']['document_root'] = '/var/www/customers/public_html'

default['awesome_customers']['enabled_firewall_rules'] = %w(firewall_http firewall_sshd)
```

[RUBY] The `%w` syntax is a shorthand way to create an array of strings without the need to use commas or quotation marks. `%w(firewall_http firewall_sshd)` is the same as `['firewall_http', 'firewall_sshd']`.

Separarting data from our policy can make your cookbooks easier to maintain. You'll see in a later tutorial how using this node attribute enables you to control which nodes apply which firewall rules.
