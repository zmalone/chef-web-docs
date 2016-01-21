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

```yaml
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
         4) Validate web services Ensure no web files are owned by the root user /var/www/html/pages/page1.html is not owned by the root user
            Failure/Error: expect(file(web_file)).to_not be_owned_by('root')
       expected `File "/var/www/html/pages/page1.html".owned_by?("root")` to return false, got true
            # /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb:10:in `block (4 levels) in from_file'

       Finished in 0.15757 seconds (files took 0.36164 seconds to load)
       4 examples, 4 failures

       Failed examples:

       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:1] # Validate web services Ensure no web files are owned by the root user /var/www/html/index.html is not owned by the root user
       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:2] # Validate web services Ensure no web files are owned by the root user /var/www/html/pages is not owned by the root user
       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:3] # Validate web services Ensure no web files are owned by the root user /var/www/html/pages/page2.html is not owned by the root user
       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:4] # Validate web services Ensure no web files are owned by the root user /var/www/html/pages/page1.html is not owned by the root user


         Audit phase found failures - 4/4 controls failed

         Running handlers:
         Running handlers complete
         Chef Client finished, 5/7 resources updated in 9.06130736 seconds
           0/4 controls succeeded
       [2015-08-07T15:43:11+00:00] FATAL: Stacktrace dumped to /tmp/kitchen/cache/chef-stacktrace.out
       [2015-08-07T15:43:11+00:00] ERROR: Found 1 errors, they are stored in the backtrace
       [2015-08-07T15:43:12+00:00] FATAL: Chef::Exceptions::ChildConvergeError: Chef run process exited unsuccessfully (exit code 1)
[...]
```

Although the web server was successfully configured, the audit run failed. You'll see from the output that the <code class="file-path">/var/www/html/pages</code> directory and our three web files caused the audit run to fail.

```bash
# ~/chef-repo/cookbooks/webserver
[...]
       Failed examples:

       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:1] # Validate web services Ensure no web files are owned by the root user /var/www/html/index.html is not owned by the root user
       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:2] # Validate web services Ensure no web files are owned by the root user /var/www/html/pages is not owned by the root user
       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:3] # Validate web services Ensure no web files are owned by the root user /var/www/html/pages/page2.html is not owned by the root user
       rspec /tmp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:4] # Validate web services Ensure no web files are owned by the root user /var/www/html/pages/page1.html is not owned by the root user
[...]
```

The next step is to revise the `webserver` cookbook to incorporate our audit policy and verify that the system meets compliance.
