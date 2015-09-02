## 3. Apply the awesome_customers cookbook to your Test Kitchen instance

In the previous lesson, you created the virtual machine and applied your cookbook to it in separate steps. As a shortcut, you can just run `kitchen converge` and Test Kitchen will create the virtual machine if it does not exist.

First, run `kitchen list` to verify that the instance does not yet exist.

```bash
# ~/manage-a-web-app-windows/chef-repo/cookbooks/awesome_customers
$ kitchen list
Instance                Driver   Provisioner            Verifier  Transport  Last Action
default-windows-2012r2  Vagrant  ChefZeroScheduledTask  Busser    Winrm      <Not Created>
```

Now run `kitchen converge` to bring up a Windows Server virtual machine and apply the cookbook to it.

```bash
# ~/manage-a-web-app-windows/chef-repo/cookbooks/awesome_customers
$ kitchen converge
-----> Starting Kitchen (v1.4.2)
-----> Creating <default-windows-2012r2>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'windows-2012r2'...
[...]
       [WinRM] Established
       Vagrant instance <default-windows-2012r2> created.
       Finished creating <default-windows-2012r2> (2m6.85s).
-----> Converging <default-windows-2012r2>...
       Preparing files for transfer
       Preparing dna.json
       Resolving cookbook dependencies with Berkshelf 3.2.4...
       Removing non-cookbook files before transfer
       Preparing validation.pem
       Preparing client.rb
-----> Installing Chef Omnibus (12.3.0)
       Downloading package from https://opscode-omnibus-packages.s3.amazonaws.com/windows/2008r2/x86_64/chef-client-12.3.0-1.msi
       Download complete.
       Successfully verified C:\Users\vagrant\AppData\Local\Temp\chef-12.3.0.msi

       Installing Chef Omnibus package C:\Users\vagrant\AppData\Local\Temp\chef-12.3.0.msi
       Installation complete
[...]
           - execute "powershell.exe" -NoLogo -NonInteractive -NoProfile -ExecutionPolicy Unrestricted -InputFormat None -File "C:/Users/vagrant/AppData/Local/Temp/chef-script20150902-2336-ys937m.ps1"
       [2015-09-02T13:30:03+00:00] INFO: Chef Run complete in 466.424582 seconds

       Running handlers:
       [2015-09-02T13:30:03+00:00] INFO: Running report handlers
       Running handlers complete
       [2015-09-02T13:30:03+00:00] INFO: Report handlers complete
       Chef Client finished, 25/27 resources updated in 509.346729 seconds

       Finished converging <default-windows-2012r2> (10m41.32s).
-----> Kitchen is finished. (12m49.67s)
```

[COMMENT] Notice that you didn't have to run Berkshelf to resolve the your cookbook's dependencies on other cookbooks from Chef Supermarket. Test Kitchen takes care of this for you!

Verify that the process completed with no errors.

### From a Linux or Mac OS workstation

```bash
# ~/manage-a-web-app-windows/chef-repo/cookbooks/awesome_customers
$ echo $?
0
```

### From a Windows workstation

```ps
# ~/manage-a-web-app-windows/chef-repo/cookbooks/awesome_customers
$ echo $LastExitCode
0
```

If you receive an error code, locate and fix any errors you see in the Test Kitchen output.
