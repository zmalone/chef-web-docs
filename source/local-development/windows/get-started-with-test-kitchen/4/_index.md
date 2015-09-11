## 4. Apply the settings cookbook to your Test Kitchen instance

Now run `kitchen converge` to apply the cookbook to the Windows Server virtual machine.

<img src="/assets/images/misc/local_dev_workflow2.png" style="box-shadow: none;" alt=""/>

```bash
# ~/settings
$ kitchen converge
-----> Starting Kitchen (v1.4.2)
-----> Converging <default-windows-2012r2>...
       Preparing files for transfer
       Preparing dna.json
       Resolving cookbook dependencies with Berkshelf 3.2.4...
       Removing non-cookbook files before transfer
       Preparing validation.pem
       Preparing client.rb
-----> Installing Chef Omnibus (install only if missing)
       Downloading package from https://opscode-omnibus-packages.s3.amazonaws.com/windows/2008r2/x86_64/chef-client-12.4.1-1.msi
       Download complete.
[...]
           - create new file C:/temp/server-info.txt[2015-09-01T12:18:16+00:00] INFO: template[C:/temp/server-info.txt] updated file contents C:/temp/server-info.txt

           - update content in file C:/temp/server-info.txt from none to 8384c4
           --- C:/temp/server-info.txt	2015-09-01 12:18:16.000000000 +0000
           +++ C:/Users/ADMINI~1/AppData/Local/Temp/chef-rendered-template20150901-2164-zjeu0t	2015-09-01 12:18:16.000000000 +0000
           @@ -1 +1,5 @@
           +fqdn:      WIN-2CSE2JA9V7V
           +hostname:  WIN-2CSE2JA9V7V
           +platform:  windows - 6.3.9600
           +cpu count: 1
       [2015-09-01T12:18:16+00:00] INFO: Chef Run complete in 1.049543 seconds

       Running handlers:
       [2015-09-01T12:18:16+00:00] INFO: Running report handlers
       Running handlers complete
       [2015-09-01T12:18:16+00:00] INFO: Report handlers complete
       Chef Client finished, 2/2 resources updated in 81.828162 seconds

       Finished converging <default-windows-2012r2> (6m8.00s).
-----> Kitchen is finished. (6m9.13s)
```

[TIP] When you see the word _converge_, think _test and repair_.

In previous tutorials, you ran `chef-client` manually to apply your cookbooks. Test Kitchen runs `chef-client` for you. When the `chef-client` run completes successfully, Test Kitchen exits with exit code `0`. Run the following to check the exit code.

### From a Linux or Mac OS workstation

```bash
# ~/settings
$ echo $?
0
```

### From a Windows workstation

```ps
# ~/settings
$ echo $LastExitCode
0
```

If you receive a result other than `0`, fix the errors that were reported. Then run `kitchen converge` to apply the changes and again check the exit code.

Run `kitchen list` to see the latest status.

```bash
# ~/settings
$ kitchen list
Instance                Driver  Provisioner            Verifier  Transport  Last Action
default-windows-2012r2  Ec2     ChefZeroScheduledTask  Busser    Winrm      Converged
```

`kitchen converge` takes longer the first time you run it on a new instance because Test Kitchen needs to install the Chef tools. Run `kitchen converge` a second time to see how much faster it is.

```bash
# ~/settings
$ kitchen converge
-----> Starting Kitchen (v1.4.2)
-----> Converging <default-windows-2012r2>...
       Preparing files for transfer
       Preparing dna.json
       Resolving cookbook dependencies with Berkshelf 3.2.4...
       Removing non-cookbook files before transfer
       Preparing validation.pem
       Preparing client.rb
-----> Chef Omnibus installation detected (install only if missing)
[...]
       Compiling Cookbooks...
       Converging 2 resources
       Recipe: settings::default
         * directory[C:/temp] action create[2015-08-31T18:32:23+00:00] INFO: Processing directory[C:/temp] action create (settings::default line 6)
        (up to date)
         * template[C:/temp/server-info.txt] action create[2015-08-31T18:32:23+00:00] INFO: Processing template[C:/temp/server-info.txt] action create (settings::default line 8)
        (up to date)
       [2015-08-31T18:32:23+00:00] INFO: Chef Run complete in 0.671878 seconds

       Running handlers:
       [2015-08-31T18:32:23+00:00] INFO: Running report handlers
       Running handlers complete
       [2015-08-31T18:32:23+00:00] INFO: Report handlers complete
       Chef Client finished, 0/2 resources updated in 58.890655 seconds

       Finished converging <default-windows-2012r2> (1m34.60s).
-----> Kitchen is finished. (1m36.02s)
```

This run was faster &ndash; 1 minute and 36 seconds compared to 6 minutes &ndash; not only because the instance already had the Chef tools installed, but also because it was already in the desired state, so Chef had to do no work.
