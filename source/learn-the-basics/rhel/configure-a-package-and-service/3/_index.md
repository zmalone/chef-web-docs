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
$ sudo chef-apply webserver.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * yum_package[httpd] action install (up to date)
  * service[httpd] action enable (up to date)
  * service[httpd] action start (up to date)  
  * file[/var/www/html/index.html] action create
    - create new file /var/www/html/index.html
    - update content in file /var/www/html/index.html from none to b8b8af
    --- /var/www/html/index.html2014-06-27 15:11:55.190162819 -0400
    +++ /tmp/.index.html20140627-9382-1nx42372014-06-27 15:11:55.190162819 -0400
    @@ -1 +1,6 @@
    +<html>
    +  <body>
    +    <h1>hello world</h1>
    +  </body>
    +  </html>
```

The package and the service are already in the desired state, but you'll see that the home page, <code class="file-path">/var/www/html/index.html</code>, is created.
