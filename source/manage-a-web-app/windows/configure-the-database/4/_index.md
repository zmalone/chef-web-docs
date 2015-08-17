## 4. Create a database table and some sample data

Now the database is set up, along with a user to manage it. Next, let's create a database table along with some sample data.

We'll create a MySQL script that defines the table and our sample data, and then invoke that script from your recipe.

Start by running the following `chef generate` command to create a file that will hold the script.

```bash
# ~/chef-repo
$ chef generate file cookbooks/awesome_customers create-tables.sql
Compiling Cookbooks...
Recipe: code_generator::cookbook_file
  * directory[cookbooks/awesome_customers/files/default] action create
    - create new directory cookbooks/awesome_customers/files/default
  * template[cookbooks/awesome_customers/files/default/create-tables.sql] action create
    - create new file cookbooks/awesome_customers/files/default/create-tables.sql
    - update content in file cookbooks/awesome_customers/files/default/create-tables.sql from none to e3b0c4
    (diff output suppressed by config)
```

Now modify <code class="file-path">create-tables.sql</code> like this.

```sql
-- ~/chef-repo/cookbooks/awesome_customers/files/default/create-tables.sql

CREATE TABLE customers(
  id CHAR (32) NOT NULL,
  PRIMARY KEY(id),
  first_name VARCHAR(64),
  last_name VARCHAR(64),
  email VARCHAR(64)
);

INSERT INTO customers ( id, first_name, last_name, email ) VALUES ( uuid(), 'Jane', 'Smith', 'jane.smith@example.com' );
INSERT INTO customers ( id, first_name, last_name, email ) VALUES ( uuid(), 'Dave', 'Richards', 'dave.richards@example.com' );
```

We'll use the built-in [cookbook_file](https://docs.chef.io/resource_cookbook_file.html) resource to copy your SQL script to a temporary directory. Don't write any code yet &ndash; just follow along.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Write schema seed file to filesystem.
cookbook_file '/tmp/create-tables.sql' do
  source 'create-tables.sql'
  owner 'root'
  group 'root'
  mode '0600'
end
```

Previously, you used the `file` resource to set up a file. When you used the `file` resource, you specified the contents of the file directly in your recipe. The `cookbook_file` resource transfers an external file in your cookbook to a destination on your node.

We'll use the `execute` resource to run the script, like this (don't add this code quite yet.)

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Seed the database with a table and test data.
execute 'initialize database' do
  command "mysql -h 127.0.0.1 -u db_admin -pcustomers_password -D products < /tmp/create-tables.sql"
  not_if  "mysql -h 127.0.0.1 -u db_admin -pcustomers_password -D products -e 'describe customers;'"
end
```

No resource type exists that can execute a SQL script. That's why we use the `execute` resource. The `execute` resource enables you to run any arbitrary command.

Remember that Chef takes a test and repair approach to how it keeps your servers in line with your policy. Therefore, you want to be able to run your cookbook as many times as you like and only update the system when necessary.

The `not_if` attribute is an example of a [guard](https://docs.chef.io/resource_common.html#guards). A guard enables you to execute a resource based on a condition. In our case, we don't want to run the script if the `customers` table already exists.

[COMMENT] `not_if` _prevents_ a resource from executing if its result holds true. There's also `only_if`, which executes the resource _only if_ its result holds true.

### Refactor the database table creation

Like we've done before, let's look at how we can factor out the data. In your `cookbook_file` resource, we specified the destination path for your SQL script. Let's create a node attribute to describe it.

Append an attribute to your default attribute file, <code class="file-path">default.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/attributes/default.rb
default['awesome_customers']['user'] = 'web_admin'
default['awesome_customers']['group'] = 'web_admin'

default['awesome_customers']['name'] = 'customers'
default['awesome_customers']['config'] = 'customers.conf'

default['apache']['docroot_dir'] = '/srv/apache/customers'

default['mysql']['server_root_password'] = 'learnchef_mysql'

default['awesome_customers']['database']['dbname'] = 'products'
default['awesome_customers']['database']['host'] = '127.0.0.1'
default['awesome_customers']['database']['username'] = 'root'
default['awesome_customers']['database']['password'] = node['mysql']['server_root_password']

default['awesome_customers']['database']['app']['username'] = 'db_admin'
default['awesome_customers']['database']['app']['password'] = 'customers_password'

default['awesome_customers']['database']['seed_file'] ='/tmp/create-tables.sql'
```

We can also factor out most parts of your `execute` resource, such as the host name, user name, and password. We already have node attributes to describe those, so we're ready to add code to the recipe.

Append the following to your database recipe.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Write schema seed file to filesystem.
cookbook_file node['awesome_customers']['database']['seed_file'] do
  source 'create-tables.sql'
  owner 'root'
  group 'root'
  mode '0600'
end

# Seed the database with a table and test data.
execute 'initialize database' do
  command "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{node['awesome_customers']['database']['app']['password']} -D #{node['awesome_customers']['database']['dbname']} < #{node['awesome_customers']['database']['seed_file']}"
  not_if  "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{node['awesome_customers']['database']['app']['password']} -D #{node['awesome_customers']['database']['dbname']} -e 'describe customers;'"
end
```

The entire recipe looks like this.

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

# Configure the MySQL service.
mysql_service 'default' do
  initial_root_password node['mysql']['server_root_password']
  action [:create, :start]
end

# Create the database instance.
mysql_database node['awesome_customers']['database']['dbname'] do
  connection(
    :host => node['awesome_customers']['database']['host'],
    :username => node['awesome_customers']['database']['username'],
    :password => node['awesome_customers']['database']['password']
  )
  action :create
end

# Add a database user.
mysql_database_user node['awesome_customers']['database']['app']['username'] do
  connection(
    :host => node['awesome_customers']['database']['host'],
    :username => node['awesome_customers']['database']['username'],
    :password => node['awesome_customers']['database']['password']
  )
  password node['awesome_customers']['database']['app']['password']
  database_name node['awesome_customers']['database']['dbname']
  host node['awesome_customers']['database']['host']
  action [:create, :grant]
end

# Write schema seed file to filesystem.
cookbook_file node['awesome_customers']['database']['seed_file'] do
  source 'create-tables.sql'
  owner 'root'
  group 'root'
  mode '0600'
end

# Seed the database with a table and test data.
execute 'initialize database' do
  command "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{node['awesome_customers']['database']['app']['password']} -D #{node['awesome_customers']['database']['dbname']} < #{node['awesome_customers']['database']['seed_file']}"
  not_if  "mysql -h #{node['awesome_customers']['database']['host']} -u #{node['awesome_customers']['database']['app']['username']} -p#{node['awesome_customers']['database']['app']['password']} -D #{node['awesome_customers']['database']['dbname']} -e 'describe customers;'"
end
```
