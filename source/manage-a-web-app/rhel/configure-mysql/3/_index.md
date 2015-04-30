## 3. Create an encrypted data bag item for the MySQL root password

Before we install MySQL, let's create an encrypted data bag item to hold the initial root password. We'll add code that decrypts this password in the `database` recipe in the next step.

First create a file named <code class="file-path">sql\_server\_root\_password.json</code> in the <code class="file-path">data\_bags/passwords</code> directory and add these contents.

```ruby
# ~/chef-repo/data_bags/passwords/sql_server_root_password.json
{
  "id": "sql_server_root_password",
  "password": "learnchef_mysql"
}
```

Now run this command to encrypt the data bag item and upload it to the Chef server.

```bash
# ~/chef-repo
$ knife data bag from file passwords sql_server_root_password.json --secret-file /tmp/encrypted_data_bag_secret
Updated data_bag_item[passwords::sql_server_root_password]
```

Verify that you can successfully decrypt the data bag item.

```bash
$ knife data bag show passwords sql_server_root_password --secret-file /tmp/encrypted_data_bag_secret
id:       sql_server_root_password
password: learnchef_mysql
```

Let's also set a node attribute that points to the location of the secret key file on your node. The `database` recipe will need this path name to perform the decryption.

Add a default node attribute to your attributes file, <code class="file-path">default.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/web_application/attributes/default.rb
default['web_application']['user'] = 'web_admin'
default['web_application']['group'] = 'web_admin'

default['web_application']['name'] = 'customers'
default['web_application']['config'] = 'customers.conf'

default['apache']['docroot_dir'] = '/srv/apache/customers'

default['iptables']['install_rules'] = false

default['web_application']['passwords']['secret_path'] = '/etc/chef/encrypted_data_bag_secret'
```

<code class="file-path">/etc/chef/encrypted\_data\_bag\_secret</code> is the location on your node where you copied your secret file to in the previous lesson.
