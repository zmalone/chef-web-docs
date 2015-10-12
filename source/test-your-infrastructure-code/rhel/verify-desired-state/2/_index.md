## 2. Write a test that verifies the web server configuration

The `chef generate cookbook` command creates a <code class="file-path">test</code> directory for you to hold your Serverspec tests.

```bash
# ~/webserver
$ tree test
test
└── integration
    ├── default
    │   └── serverspec
    │       └── default_spec.rb
    └── helpers
        └── serverspec
            └── spec_helper.rb

5 directories, 2 files
```

The file <code class="file-path">default\_spec.rb</code> will hold our tests. The file <code class="file-path">spec\_helper.rb</code> contains standard functionality that's used by all tests.

Here's the format of a Serverspec test.

```ruby
# default_spec.rb
describe '<entity>' do
  it '<description>' do
    expect(<thing>).to eq <result>
  end
end
```

The `describe` part organizes related tests, for example, the state of a web or database server.

Every `describe` block breaks down into `it` blocks. An `it` block tests one part of the system by defining one or more `expect` statements. An `expect` statement verifies that a component such as a package, service, file, or output from a command, meets the desired state. As with many test frameworks, Serverspec code resembles natural language.

The default test, or _spec_, that's generated for you looks like this.

```ruby
# ~/webserver/test/integration/default/serverspec/default_spec.rb
require 'spec_helper'

describe 'webserver::default' do
  # Serverspec examples can be found at
  # http://serverspec.org/resource_types.html
  it 'does something' do
    skip 'Replace this with meaningful tests'
  end
end
```

Recall that the criteria for the web server configuration are:

* the ability to access the home page.
* the web server returns a custom home page.

Say that the custom home page always contains the word "hello". We can write one test that validates our criteria.

Replace the contents of <code class="file-path">default_spec.rb</code> with this.

```ruby
# ~/webserver/test/integration/default/serverspec/default_spec.rb
require 'spec_helper'

describe 'apache' do
  it 'displays a custom home page' do
    expect(command('curl localhost').stdout).to match /hello/
  end
end
```

This test uses Serverspec's [command](http://serverspec.org/resource_types.html#command) resource to run `curl localhost`. It then checks that the output contains the word "hello".

[RUBY] This example uses a regular expression to compare the result against the expected value. Regular expressions in Ruby are usually surrounded with forward slashes `/`. [Rubular](http://rubular.com) is a handy way to test out your regular expressions.
