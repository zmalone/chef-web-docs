## 2. Start and enable the Apache service

Now let's first enable the Apache service when the server boots and then start the service. Modify <code class="file-path">webserver.rb</code> to look like this.

```ruby
# ~/chef-repo/webserver.rb
package 'apache2'

service 'apache2' do
  supports :status => true
  action [:enable, :start]
end
```

This code declares multiple actions.

[LINUX] Ubuntu 14.04 provides two init systems. The `supports :status => true` part tells Chef that the `apache2` init script supports the `status` message. This information helps Chef use the appropriate strategy to determine if the `apache2` service is running. If you're interested, [read this blog post](https://www.chef.io/blog/2014/09/18/chef-where-is-my-ubuntu-14-04-service-support/) for more information.

Now apply it.

```bash
# ~/chef-repo
$ sudo chef-client --local-mode webserver.rb
[2016-01-07T18:17:38+00:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T18:17:38+00:00] WARN: No cookbooks directory found at or above current directory.  Assuming /root/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T18:17:39+00:00] WARN: Node default-ubuntu-1404 has an empty run list.
Converging 2 resources
Recipe: @recipe_files::/root/chef-repo/webserver.rb
  * apt_package[apache2] action install (up to date)
  * service[apache2] action enable (up to date)
  * service[apache2] action start (up to date)

Running handlers:
Running handlers complete
Chef Client finished, 0/3 resources updated in 01 seconds
```

The package is already installed, so there's nothing to do. Similarly, the service is already started and enabled. On some Linux distros, Apache is not started or enabled as it is installed. With Chef, this is easy to verify.
