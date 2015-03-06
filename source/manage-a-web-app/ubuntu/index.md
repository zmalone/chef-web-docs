---
title: 'Learn to manage a basic web application on Ubuntu'
layout: lesson-overview
platform: Ubuntu
logo: ubuntu.svg
description: "TBD"
order: 3
---
After completing this lesson, you'll:

* A
* B
* C

LAMP

Application Cookbook Pattern. An application cookbook contains the list of recipes needed to build your application or service.

One challenge we'll encounter is around _dependency management_.

Intro Supermarket

[COMMENT] Remember, when using cookbooks from Chef Supermarket, always evaluate the code to ensure that it does exactly what you expect. It's a common practice to take a copy of a cookbook from Supermarket and modify it to suit your organization's specific requirements. If you find a way to improve a cookbook that others can benefit from, we hope you'll [UPDATE ME: become a contributor](https://supermarket.chef.io/become-a-contributor)!

...it could be a physical machine, cloud instance, or virtual machine &ndash; as long as it has a public IP address, you have root or `sudo` access, have traffic open to ports 22 and 80, and it meets the [system requirements].

## Create Chef repo

```bash
# ~
$ chef generate repo chef-repo --policy-only
Compiling Cookbooks...
Recipe: code_generator::repo
[...]
```

## Create cookbook

```bash
# ~/chef-repo
$ chef generate cookbook cookbooks/myapp
Compiling Cookbooks...
Recipe: code_generator::cookbook
  * directory[/home/user/chef-repo/cookbooks/myapp] action create
    - create new directory /home/user/chef-repo/cookbooks/myapp
[...]
```

## Initialize Berkshelf

```bash
$ hi
```

# Ensure the apt cache is up to date

On Linux, it's a common requirement to ensure that the package manager cache (Ubuntu's built-in package manager is named `apt`) is updated before installing any other packages. This step synchronizes the system's package index to the latest list of what packages are available.

Writing a cookbook is an iterative process. You'll run it multiple times as you experiment, add features, fix problems, and so on. But you don't necessarily want to update the `apt` cache every time you run your cookbook because it can take some time to complete.

That's where the [apt](https://supermarket.chef.io/cookbooks/apt) cookbook on Chef Supermarket comes in. The `apt` cookbook updates the `apt` cache only on the first run, and every 24 hours thereafter. You can modify these defaults if you need to.

## 1. Reference the apt cookbook

The way you load one cookbook from another is to reference it in your cookbook's metadata file, <code class="file-path">metadata.rb</code>. To use the `apt` cookbook, append the line `depends 'apt'` to <code class="file-path">~/chef-repo/cookbooks/myapp/metadata.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/myapp/metadata.rb
name             'myapp'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures myapp'
long_description 'Installs/Configures myapp'
version          '0.1.0'

depends 'apt'
```

[COMMENT] You can also [specify the version](https://docs.chef.io/config_rb_metadata.html) of the cookbook you want to use. But for this project, we'll omit the version and just use the latest.

## 2. Run the apt cookbook's default recipe

The `apt` cookbook's default recipe does everything we need to ensure the `apt` cache is up to date. To run this recipe, add the following to your cookbook's default recipe, <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/default.rb
include_recipe 'apt::default'
```

[COMMENT] Remember, order matters when you write a recipe. That's why we'll always ensure that this recipe runs before everything else.

# Create an application user

It's a common practice to run your applications and services under a user that has just enough access to modify the system, and not as the root user. So let's create a recipe that creates the `myapp` user, who belongs to the `myapp` group.

## 1. Create the user recipe

First, create a recipe to define the `myapp` user and group.

```bash
# ~/chef-repo
$ chef generate recipe cookbooks/myapp user
Compiling Cookbooks...
Recipe: code_generator::recipe
[...]
```

## 2. Set the user's data attributes

Now let's define the `myapp` user. To do so, we'll use the `group` and `user` resources. One way to define the `myapp` user is like this (don't add this code just yet.)

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/user.rb
group 'myapp'

user 'myapp' do
  group 'myapp'
  system true
  shell '/bin/bash'
end
```

One problem with this approach is that if you ever want to change the user name or group, you'll have to do it in at least 3 places (in this recipe and any other recipes that reference these names).

To keep things more manageable, it's a common practice to separate the logic of your recipe from its data and define that data in one place. To do that, we'll use attributes.

### Create attributes file

In [Manage a node](/manage-a-node/ubuntu/), you learned about some of the built-in node attributes that Chef provides, such as the node's IP address. You can also define your own custom attributes that are specific to your [problem].

Run the following to create an attributes file named <code class="file-path">default.rb</code>.

```bash
# ~/chef-repo
$ chef generate attribute cookbooks/myapp default
Compiling Cookbooks...
Recipe: code_generator::attribute
  * directory[cookbooks/myapp/attributes] action create
    - create new directory cookbooks/myapp/attributes
  * template[cookbooks/myapp/attributes/default.rb] action create
    - create new file cookbooks/myapp/attributes/default.rb
    - update content in file cookbooks/myapp/attributes/default.rb from none to e3b0c4
    (diff output suppressed by config)
```

Add the following to <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/myapp/attributes/default.rb
default['myapp']['user'] = 'myapp'
default['myapp']['group'] = 'myapp'
```

## 3. Write the user recipe

Now that we've defined our attributes, let's write the `user` recipe. Add the following to <code class="file-path">user.rb</code>.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/user.rb
group node['myapp']['group']

user node['myapp']['user'] do
  group node['myapp']['group']
  system true
  shell '/bin/bash'
end
```

Note that we use `default['myapp']['user']` to define the attribute in the attributes file and `node['myapp']['user']` to reference it in the recipe.

[COMMENT] One advantage to this approach is that you can now reuse this recipe in another cookbook &nbsp; all you need to do is override the `node['myapp']['user']` and `node['myapp']['user']` attributes in your cookbook.

## 4. Set the user recipe to run

To run the `user` recipe, append an `include_recipe` line to your cookbook's default recipe, just like you did for the `apt` cookbook's default recipe. Make the entire default recipe look like this.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/default.rb
include_recipe 'apt::default'
include_recipe 'myapp::user'
```

# Configure Apache

Now let's configure Apache. Here you'll install the Apache package, start its service, create and enable our custom site, and create a default home page for our site.

In [Learn the basics](/learn-the-basics/ubuntu) and [Manage a node](/manage-a-node/ubuntu/), you wrote a basic Apache cookbook from scratch. For this project, we want to leverage additional Apache features, which would take some work to set up. So let's use the `apache2` cookbook from Chef Supermarket so we don't have to reinvent the wheel.

## 1. Reference the apache2 cookbook

We'll load the `apache2` cookbook just like we did the `apt` cookbook. Append the line `depends 'apache2'` to <code class="file-path">metadata.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/myapp/metadata.rb
name             'myapp'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures myapp'
long_description 'Installs/Configures myapp'
version          '0.1.0'

depends 'apt'
depends 'apache2'
```

## 2. Write the basic webserver recipe

Remember, our goals for this part are to:

* install the Apache package and start & enable its service.
* create and enable our custom site.
* create a default home page for our site.

The first step is to create the recipe file, <code class="file-path">webserver.rb</code>. Run the following command to generate it.

```bash
$ chef generate recipe cookbooks/myapp webserver
Compiling Cookbooks...
Recipe: code_generator::recipe
[...]
```

Because we're not yet set up to run PHP code, our initial home page will be a plain HTML file that serves as a placeholder. Earlier we set up a user, `myapp`, that will have access to the site's content. We'll configure the file so that the `myapp` has read and write access, and everyone else has read-only access.

The `apache2` cookbook's default recipe takes care of installing the package and configuring its service for us. For the second part, we'll use the `web_app` resource, which is a custom resource type that's provided by the `apache2` cookbook. For the third part, we'll use the `file` resource that you're already familiar with.

Earlier we discussed how it's a good practice to separate your logic from your data. But it's not a bad idea to start by combining your logic and your data to define the exact behavior that you want. Then you can go back and refactor it to be more reusable.

Here's what our basic recipe might look like. Don't write any code yet &ndash; we'll do that shortly.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/webserver.rb
# install apache and configure its service
include_recipe 'apache2::default'

# create and enable our custom site
web_app 'myapp' do
  template 'myapp.conf'
end

# create document root
directory '/srv/apache/myapp/' do
  recursive true
end

# write a default home page
file '/srv/apache/myapp/index.html' do
  content 'This is a placeholder'
  mode '0644'
  owner 'myapp'
  group 'myapp'
end
```

## 3. Refactor the webserver recipe

To make this recipe more manageable and reusable, we can factor out these parts:

* the name of the web app.
* the name of the configuration file.
* the location of the default home page.
* the owner and group name of the home page.

Let's go back to our attributes file, <code class="file-path">default.rb</code>, and create a few custom attributes to describe these parts.

We've already defined the user name and group for our site's content. The `apache2` cookbook already defines an attribute named `node['apache']['docroot_dir']` that describes the document root, so all we have to do is override it. We'll need to also define our site's name and the name of its configuration file.

Modify <code class="file-path">default.rb</code> like this.

```ruby
# ~/chef-repo/cookbooks/myapp/attributes/default.rb
default['myapp']['user'] = 'myapp'
default['myapp']['group'] = 'myapp'

default['myapp']['name'] = 'myapp'
default['myapp']['config'] = 'myapp.conf'

default['apache']['docroot_dir'] = '/srv/apache/myapp'
```

Now we have values to use in our recipe. Write out the recipe for our web server like this.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/webserver.rb
# install apache and configure its service
include_recipe 'apache2::default'

# create and enable our custom site
web_app node['myapp']['name'] do
  template "#{node['myapp']['config']}.erb"
end

# create document root
directory node['apache']['docroot_dir'] do
  recursive true
end

# write a default home page
file "#{node['apache']['docroot_dir']}/index.html" do
  content 'This is a placeholder'
  mode '0644'
  owner node['myapp']['user']
  group node['myapp']['group']
end
```

[RUBY] The double quotes in this recipe specifies that _string interpolation_ should be performed. String interpolation enables you to replace placeholders within a string with the values they represent. Placeholders can be variables or any block of Ruby code.

## 4. Create the configuration file

In our recipe we referenced our site's configuration file. Now we need to define it. We'll do that by creating a Chef template so we can provide placeholders that are filled in with our custom node attributes when the recipe runs.

First, run this command to create our template file, <code class="file-path">myapp.conf.erb</code>.

```bash
# ~/chef-repo
$ chef generate template cookbooks/myapp myapp.conf
Compiling Cookbooks...
Recipe: code_generator::template
  * directory[cookbooks/myapp/templates/default] action create
    - create new directory cookbooks/myapp/templates/default
[...]
```

Add this to <code class="file-path">myapp.conf.erb</code>.

```conf
# myface/templates/default/apache2.conf.erb

# Managed by Chef for <%= node['hostname'] %>
<VirtualHost *:80>
        ServerAdmin <%= node['apache']['contact'] %>

        DocumentRoot <%= node['apache']['docroot_dir'] %>
        <Directory />
                Options FollowSymLinks
                AllowOverride None
        </Directory>
        <Directory <%= node['apache']['docroot_dir'] %>>
                Options Indexes FollowSymLinks MultiViews
                AllowOverride None
                Order allow,deny
                allow from all
        </Directory>

        ErrorLog <%= node['apache']['log_dir'] %>/error.log

        LogLevel warn

        CustomLog <%= node['apache']['log_dir'] %>/access.log combined
        ServerSignature Off
</VirtualHost>
```

The configuration file uses these node attributes:

| Attribute                                                            | Source    | Description | Value |
|---------------------------------------------------------------------:|-----------|-------------|---------------|
| <code style="white-space:nowrap">node['hostname']</code>             | built-in  | the node's host name. | N/A |
| <code style="white-space:nowrap">node['apache']['contact']</code>    | `apache2` | value for the `ServerAdmin` directive. | ops@example.com |
| <code style="white-space:nowrap">node['myapp']['docroot_dir']</code> | `apache2` | the site's document root | <code class="file-path">/srv/apache/myapp</code> |
| <code style="white-space:nowrap">node['apache']['log_dir']</code>    | `apache2` | location for Apache logs | <code class="file-path">/var/log/apache2</code> |

The configuration file uses the built-in or default values for each of these except for `node['myapp']['docroot_dir']`. We override from the default value of <code class="file-path">/var/www/html</code> to <code class="file-path">/srv/apache/myapp</code> in our attributes file.

## 5. Enable inbound traffic to your web site

Depending on how your server is configured, it may be necessary to open port 80 (HTTP) to incoming traffic. Let's make sure that port 80 is open by configuring the firewall rules.

The easiest way to set our firewall rule is to use the [firewall](https://supermarket.chef.io/cookbooks/firewall) cookbook from Chef Supermarket.

First, modify <code class="file-path">metadata.rb</code> to load the `firewall` cookbook.

```ruby
# ~/chef-repo/cookbooks/myapp/metadata.rb
name             'myapp'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures myapp'
long_description 'Installs/Configures myapp'
version          '0.1.0'

depends 'apt'
depends 'apache2'
depends 'firewall'
```

Now edit <code class="file-path">webserver.rb</code> to use the `firewall_rule` resource, which is provided by the `firewall` cookbook, to open port 80 to incoming traffic.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/webserver.rb
# install apache and configure its service
include_recipe 'apache2::default'

# create and enable our custom site
web_app node['myapp']['name'] do
  template "#{node['myapp']['config']}.erb"
end

# create document root
directory node['apache']['docroot_dir'] do
  recursive true
end

# write a default home page
file "#{node['apache']['docroot_dir']}/index.html" do
  content 'This is a placeholder'
  mode '0644'
  owner node['myapp']['user']
  group node['myapp']['group']
end

# open port 80 to incoming traffic
firewall_rule 'http' do
  port 80
  protocol :tcp
  action :allow
end
```

## 6. Set the webserver recipe to run

To run the `webserver` recipe, append an `include_recipe` line to your cookbook's default recipe, just like you did for the `apt` cookbook's default recipe and your `user` recipe. Make the entire default recipe look like this.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/default.rb
include_recipe 'apt::default'
include_recipe 'myapp::user'
include_recipe 'myapp::webserver'
```

### TEST

### TEST

```bash
$ getent passwd myapp
myapp:x:497:501::/home/myapp:/bin/bash
```

```
sudo /sbin/service httpd status

cat /srv/apache/myface/index.html"
Welcome to MyFace!

browser
```

## Verify your configuration

### 1. Upload your cookbook to the Chef server

```bash
# ~/chef-repo/cookbooks/myapp
$ berks upload
Uploaded apache2 (3.0.1) to: 'https://api.opscode.com:443/organizations/tpetchel-mar15'
Uploaded apt (2.6.1) to: 'https://api.opscode.com:443/organizations/tpetchel-mar15'
Uploaded firewall (0.11.8) to: 'https://api.opscode.com:443/organizations/tpetchel-mar15'
Uploaded iptables (0.14.1) to: 'https://api.opscode.com:443/organizations/tpetchel-mar15'
Uploaded logrotate (1.8.0) to: 'https://api.opscode.com:443/organizations/tpetchel-mar15'
Uploaded myapp (0.1.0) to: 'https://api.opscode.com:443/organizations/tpetchel-mar15'
```

### 2. Get a node to bootstrap

In [Manage a node](/manage-a-node/ubuntu/), you bootstrapped a node that we provided. Now it's time to bootstrap a server that you own to give you experience working with your own infrastructure.

Chef provides ways to provision a node and bootstrap it all in one step &ndash; we'll cover this in a later tutorial. For learning purposes, it's best to start by bringing up your own node and bootstrapping it separately.

Your node can be a physical machine, virtual machine, or cloud instance, as long as it meets the following requirements:

* it has a public IP address.
* you have root or `sudo` access.
* you can log in using a user name and password or key-based authentication.
* it meets the [system requirements](https://docs.chef.io/chef_system_requirements.html) for running `chef-client`.
* it allows inbound traffic on ports 22 (SSH) and 80 (HTTP).

In production, we recommend using key-based authentication instead of a user name and password. But for learning purposes a user name and password work just fine.

[TIP] If you're unable to bring up a node to bootstrap, feel free to use another Ubuntu instance that we provide. <%= partial 'layouts/provisioner', locals: { title: 'Ubuntu', type: 'ubuntu-fundamentals' } %>

### 3. Bootstrap your node

Here are three options for bootstrapping your node.

#### Option 1: Use a user name and password

This is what we did in [Manage a node](/manage-a-node/ubuntu/). From your workstation, run this command to bootstrap your node. Replace <code>{{address}}</code> with your remote node's external address, <code>{{user}}</code> with your username, and <code>{{password}}</code> with your password.

```bash
# ~/chef-repo
$ knife bootstrap {address} --ssh-user {user} --ssh-password '{password}' --sudo --use-sudo-password --node-name web_app_ubuntu --run-list 'recipe[myapp]'
```

#### Option 2: Use key-based authentication

This option is common when bootstrapping Amazon EC2 instances, where you have an identify file, but not necessarily a user name and password.

```bash
$ knife bootstrap 52.10.205.36 --ssh-user {{user}} --sudo --identity-file {{identity-file}}  --node-name web_app_ubuntu --run-list 'recipe[myapp]'
```

The `--identity-file` option specifies the SSH identity file used for authentication. Replace {{identity-file}} with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>

#### Option 3: Use an existing node

If you have an existing node that you've already bootstrapped, you can simply update its run-list.

[SHOW HOW]

### 4. Verify your node successfully bootstrapped

Run this command to verify that your node successfully bootstrapped.

```bash
$ knife node list | grep lamp1
lamp1
```

### Verify things

```bash
$ yup
```

## Configure MySQL

```ruby
# ~/chef-repo/cookbooks/myapp/metadata.rb
depends 'apt'
depends 'apache2'
depends 'mysql2_chef_gem'
depends 'database'
depends 'mysql'
```

```bash
$ chef generate recipe myapp database
```

```ruby
# ~/chef-repo/cookbooks/myapp/attributes/default.rb
[...]

default['mysql']['server_root_password'] = 'learnchef'

default['myapp']['database']['host'] = '127.0.0.1'
default['myapp']['database']['username'] = 'root'
default['myapp']['database']['password'] = node['mysql']['server_root_password']
```

[COMMENT] In practice, you never want to store your password in a source file. We'll show you a better way in a later tutorial.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/database.rb
mysql2_chef_gem 'default' do
  action :install
end

mysql_client 'default' do
  action :create
end

# Configure MySQL service
mysql_service 'default' do
  initial_root_password 'learnchef'
  action [:create, :start]
end

# Create the database instance
mysql_database node['myapp']['database']['dbname'] do
  connection({
    :host => node['myapp']['database']['host'],
    :username => node['myapp']['database']['username'],
    :password => node['myapp']['database']['password']
  })
  action :create
end

mysql_database_user node['myapp']['database']['app']['username'] do
  connection(
    :host => node['myapp']['database']['host'],
    :username => node['myapp']['database']['username'],
    :password => node['myapp']['database']['password']
  )
  password node['myapp']['database']['app']['password']
  database_name node['myapp']['database']['dbname']
  host node['myapp']['database']['host']
  action [:create, :grant]
end

# Write schema seed file to filesystem
cookbook_file node['myapp']['database']['seed_file'] do
  source 'myapp-create.sql'
  owner 'root'
  group 'root'
  mode '0600'
end

# Seed database with test data
execute 'initialize database' do
  command "mysql -h #{node['myapp']['database']['host']} -u #{node['myapp']['dat
abase']['app']['username']} -p#{node['myapp']['database']['app']['password']} -D
 #{node['myapp']['database']['dbname']} < #{node['myapp']['database']['seed_file
']}"
  not_if  "mysql -h #{node['myapp']['database']['host']} -u #{node['myapp']['dat
abase']['app']['username']} -p#{node['myapp']['database']['app']['password']} -D
 #{node['myapp']['database']['dbname']} -e 'describe customers;'"
end
```

```bash
# ~/chef-repo
$ chef generate file cookbooks/myapp create-tables.sql
Compiling Cookbooks...
Recipe: code_generator::cookbook_file
  * directory[cookbooks/myapp/files/default] action create
    - create new directory cookbooks/myapp/files/default
  * template[cookbooks/myapp/files/default/create-tables.sql] action create
    - create new file cookbooks/myapp/files/default/create-tables.sql
    - update content in file cookbooks/myapp/files/default/create-tables.sql from none to e3b0c4
    (diff output suppressed by config)
thomaspetchel@ubuntu:~/chef-repo$ chef generate file cookbooks/myapp create-test-data.sql
Compiling Cookbooks...
Recipe: code_generator::cookbook_file
  * directory[cookbooks/myapp/files/default] action create (up to date)
  * template[cookbooks/myapp/files/default/create-test-data.sql] action create
    - create new file cookbooks/myapp/files/default/create-test-data.sql
    - update content in file cookbooks/myapp/files/default/create-test-data.sql from none to e3b0c4
    (diff output suppressed by config)
```

```sql
# ~/chef-repo/cookbooks/myapp/files/default/create-tables.sql
CREATE TABLE customers(
 id CHAR (32) NOT NULL,
 PRIMARY KEY(id),
 first_name VARCHAR(64),
 last_name VARCHAR(64),
 email VARCHAR(64)
);
```

```sql
# ~/chef-repo/cookbooks/myapp/files/default/create-test-data.sql
INSERT INTO customers ( id, first_name, last_name, email ) VALUES ( uuid(), 'Jane', 'Smith', 'jane.smith@example.com' );
INSERT INTO customers ( id, first_name, last_name, email ) VALUES ( uuid(), 'David', 'Richardson', 'drichards@example.com' );
```

```
# Write schema seed file to filesystem
cookbook_file node['myapp']['database']['seed_file'] do
  source 'myapp-create.sql'
  owner 'root'
  group 'root'
  mode '0600'
end
```

## Test your configuration

### Update Berkshelf

```bash
$ hi
```

### Upload cookbooks to Chef server

```bash
$ hello
```

### Converge the node

```bash
$ here's how
```

(if already bootstrapped, here's how to modify the run-list...)

### Verify things

Verify that the mysqld service is running on your vagrant guest by running the following command on Mac OS X/Linux:

```bash
$ sudo /sbin/service mysqld status
mysqld (pid  8525) is running...
```

Also check that MySQL is enabled to start on boot on Mac OS X/Linux:

```bash
$ sudo /sbin/chkconfig --list | grep mysqld"
mysqld         	0:off	1:off	2:on	3:on	4:on	5:on	6:off
```

If the service is set to be activated at runlevels 3 and 5, then MySQL is enabled to run under full multi-user text mode and full multi-user graphical mode, which is exactly the desired behavior.

Run mysqlshow on your vagrant guest to display database information, verifying that the myface database was created on Mac OS X/Linux:

```bash
mysqlshow -uroot -prootpass"
+--------------------+
|     Databases      |
+--------------------+
| information_schema |
| myface             |
| mysql              |
| test               |
+--------------------+
```

Note that myface is listed as a database name - success!

Check to see if the myface-app user is enabled as a local user by running the following mysql command on Mac OS X/Linux:

```bash
mysql -uroot -prootpass -e "select user,host from mysql.user;"
+------------+------------------+
| user       | host             |
+------------+------------------+
| repl       | %                |
| root       | 127.0.0.1        |
|            | localhost        |
| myface_app | localhost        |
| root       | localhost        |
|            | myface-berkshelf |
+------------+------------------+
```

As you can see above, the myface_app@localhost user exists, so our cookbook did what was expected.

Also check to see that the myface_app user only has rights on the myface databse on Mac OS X/Linux:

```bash
mysql -uroot -prootpass -e "show grants for 'myface_app'@'localhost';"'
Grants for myface_app@localhost
GRANT USAGE ON *.* TO 'myface_app'@'localhost' IDENTIFIED BY PASSWORD '*90BA3AC0BFDE07AE334CA523CB27167AE33825B9'
GRANT ALL PRIVILEGES ON `myface`.* TO 'myface_app'@'localhost'
```

Run the following mysql command to dump the contents of the users table on Mac OS X/Linux:

```bash
$ mysql -hlocalhost -umyface_app -psupersecret -Dmyface -e "select id,user_name from users;"
id                                  user_name
216e03c2-ffe4-11e2-b1ad-080027c8	jtimberman
216e0890-ffe4-11e2-b1ad-080027c8	someara
216e0bce-ffe4-11e2-b1ad-080027c8	jwinsor
216e0eda-ffe4-11e2-b1ad-080027c8	cjohnson
216e11e6-ffe4-11e2-b1ad-080027c8	mbower
```

The output should look similar to what you see above - the data from the INSERT INTO statemens in the SQL script.

## Configure PHP

```ruby
# ~/chef-repo/cookbooks/myapp/attributes/default.rb
default['myapp']['user'] = 'myapp'
default['myapp']['group'] = 'myapp'

default['apache']['default_site_enabled'] = true
default['apache']['docroot_dir'] = '/srv/apache/myapp'
default['apache']['mpm'] = 'prefork'

default['myface']['user'] = 'myface'
default['myface']['group'] = 'myface'
default['myface']['name'] = 'myface'
default['myface']['config'] = 'myface.conf'
# default['myface']['document_root'] = '/srv/apache/myface'
```

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/webserver.rb
include_recipe 'apache2::default'
include_recipe 'apache2::mod_php5'

package 'php5-mysql' do
  action :install
  notifies :restart, 'service[apache2]'
end

# disable default site
apache_site '000-default' do
  enable false
end

web_app 'myapp' do
  template 'apache2.conf.erb'
  docroot node['myapp']['document_root']
end

# write site
template "#{node['apache']['docroot_dir']}/index.php" do
  source 'index.php.erb'
  mode '0644'
end
```

```ruby
# ~/chef-repo/cookbooks/myapp/metadata.rb
[...]
depends 'php'
```


```bash
# ~/chef-repo
$ chef generate template cookbooks/myapp index.php
Compiling Cookbooks...
Recipe: code_generator::template
  * directory[cookbooks/myapp/templates/default] action create
    - create new directory cookbooks/myapp/templates/default
  * template[cookbooks/myapp/templates/default/index.php.erb] action create
    - create new file cookbooks/myapp/templates/default/index.php.erb
    - update content in file cookbooks/myapp/templates/default/index.php.erb from none to e3b0c4
    (diff output suppressed by config)
```

```html
# ~/chef-repo/cookbooks/myapp/templates/default/index.php.erb
<?php echo "Hello PHP World, 2+2 is " . (2+2); ?>
Text outside code block is printed normally to web page.
<br>
<?php
    /* database.php - Use mysql database from php
     * (c) 200309 Tero.Karvinen <at-sign> iki.fi, adapted from php.net
     * See http://iki.fi/karvinen Linux Apache MySQL PHP tutorial. */

    print "<%= node['myapp']['database']['app']['password'] %>";

    /* Connect to database */
    $link = mysql_connect("127.0.0.1", "myapp_app", "<%= node['myapp']['database
']['app']['password'] %>")
        or die("Could not connect : " . mysql_error());
    print "Connected successfully";
    mysql_select_db("myapp") or die("Could not select database");

    /* Perform SQL query */
    $query = "SELECT * FROM customers";
    $result = mysql_query($query)
	or die("Query failed : " . mysql_error());

    /* Print results in HTML */
    print "<table>\n";
    while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
        print "\t<tr>\n";
        foreach ($line as $col_value) {
            print "\t\t<td>$col_value</td>\n";
        }
        print "\t</tr>\n";
    }
    print "</table>\n";
    mysql_free_result($result);

    /* Close connection */
    mysql_close($link);
?>
```

```conf
# myface/templates/default/apache2.conf.erb
# Managed by Chef for <%= node['hostname'] %>
<VirtualHost *:80>
        ServerAdmin <%= node['apache']['contact'] %>

        DocumentRoot <%= node['myface']['document_root'] %>
        <Directory />
                Options FollowSymLinks
                AllowOverride None
        </Directory>
        <Directory <%= node['myface']['document_root'] %>>
                Options Indexes FollowSymLinks MultiViews
                AllowOverride None
                Order allow,deny
                allow from all
        </Directory>

        ErrorLog <%= node['apache']['log_dir'] %>/error.log

        LogLevel warn

        CustomLog <%= node['apache']['log_dir'] %>/access.log combined
        ServerSignature Off
</VirtualHost>
```

-- --

```bash
mysql -uroot -plearnchef -h 127.0.0.1
```

```bash
$ mysqlshow -uroot -plearnchef -h 127.0.0.1
+--------------------+
|     Databases      |
+--------------------+
| information_schema |
| myapp              |
| mysql              |
| performance_schema |
+--------------------+
```

```ruby
mysql_database_user node['myapp']['database']['app']['username'] do
  connection(
    :host => node['myapp']['database']['host'],
    :username => node['myapp']['database']['username'],
    :password => node['myapp']['database']['password']
  )
  password node['myapp']['database']['app']['password']
  database_name node['myapp']['database']['dbname']
  host node['myapp']['database']['host']
  action [:create, :grant]
end
```

```bash
$ mysql -uroot -plearnchef -h 127.0.0.1 -e "show grants for 'myapp_app'@'127.0.0.1';"
+------------------------------------------------------------------------------------------------------------------+
| Grants for myapp_app@127.0.0.1                                                                                   |
+------------------------------------------------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO 'myapp_app'@'127.0.0.1' IDENTIFIED BY PASSWORD '*1B438F10E5B3722EE485F67EAC843B1CA77E0543' |
| GRANT ALL PRIVILEGES ON `myapp`.* TO 'myapp_app'@'127.0.0.1'                                                     |
+------------------------------------------------------------------------------------------------------------------+
```

# Managed by Chef for <%= node['hostname'] %>
<VirtualHost *:80>
        ServerAdmin <%= node['apache']['contact'] %>

        DocumentRoot <%= node['myapp']['document_root'] %>
        <Directory />
                Options FollowSymLinks
                AllowOverride None
        </Directory>
        <Directory <%= node['myapp']['document_root'] %>>
                Options Indexes FollowSymLinks MultiViews
                AllowOverride None
                Order allow,deny
                allow from all
        </Directory>

        ErrorLog <%= node['apache']['log_dir'] %>/error.log

        LogLevel warn

        CustomLog <%= node['apache']['log_dir'] %>/access.log combined
        ServerSignature Off
</VirtualHost>

## Summary

Credit: This tutorial was adapted from http://misheska.com/blog/2013/06/23/getting-started-writing-chef-cookbooks-the-berkshelf-way-part2/

[iptables]: http://en.wikipedia.org/wiki/Iptables
