## 2. Start and enable the Apache service

Now let's start the Apache service and enable it when the server boots. Modify <code class="file-path">webserver.rb</code> to look like this.

```ruby
# ~/chef-repo/webserver.rb
package 'httpd'

service 'httpd' do
  action [:start, :enable]
end
```

This code declares multiple actions.

Now apply it.

```bash
# ~/chef-repo
$ sudo chef-apply webserver.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * package[httpd] action install (up to date)
  * service[httpd] action start
    - start service service[httpd]
  * service[httpd] action enable
    - enable service service[httpd]
```

The package is already installed, so there's nothing to do. However, the service is started and enabled.
