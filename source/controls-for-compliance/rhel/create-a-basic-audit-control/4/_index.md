## 4. Create the webserver cookbook

Now let's create and apply a second cookbook that configures Apache and adds a few web pages.

First, from your <code class="file-path">~/chef-repo</code> directory, create the `webserver` cookbook.

```bash
# ~/chef-repo
$ chef generate cookbook cookbooks/webserver
```

Now add this code to the `webserver` cookbook's default recipe.

```ruby
# ~/chef-repo/cookbooks/webserver/recipes/default.rb
# Install the httpd package.
package 'httpd'

# Enable and start the httpd service.
service 'httpd' do
  action [:enable, :start]
end

# Create the pages directory under the document root directory.
directory '/var/www/html/pages'

# Add files to the site.
%w(index.html pages/page1.html pages/page2.html).each do |web_file|
  file File.join('/var/www/html', web_file) do
    content "<html>This is #{web_file}.</html>"
  end
end
```

This recipe configures Apache and writes a few files for it to serve.

[COMMENT] For simplicity, we use the built-in `package` and `service` resources to configure Apache. A more robust solution might use the [httpd](https://supermarket.chef.io/cookbooks/httpd) cookbook from Chef Supermarket.

Now use Test Kitchen to apply the `webserver` cookbook locally. This instance is different than the one you used to apply the `audit` cookbook. Start by adding this to your webserver's <code class="file-path">.kitchen.yml</code> file.

```yaml
# ~/chef-repo/cookbooks/webserver/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero

platforms:
  - name: centos-6.5

suites:
  - name: default
    run_list:
      - recipe[webserver::default]
    attributes:
```

Run `kitchen converge` to create the instance and apply the web server configuration.

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Creating <default-centos-65>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'opscode-centos-6.5'...
[...]
           - update content in file /var/www/html/pages/page2.html from none to 633678
           --- /var/www/html/pages/page2.html	2015-07-24 04:03:08.495379660 +0000
           +++ /var/www/html/pages/.page2.html20150724-1808-h911ix	2015-07-24 04:03:08.495379660 +0000
           @@ -1 +1,2 @@

           - restore selinux security context

       Running handlers:
       Running handlers complete
       Chef Client finished, 7/7 resources updated in 9.503243603 seconds
       Finished converging <default-centos-65> (9m11.73s).
-----> Kitchen is finished. (13m14.49s)
```

Now run `kitchen login` to log into your instance.

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen login
Last login: Fri Jul 24 04:02:58 2015 from 10.0.2.2
```

From your instance, run a few commands to verify that your web server is correctly set up.

```bash
$ ls /var/www/html/**/*
/var/www/html/pages/page1.html  /var/www/html/pages/page2.html
$ wget -qO- localhost | more
<html>This is index.html.</html>
$ wget -qO- localhost/pages/page1.html | more
<html>This is pages/page1.html.</html>
```

Exit your Test Kitchen instance.

```bash
$ exit
logout
Connection to 127.0.0.1 closed.
```

If you're the web site developer or system administrator, this configuration can look completely reasonable &ndash; it does everything you need it to do. Now let's see what happens when we audit the web server configuration.
