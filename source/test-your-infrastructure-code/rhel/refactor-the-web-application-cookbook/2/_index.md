## 2. Verify the awesome_customers cookbook's resources are properly defined

In this part, you'll write ChefSpec tests that verify the state of the web application on a Test Kitchen instance.

Remember that ChefSpec tests are ideal when a component's behavior varies based on the environment or other variable input &ndash; for example, recipes that target multiple platforms or multiple versions of the same platform. ChefSpec helps you validate that the correct actions are taken in each environment.

Although this version of the `awesome_customers` cookbook targets just Red Hat Enterprise Linux (including CentOS), let's write a few ChefSpec tests anyway to demonstrate two important concepts &ndash; using _custom matchers_ to verify the use of custom resources and _method stubs_ to simulate the use of encrypted data bag items.

We'll focus just on the web server portion of the cookbook.

### Apply the default ChefSpec test

When you ran the `chef generate cookbook` command to create the `awesome_customers` cookbook, Chef created the <code class="file-path">spec/unit/recipes</code> directory in your cookbook to hold your ChefSpec tests.

The test for your `webserver` recipe, `webserver_spec.rb`, looks like this.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/spec/unit/recipes/webserver_spec.rb
require 'spec_helper'

describe 'awesome_customers::webserver' do
  context 'When all attributes are default, on an unspecified platform' do
    let(:chef_run) do
      runner = ChefSpec::ServerRunner.new
      runner.converge(described_recipe)
    end

    it 'converges successfully' do
      expect { chef_run }.to_not raise_error
    end
  end
end
```

Run the generated spec to verify that it completes without error.

```bash
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
$ rspec --color spec/unit/recipes/webserver_spec.rb
F

Failures:

  1) awesome_customers::webserver When all attributes are default, on an unspecified platform converges successfully
     Failure/Error: expect { chef_run }.to_not raise_error
       expected no Exception, got #<Errno::ENOENT: No such file or directory - file not found '/etc/chef/encrypted_data_bag_secret'> with backtrace:
         # /Users/user/.chefdk/gem/ruby/2.1.0/gems/chef-12.4.3/lib/chef/encrypted_data_bag_item.rb:145:in `load_secret'
[...]
     # ./spec/unit/recipes/webserver_spec.rb:17:in `block (3 levels) in <top (required)>'

Finished in 5.4 seconds (files took 12.9 seconds to load)
1 example, 1 failure

Failed examples:

rspec ./spec/unit/recipes/webserver_spec.rb:16 # awesome_customers::webserver When all attributes are default, on an unspecified platform converges successfully
```

The command reported a fatal error &ndash; that the data bag secret key <code class="file-path">/etc/chef/encrypted\_data\_bag\_secret</code> file does not exist.

```bash
#
<Errno::ENOENT: No such file or directory - file not found '/etc/chef/encrypted_data_bag_secret'>
```

Let's see how to use _method stubs_ to simulate the loading of the encrypted data bag item.

### Use method stubs to load the encrypted data bag item

Recall that the `awesome_customers` cookbook uses [encrypted data bag items](https://docs.chef.io/data_bags.html) to securely store database passwords. Our `webserver` recipe needs to pass the password for the database instance to the template that holds the PHP code to allow the PHP script to query the database.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# [...]
# Load the secrets file and the encrypted data bag item that holds the database password.
password_secret = Chef::EncryptedDataBagItem.load_secret(node['awesome_customers']['passwords']['secret_path'])
user_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'db_admin_password', password_secret)

# Write the home page.
template "#{node['awesome_customers']['document_root']}/index.php" do
  source 'index.php.erb'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
  variables(
    database_password: user_password_data_bag_item['password']
  )
end
# [...]
```

The `Chef::EncryptedDataBagItem.load_secret` method takes the path to the encryption key that can decrypt the data bag item that holds the database password. We defined the `node['awesome_customers']['passwords']['secret_path']` node attribute to hold the path the location of the encryption key on the node.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/attributes/default.rb
# [...]
default['awesome_customers']['passwords']['secret_path'] = '/etc/chef/encrypted_data_bag_secret'
# [...]
```

Because ChefSpec only simulates execution, and does not run the code on an instance, it cannot access <code class="file-path">/etc/chef/encrypted\_data\_bag\_secret</code>.

Therefore, we need a way to simulate the process of loading and reading this file to provide a fake password that ChefSpec can use. This process is often called _stubbing_.

The `Chef::EncryptedDataBagItem.load_secret` method calls Ruby's [File.exist?](http://ruby-doc.org/core-2.2.0/File.html#method-c-exist-3F) and [IO.read](http://ruby-doc.org/core-2.2.0/IO.html#method-c-read) methods ([source code](https://github.com/chef/chef/blob/d8172e646d9fbf43e57bca5e20d0ac352ba9a66a/lib/chef/encrypted_data_bag_item.rb#L128)) to load the secret file.

We need to stub `File.exist?` to return `true` when it receives the path to the encryption key, <code class="file-path">/etc/chef/encrypted\_data\_bag\_secret</code>. Similarly, we need to stub the `IO.read` method to return a fake encryption key when it receives the same path. We also need to stub the `Chef::EncryptedDataBagItem.load` method to return a data bag item that holds the fake database password.

To stub these methods, we first need to provide some data. Your <code class="file-path">webserver_spec.rb</code> file will need to include this (don't add this code just yet.)

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/spec/unit/recipes/webserver_spec.rb
let(:secret_path) { '/etc/chef/encrypted_data_bag_secret' }
let(:secret) { 'secret' }
let(:user_password_data_bag_item) do
  { password: 'fake_password' }
end
```

Here,

* `:secret_path` defines the path to the encryption key on the node. It's the same value we use for our node attribute.
* `:secret` defines the contents of the encryption key file. We don't need to provide a real encryption key because ChefSpec doesn't actually run the code. We simply need a string that simulates an encryption key.
* `:user_password_data_bag_item` defines the value that's returned by the `Chef::EncryptedDataBagItem.load_secret` method. This value is a  [Hash](http://docs.ruby-lang.org/en/2.0.0/Hash.html) that contains one key-pair value &ndash; the fake database password.

We can use a fake password and a fake encryption key because ChefSpec doesn't run the code and won't try to actually decrypt any data. Using a fake data also helps ensure that the password and encryption key are not accessible to unauthorized users.

[WARN] Never use a password or other sensitive data in your test code that you use in your production environment.

To stub methods, you provide what's called a [before hook](https://www.relishapp.com/rspec/rspec-core/v/2-2/docs/hooks/before-and-after-hooks) that's run before any tests are run. In the `before` hook, you [use the allow method](https://www.relishapp.com/rspec/rspec-mocks/v/2-99/docs/method-stubs/allow-with-a-simple-return-value) and the `receive` matcher to provide a specific response to a given message.

The `before` hook for our case looks like this (again, don't add this code just yet.)

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/spec/unit/recipes/webserver_spec.rb
before do
  allow(File).to receive(:exist?).and_call_original
  allow(File).to receive(:exist?).with(secret_path).and_return('true')

  allow(IO).to receive(:read).and_call_original
  allow(IO).to receive(:read).with(secret_path).and_return(secret)

  allow(Chef::EncryptedDataBagItem).to receive(:load).with('passwords','db_admin_password', secret).and_return(user_password_data_bag_item)
end
```

You can think of a method stub as an alternative implementation that's hard-coded to respond to a specific message.

The calls to `allow` that also use `and_call_original` enable the original implementation of the method to receive messages other than the ones that we specify.

Update your <code class="file-path">webserver_spec.rb</code> file to include stub implementations that allow ChefSpec to work with the encrypted data bag item.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/spec/unit/recipes/webserver_spec.rb
require 'spec_helper'

describe 'awesome_customers::webserver' do

  context 'When all attributes are default, on an unspecified platform' do

    let(:chef_run) do
      runner = ChefSpec::ServerRunner.new
      runner.converge(described_recipe)
    end
    let(:secret_path) { '/etc/chef/encrypted_data_bag_secret' }
    let(:secret) { 'secret' }
    let(:fake_password) { 'sample_password' }
    let(:user_password_data_bag_item) do
      { password: fake_password }
    end

    before do
      allow(File).to receive(:exist?).and_call_original
      allow(File).to receive(:exist?).with(secret_path).and_return('true')

      allow(IO).to receive(:read).and_call_original
      allow(IO).to receive(:read).with(secret_path).and_return(secret)

      allow(Chef::EncryptedDataBagItem).to receive(:load).with('passwords', 'db_admin_password', secret).and_return(user_password_data_bag_item)
    end

    it 'converges successfully' do
      expect { chef_run }.to_not raise_error
    end
  end
end
```

Run the updated spec to verify that it completes without error.

```bash
$ rspec --color spec/unit/recipes/webserver_spec.rb
.

Finished in 5.48 seconds (files took 13.14 seconds to load)
1 example, 0 failures
```

[COMMENT] You'll likely see lots of warnings appear at the start of the output. These warnings are OK to ignore, and we're working to remove them.

Success! Now that ChefSpec can simulate the `webserver` recipe in memory, we can move on to writing more valuable tests.

### Write the remaining tests

The `awesome_customers` cookbook uses the [httpd](https://supermarket.chef.io/cookbooks/httpd) cookbook from Chef Supermarket to configure Apache web server. Here's how the `webserver` recipe creates and starts the web service and applies the Apache configuration file.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
httpd_service 'customers' do
  mpm 'prefork'
  action [:create, :start]
end

# Add the site configuration.
httpd_config 'customers' do
  instance 'customers'
  source 'customers.conf.erb'
  notifies :restart, 'httpd_service[customers]'
end

#[...]
```

PHP must be run in a single-threaded [Multi-Processing Module](http://httpd.apache.org/docs/2.2/mpm.html), or MPM. Therefore, we set the `mpm` attribute to use the [prefork](http://httpd.apache.org/docs/2.2/mod/prefork.html) module.

The `httpd_config` resource restarts the service when the configuration file changes.

The `httpd` cookbook provides its own set of verification tests. Because we don't have different environments that cause us to configure these resources in any dynamic way, we don't need to write ChefSpec tests for them. But let's write a few anyway to demonstrate the use of _custom matchers_.

When you worked with ChefSpec in a prior lesson, you used the default matchers that ChefSpec provides. For example, you used the built-in `install_package` resource to verify that a `package` resource exists that installs the `httpd` package.

```ruby
# ~/webserver/spec/unit/recipes/default_spec.rb
it 'installs httpd' do
  expect(chef_run).to install_package 'httpd'
end
```

Much like how the `httpd` cookbook provides an additional layer of abstraction over the built-in `package`, `service`, and `template` resources to make Apache easier to configure, it provides what are called _custom matchers_ to provide a corresponding abstraction for testing.

We won't go into detail about how to write a custom matcher, but when you use a community cookbook, you can look to see whether it provides custom matchers for you to use in your tests.

The `httpd` cookbook defines [these custom matchers](https://github.com/chef-cookbooks/httpd/blob/dc951d170c3051742782f58a2e651cba1917994a/libraries/matchers.rb).

* `create_httpd_config`
* `delete_httpd_config`
* `create_httpd_module`
* `delete_httpd_module`
* `create_httpd_service`
* `delete_httpd_service`

The `httpd` cookbook also provides [ChefSpec tests](https://github.com/chef-cookbooks/httpd/tree/dc951d170c3051742782f58a2e651cba1917994a/spec) to help ensure that the cookbook continues to behave as expected as improvements are made to it.

Here's how the `webserver` recipe from our `awesome_customers` cookbook configures Apache.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
httpd_service 'customers' do
  mpm 'prefork'
  action [:create, :start]
end

# Add the site configuration.
httpd_config 'customers' do
  instance 'customers'
  source 'customers.conf.erb'
  notifies :restart, 'httpd_service[customers]'
end
```

And here's how you would use the custom `create_httpd_service` and `create_httpd_config` matchers to validate the `httpd_service` and `httpd_config` resources from ChefSpec. Don't add this code just yet.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/spec/unit/recipes/webserver_spec.rb
it "creates httpd_service['customers']" do
  expect(chef_run).to create_httpd_service('customers')
    .with(
        mpm: 'prefork'
      )
end

it "creates httpd_config['customers']" do
  expect(chef_run).to create_httpd_config 'customers'
end
```

Here's how the `webserver` recipe configures the document root.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# [...]

# Create the document root directory.
directory node['awesome_customers']['document_root'] do
  recursive true
end

# [...]
```

To test this, you would use the built-in `create_directory` matcher.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/spec/unit/recipes/webserver_spec.rb
it "creates directory['/var/www/customers/public_html']" do
  expect(chef_run).to create_directory('/var/www/customers/public_html')
    .with(
      recursive: true
    )
end
```

Here's how the `webserver` recipe configures the PHP script template to include the database password.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# [...]

# Load the secrets file and the encrypted data bag item that holds the database password.
password_secret = Chef::EncryptedDataBagItem.load_secret(node['awesome_customers']['passwords']['secret_path'])
user_password_data_bag_item = Chef::EncryptedDataBagItem.load('passwords', 'db_admin_password', password_secret)

# Write the home page.
template "#{node['awesome_customers']['document_root']}/index.php" do
  source 'index.php.erb'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
  variables(
    database_password: user_password_data_bag_item['password']
  )
end

# [...]
```

To test this, you would use the built-in `create_template` and matcher.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/spec/unit/recipes/webserver_spec.rb
it "creates template['/var/www/customers/public_html/index.php']" do
  expect(chef_run).to create_template('/var/www/customers/public_html/index.php')
    .with(
      mode: '0644',
      owner: 'web_admin',
      group: 'web_admin',
      variables: {
        database_password: user_password_data_bag_item['password']
      }
    )
end
```

This is one place where we can use our fake database password. This test doesn't ensure that the _correct_ database password is passed to the template, but it ensures that the template receives the same database password that's defined in the encrypted data bag.

Finally, here's how the `webserver` recipe configures the PHP modules needed to work with Apache and MySQL.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# [...]

# Install the mod_php5 Apache module.
httpd_module 'php' do
  instance 'customers'
end

# Install php5-mysql.
package 'php-mysql' do
  action :install
  notifies :restart, 'httpd_service[customers]'
end
```

To test these resources, you would use the custom `create_http_module` matcher from the `httpd` cookbook and the built-in `install_package` matcher.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/spec/unit/recipes/webserver_spec.rb
it "installs httpd_module['php']" do
  expect(chef_run).to create_httpd_module('php')
end

it "installs package['php-mysql']" do
  expect(chef_run).to install_package('php-mysql')
end
```

Write out your final <code class="file-path">webserver_spec.rb</code> file like this.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/spec/unit/recipes/webserver_spec.rb
require 'spec_helper'

describe 'awesome_customers::webserver' do
  context 'When all attributes are default, on an unspecified platform' do
    let(:chef_run) do
      runner = ChefSpec::ServerRunner.new
      runner.converge(described_recipe)
    end

    let(:secret_path) { '/etc/chef/encrypted_data_bag_secret' }
    let(:secret) { 'secret' }
    let(:user_password_data_bag_item) do
      { password: 'fake_password' }
    end

    before do
      allow(File).to receive(:exist?).and_call_original
      allow(File).to receive(:exist?).with(secret_path).and_return('true')

      allow(IO).to receive(:read).and_call_original
      allow(IO).to receive(:read).with(secret_path).and_return(secret)

      allow(Chef::EncryptedDataBagItem).to receive(:load).with('passwords', 'db_admin_password', secret).and_return(user_password_data_bag_item)
    end

    it 'converges successfully' do
      expect { chef_run }.to_not raise_error
    end

    it "creates httpd_service['customers']" do
      expect(chef_run).to create_httpd_service('customers')
        .with(
            mpm: 'prefork'
          )
    end

    it "creates httpd_config['customers']" do
      expect(chef_run).to create_httpd_config 'customers'
    end

    it "creates directory['/var/www/customers/public_html']" do
      expect(chef_run).to create_directory('/var/www/customers/public_html')
        .with(
          recursive: true
        )
    end

    it "creates template['/var/www/customers/public_html/index.php']" do
      expect(chef_run).to create_template('/var/www/customers/public_html/index.php')
        .with(
          mode: '0644',
          owner: 'web_admin',
          group: 'web_admin',
          variables: {
            database_password: user_password_data_bag_item['password']
          }
        )
    end

    it "installs httpd_module['php']" do
      expect(chef_run).to create_httpd_module('php')
    end

    it "installs package['php-mysql']" do
      expect(chef_run).to install_package('php-mysql')
    end
  end
end
```

Run `rspec` to run the tests.

```bash
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
$ rspec --color spec/unit/recipes/webserver_spec.rb
.......

Finished in 30.91 seconds (files took 13.31 seconds to load)
7 examples, 0 failures
```

Great work. You now have a set of tests that help validate that the `awesome_customers` cookbook's resources are properly defined. You have a few more tests than you need because the `awesome_customers` cookbook's resources don't define dynamic behaviors, but you now know how to work with encrypted data bag items and use custom matchers in your tests.

[GITHUB] The reference implementation on [GitHub](https://github.com/learn-chef/test-your-infrastructure-code-rhel) contains tests for the other recipes in this cookbook. These tests are minimal and ensure only that the `chef-client` run would complete without raising an error.
