## 4. Create the webserver cookbook

Now let's create and apply a second cookbook that configures IIS and adds a few web pages.

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
  not_if '(Get-WindowsFeature -Name Web-Server).Installed'
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

This recipe configures IIS and writes a few files for it to serve.

[COMMENT] For simplicity, we use the built-in `powershell_script` and `service` resources to configure IIS. A more robust solution might use the [iis](https://supermarket.chef.io/cookbooks/iis) cookbook from Chef Supermarket.

Now use Test Kitchen to apply the `webserver` cookbook locally. This instance is different than the one you used to apply the `audit` cookbook. Start by adding this code to your `webserver` cookbook's <code class="file-path">.kitchen.yml</code> file.

[START_TABS configWeb EC2, Hyper-V, Vagrant]

[START_TAB configWebEC2 active]

Replace the values for `aws_ssh_key_id`, `region`, `availability_zone`, `subnet_id`, `image_id`, `security_group_ids`, and `ssh_key` with your values.

```yaml
# ~/chef-repo/cookbooks/webserver/.kitchen.yml
---
driver:
  name: ec2
  aws_ssh_key_id: learnchef
  region: us-west-2
  availability_zone: a
  subnet_id: subnet-eacb348f
  instance_type: m1.small
  image_id: ami-c3b3b1f3
  security_group_ids: ['sg-2d3b3b48']
  retryable_tries: 120

provisioner:
  name: chef_zero_scheduled_task
  
transport:
  ssh_key: /Users/learnchef/.ssh/learnchef.pem

platforms:
  - name: windows-2012r2

suites:
  - name: default
    run_list:
      - recipe[webserver::default]
    attributes:
```

[END_TAB]

[START_TAB configWebHyperV]

Replace the value for `password` with the `Administrator` password on your base virtual machine.

```yaml
# ~/chef-repo/cookbooks/webserver/.kitchen.yml
---
driver:
  name: hyperv
  parent_vhd_folder: C:\Hyper-V
  parent_vhd_name: WindowsServer2012R2.vhdx
  vm_switch: ExternalSwitch
  memory_startup_bytes: 2GB

provisioner:
  name: chef_zero_scheduled_task

transport:
  password: H24?6;H.QaV8JP2&

platforms:
  - name: windows-2012r2

suites:
  - name: default
    run_list:
      - recipe[webserver::default]
    attributes:
```

[END_TAB]

[START_TAB configWebVagrant]

```yaml
# ~/chef-repo/cookbooks/webserver/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero_scheduled_task

platforms:
  - name: windows-2012r2

suites:
  - name: default
    run_list:
      - recipe[webserver::default]
    attributes:
```

[END_TAB]

[END_TABS]

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

Now login to your Windows Server instance. The way you connect to your instance depends on which driver you're using.

[START_TABS connect EC2, Hyper-V, Vagrant]

[START_TAB connectEC2 active]

When you use the EC2 driver, Test Kitchen creates two files in your cookbook's <code class="file-path">.kitchen</code> directory &ndash; a Remote Desktop (.rdp) file and a YAML (.yml) configuration file that lists details about the instance.

```bash
# ~/chef-repo/cookbooks/webserver
$ ls .kitchen
default-windows-2012r2.rdp default-windows-2012r2.yml logs
```

Get the password for the Windows account that Test Kitchen used to run `chef-client`.

```bash
# ~/chef-repo/cookbooks/webserver
$ more .kitchen/default-windows-2012r2.yml
---
username: administrator
server_id: i-c6047d03
hostname: ec2-52-88-81-53.us-west-2.compute.amazonaws.com
password: A4rs&sCTBpP
last_action: converge
```

Now either run the .rdp file directly or run `kitchen login` to create a Remote Desktop connection to your instance. When prompted, enter the password that you retrieved in the previous step.

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen login
```

[END_TAB]

[START_TAB connectHyperV]

If you're using the Hyper-V driver, login to your instance, `default-windows-2012r2`, through Hyper-V Manager. Login as `Administrator` and use the same password that you set when you created the base virtual machine.

[END_TAB]

[START_TAB connectVagrant]

If you're using the Vagrant driver, a VirtualBox window appears when you create the instance. Login through that window as either `Administrator` or `vagrant` &ndash; the password for both accounts is `vagrant`.

[END_TAB]

[END_TABS]


From your instance, open a Microsoft PowerShell window and run a few commands to verify that your web server is correctly set up.

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
