## 3. Install MySQL

Now let's install the MySQL client and service packages. We'll also need to install the `mysql2` Ruby gem before we configure MySQL.

Add the following to <code class="file-path">database.rb</code>.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/database.rb
# Configure the mysql2 Ruby gem.
mysql2_chef_gem 'default' do
  action :install
end

# Configure the MySQL client.
mysql_client 'default' do
  action :create
end

# Configure the MySQL service.
mysql_service 'default' do
  initial_root_password 'learnchef_mysql'
  action [:create, :start]
end
```

The `mysql2_chef_gem` resource comes from the `mysql2_chef_gem` cookbook.

The other two resources &ndash; `mysql_client` and `mysql_service` &ndash; come from the `mysql` cookbook.

### Refactor the MySQL configuration

Here's an opportunity to make things more reusable by separating your policy from your data. The `initial_root_password` attribute in the `mysql_service` resource can be turned into a node attribute.

Add a default node attribute to your attributes file, <code class="file-path">default.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/web_application/attributes/default.rb
default['web_application']['user'] = 'web_admin'
default['web_application']['group'] = 'web_admin'

default['web_application']['name'] = 'customers'
default['web_application']['config'] = 'customers.conf'

default['apache']['docroot_dir'] = '/srv/apache/customers'

default['iptables']['install_rules'] = false

default['mysql']['server_root_password'] = 'learnchef_mysql'
```

Now replace the password with the node attribute.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/database.rb
# Configure the mysql2 Ruby gem.
mysql2_chef_gem 'default' do
  action :install
end

# Configure the MySQL client.
mysql_client 'default' do
  action :create
end

# Configure the MySQL service.
mysql_service 'default' do
  initial_root_password node['mysql']['server_root_password']
  action [:create, :start]
end
```

[WARN] Hard-coding the password is fine for learning purposes. But in practice, you never want to store your password directly in a Chef recipe or attribute file. We'll show you a better way in a later tutorial.
