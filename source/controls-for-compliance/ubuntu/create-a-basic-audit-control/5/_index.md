## 5. Audit your web server configuration

Now let's apply both the `webserver` and `audit` cookbooks to the same Test Kitchen instance.

In previous steps, you applied the `audit` and `webserver` cookbooks on separate Test Kitchen instances. Let's set things up so that you can run them both from the same instance. Here you'll apply the `audit` cookbook from the Test Kitchen instance for your `webserver` cookbook.

Test Kitchen uses [Berkshelf](http://berkshelf.com) to resolve dependencies among cookbooks (if you haven't gone through the _Learn to manage a basic web application_ tutorial, you can [read](/manage-a-web-app/ubuntu/apply-and-verify-your-web-server-configuration#1uploadyourcookbooktothechefserver) a bit about how Berkshelf works.) Berkshelf resolves dependencies that come from a remote source, such as Chef Supermarket, or from your local system.

To run the `audit` cookbook from your `webserver` cookbook, modify your `webserver` cookbook's <code class="file-path">Berksfile</code> to point to the `audit` cookbook's relative location, like this.

```ruby
# ~/chef-repo/cookbooks/webserver/Berksfile
source 'https://supermarket.chef.io'

metadata

cookbook 'audit', path: '../audit'
```

Now modify your `webserver` cookbook's <code class="file-path">.kitchen.yml</code> file like this. This configuration sets the `audit_mode` to `:enabled` so that `chef-client` runs both the web server configuration code and the audit tests.

```ruby
# ~/chef-repo/cookbooks/webserver/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero
  client_rb:
    audit_mode: :enabled

platforms:
  - name: ubuntu-14.04

suites:
  - name: default
    run_list:
      - recipe[webserver::default]
      - recipe[audit::default]
    attributes:
```

This configuration also adds the `audit` cookbook's default recipe to the run-list. The order is important because it ensures that the configuration changes are made before the audit tests are run.

Now run `kitchen converge` from the `webserver` cookbook's directory.

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Converging <default-ubuntu-1404>...
       Preparing files for transfer
[...]
         4) Validate web services Ensure no web files are owned by the root user is not owned by the root user
            Failure/Error: expect(file(web_file)).to_not be_owned_by('root')
       expected `File "/var/www/html/pages/page1.html".owned_by?("root")` to return false, got true
            # /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb:11:in `block (4 levels) in from_file'

       Finished in 0.13301 seconds (files took 0.37363 seconds to load)
       4 examples, 4 failures

       Failed examples:

       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:1] # Validate web services Ensure no web files are owned by the root user is not owned by the root user
       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:2] # Validate web services Ensure no web files are owned by the root user is not owned by the root user
       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:3] # Validate web services Ensure no web files are owned by the root user is not owned by the root user
       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:4] # Validate web services Ensure no web files are owned by the root user is not owned by the root user

       Audit phase exception:
         Audit phase found failures - 4/4 controls failed

       Running handlers:
       Running handlers complete
       Chef Client finished, 0/7 resources updated in 6.862077521 seconds
         0/4 controls succeeded
       [2015-07-20T17:57:30+00:00] FATAL: Stacktrace dumped to /tmp/kitchen/cache/chef-stacktrace.out
       [2015-07-20T17:57:30+00:00] ERROR: Found 1 errors, they are stored in the backtrace
       [2015-07-20T17:57:31+00:00] FATAL: Chef::Exceptions::ChildConvergeError: Chef run process exited unsuccessfully (exit code 1)
>>>>>> Converge failed on instance <default-ubuntu-1404>.
>>>>>> Please see .kitchen/logs/default-ubuntu-1404.log for more details
>>>>>> ------Exception-------
>>>>>> Class: Kitchen::ActionFailed
>>>>>> Message: SSH exited (1) for command: [sh -c '

sudo -E /opt/chef/bin/chef-client --local-mode --config /tmp/kitchen/client.rb --log_level auto --force-formatter --no-color --json-attributes /tmp/kitchen/dna.json --chef-zero-port 8889
']
>>>>>> ----------------------
```

Although the web server was successfully configured, the `chef-client` run failed because the audit failed. You can look through the error log to see which files failed the audit.

```bash
# ~/chef-repo/cookbooks/webserver
$ less .kitchen/logs/default-ubuntu-1404.log | grep 'got true'
I, [2015-07-20T13:57:28.698116 #22441]  INFO -- default-ubuntu-1404: expected `File "/var/www/html/index.html".owned_by?("root")` to return false, got true
I, [2015-07-20T13:57:28.698184 #22441]  INFO -- default-ubuntu-1404: expected `File "/var/www/html/pages".owned_by?("root")` to return false, got true
I, [2015-07-20T13:57:28.698256 #22441]  INFO -- default-ubuntu-1404: expected `File "/var/www/html/pages/page2.html".owned_by?("root")` to return false, got true
I, [2015-07-20T13:57:28.698366 #22441]  INFO -- default-ubuntu-1404: expected `File "/var/www/html/pages/page1.html".owned_by?("root")` to return false, got true
```

The next step is to revise the `webserver` cookbook to incorporate our audit policy and verify that the system meets compliance.
