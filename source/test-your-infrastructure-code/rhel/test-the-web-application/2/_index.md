## 2. Verify your resources are properly defined

Create ChefSpec tests

FOCUS - only on web server portion of the cookbook

Define what a matcher is.

https://github.com/chef-cookbooks/httpd/blob/dc951d170c3051742782f58a2e651cba1917994a/libraries/matchers.rb

https://github.com/opscode-cookbooks/firewall/blob/7d37d91d48d31906cf0306b2bcabba01d67fda0d/libraries/matchers.rb

```ruby
# ~/chef-repo/cookbooks/awesome_customers/spec/unit/recipes/webserver_spec.rb
require 'spec_helper'

describe 'awesome_customers::webserver' do

  context 'When all attributes are default, on an unspecified platform' do

    let(:chef_run) do
      runner = ChefSpec::ServerRunner.new
      runner.converge(described_recipe)
    end

    let(:secret_path) { '/etc/chef/encrypted_data_bag_secret' }
    let(:secret) { 'secret' }
    let(:user_password_data_bag_item) do { password: 'sample_password' } end

    before do
      allow(File).to receive(:exist?).and_call_original
      allow(File).to receive(:exist?).with(secret_path).and_return('true')

      allow(IO).to receive(:read).and_call_original
      allow(IO).to receive(:read).with(secret_path).and_return(secret)

      allow(Chef::EncryptedDataBagItem).to receive(:load).with('passwords', 'db_admin_password', secret).and_return({
        password: 'sample_password'
      })
    end

    it 'converges successfully' do
      chef_run # This should not raise an error
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

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ rspec spec/unit/recipes/webserver_spec.rb
.

Finished in 34.45 seconds (files took 11.97 seconds to load)
8 examples, 0 failures
```

[COMMENT] You'll likely see lots of warnings appear at the start of the output. These warnings are OK to ignore, and we're working to remove them.
