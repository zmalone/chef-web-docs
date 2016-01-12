## 2. Start and enable the Apache service

Now let's enable the Apache service when the server boots and start it. Modify <code class="file-path">webserver.rb</code> to look like this.

```ruby
# ~/chef-repo/webserver.rb
package 'httpd'

service 'httpd' do
  action [:enable, :start]
end
```

This code declares multiple actions.

Now apply it.

```bash
# ~/chef-repo
$ sudo chef-client --local-mode webserver.rb
[2016-01-07T17:24:52+00:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T17:24:52+00:00] WARN: No cookbooks directory found at or above current directory.  Assuming /root/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T17:24:54+00:00] WARN: Node default-centos-65 has an empty run list.
Converging 2 resources
Recipe: @recipe_files::/root/chef-repo/webserver.rb
  * yum_package[httpd] action install (up to date)
  * service[httpd] action enable
    - enable service service[httpd]
  * service[httpd] action start
    - start service service[httpd]

Running handlers:
Running handlers complete
Chef Client finished, 2/3 resources updated in 02 seconds
```

The package is already installed, so there's nothing to do. However, the service is started and enabled.
