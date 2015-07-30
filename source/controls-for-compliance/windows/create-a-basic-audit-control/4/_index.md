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
# Install IIS.
powershell_script 'Install IIS' do
  code 'Add-WindowsFeature Web-Server'
  guard_interpreter :powershell_script
  not_if "(Get-WindowsFeature -Name Web-Server).Installed"
end

# Enable and start W3SVC.
service 'w3svc' do
  action [:enable, :start]
end

# Create the pages directory under the  Web application root directory.
directory 'c:\inetpub\wwwroot\pages'

# Add files to the site.
%w(Default.htm pages\Page1.htm pages\Page2.htm).each do |web_file|
  file File.join('c:\inetpub\wwwroot', web_file) do
    content "<html>This is #{web_file}.</html>"
  end
end
```

This recipe configures Apache and writes a few files for it to serve.

[COMMENT] For simplicity, we use the built-in `package` and `service` resources to configure Apache. A more robust solution might use the [httpd](https://supermarket.chef.io/cookbooks/httpd) cookbook from Chef Supermarket.

Now use Test Kitchen to apply the `webserver` cookbook locally. This instance is different than the one you used to apply the `audit` cookbook. Start by adding this to your webserver's <code class="file-path">.kitchen.yml</code> file.

```ruby
# ~/chef-repo/cookbooks/webserver/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero

platforms:
  - name: windows-2012r2

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
-----> Creating <default-windows-2012r2>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'windows-2012r2'...
[...]
           - update content in file c:\inetpub\wwwroot/pages\Page2.htm from none to 0c8f6e
           --- c:\inetpub\wwwroot/pages\Page2.htm	2015-07-29 14:16:04.000000000 +0000
           +++ c:\inetpub\wwwroot/pages/Page2.htm20150729-2776-90q946	2015-07-29 14:16:04.000000000 +0000
           @@ -1 +1,2 @@
           +<html>This is pages\Page2.htm.</html>

       Running handlers:
       Running handlers complete
       Chef Client finished, 5/7 resources updated in 140.781288 seconds
       Finished converging <default-windows-2012r2> (4m3.84s).
-----> Kitchen is finished. (7m51.92s)
```

Now login to your Windows Server instance through the VirtualBox window that appeared during the `kitchen converge` run. Login as the `Vagrant` user; the password is `vagrant`.

From your instance, open a Microsoft PowerShell instance, run a few commands to verify that your web server is correctly set up.

```ps
$  ls C:\inetpub\wwwroot\**\*

Directory: C:\inetpub\wwwroot\pages

Mode LastWriteTime Length Name
---- ------------- ------ ----
-a--- 7/29/2015 2:16 PM 37 Page1.htm
-a--- 7/29/2015 2:16 PM 37 Page2.htm
$ (Invoke-WebRequest localhost).Content
<html>This is Default.htm.</html>
$ (Invoke-WebRequest localhost/pages/Page1.htm).Content
<html>This is pages\Page1.htm.</html>
```

If you're the web site developer or system administrator, this configuration can look completely reasonable &ndash; it does everything you need it to do. Now let's see what happens when we audit the web server configuration.
