## 7. Store the location of the data bag key file

Let's also set a node attribute that points to the location of the secret key file on your node. The `database` recipe will need this path name to perform the decryption.

Add a default node attribute to your attributes file, <code class="file-path">default.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/attributes/default.rb
default['awesome_customers']['user'] = 'web_admin'
default['awesome_customers']['group'] = 'web_admin'

default['awesome_customers']['document_root'] = '/var/www/customers/public_html'

default['firewall']['allow_ssh'] = true

default['awesome_customers']['passwords']['secret_path'] = '/etc/chef/encrypted_data_bag_secret'
```

<code class="file-path">/etc/chef/encrypted\_data\_bag\_secret</code> is the location of the secret file on your node.
