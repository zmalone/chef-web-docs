## 3. Add a home page

Let's spruce things up and add a custom home page.

You already know how to configure a `file` resource; append one that configures the default home page, <code class="file-path">/var/www/html/index.html</code>, to the end of <code class="file-path">webserver.rb</code>. The entire recipe now looks like this.

[TIP] Although we believe typing in the code and commands is a great way to learn, remember you can copy the text from the code and terminal boxes and paste them into your remote session.

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
$ sudo chef-client --local-mode webserver.rb
[2016-01-07T18:56:55+00:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T18:56:55+00:00] WARN: No cookbooks directory found at or above current directory.  Assuming /home/root/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T18:56:57+00:00] WARN: Node default-ubuntu-1404 has an empty run list.
Converging 3 resources
Recipe: @recipe_files::/home/root/chef-repo/webserver.rb
  * apt_package[apache2] action install (up to date)
  * service[apache2] action enable (up to date)
  * service[apache2] action start (up to date)
  * file[/var/www/html/index.html] action create
    - update content in file /var/www/html/index.html from 538f31 to 2914aa
    --- /var/www/html/index.html	2016-01-07 18:16:08.894360163 +0000
    +++ /var/www/html/.index.html20160107-8719-18dwgzp	2016-01-07 18:56:57.316020000 +0000
[...]
    +    <h1>hello world</h1>
       </body>
     </html>
    -

Running handlers:
Running handlers complete
Chef Client finished, 1/4 resources updated in 01 seconds
```
