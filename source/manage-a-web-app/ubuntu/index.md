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

default['apache']['mpm'] = 'prefork'

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
# install Apache and configure its service
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
# install Apache and configure its service
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
# install Apache and configure its service
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

## Verify your configuration

### 1. Upload your cookbook to the Chef server

```bash
# ~/chef-repo/cookbooks/myapp
$ berks upload
Uploaded apache2 (3.0.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded apt (2.6.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded firewall (0.11.8) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded iptables (0.14.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded logrotate (1.8.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded myapp (0.1.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
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

This is what we did in [Manage a node](/manage-a-node/ubuntu/). From your workstation, run this command to bootstrap your node. Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo
$ knife bootstrap {address} --ssh-user {user} --ssh-password '{password}' --sudo --use-sudo-password --node-name web_app_ubuntu --run-list 'recipe[myapp]'
```

#### Option 2: Use key-based authentication

This option is common when bootstrapping Amazon EC2 instances, where you have an identify file, but not necessarily a user name and password.

```bash
$ knife bootstrap 52.10.205.36 --ssh-user {{user}} --sudo --identity-file {identity-file}  --node-name web_app_ubuntu --run-list 'recipe[myapp]'
```

The `--identity-file` option specifies the SSH identity file used for authentication. Replace `{identity-file}` with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>

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

Fetch details for user `myapp`.

```bash
# ~
$ getent passwd myapp
myapp:x:999:1001::/home/myapp:/bin/bash
```

Verify that `myuser` owns the default home page.

```bash
$ stat -c "%U %G" /srv/apache/myapp/index.html
myapp myapp
```

Verify the `apache2` service is running.

```bash
# ~
$ sudo service apache2 status
 * apache2 is running
```

Verify that the home page is in the location we expect.

```bash
# ~
$ more /srv/apache/myapp/index.html
This is a placeholder
```

Verify that the web page is being served and is accessible externally.

```bash
# ~
$ curl 52.10.205.36
This is a placeholder
```

# Configure MySQL

Now let's configure MySQL. Here you'll install the MySQL server and client packages, start its service, create a database, and seed it with a table and some sample data.

For this part, we'll use 3 cookbooks from Chef Supermarket &ndash; [mysql2\_chef\_gem](https://supermarket.chef.io/cookbooks/mysql2_chef_gem), [mysql](https://supermarket.chef.io/cookbooks/mysql), and [database](https://supermarket.chef.io/cookbooks/database).

The `mysql2_chef_gem` cookbook installs the `mysql2` Ruby gem that enables our Chef code to communicate with MySQL. A Ruby _gem_ is a library.

The `mysql` cookbook enables us to configure the MySQL server and client packages.

The `database` cookbook enables us to configure our MySQL database instance.

## 1. Reference the cookbooks we'll use

We'll load the database cookbooks just like we did the `apt` and `apache2` cookbooks. Append 3 `depends` statements to <code class="file-path">metadata.rb</code>, making the entire file look like this.

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
depends 'mysql2_chef_gem'
depends 'mysql'
depends 'database'
```

## 2. Create the database recipe

First, create a recipe named <code class="file-path">database.rb</code> to hold our database configuration code.

```bash
# ~/chef-repo
$ chef generate recipe cookbooks/myapp database
Compiling Cookbooks...
Recipe: code_generator::recipe
  * directory[cookbooks/myapp/spec/unit/recipes] action create (up to date)
  * cookbook_file[cookbooks/myapp/spec/spec_helper.rb] action create_if_missing (up to date)
  * template[cookbooks/myapp/spec/unit/recipes/database_spec.rb] action create_if_missing
    - create new file cookbooks/myapp/spec/unit/recipes/database_spec.rb
    - update content in file cookbooks/myapp/spec/unit/recipes/database_spec.rb from none to 6027f9
    (diff output suppressed by config)
  * template[cookbooks/myapp/recipes/database.rb] action create
    - create new file cookbooks/myapp/recipes/database.rb
    - update content in file cookbooks/myapp/recipes/database.rb from none to 97f98b
    (diff output suppressed by config)
```

## 3. Install MySQL

Now let's install the MySQL client and service packages. We'll also need to install the `mysql2` Ruby gem before we configure MySQL.

Add the following to <code class="file-path">database.rb</code>.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/database.rb
# Configure the mysql2 Ruby gem
mysql2_chef_gem 'default' do
  action :install
end

# Configure the MySQL client
mysql_client 'default' do
  action :create
end

# Configure the MySQL service
mysql_service 'default' do
  initial_root_password 'learnchef_mysql'
  action [:create, :start]
end
```

The `mysql2_chef_gem` resource comes from the `mysql2_chef_gem` cookbook. The other two resources &ndash; `mysql_client` and `mysql_service` &ndash; come from the `mysql` cookbook.

### Refactor

Here's an opportunity to make things more reusable by separating our policy from our data. The `initial_root_password` attribute in the `mysql_service` resource can be turned into a node attribute.

Add a default node attribute to our attributes file, <code class="file-path">default.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/myapp/attributes/default.rb
default['myapp']['user'] = 'myapp'
default['myapp']['group'] = 'myapp'

default['myapp']['name'] = 'myapp'
default['myapp']['config'] = 'myapp.conf'

default['apache']['docroot_dir'] = '/srv/apache/myapp'

default['mysql']['server_root_password'] = 'learnchef_mysql'
```

Now replace the password with the node attribute.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/database.rb
# Configure the mysql2 Ruby gem
mysql2_chef_gem 'default' do
  action :install
end

# Configure the MySQL client
mysql_client 'default' do
  action :create
end

# Configure the MySQL service
mysql_service 'default' do
  initial_root_password node['mysql']['server_root_password']
  action [:create, :start]
end
```

[WARN] Hard-coding the password is fine for learning purposes. But in practice, you never want to store your password directly in a Chef recipe or attribute file. We'll show you a better way in a later tutorial.

## 2. Create the database

Now that we have MySQL configured, let's set up the database. We'll name our database `myapp`.

Let's continue the pattern by directly stating the configuration we want, and then going back and factoring our data from our policy.

To set up our database, we'll use the `mysql_database` resource, which comes from the `database` cookbook. The configuration code might look like this.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/database.rb
# Create the database instance
mysql_database 'myapp' do
  connection({
    :host => '127.0.0.1',
    :username => 'root',
    :password => 'learnchef_mysql'
  })
  action :create
end
```

This code configures a database named `myapp`, specifies that user connections are allowed from IP address 127.0.0.1 (localhost), and states that the database's user name is root and provides its password (TODO: Wordy, also should 'root' be our user?)

[WARN] Remember, we're using hard-coding passwords for learning, but it's not a recommended practice!

### Refactor

Let's factor our the data parts so that our recipe is more reusable. We'll factor out the database name and the connection info (host name, user name, and password).

Append the following to your default attributes file, <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/myapp/attributes/default.rb
default['myapp']['database']['dbname'] = 'myapp'
default['myapp']['database']['host'] = '127.0.0.1'
default['myapp']['database']['username'] = 'root'
default['myapp']['database']['password'] = node['mysql']['server_root_password']
```

The entire file looks like this.

```ruby
# ~/chef-repo/cookbooks/myapp/attributes/default.rb
default['myapp']['user'] = 'myapp'
default['myapp']['group'] = 'myapp'

default['myapp']['name'] = 'myapp'
default['myapp']['config'] = 'myapp.conf'

default['apache']['docroot_dir'] = '/srv/apache/myapp'

default['mysql']['server_root_password'] = 'learnchef_mysql'

default['myapp']['database']['dbname'] = 'myapp'
default['myapp']['database']['host'] = '127.0.0.1'
default['myapp']['database']['username'] = 'root'
default['myapp']['database']['password'] = node['mysql']['server_root_password']
```

Replace our hard-coded attribute values with our attributes, like this.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/database.rb
# Create the database instance
mysql_database node['myapp']['database']['dbname'] do
  connection({
    :host => node['myapp']['database']['host'],
    :username => node['myapp']['database']['username'],
    :password => node['myapp']['database']['password']
  })
  action :create
end
```

<code class="file-path">database.rb</code> now looks like this.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/database.rb
# Configure the mysql2 Ruby gem
mysql2_chef_gem 'default' do
  action :install
end

# Configure the MySQL client
mysql_client 'default' do
  action :create
end

# Configure the MySQL service
mysql_service 'default' do
  initial_root_password node['mysql']['server_root_password']
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
```

## 3. Create a MySQL user

Like we did for our default home page, let's assign a user to our database. That way, we'll have a user that has just enough permissions to modify the system. To do so we'll use the `mysql_database_user`, which comes from the `database` cookbook.

Setting up a user named `myapp_db` might look like this. Don't write any code yet &ndash; just follow along.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/database.rb
# Add a database user
mysql_database_user 'myapp_db' do
  connection(
    :host => '127.0.0.1',
    :username => 'root',
    :password => 'learnchef_mysql'
  )
  password 'myapp_replaceme'
  database_name 'myapp'
  host '127.0.0.1'
  action [:create, :grant]
end
```

We already have most of the node attributes we'd need to make this more reusable. The new parts we'll need are the name of the database user and its password.

### Refactor

Append the following to your default attributes file, <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/myapp/attributes/default.rb
default['myapp']['database']['app']['username'] = 'myapp_db'
default['myapp']['database']['app']['password'] = 'myapp_replaceme'
```

The entire file looks like this.

```ruby
# ~/chef-repo/cookbooks/myapp/attributes/default.rb
default['myapp']['user'] = 'myapp'
default['myapp']['group'] = 'myapp'

default['myapp']['name'] = 'myapp'
default['myapp']['config'] = 'myapp.conf'

default['apache']['docroot_dir'] = '/srv/apache/myapp'

default['mysql']['server_root_password'] = 'learnchef_mysql'

default['myapp']['database']['dbname'] = 'myapp'
default['myapp']['database']['host'] = '127.0.0.1'
default['myapp']['database']['username'] = 'root'
default['myapp']['database']['password'] = node['mysql']['server_root_password']

default['myapp']['database']['app']['username'] = 'myapp_db'
default['myapp']['database']['app']['password'] = 'myapp_replaceme'
```

Our resource now looks like this after apply our new node attributes.

```ruby
# ~/chef-repo/cookbooks/myapp/attributes/default.rb
# Add a database user
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

Append this `mysql_database_user` resource to our database recipe, making the entire file look like this.

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

# Add a database user
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

## 4. Create a table and some sample data

Now we have the database set up, along with a user to manage it. Now let's create a database table along with some sample data to test with.

To do so, we'll create a MySQL script that defines the table and our sample data, and then invoke that script from our recipe.

Start by running the following `chef generate` command to create a file that will hold our script.

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
```

Now modify <code class="file-path">create-tables.sql</code> like this.

TODO: Not putting the newline strips the word "CREATE" from the output

```sql
-- ~/chef-repo/cookbooks/myapp/files/default/create-tables.sql

CREATE TABLE customers(
  id CHAR (32) NOT NULL,
  PRIMARY KEY(id),
  first_name VARCHAR(64),
  last_name VARCHAR(64),
  email VARCHAR(64)
);

INSERT INTO customers ( id, first_name, last_name, email ) VALUES ( uuid(), 'Jane', 'Smith', 'jane.smith@example.com' );
INSERT INTO customers ( id, first_name, last_name, email ) VALUES ( uuid(), 'David', 'Richardson', 'drichards@example.com' );
```

We'll use the `cookbook_file` resource to copy our SQL script to a temporary directory. Don't write any code yet &ndash; just follow along.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/database.rb
# Write schema seed file to filesystem
cookbook_file '/tmp/create-tables.sql' do
  source 'create-tables.sql'
  owner 'root'
  group 'root'
  mode '0600'
end
```

The `cookbook_file` resource is a built-in Chef resource that XXX.

Then we'll use the `execute` resource to run the script, like this.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/database.rb
# Seed the database with a table and test data
execute 'initialize database' do
  command "mysql -h 127.0.0.1 -u myapp_db -pmyapp_replaceme -D myapp < /tmp/create-tables.sql"
  not_if  "mysql -h 127.0.0.1 -u myapp_db -pmyapp_replaceme -D myapp -e 'describe customers;'"
end
```

No resource type exists that can execute a SQL script. That's why we use the `execute` resource. The `execute` resource enables you to run any arbitrary command.

But remember that Chef takes a test and repair approach to how it keeps your servers in line with your policy. Therefore, you want to be able to run your cookbook as many times as you like and only update the system when necessary.

The `not_if` attribute is an example of a [guard](https://docs.chef.io/resource_common.html#guards). A guard enables you to execute a resource based on a condition. In our case, we don't want to run the script if the `customers` table already exists.

[COMMENT] Something about `only_if`...

### Refactor

Like we've done before, let's look at how we can factor out our data. In our `cookbook_file` resource, we specified the destination path for our SQL script. Let's create a node attribute to describe that.

Append an attribute to your default attribute file, <code class="file-path">default.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/myapp/attributes/default.rb
default['myapp']['user'] = 'myapp'
default['myapp']['group'] = 'myapp'

default['myapp']['name'] = 'myapp'
default['myapp']['config'] = 'myapp.conf'

default['apache']['docroot_dir'] = '/srv/apache/myapp'

default['mysql']['server_root_password'] = 'learnchef_mysql'

default['myapp']['database']['dbname'] = 'myapp'
default['myapp']['database']['host'] = '127.0.0.1'
default['myapp']['database']['username'] = 'root'
default['myapp']['database']['password'] = node['mysql']['server_root_password']

default['myapp']['database']['app']['username'] = 'myapp_db'
default['myapp']['database']['app']['password'] = 'myapp_replaceme'

default['myapp']['database']['seed_file'] ='/tmp/create-tables.sql'
```

We can also factor out most parts of our `execute` resource, such as the host name, user name, and password. We already have node attributes to describe those, so we're all ready to add code to our recipe.

Append the following to your database recipe.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/database.rb
# Write schema seed file to filesystem
cookbook_file node['myapp']['database']['seed_file'] do
  source 'create-tables.sql'
  owner 'root'
  group 'root'
  mode '0600'
end

# Seed the database with a table and test data
execute 'initialize database' do
  command "mysql -h #{node['myapp']['database']['host']} -u #{node['myapp']['database']['app']['username']} -p#{node['myapp']['database']['app']['password']} -D
 #{node['myapp']['database']['dbname']} < #{node['myapp']['database']['seed_file']}"
  not_if  "mysql -h #{node['myapp']['database']['host']} -u #{node['myapp']['database']['app']['username']} -p#{node['myapp']['database']['app']['password']} -D
 #{node['myapp']['database']['dbname']} -e 'describe customers;'"
end
```

The entire recipe looks like this.

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

# Add a database user
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
  source 'create-tables.sql'
  owner 'root'
  group 'root'
  mode '0600'
end

# Seed the database with a table and test data
execute 'initialize database' do
  command "mysql -h #{node['myapp']['database']['host']} -u #{node['myapp']['database']['app']['username']} -p#{node['myapp']['database']['app']['password']} -D #{node['myapp']['database']['dbname']} < #{node['myapp']['database']['seed_file']}"
  not_if  "mysql -h #{node['myapp']['database']['host']} -u #{node['myapp']['database']['app']['username']} -p#{node['myapp']['database']['app']['password']} -D  #{node['myapp']['database']['dbname']} -e 'describe customers;'"
end
```

## 5. Set the database recipe to run

Append an `include_recipe` statement to your default recipe, <code class="file-path">default.rb</code>. The entire file will look like this.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/default.rb
include_recipe 'apt::default'
include_recipe 'myapp::user'
include_recipe 'myapp::webserver'
include_recipe 'myapp::database'
```

## 6. Bump the version

```bash
# ~/chef-repo/cookbooks/myapp/metadata.rb
name             'myapp'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures myapp'
long_description 'Installs/Configures myapp'
version          '0.2.0'
```

## Verify your configuration

Let's upload your updated cookbook, run it on your bootstrapped node, and verify the result.

### 1. Upload your cookbook to the Chef server

```bash
# ~/chef-repo/cookbooks/myapp
$ berks install
Resolving cookbook dependencies...
Fetching 'myapp' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using apache2 (3.0.1)
Using apt (2.6.1)
Using chef-sugar (2.5.0)
Using build-essential (2.1.3)
Using database (4.0.3)
Using firewall (0.11.8)
Using iptables (0.14.1)
Using mariadb (0.2.12)
Using myapp (0.2.0) from source at .
Using mysql (6.0.15)
Using mysql2_chef_gem (1.0.1)
Using openssl (4.0.0)
Installing logrotate (1.9.0)
Using postgresql (3.4.18)
Using rbac (1.0.2)
Using resource-control (0.1.1)
Using smf (2.2.5)
Using yum (3.5.3)
Using yum-epel (0.6.0)
Using yum-mysql-community (0.1.13)
```

Notice that the `myapp` cookbook was uploaded because it's version changed.

```bash
# ~/chef-repo/cookbooks/myapp
$ berks upload
Skipping apache2 (3.0.1) (frozen)
Skipping apt (2.6.1) (frozen)
Uploaded build-essential (2.1.3) to: 'https://api.opscode.com:443/organizations/your-org-name'
[...]
Uploaded myapp (0.2.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
[...]
```

### Apply your cookbook

It's time to apply what you've done so far to your node. After you configured Apache, you bootstrapped a node and ran your cookbooks. To update your node's configuration, let's run `knife ssh` to apply your updated cookbook.

Choose the same option you did earlier when you bootstrapped your node.

#### Option 1: Use a user name and password

Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo/cookbooks/myapp
$ knife ssh {address} 'sudo chef-client' --manual-list --ssh-user {user} --ssh-password '{password}'
```

#### Option 2: Use key-based authentication

```bash
# ~/chef-repo/cookbooks/myapp
$ knife ssh {address} 'sudo chef-client' --manual-list --ssh-user {user} --identity-file {identity-file}
```

Remember, `{identity-file}` is your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>

### Verify things

Verify that the MySQL service is running.

```bash
$ sudo netstat -tap | grep mysql
tcp        0      0 *:mysql                 *:*                     LISTEN      27856/mysqld
```

<!-- TODO
Also check that MySQL is enabled to start on boot on Mac OS X/Linux:

```bash
$ sudo /sbin/chkconfig --list | grep mysqld"
mysqld         	0:off	1:off	2:on	3:on	4:on	5:on	6:off
```

If the service is set to be activated at runlevels 3 and 5, then MySQL is enabled to run under full multi-user text mode and full multi-user graphical mode, which is exactly the desired behavior.

-->

Run `mysqlshow` to display database information.

```bash
$ mysqlshow -h 127.0.0.1 -uroot -plearnchef_mysql
+--------------------+
|     Databases      |
+--------------------+
| information_schema |
| myapp              |
| mysql              |
| performance_schema |
+--------------------+
```

Note that `myapp` is listed as a database name - success!

Run the following `mysql` command to verify that user `myapp_db` user is enabled as a local user.

```bash
$ mysql -h 127.0.0.1 -uroot -plearnchef_mysql -e "select user,host from mysql.user;"
+----------+-----------+
| user     | host      |
+----------+-----------+
| root     | %         |
| myapp_db | 127.0.0.1 |
+----------+-----------+
```

As you can see above, the myapp_db@127.0.0.1 user exists, so our cookbook did what was expected.

Also check to see that the myface_app user only has rights on the myface databse on Mac OS X/Linux:

```bash
$ mysql -h 127.0.0.1 -uroot -plearnchef_mysql -e "show grants for 'myapp_db'@'127.0.0.1';"
+-----------------------------------------------------------------------------------------------------------------+
| Grants for myapp_db@127.0.0.1                                                                                   |
+-----------------------------------------------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO 'myapp_db'@'127.0.0.1' IDENTIFIED BY PASSWORD '*B28723EAECAD3130F237F666A671416DAED862F0' |
| GRANT ALL PRIVILEGES ON `myapp`.* TO 'myapp_db'@'127.0.0.1'                                                     |
+-----------------------------------------------------------------------------------------------------------------+
```

Run the following mysql command to dump the contents of the users table on Mac OS X/Linux:

```bash
$ mysql -h 127.0.0.1 -uroot -plearnchef_mysql -Dmyapp -e "select id,first_name from customers;"
+----------------------------------+------------+
| id                               | first_name |
+----------------------------------+------------+
| 0f81375d-c74e-11e4-8216-02a60467 | Jane       |
| 0f818a14-c74e-11e4-8216-02a60467 | David      |
+----------------------------------+------------+
```

The output should look similar to what you see above - the data from the INSERT INTO statements in the SQL script.

## Configure PHP

In this part, you'll configure PHP and create a basic PHP app that reads the records from our MySQL database and displays them on the web page. You'll be working in the <code class="file-path">webserver.rb</code> recipe that you created when you set up Apache.

We already did most of the ground work already &ndash; for example we've already set up a place to hold our custom site and we've opened up port 80 to incoming traffic.

## 1. Reference the php cookbook

For this part we'll need the [php](https://supermarket.chef.io/cookbooks/php) cookbook from Chef Supermarket.

Append the line `depends 'php'` to <code class="file-path">metadata.rb</code>, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/myapp/metadata.rb
name             'myapp'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures myapp'
long_description 'Installs/Configures myapp'
version          '0.2.0'

depends 'apt'
depends 'apache2'
depends 'firewall'
depends 'mysql2_chef_gem'
depends 'mysql'
depends 'database'
depends 'php'
```

## 2. Install PHP

Recall that our Apache recipe looks like this.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/webserver.rb
# install Apache and configure its service
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

Now we're going to set up PHP. To do so, we'll first install the `mod_php5` module, which enables Apache to interpret PHP files. Then we'll install the `php5-mysql` package, which enables PHP code to connect to MySQL databases.

In <code class="file-path">webserver.rb</code>, after the first line, add an `include_recipe` line to install the `mod_php5` Apache module and a `package` resource to install `php5-mysql`, making the start of the file look like this.

```ruby
# ~/chef-repo/cookbooks/myapp/recipes/webserver.rb
# install Apache and configure its service
include_recipe 'apache2::default'
# install the mod_php5 Apache module
include_recipe 'apache2::mod_php5'

# install php5-mysql
package 'php5-mysql' do
  action :install
  notifies :restart, 'service[apache2]'
end

[...]
```

Apache needs to be restarted to enable PHP to use the `php5-mysql` package. To do that, we use the `notifies` attribute. This [notifies attribute](https://docs.chef.io/resource_common.html#notifications) performs the `:restart` action on the `apache2` service. But it does so only when it needs to; that is, only when the `package` resource performs the `:install` action.

## 3. Write the PHP application

Now we need to replace our default home page, <code class="file-path">index.html</code> with a PHP script, which we'll name <code class="file-path">index.php</code>. The PHP script will read each record from our `customers` database table and display it on the page.

First, run the following `chef generate` command to create a file to hold our PHP script.

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

How let's write our PHP application. Add the following to <code class="file-path">index.php.erb</code>.

```php
<?php
// ~/chef-repo/cookbooks/myapp/templates/default/index.php.erb
$servername = "127.0.0.1";
$username = "myapp_db";
$password = "myapp_replaceme";
$dbname = "myapp";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Perform SQL query
$sql = "SELECT * FROM customers";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table>\n";
    // Output data of each row
    while($row = $result->fetch_assoc()) {
      echo "\t<tr>\n";
      foreach ($row as $col_value) {
          print "\t\t<td>$col_value</td>\n";
      }
      echo "\t</tr>\n";
    }
    echo "</table>";
} else {
    echo "0 results";
}

// Close connection
$conn->close();
?>
```

## 6. Bump the version

```bash
# ~/chef-repo/cookbooks/myapp/metadata.rb
name             'myapp'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures myapp'
long_description 'Installs/Configures myapp'
version          '0.3.0'
```

## Verify your configuration

Let's upload your updated cookbook, run it on your bootstrapped node, and verify the result.

### 1. Upload your cookbook to the Chef server

```bash
# ~/chef-repo/cookbooks/myapp
$ berks install
Resolving cookbook dependencies...
Fetching 'myapp' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using apache2 (3.0.1)
Using apt (2.6.1)
Using build-essential (2.1.3)
Using chef-sugar (2.5.0)
Using database (4.0.3)
Using iptables (0.14.1)
Using logrotate (1.9.0)
Using mariadb (0.2.12)
Using firewall (0.11.8)
Using myapp (0.3.0) from source at .
Using mysql (6.0.15)
Using mysql2_chef_gem (1.0.1)
Using openssl (4.0.0)
Using postgresql (3.4.18)
Using rbac (1.0.2)
Using resource-control (0.1.1)
Using smf (2.2.5)
Using yum (3.5.3)
Using yum-epel (0.6.0)
Using yum-mysql-community (0.1.13)
```

Notice that the `myapp` cookbook was uploaded because it's version changed.

```bash
# ~/chef-repo/cookbooks/myapp
$ berks upload
$ berks upload
Skipping apache2 (3.0.1) (frozen)
Skipping apt (2.6.1) (frozen)
Skipping build-essential (2.1.3) (frozen)
Skipping chef-sugar (2.5.0) (frozen)
Skipping database (4.0.3) (frozen)
Skipping firewall (0.11.8) (frozen)
Skipping iptables (0.14.1) (frozen)
Skipping logrotate (1.9.0) (frozen)
Skipping mariadb (0.2.12) (frozen)
Uploaded myapp (0.3.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Skipping mysql (6.0.15) (frozen)
Skipping mysql2_chef_gem (1.0.1) (frozen)
Skipping openssl (4.0.0) (frozen)
Skipping postgresql (3.4.18) (frozen)
Skipping rbac (1.0.2) (frozen)
Skipping resource-control (0.1.1) (frozen)
Skipping smf (2.2.5) (frozen)
Skipping yum (3.5.3) (frozen)
Skipping yum-epel (0.6.0) (frozen)
Skipping yum-mysql-community (0.1.13) (frozen)
```

### Apply your cookbook

It's time to apply what you've done so far to your node. After you configured Apache, you bootstrapped a node and ran your cookbooks. After you configured MySQL, you ran `knife ssh` to apply your updated cookbook. Let's do the same for {our work on the PHP part}.

Here's a reminder of how ...

#### Option 1: Use a user name and password

Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo/cookbooks/myapp
$ knife ssh {address} 'sudo chef-client' --manual-list --ssh-user {user} --ssh-password '{password}'
```

#### Option 2: Use key-based authentication

```bash
# ~/chef-repo/cookbooks/myapp
$ knife ssh {address} 'sudo chef-client' --manual-list --ssh-user {user} --identity-file {identity-file}
```

Remember, `{identity-file}` is your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>

### Verify things

There are a number of things we can do to verify that PHP was installed properly.
![registration page](/assets/images/ubuntu/webapp_result.png)

## Summary

Something about how you can reuse this (reference cookbook, replace attributes) - perhaps point to hierarchy of attribute precedence.

Credit: This tutorial was adapted from http://misheska.com/blog/2013/06/23/getting-started-writing-chef-cookbooks-the-berkshelf-way-part2/

Exercises:

Delete the seed file after using it (you don't have to guard this because ...)
