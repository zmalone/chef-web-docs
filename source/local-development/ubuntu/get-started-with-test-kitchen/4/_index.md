## 4. Apply the motd cookbook to your Test Kitchen instance

Now run `kitchen converge` to apply the cookbook to the Ubuntu virtual machine.

<img src="/assets/images/misc/local_dev_workflow2.png" style="box-shadow: none;" alt=""/>

```bash
# ~/motd
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Converging <default-ubuntu-1404>...
       Preparing files for transfer
       Preparing dna.json
       Resolving cookbook dependencies with Berkshelf 3.2.4...
       Removing non-cookbook files before transfer
       Preparing validation.pem
       Preparing client.rb
-----> Installing Chef Omnibus (install only if missing)
       Downloading https://www.chef.io/chef/install.sh to file /tmp/install.sh
       Trying wget...
       Download complete.
[...]
       Synchronizing Cookbooks:
         - motd
       Compiling Cookbooks...
       Converging 1 resources
       Recipe: motd::default
         * template[/etc/update-motd.d/98-server-info] action create
           - create new file /etc/update-motd.d/98-server-info
           - update content in file /etc/update-motd.d/98-server-info from none to c72434
           --- /etc/update-motd.d/98-server-info	2015-07-01 15:56:47.101424228 +0000
           +++ /tmp/chef-rendered-template20150701-5230-1aeczwj	2015-07-01 15:56:47.101424228 +0000
           @@ -1 +1,7 @@
           +#!/bin/sh
           +
           +printf "\nhostname:  default-ubuntu-1404"
           +printf "\nfqdn:      default-ubuntu-1404"
           +printf "\nmemory:    243796kB"
           +printf "\ncpu count: 1\n"
           - change mode from '' to '0755'

       Running handlers:
       Running handlers complete
       Chef Client finished, 1/1 resources updated in 6.396247997 seconds
       Finished converging <default-ubuntu-1404> (0m51.17s).
-----> Kitchen is finished. (2m30.23s)
```

[TIP] When you see the word _converge_, think _test and repair_.

In previous tutorials, you ran `chef-client` manually to apply your cookbooks. Test Kitchen runs `chef-client` for you. When the `chef-client` run completes successfully, Test Kitchen exits with exit code `0`. Run the following to check the exit code.

### From a Linux or Mac OS workstation

```bash
# ~/motd
$ echo $?
0
```

### From a Windows workstation

```ps
# ~/motd
$ echo $LastExitCode
0
```

If you receive a result other than `0`, fix the errors that were reported. Then run `kitchen converge` to apply the changes and again check the exit code.

Run `kitchen list` to see the latest status.

```bash
# ~/motd
$ kitchen list
Instance             Driver   Provisioner  Verifier  Transport  Last Action
default-ubuntu-1404  Vagrant  ChefZero     Busser    Ssh        Converged
```

`kitchen converge` takes longer the first time you run it on a new instance because Test Kitchen needs to install the Chef tools. Run `kitchen converge` a second time to see how much faster it is.

```bash
# ~/motd
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Converging <default-ubuntu-1404>...
       Preparing files for transfer
       Preparing dna.json
       Resolving cookbook dependencies with Berkshelf 3.2.4...
       Removing non-cookbook files before transfer
       Preparing validation.pem
       Preparing client.rb
-----> Chef Omnibus installation detected (install only if missing)
       Transferring files to <default-ubuntu-1404>
       Starting Chef Client, version 12.4.0
       [2015-07-01T16:01:05+00:00] WARN: Child with name 'dna.json' found in multiple directories: /tmp/kitchen/dna.json and /tmp/kitchen/dna.json
       resolving cookbooks for run list: ["motd::default"]
       Synchronizing Cookbooks:
         - motd
       Compiling Cookbooks...
       Converging 1 resources
       Recipe: motd::default
         * template[/etc/update-motd.d/98-server-info] action create (up to date)

       Running handlers:
       Running handlers complete
       Chef Client finished, 0/1 resources updated in 6.133383812 seconds
       Finished converging <default-ubuntu-1404> (0m9.27s).
-----> Kitchen is finished. (0m9.72s)
```

This run was faster &ndash; less than 10 seconds compared to 2.5 minutes &ndash; not only because the instance already had the Chef tools installed, but also because it was already in the desired state, so Chef had to do no work.
