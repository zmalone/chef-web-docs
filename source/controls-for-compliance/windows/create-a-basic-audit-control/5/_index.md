## 5. Audit your web server configuration

Now let's apply both the `webserver` and `audit` cookbooks to the same Test Kitchen instance.

In previous steps, you applied the `audit` and `webserver` cookbooks on separate Test Kitchen instances. Let's set things up so that you can run them both from the same instance. Here you'll apply the `audit` cookbook from the Test Kitchen instance for your `webserver` cookbook.

Test Kitchen uses [Berkshelf](http://berkshelf.com) to resolve dependencies among cookbooks (if you haven't gone through the _Learn to manage a basic web application_ tutorial, you can [read](/manage-a-web-app/rhel/apply-and-verify-your-web-server-configuration#1uploadyourcookbooktothechefserver) a bit about how Berkshelf works.) Berkshelf resolves dependencies that come from a remote source, such as Chef Supermarket, or from your local system.

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
  - name: windows-2012r2

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
-----> Converging <default-windows-2012r2>...
       Preparing files for transfer
[...]
         3) Validate web services Ensure no web files are owned by the Administrators group c:/inetpub/wwwroot/pages/Page2.htm must not be owned by Administrators
            Failure/Error: expect(command("(Get-ChildItem #{web_file} | Get-Acl).Owner").stdout).to_not match(/Administrators$/)
       expected "BUILTIN\\Administrators\n" not to match /Administrators$/
       Diff:
       @@ -1,2 +1,2 @@
       -/Administrators$/
       +BUILTIN\Administrators
            # C:/Users/vagrant/AppData/Local/Temp/kitchen/cache/cookbooks/audit/recipes/default.rb:10:in `block (4 levels) in from_file'

       Finished in 0.8741 seconds (files took 0.70404 seconds to load)
       3 examples, 3 failures

       Failed examples:

       rspec 'C:/Users/vagrant/AppData/Local/Temp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:1]' # Validate web services Ensure no web files are owned by the Administrators group c:/inetpub/wwwroot/Default.htm must not be owned by Administrators
       rspec 'C:/Users/vagrant/AppData/Local/Temp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:2]' # Validate web services Ensure no web files are owned by the Administrators group c:/inetpub/wwwroot/pages/Page1.htm must not be owned by Administrators
       rspec 'C:/Users/vagrant/AppData/Local/Temp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:3]' # Validate web services Ensure no web files are owned by the Administrators group c:/inetpub/wwwroot/pages/Page2.htm must not be owned by Administrators

       Audit phase exception:
         Audit phase found failures - 3/3 controls failed

         Running handlers:
         Running handlers complete
         Chef Client finished, 0/7 resources updated in 32.249988 seconds
           0/3 controls succeeded
[...]
```

Although the web server was successfully configured, the audit run failed. You'll see from the output that our three web files caused the audit run to fail.

```bash
# ~/chef-repo/cookbooks/webserver
[...]
       Failed examples:

       rspec 'C:/Users/vagrant/AppData/Local/Temp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:1]' # Validate web services Ensure no web files are owned by the Administrators group c:/inetpub/wwwroot/Default.htm must not be owned by Administrators
       rspec 'C:/Users/vagrant/AppData/Local/Temp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:2]' # Validate web services Ensure no web files are owned by the Administrators group c:/inetpub/wwwroot/pages/Page1.htm must not be owned by Administrators
       rspec 'C:/Users/vagrant/AppData/Local/Temp/kitchen/cache/cookbooks/audit/recipes/default.rb[1:1:3]' # Validate web services Ensure no web files are owned by the Administrators group c:/inetpub/wwwroot/pages/Page2.htm must not be owned by Administrators
[...]
```

The next step is to revise the `webserver` cookbook to incorporate our audit policy and verify that the system meets compliance.
