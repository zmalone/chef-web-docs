---
title: 'Apache 2, Passenger, and Rails'
---

Apache 2 + Passenger + Rails with Chef
======================================

[WARN] This part of the guide is still a work-in-progress.

### Install the application Cookbook
We will be leveraging the power of the [application][application] cookbook, so install that now:

    $ knife cookbook site install application

We also need [application_ruby][application-ruby] since this is a Rails app:

    $ knife cookbook site install application_ruby

Finally, we will be leveraging the [database](database) cookbook:

    $ knife cookbook site install database

- - -

### Create our cookbook
The documentation for the [application cookbook][application] recommends naming the cookbook after the app. In this example, we will be deploying a Rails app called [kandan][kandan] - an open-source company chat server.

1. Create the `kandan` cookbook:

        knife cookbook create kandan

1. Add the dependency on the application cookbook in the `metadata.rb`:

    ```ruby
    # cookbooks/kandan/metadata.rb
    # ...

    depends 'application'
    depends 'application_ruby'
    depends 'database'
    ```

    We can now leverage the application LWRP in our cookbook.

1. Create a new recipe call `packages` in `recipes/packages.rb` and add the following:

    ```ruby
    # Install application support packages
    %w(nodejs git libxslt-dev libxml2-dev).each do |package|
      package package do
        action :install
      end
    end
    ```

1. Create a new recipe call `database` in `recipes/database.rb` and add the following:

    ```ruby
    # Install postgres server
    include_recipe 'postgres::server'
    include_recipe 'postgres::client'
    include_recipe 'postgres::ruby'

    # Create the database
    connection = { host: 'localhost', username: 'root', password: node['postgresql']['password']['postgres'] }
    postgres_database 'kandan' do
      connection    connection
      action        :create
    end

    # Create the database user
    postgres_database_user 'kandan' do
      connection    connection
      password      'not_secure_at_all'
      action        :create
    end
    ```

1. Finally open up the default recipe `recipes/default.rb` and add the following:

    ```ruby
    # Make sure we have the necessary packages installed
    include_recipe 'kandan::packages'

    # Make sure the database is setup
    include_recipe 'kandan::database'

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
[database]: https://github.com/opscode-cookbooks/database "Database Cookbook"
[kandan]: https://github.com/kandanapp/kandan "Kandan app"
