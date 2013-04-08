---
title: 'Multi-Node EC2'
long_title: 'Spin up a multi-node EC2 application with Chef'
order: 3
description: 'Dive into Chef by spinning up an EC2 virtual infrastructure complete with Redis, MySQL, memcached, Apache, and Passenger.'
keywords: 'ec2, amazon, multi-node, chef, opscode'
---

Spin up a multi-node EC2 application with Chef
==============================================
In this tutorial, we will use Chef to spin up a 3-node environment on EC2:

- 1 memcached server
- 1 Redis server
- 1 Application server (MySQL, Apache, Passenger) for deployment with Capistrano

Pre-requisite steps:

1. Register for an [Amazon AWS Account](http://aws.amazon.com)
1. Setup and download your EC2 Key Pair
1. Create an Access Key and Associated Secret Token on AWS

---

##### Clone Chef Repo
If you haven't done so already, you'll need a Chef Repo. Opscode provides a starter repository on github:

    $ git clone git://github.com/opscode/chef-repo.git

You'll need to copy your `.pem` files and `knife.rb` into a `.chef` directory in this repository.

Since we are using AWS, you'll also want to add your credentials to the `knife.rb`, so you don't have to type them each time you run a command:

```ruby
# knife.rb

knife[:aws_access_key_id] = 'ACCESS_KEY_ID'
knife[:aws_ssh_key_id] = 'KEY_ID'
knife[:aws_secret_access_key] = 'SECRET_ACCESS_KEY'
```

---

##### Gemfile
Next, add a `Gemfile` so that we can lock down the version of Chef and include some helpful community tools:

```ruby
source 'https://rubygems.org'

gem 'berkshelf',    '~> 1.2.1'
gem 'chef',         '~> 11.4.0'
gem 'knife-ec2',    '~> 0.6.2'
```

- Berkshelf will help us manage our community cookbook dependencies. It's kind of like "bundler", but for cookbooks.
- We lock the Chef version to make sure everyone on our team is using the same version.

Run the `bundle` command to install those dependencies.

Next, before I go any further, I'm going to check the community site. It's possible that some of the heavy-lifting has already been done for me.

---

##### Add Community Cookbooks
It turns out that memcached and redis already have community versions we can leverage:

- [memcached](http://community.opscode.com/cookbooks/memcached)
- [redisio](http://community.opscode.com/cookbooks/redisio)

Create a new file called `Berskfile` at the root of your Chef repo and add the following:

```ruby
site :opscode

cookbook 'memcached',     '~> 1.3.0'
cookbook 'redisio',       '~> 1.4.1'
```

Run the `berks` command to install them, and then `berks upload` to upload them to your Chef organization.

---

##### memcached
First, let's spin up the memcached server. We'll create a new role for the memcached server(s). In this example, there will only be one server, but you can apply a role to multiple nodes and a node can have multiple roles. Create a file in `roles/memcached.rb`:

```ruby
name 'memcached'
description 'A single memcached server'
run_list(
  'recipe[memcached]'
)
```

Upload this role to Chef:

    $ knife role from file roles/memcached.rb

Now we can use the `knife-ec2` plugin to create and provision this EC2 instance for us:

    $ knife ec2 server create \
      --availability-zone us-east-1a \
      --node-name memcached.learnchef.demo \
      --flavor t1.micro \
      --image ami-fd20ad94 \
      --identity-file ~/.ssh/aws.pem \
      --run-list "role[memcached]" \
      --ssh-user ubuntu \
      --distro ubuntu12.04-gems

Make sure you replace the flags appropiately for your region and configuration. Most of them are just implementation details, but the important thing to note is the `run-list` option, where we specified `role[memcached]`. This tells Chef to bootstrap this node with the memcached role (thus install memcached). This will take about 2 minutes to spin up.

---

##### Redis
Using a very similar pattern as before, let's create a new `redis` role. Just to spice things up a bit, I'm going to configure to redis instances on the same node, one master and one slave.

```ruby
name 'redis'
description 'A redis master on slave (on a single machine)'
default_attributes({
  'redisio' => {
    'servers' => [
      { 'port' => '6379' },
      { 'port' => '6380', 'slaveof' => { 'address' => '127.0.0.1', 'port' => '6379' }  }
    ]
  }
})
run_list(
  'recipe[redisio::install]',
  'recipe[redisio::enable]'
)
```

And we'll upload this role:

    $ knife role from file roles/redis.rb

And bootstrap another node:

    $ knife ec2 server create \
      --availability-zone us-east-1a \
      --node-name redis.learnchef.demo \
      --flavor t1.micro \
      --image ami-fd20ad94 \
      --identity-file ~/.ssh/aws.pem \
      --run-list "role[redis]" \
      --ssh-user ubuntu \
      --distro ubuntu12.04-gems

---

##### Application Server
Our app server will use MySQL, Apache 2, and Passenger. We can leverage the community cookbooks in this case, so let's add them to our `Berksfile`:

```ruby
cookbook 'apache2',               '~> 1.6.0'
cookbook 'database',              '~> 1.3.12'
cookbook 'git',                   '~> 2.3.0'
cookbook 'passenger_apache2',     '~> 2.0.0'
```

Our complete `Berksfile` should now look like:

```ruby
site :opscode

cookbook 'apache2',               '~> 1.6.0'
cookbook 'database',              '~> 1.3.12'
cookbook 'git',                   '~> 2.3.0'
cookbook 'memcached',             '~> 1.3.0'
cookbook 'passenger_apache2',     '~> 2.0.0'
cookbook 'redisio',               '~> 1.4.1'
```

Run the `berks` command to install and then run `berks upload` to push the new cookbooks to Chef.

Let's use `knife` to create a new recipe for the app, we'll call it `my_app`:

    $ knife cookbook create my_app

This will create a skeleton cookbook with scaffolded files. Since we are depending on apache2 and passenger, we need to add those cookbooks as dependencies in the `metadata.rb`:

```ruby
depends 'apache2'
depends 'database'
depends 'git'
depends 'passenger_apache2'
```

Let's add some default attributes. This will help DRY up our code and allow for overrides in the future. In the `attributes/default.rb` file:

```ruby
default['my_app']['root'] = '/var/www/my_app'
default['my_app']['database']['database'] = 'my_app'
default['my_app']['database']['username'] = 'my_app'
default['my_app']['database']['password'] = 'secret'
```

Let's add a few things to our default recipe:

1. Install git

    ```ruby
    include_recipe 'git'
    ```

2. Install MySQL (both server and client):

    ```ruby
    include_recipe 'mysql::server'
    include_recipe 'mysql::client'
    include_recipe 'mysql::ruby'
    ```

3. Install Apache 2:

    ```ruby
    include_recipe 'apache2'
    ```

4. Install Passenger:

    ```ruby
    include_recipe 'passenger_apache2'
    include_recipe 'passenger_apache2::mod_rails'
    ```

5. Setup directory structure:

    ```ruby
    %w(/ releases shared shared/bin shared/config shared/log shared/pids shared/system).each do |directory|
      directory "#{node['my_app']['root']}/#{directory}" do
        owner         node['apache']['user']
        group         node['apache']['group']
        mode          '0755'
        recursive     true
      end
    end
    ```

And then upload this cookbook to the Chef Server:

    $ knife cookbook upload my_app

And we can now add the recipe directly to a `run_list` during a bootstrap:

    $ knife ec2 server create \
      --availability-zone us-east-1a \
      --node-name app.learnchef.demo \
      --flavor t1.micro \
      --image ami-fd20ad94 \
      --identity-file ~/.ssh/aws.pem \
      --run-list "recipe[my_app]" \
      --ssh-user ubuntu \
      --distro ubuntu12.04-gems

It's okay to bootstrap this node now, even though we aren't done with the recipe yet. Because Chef is idempotent, we can continue to work on this cookbook and only new changes are applied. This also mimics the kind of workflow you would have over time inside your organization.

Let this run in the background (passenger takes a long time to install). But make sure you grab the `CNAME` of the ec2 instance, because you can SSH into it later:

    $ ssh -i ~/.ssh/aws.pem ubuntu@ec2-x-x-x-x.compute-1.amazonaws.com

From the node, you can run `sudo chef-client` to force a Chef run. In a real production environment, you'd run Chef as a service or cron, but for the sake of this demo, we will run it manually.

Next, we need to drop configuration files for Redis, specifically, we need the hostname. We can leverage Chef search for this:

```ruby
redis_server = search(:node, 'role:redis').first

template "#{node['my_app']['root']}/shared/config/redis.yml" do
  source        'config/redis.yml.erb'
  owner         node['apache']['user']
  group         node['apache']['group']
  mode          '0755'
  variables(
    :host => redis_server['ec2']['local_ipv4']
  )
end
```

And the associated template in `templates/default/config/redis.yml.erb`:

```erb
# This file was created by Chef for <%= node['fqdn'] %>
# Do NOT modify this file by hand!

host: "<%= @host %>"
```

We can follow a simlar process for memcached:

```ruby
memcached_server = search(:node, 'role:memcached').first

template "#{node['my_app']['root']}/shared/config/memcached.yml" do
  source        'config/memcached.yml.erb'
  owner         node['apache']['user']
  group         node['apache']['group']
  mode          '0755'
  variables(
    :host => memcached_server['ec2']['local_ipv4']
  )
end
```

And the template in `templates/default/config/memcached.yml.erb`

```erb
# This file was created by Chef for <%= node['fqdn'] %>
# Do NOT modify this file by hand!

host: "<%= @host %>"
```

Now we need to actually create the MySQL database and user:

```ruby
connection = {
  :host     => 'localhost',
  :username => 'root',
  :password => node['mysql']['server_root_password']
}

mysql_database node['my_app']['database']['database'] do
  connection      connection
  action          :create
end

mysql_database_user node['my_app']['database']['username'] do
  connection      connection
  password        node['my_app']['database']['password']
  action          :create
end

mysql_database_user node['my_app']['database']['username'] do
  connection      connection
  password        node['my_app']['database']['password']
  database_name   node['my_app']['database']['database']
  action          :grant
end
```

This code all comes from the [database community cookbook](http://community.opscode.com/cookbooks/database).

Upload this recipe again:

    $ knife cookbook upload my_app

And run `chef-client` on the node now, since the database setup process can take some time.

Now we just need to write out the `database.yml` file:

```ruby
template "#{node['my_app']['root']}/shared/config/database.yml" do
  source        'config/database.yml.erb'
  owner         node['apache']['user']
  group         node['apache']['group']
  mode          '0755'
end
```

And the template in `templates/default/config/database.yml.erb`:

```erb
production:
  adapter: mysql2
  host: localhost
  database: '<%= node['my_app']['database']['database'] %>'
  pool: 5
  username: '<%= node['my_app']['database']['username'] %>'
  password: '<%= node['my_app']['database']['password'] %>'
```

Lastly, in order to deploy, we'll need to give my local machine access. I could use the AWS pem files, but I want to deploy as the apache user. Let's add my public key to apache's authorized_keys:

```ruby
directory "/var/www/.ssh" do
  owner         node['apache']['user']
  group         node['apache']['group']
  mode          '0755'
end

file "/var/www/.ssh/authorized_keys" do
  owner         node['apache']['user']
  group         node['apache']['group']
  mode          '0644'
  content       "[KEY HERE]"
end
```

[NOTE] You would want to use `data_bags` and a `template` resource in a real-world scenario.

We can verify everything was setup correctly by:

    $ ssh www-data@ec2-x-x-x-x.compute-1.amazonaws.com

Next we need to setup the actual apache site:

```ruby
template "#{node['apache']['dir']}/sites-available/my_app.conf" do
  source        'apache/my_app.conf.erb'
end

apache_site 'my_app.conf' do
  action :enable
end
```

And the associated Apache Virtual Host:

```erb
# This file is managed by chef for <%= node['fqdn'] %>
# Do NOT modify this file by hand!

<VirtualHost *:80>
  DocumentRoot <%= node['my_app']['root'] %>/current/public

  <Directory <%= node['my_app']['root'] %>/current/public>
    Options FollowSymLinks
    AllowOverride None
    Order allow,deny
    Allow from all
  </Directory>

  <Directory />
    Options FollowSymLinks
    AllowOverride None
  </Directory>

  LogLevel info
  ErrorLog <%= node['apache']['log_dir'] %>/my_app-error.log
  CustomLog <%= node['apache']['log_dir'] %>/my_app-access.log combined
</VirtualHost>
```

Finally, you'll need to install `bundler`. Capistrano expects that bundler is present on the target machine:

```ruby
gem_package 'bundler'
```

---

##### Deploy the Application
From the application repository, setup Capistrano to point at your instance. Here's an example `deploy.rb` to get you started:

```ruby
require 'bundler/capistrano'

set :application, "my_app"
set :repository,  "git://github.com/YOUR_USER/YOUR_APP.git"

set :scm, :git
set :user, 'www-data'
set :group, 'www-data'
set :deploy_to, '/var/www/my_app'
set :use_sudo, false
set :instance, "ec2-x-x-x-x.compute-1.amazonaws.com"

role :web, instance                          # Your HTTP server, Apache/etc
role :app, instance                          # This may be the same as your `Web` server
role :db,  instance, :primary => true # This is where Rails migrations will run
role :db,  instance

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

namespace :my_app do
  task :symlinks, :except => { :no_release => true } do
    run "#{try_sudo} ln -nfs #{shared_path}/config/database.yml #{release_path}/config/database.yml"
    run "#{try_sudo} ln -nfs #{shared_path}/config/memcached.yml #{release_path}/config/memcached.yml"
    run "#{try_sudo} ln -nfs #{shared_path}/config/redis.yml #{release_path}/config/redis.yml"
  end
end
after 'deploy:symlink', 'my_app:symlinks'
```

Notice how we are symlinking the files dropped off by Chef? This allows us to use different application configurations in production that in local development - there's no need to check credentials into version control!
