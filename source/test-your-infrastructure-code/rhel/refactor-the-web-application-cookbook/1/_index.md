## 1. Verify the awesome_customers cookbook places the system in the desired state

In this part, you'll write Serverspec tests that verify the state of the web application on a Test Kitchen instance.

In the [Manage a basic web application](/manage-a-web-app/rhel/) tutorial, you manually logged in to your node and ran commands to verify the configuration. Here, we'll translate each manual test to an automated one.

Let's begin by writing one test that verifies that you can access the web application and that the home page contains the correct title.

Add the following to your default Serverspec test, <code class="file-path">default_spec.rb</code>.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/test/integration/default/serverspec/default_spec.rb
require 'spec_helper'

describe 'the customers web application' do
  it 'is up and running' do
    expect(command('curl localhost').stdout).to match '<title>Customers</title>'
  end
end
```

When you logged into your node, you ran [these manual tests](/manage-a-web-app/rhel/apply-and-verify-your-web-server-configuration#step5
) to verify that:

* the user `web_admin` exists.
* `web_admin` owns the default home page.
* the `httpd-customers` service is running.
* the home page is in the location we expect.

Let's translate these manual checks into Serverspec tests.

### Fetch details for user web_admin

You ran this command on your node to verify that the user `web_admin` exists.

```bash
# ~
$ getent passwd web_admin
web_admin:x:498:500::/home/web_admin:/bin/bash
```

The `getent passwd` command returns the specified user's home directory and login shell. In Serverspec, the [user](http://serverspec.org/resource_types.html#user) resource's `have_home_directory` and `have_login_shell` matchers give us this information.

Append this code to <code class="file-path">default_spec.rb</code>.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/test/integration/default/serverspec/default_spec.rb
describe 'the web_admin user' do
  it 'has home directory /home/web_admin' do
    expect(user 'web_admin').to have_home_directory '/home/web_admin'
  end

  it 'has login shell /bin/bash' do
    expect(user 'web_admin').to have_login_shell '/bin/bash'
  end
end
```

### Verify that web_admin owns the default home page

You ran this command on your node to verify that `web_admin` owns the default home page.

```bash
$ stat -c "%U %G" /var/www/customers/public_html/index.php
web_admin web_admin
```

The `stat` command displays properties about the specified file. The `-c "%U %G"` part formats the output to display only the user and group names of the owner.

In Serverspec, the [file](http://serverspec.org/resource_types.html#file) resource's `be_owned_by` and `be_grouped_into` matchers give us this information.

Append this code to <code class="file-path">default_spec.rb</code>.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/test/integration/default/serverspec/default_spec.rb
describe 'the default home page' do
  it 'is owned by web_admin' do
    expect(file '/var/www/customers/public_html/index.php').to be_owned_by 'web_admin'
    expect(file '/var/www/customers/public_html/index.php').to be_grouped_into 'web_admin'
  end
end
```

### Verify that the httpd-customers service is running

You ran this command on your node to verify that `httpd-customers` service is running.

```bash
# ~
$ sudo service httpd-customers status
httpd-customers (pid  2335) is running...
```

In Serverspec, the [service](http://serverspec.org/resource_types.html#service) resource's `be_enabled` and `be_running` matchers tells us whether a service is enabled and running.

Append this code to <code class="file-path">default_spec.rb</code>.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/test/integration/default/serverspec/default_spec.rb
describe 'the httpd-customers service' do
  it 'is enabled' do
    expect(service 'httpd-customers').to be_enabled
  end
  it 'is running' do
    expect(service 'httpd-customers').to be_running
  end
end
```

### Verify that the home page is in the location we expect

You ran this command on your node to verify that home page is located at <code class="file-path"> /var/www/customers/public_html/index.php</code>.

```bash
# ~
$ more /var/www/customers/public_html/index.php
<html>This is a placeholder</html>
```

In Serverspec, the [file](http://serverspec.org/resource_types.html#file) resource's `exist` and `be_file` matchers tells us that the file exists (the `be_file` matcher confirms that the item is a file and not a directory.) We can also use the `be_mode` matcher to verify that the file's mode is the one that the recipe specifies &ndash; `0644`. `0644` specifies that the file is readable and writable only by the owner, and readable by everyone else.

Append this code to <code class="file-path">default_spec.rb</code>.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/test/integration/default/serverspec/default_spec.rb
describe 'the default home page' do
  let(:index) { '/var/www/customers/public_html/index.php' }
  it 'exists' do
    expect(file index).to exist
  end
  it 'is a file' do
    expect(file index).to be_file
  end
  it 'has mode 644' do
    expect(file index).to be_mode 644
  end
end
```

Your final <code class="file-path">default_spec.rb</code> file looks like this.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers/test/integration/default/serverspec/default_spec.rb
require 'spec_helper'

describe 'the customers web application' do
  it 'is up and running' do
    expect(command('curl localhost').stdout).to match '<title>Customers</title>'
  end
end

describe 'the web_admin user' do
  it 'has home directory /home/web_admin' do
    expect(user 'web_admin').to have_home_directory '/home/web_admin'
  end

  it 'has login shell /bin/bash' do
    expect(user 'web_admin').to have_login_shell '/bin/bash'
  end
end

describe 'the default home page' do
  it 'is owned by web_admin' do
    expect(file '/var/www/customers/public_html/index.php').to be_owned_by 'web_admin'
    expect(file '/var/www/customers/public_html/index.php').to be_grouped_into 'web_admin'
  end
end

describe 'the httpd-customers service' do
  it 'is enabled' do
    expect(service 'httpd-customers').to be_enabled
  end
  it 'is running' do
    expect(service 'httpd-customers').to be_running
  end
end

describe 'the default home page' do
  let(:index) { '/var/www/customers/public_html/index.php' }
  it 'exists' do
    expect(file index).to exist
  end
  it 'is a file' do
    expect(file index).to be_file
  end
  it 'has mode 644' do
    expect(file index).to be_mode 644
  end
end
```

Let's run our tests. Run `kitchen test` to destroy the previous instance if it exists, create a new instance, run `chef-client`, and run our Serverspec tests.

```bash
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
$ kitchen test
-----> Starting Kitchen (v1.8.0)
-----> Cleaning up any prior instances of <default-centos-66>
-----> Destroying <default-centos-66>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-centos-66> destroyed.
       Finished destroying <default-centos-66> (0m4.14s).
-----> Testing <default-centos-66>
-----> Creating <default-centos-66>...
[...]
       Recipe: awesome_customers::webserver


             - install version 2.2.15-47.el6.centos of package httpd
        (up to date)
        (up to date)
        (up to date)
           * httpd_module[customers :create log_config] action create
        (up to date)

        - create new directory /etc/httpd-customers/conf.d
        - change owner from '' to 'root'
[...]
       the customers web application
         is up and running

       the web_admin user
         has home directory /home/web_admin
         has login shell /bin/bash

       the default home page
         is owned by web_admin

       the httpd-customers service
         is enabled
         is running

       the default home page
         exists
         is a file
         has mode 644

       Finished in 0.14921 seconds (files took 0.27138 seconds to load)
       9 examples, 0 failures

       Finished verifying <default-centos-66> (0m16.04s).
-----> Destroying <default-centos-66>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-centos-66> destroyed.
       Finished destroying <default-centos-66> (0m3.91s).
       Finished testing <default-centos-66> (3m54.59s).
-----> Kitchen is finished. (3m55.42s)
```

You'll see from the output that Test Kitchen brought up the instance, ran `chef-client`, verified that all Serverspec tests pass, and destroyed the instance.

You can also verify from the command line that the process completed with no errors.

### From a Linux or Mac OS workstation

```bash
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
$ echo $?
0
```

### From a Windows workstation

```ps
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
$ echo $LastExitCode
0
```
