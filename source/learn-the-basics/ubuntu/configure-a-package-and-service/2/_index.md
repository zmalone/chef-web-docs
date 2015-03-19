## 2. Start and enable the Apache service

Now let's enable the Apache service when the server boots and start it. Modify <code class="file-path">webserver.rb</code> to look like this.

```ruby
# ~/chef-repo/webserver.rb
package 'apache2'

service 'apache2' do
  action [:enable, :start]
end
```

This code declares multiple actions.

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
