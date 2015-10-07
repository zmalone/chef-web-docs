## 7. Write additional Serverspec tests

You've satisfied the basic requirements for your web server. Your test verifies that it can access the home page and that the home page contains "hello".

However, as you add additional features, you may introduce a _regresssion_, or break, in existing functionality. Your test verifies only the end result of your web configuration. If this test were to fail, you would have to perform additional troubleshooting to understand the root cause.

Let's write a few more tests that verify other aspects of your configuration. Specifically, we'll verify that:

* the `httpd` package is installed.
* the `httpd` service is running.
* port 80 is listening to incoming requests.

Doing so gives you more information that will enable you to better pinpoint the root cause of failure.

Our new tests will follow the same format as the first one. Append one test for each of the above [requirements] to <code class="file-path">default_spec.rb</code>, making the entire file look like this.

```ruby
# ~/webserver/test/integration/default/serverspec/default_spec.rb
require 'spec_helper'

describe 'apache' do
  it 'displays a custom home page' do
    expect(command('curl localhost').stdout).to match /hello/
  end

  it 'is installed' do
    expect(package 'httpd').to be_installed
  end

  it 'is running' do
    expect(service 'httpd').to be_running
  end

  it 'is listening to port 80' do
    expect(port 80).to be_listening
  end
end
```

[COMMENT] These tests use Serverspec's built-in `package`, `service`, `port`, and `command` resources. You can find the full list of available resource types in the [Serverspec documentation](http://serverspec.org/resource_types.html
).

Now run `kitchen verify` to run your new tests.

```bash
# ~/webserver
$ kitchen verify
-----> Starting Kitchen (v1.4.2)
-----> Setting up <default-centos-66>...
       Finished setting up <default-centos-66> (0m0.00s).
-----> Verifying <default-centos-66>...
       Preparing files for transfer
-----> Busser installation detected (busser)
       Installing Busser plugins: busser-serverspec
       Plugin serverspec already installed
       Removing /tmp/verifier/suites/serverspec
       Transferring files to <default-centos-66>
-----> Running serverspec test suite
       /opt/chef/embedded/bin/ruby -I/tmp/verifier/suites/serverspec -I/tmp/verifier/gems/gems/rspec-support-3.3.0/lib:/tmp/verifier/gems/gems/rspec-core-3.3.2/lib /opt/chef/embedded/bin/rspec --pattern /tmp/verifier/suites/serverspec/\*\*/\*_spec.rb --color --format documentation --default-path /tmp/verifier/suites/serverspec

       apache
         is installed
         is running
         is listening to port 80
         displays a custom home page

       Finished in 0.21102 seconds (files took 0.29319 seconds to load)
       4 examples, 0 failures

       Finished verifying <default-centos-66> (0m3.57s).
-----> Kitchen is finished. (0m4.10s)
```

All tests pass! Now your tests cover multiple points of failure. If one of the tests fail, you'll be closer to the root cause.

Now run `kitchen destroy` to destroy your instance.

```bash
# ~/webserver
$ kitchen destroy
-----> Starting Kitchen (v1.4.2)
-----> Destroying <default-centos-66>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-centos-66> destroyed.
       Finished destroying <default-centos-66> (0m3.86s).
-----> Kitchen is finished. (0m4.35s)
```

Run `kitchen list` to verify that the instance no longer exists.

```bash
# ~/webserver
$ kitchen list
Instance           Driver   Provisioner  Verifier  Transport  Last Action
default-centos-66  Vagrant  ChefZero     Busser    Ssh        <Not Created>
```
