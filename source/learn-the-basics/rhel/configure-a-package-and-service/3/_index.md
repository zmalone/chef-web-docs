## 3. Add a home page

Let's spruce things up and add a custom home page.

You already know how to configure a `file` resource; append one that configures the default home page, <code class="file-path">/var/www/html/index.html</code>, to the end of <code class="file-path">webserver.rb</code>. The entire recipe now looks like this.

[TIP] Although we believe typing in the code and commands is a great way to learn, remember you can copy the text from the code and terminal boxes and paste them into your remote session.

```ruby
# ~/chef-repo/webserver.rb
package 'httpd'

service 'httpd' do
  action [:enable, :start]
end

file '/var/www/html/index.html' do
  content '<html>
  <body>
    <h1>hello world</h1>
  </body>
</html>'
end
```

Now apply it.

```bash
# ~/chef-repo/
$ sudo chef-client --local-mode webserver.rb
[2016-01-07T17:26:11+00:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T17:26:11+00:00] WARN: No cookbooks directory found at or above current directory.  Assuming /home/root/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T17:26:12+00:00] WARN: Node default-centos-65 has an empty run list.
Converging 3 resources
Recipe: @recipe_files::/home/root/chef-repo/webserver.rb
  * yum_package[httpd] action install (up to date)
  * service[httpd] action enable (up to date)
  * service[httpd] action start (up to date)
  * file[/var/www/html/index.html] action create
    - create new file /var/www/html/index.html
    - update content in file /var/www/html/index.html from none to 2914aa
    --- /var/www/html/index.html	2016-01-07 17:26:13.711759153 +0000
    +++ /var/www/html/.index.html20160107-3534-u036h1	2016-01-07 17:26:13.711759153 +0000
    @@ -1 +1,6 @@
    +<html>
    +  <body>
    +    <h1>hello world</h1>
    +  </body>
    +</html>
    - restore selinux security context

Running handlers:
Running handlers complete
Chef Client finished, 1/4 resources updated in 02 seconds
```

The package and the service are already in the desired state, but you'll see that the home page, <code class="file-path">/var/www/html/index.html</code>, is created.
