---
title: 'Apache 2, Passenger, and Rails'
---

Apache 2 + Passenger + Rails with Chef
======================================

[WARN] This part of the guide is still a work-in-progress.

### Install the application Cookbook
We will be leveraging the power of the [application][application] and [application_ruby][application-ruby], so let's install that:

    $ knife cookbook site install application application_ruby

- - -

### Create our cookbook
The documentation for the [application cookbook][application] recommends naming the cookbook after the app. In this example, we will be deploying a Rails app called [kandan][kandan] - an open-source company chat server.

1. Create the `kandan` cookbook:

        knife cookbook create kandan

2. Add the dependency on the application cookbook in the `metadata.rb`:

    ```ruby
    # cookbooks/kandan/metadata.rb
    # ...

    depends 'application'
    depends 'application_ruby'
    depends 'database'
    ```

    We can now leverage the application LWRP in our cookbook.

3. Open up the default recipe and add following:

    ```ruby
    # Install support packages
    %w(nodejs git).each do |package|
      package package do
        action :install
      end
    end

    include_recipe 'mysql::server'
    include_recipe 'mysql::client'
    include_recipe 'mysql::ruby'

    # Create the database
    connection = { host: 'localhost', username: 'root', password: node['mysql']['server_root_password'] }
    mysql_database 'kandan' do
      connection    connection
      action        :create
    end

    # Create the database user
    mysql_database_user 'kandan' do
      connection    connection
      password      'not_secure_at_all'
      action        :create
    end

    # Deploy the application
    application 'kandan' do
      path          '/var/www/kandan'
      owner         node['apache']['user']
      group         node['apache']['group']

      repository    'git://github.com/kandanapp/kandan'
      revision      'master'

      migrate       true

      # rails-specific configuration
      rails do
        bundler_without_groups ['development']

        database do
          database      'kandan'
          username      'kandan'
          password      'not_secure_at_all'
        end
      end

      # passenger-specific configuration
      passenger_apache2 do

      end
    end
    ```

[application]: https://github.com/opscode-cookbooks/application "Chef Application Cookbook"
[application-ruby]: https://github.com/opscode-cookbooks/application_ruby "Chef Application Ruby Cookbook"
[kandan]: https://github.com/kandanapp/kandan "Kandan app"
