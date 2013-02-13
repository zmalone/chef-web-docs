Apache 2 + Passenger + Rails with Chef
======================================

Install the application Cookbook
--------------------------------
We will be leveraging the power of the [application][application] and [application_ruby][application-ruby], so let's install that:

    knife cookbook site install application
    knife cookbook site install application_ruby


Create our cookbook
-------------------
The documentation for the [application cookbook][application] recommends naming the cookbook after the app. In this example, we will be deploying a Rails app called [kandan][kandan] - an open-source company chat server.

1. Create the `kandan` cookbook:

        knife cookbook create kandan

2. Add the dependency on the application cookbook in the `metadata.rb`:

    ```ruby
    # cookbooks/kandan/metadata.rb
    # ...

    depends 'application'
    depends 'application_ruby'
    ```

    We can now leverage the application LWRP in our cookbook.

3. Open up the default recipe and add following:

    ```ruby
    application 'kandan' do
      path          '/var/www/kandan'
      owner         node['apache']['user']
      group         node['apache']['group']

      repository    'git://github.com/kandanapp/kandan'
      revision      'master'

      migrate       true
      packages      ['nodejs']
      gems          ['execjs']

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

- - -

  [application]: https://github.com/opscode-cookbooks/application "Chef Application Cookbook"
  [application-ruby]: https://github.com/opscode-cookbooks/application_ruby "Chef Application Ruby Cookbook"
  [kandan]: https://github.com/kandanapp/kandan "Kandan app"
