## 2. Start and enable the Apache service

Now let's enable the Apache service when the server boots and start it. Modify <code class="file-path">webserver.rb</code> to look like this.

```ruby
# ~/chef-repo/webserver.rb
package 'apache2'

service 'apache2' do
  supports :status => true
  action [:enable, :start]
end
```

This code declares multiple actions.

[LINUX] Ubuntu 14.04 provides two init systems. The `supports :status => true` part tells Chef that the `apache2` init script supports the `status` message. This information helps Chef use the appropriate strategy to determine if the `apache2` service is running. If you're interested, read [this blog post](https://www.chef.io/blog/2014/09/18/chef-where-is-my-ubuntu-14-04-service-support/) for more information.

Now apply it.

```bash
# ~/chef-repo
$ sudo chef-apply webserver.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * package[apache2] action install (up to date)
  * service[apache2] action enable (up to date)
  * service[apache2] action start (up to date)  
```

The package is already installed, so there's nothing to do. Similarly, the service is already started and enabled. On some Linux distros, Apache is not started or enabled as it is installed. With Chef, this is easy to verify.
