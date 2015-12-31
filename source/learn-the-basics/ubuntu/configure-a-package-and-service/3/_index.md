## 3. Add a home page

Let's spruce things up and add a custom home page.

You already know how to configure a `file` resource; append one that configures the default home page, <code class="file-path">/var/www/html/index.html</code>, to the end of <code class="file-path">webserver.rb</code>. The entire recipe now looks like this.

[TIP] Although we believe typing in the code and commands is a great way to learn, remember you can copy the text from the code and terminal boxes and paste them into your SSH session.

```ruby
# ~/chef-repo/webserver.rb
package 'apache2'

service 'apache2' do
  supports :status => true
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

[LINUX] Versions of Ubuntu prior to 14.04 use <code class="file-path">/var/www/index.html</code> as the default home page, so adjust your recipe accordingly if you're using your own machine.

Now apply it.

```bash
# ~/chef-repo/
$ sudo chef-apply webserver.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * apt_package[apache2] action install (up to date)
  * service[apache2] action enable (up to date)
  * service[apache2] action start (up to date)
  * file[/var/www/html/index.html] action create
    - update content in file /var/www/html/index.html from 538f31 to 2914aa
    --- /var/www/html/index.html	2015-12-30 17:20:58.333013288 +0000
[...]
    -    </div>
    +    <h1>hello world</h1>
       </body>
     </html>
    -
```
