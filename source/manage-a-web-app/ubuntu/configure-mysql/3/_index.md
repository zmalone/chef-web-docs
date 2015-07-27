## 3. Install MySQL

Now let's install the MySQL client and service packages. We'll also need to install the `mysql2` Ruby gem before we configure MySQL.

Add the following to <code class="file-path">database.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Configure the mysql2 Ruby gem.
mysql2_chef_gem 'default' do
  action :install
end

# Configure the MySQL client.
mysql_client 'default' do
  action :create
end

# Load the secrets file and the encrypted data bag item that holds the root password.
password_secret = Chef::EncryptedDataBagItem.load_secret(node['awesome_customers']['passwords']['secret_path'])
root_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'sql_server_root_password', password_secret)

# Configure the MySQL service.
mysql_service 'default' do
  initial_root_password root_password_data_bag_item['password']
  action [:create, :start]
end
```

The `mysql2_chef_gem` resource comes from the `mysql2_chef_gem` cookbook.

The other two resources &ndash; `mysql_client` and `mysql_service` &ndash; come from the `mysql` cookbook.

This code also decrypts and uses the MySQL root password. `password_secret` holds the contents of the secret file and `root_password_data_bag_item` holds the encrypted data bag item. The `root_password_data_bag_item['password']` part of the `mysql_service` retrieves the decrypted password and assigns that value to the `initial_root_password` attribute.
