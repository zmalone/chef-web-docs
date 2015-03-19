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
$ sudo chef-apply webserver.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * package[httpd] action install (up to date)
  * service[httpd] action enable
    - enable service service[httpd]
  * service[httpd] action start
    - start service service[httpd]
```

The package is already installed, so there's nothing to do. However, the service is started and enabled.
