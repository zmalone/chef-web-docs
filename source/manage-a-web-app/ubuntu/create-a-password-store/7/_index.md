## 7. Create a node attribute for your secret file's location

Let's also set a node attribute that points to the location of the secret key file on your node. The `database` recipe will need this path name to perform the decryption.

Add a default node attribute to your attributes file, <code class="file-path">default.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/web_application/attributes/default.rb
default['web_application']['user'] = 'web_admin'
default['web_application']['group'] = 'web_admin'

default['web_application']['name'] = 'customers'
default['web_application']['config'] = 'customers.conf'

default['apache']['docroot_dir'] = '/srv/apache/customers'

default['web_application']['passwords']['secret_path'] = '/tmp/encrypted_data_bag_secret'
```

<code class="file-path">/tmp/encrypted\_data\_bag\_secret</code> is the location on your node where you copied your secret file to.
