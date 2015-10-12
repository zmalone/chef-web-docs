## 7. Write additional Serverspec tests

You've satisfied the basic requirements for your web server. Your test verifies that it can access the home page and that the home page contains "hello".

However, as you add additional features, you may introduce a _regresssion_, or break, in existing functionality. Your test verifies only the end result of your web configuration. If this test were to fail, you would have to perform additional troubleshooting to understand the root cause.

Let's write a few more tests that verify other aspects of your configuration. Specifically, we'll verify that:

* the `httpd` package is installed.
* the `httpd` service is running.
* port 80 is listening to incoming requests.

Doing so gives you more information that will enable you to better pinpoint the root cause of failure.

Our new tests will follow the same format as the first one. Append one test for each of the above requirements to <code class="file-path">default_spec.rb</code>, making the entire file look like this.

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

[START_MODAL serverspec-closer-look A closer look at a Serverspec test]

The format of an RSpec test (remember, Serverspec is based on RSpec) has two main components: the _subject to examine_ and the subject's _expected state_. Let's see how this relates to our initial test.

```ruby
# ~/webserver/test/integration/default/serverspec/default_spec.rb
expect(command('curl localhost').stdout).to match /hello/
```

Here, the subject to examine is the result of the `curl localhost` command &ndash; specifically, the text that's printed to the standard output stream (stdout). The expected state, or the desired result, is that the output of the `curl localhost` command match the regular expression `/hello/`.

The `match` method is an example of a _matcher_. Think of a matcher as a way to define the expected state.

The `to` method means that we expect a positive match, in other words, the expectation is for the match to succeed. If instead we want to verify that the result does _not_ match the regular expression `/hello/`, we would write this.

```ruby
# ~/webserver/test/integration/default/serverspec/default_spec.rb
expect(command('curl localhost').stdout).not_to match /hello/
```

(You can use `not_to` and `to_not` interchangeably.)

Let's look at the next test.

```ruby
# ~/webserver/test/integration/default/serverspec/default_spec.rb
expect(package 'httpd').to be_installed
```

Here, the subject is the `httpd` package (Serverspec defines the `package` method as a [short-hand way](https://github.com/mizzy/serverspec/blob/8139e844048712dcc1b7b036d3651bb48b68bf14/lib/serverspec/helper/type.rb#L8) of creating a [Package](https://github.com/mizzy/serverspec/blob/6df93896d92e5d8700886911dfa3aa1e06a7c215/lib/serverspec/type/package.rb#L2) object.) The expectation is that the `httpd` package be installed. Serverspec defines the [be_installed](https://github.com/mizzy/serverspec/blob/master/lib/serverspec/matcher/be_installed.rb) method to call the [installed?](https://github.com/mizzy/serverspec/blob/6df93896d92e5d8700886911dfa3aa1e06a7c215/lib/serverspec/type/package.rb#L3) method on the subject. A matcher's underlying call, for example, the `installed?` method, is also called a _predicate_. A predicate is a method that returns `true` or `false`.

Ruby, unlike many programming languages, doesn't require you to surround a method's parameters with parenthesis unless they're required to make the intention clear. For example, these two lines mean the same thing.

```ruby
# default_spec.rb
package 'httpd'
package('httpd')
```

The reduced need for parenthesis is one thing that helps RSpec tests read similar to natural language.

This tutorial uses what's called the _expectation syntax_. You'll see examples in other places that use the _should_ syntax ([this article](http://rspec.info/blog/2012/06/rspecs-new-expectation-syntax/) explains the differences in greater detail.) Both styles are valid, just be aware of the differences.

If you're new to Ruby programming or testing with RSpec, the best way to get started is to adapt other examples that you see. The [Serverspec documentation](http://serverspec.org/resource_types.html) provides the full list of available resource types, and has many good examples.

[END_MODAL]

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
