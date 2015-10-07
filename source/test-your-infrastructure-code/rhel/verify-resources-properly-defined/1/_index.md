## 1. Write tests that verify the web server configuration on CentOS and Ubuntu

Let's begin by again writing our tests first, watching them fail, and then writing just enough code to make them pass.

Much like for Serverspec, the `chef generate cookbook` command creates a directory for you to hold your ChefSpec tests. For ChefSpec, tests go in the `spec` directory.

```bash
# ~/webserver
$ tree spec
spec
├── spec_helper.rb
└── unit
    └── recipes
        └── default_spec.rb

2 directories, 2 files
```

You typically define one test, or spec, file for each recipe. So <code class="file-path">default\_spec.rb</code> maps to the default recipe, <code class="file-path">default.rb</code>. If you had a second recipe, say <code class="file-path">firewall.rb</code>, then you would have a spec named <code class="file-path">firewall\_spec.rb</code>.

The default spec that's generated looks like this.

```ruby
# ~/webserver/spec/unit/recipes/default_spec.rb
require 'spec_helper'

describe 'webserver::default' do
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

The `describe` blocks tells ChefSpec to run the `webserver::default` recipe in memory. The `let` block simulates the `chef-client` run. It also defines the `chef_run` variable, which is used in each test to validate the result.

`ChefSpec::ServerRunner` specifies how to run `chef-client` in memory. It's a common option because it also simulates an in-memory Chef server, allowing you to access data bags and other features.

To write our tests, we'll use the same `expect` syntax that we used for our Serverspec tests. Add tests to <code class="file-path">default\_spec.rb</code> that validate that the proper package and service names are used on both CentOS and Ubuntu, making the entire file look like this.

```ruby
# ~/webserver/spec/unit/recipes/default_spec.rb
require 'spec_helper'

describe 'webserver::default' do
  context 'on CentOS' do
    let(:chef_run) do
      runner = ChefSpec::ServerRunner.new(platform: 'centos', version: '6.6')
      runner.converge(described_recipe)
    end

    it 'converges successfully' do
      expect { chef_run }.to_not raise_error
    end

    it 'installs httpd' do
      expect(chef_run).to install_package 'httpd'
    end

    it 'enables the httpd service' do
      expect(chef_run).to enable_service 'httpd'
    end

    it 'starts the httpd service' do
      expect(chef_run).to start_service 'httpd'
    end
  end

  context 'on Ubuntu' do
    let(:chef_run) do
      runner = ChefSpec::ServerRunner.new(platform: 'ubuntu', version: '14.04')
      runner.converge(described_recipe)
    end

    it 'converges successfully' do
      expect { chef_run }.to_not raise_error
    end

    it 'installs apache2' do
      expect(chef_run).to install_package 'apache2'
    end

    it 'enables the apache2 service' do
      expect(chef_run).to enable_service 'apache2'
    end

    it 'starts the apache2 service' do
      expect(chef_run).to start_service 'apache2'
    end
  end
end
```

This spec file contains two `context` blocks &ndash; one that simulates the application of the default recipe on CentOS 6.6 and one that simulates the default recipe on Ubuntu 14.04. Because we provide a platform name and version when we call `ChefSpec::ServerRunner.new`, ChefSpec can set the appropriate [automatic node attributes](https://docs.chef.io/ohai.html#automatic-attributes
), such as `node['platform']` and `node['platform_version']`.

[COMMENT] The [ChefSpec documentation](http://www.rubydoc.info/github/sethvargo/chefspec) lists the matchers that are available in your tests. For example, [ServiceMatchers](http://www.rubydoc.info/github/sethvargo/chefspec/ChefSpec/API/ServiceMatchers) describes the `enable_service` and `start_service` matchers.<br/>You can also browse these [additional examples](https://github.com/sethvargo/chefspec/tree/master/examples).

Remember, ChefSpec only simluates the execution of your resources; it doesn't run the code on a real instance. Therefore we can't things like whether port 80 would be open or whether `curl localhost` would succeed because ChefSpec does not have that information. ChefSpec tests only what's expressed directly in your code.
