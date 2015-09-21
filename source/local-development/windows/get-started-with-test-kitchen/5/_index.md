## 5. Verify that your Test Kitchen instance contains the settings file

Now let's log in to your virtual machine and verify that the settings file was created on your Windows Server virtual machine.

<img src="/assets/images/misc/local_dev_workflow3_4.png" style="box-shadow: none;" alt=""/>

The way you connect to your instance depends on which driver you're using.

[START_TABS connect EC2, Hyper-V, Vagrant]

[START_TAB connectEC2 active]

When you use the EC2 driver, Test Kitchen creates two files in your cookbook's <code class="file-path">.kitchen</code> directory &ndash; a Remote Desktop (.rdp) file and a YAML (.yml) configuration file that lists details about the instance.

```bash
# ~/settings
$ ls .kitchen
default-windows-2012r2.rdp default-windows-2012r2.yml logs
```

Get the password for the Windows account that Test Kitchen used to run `chef-client`.

```bash
# ~/settings
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
# ~/settings
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

From your connection, open Windows PowerShell and confirm that <code class="file-path">C:\temp\server-info.txt</code> exists and contains information about your server.

```ps
$ Get-Content C:\temp\server-info.txt
fqdn:      WIN-2CSE2JA9V7V
hostname:  WIN-2CSE2JA9V7V
platform:  windows - 6.3.9600
cpu count: 1
```

Success! You can now close the connection.
