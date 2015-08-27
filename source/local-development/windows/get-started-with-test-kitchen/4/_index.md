## 4. Apply the motd cookbook to your Test Kitchen instance

Now run `kitchen converge` to apply the cookbook to the CentOS virtual machine.

<img src="/assets/images/misc/local_dev_workflow2.png" style="box-shadow: none;" alt=""/>

```bash
# ~/motd
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Converging <default-centos-66>...
       Preparing files for transfer
       Preparing dna.json
       Resolving cookbook dependencies with Berkshelf 3.2.3...
       Removing non-cookbook files before transfer
       Preparing validation.pem
       Preparing client.rb
-----> Installing Chef Omnibus (install only if missing)
       Downloading https://www.chef.io/chef/install.sh to file /tmp/install.sh
       Trying wget...
       Download complete.
[...]
       Compiling Cookbooks...
       Converging 1 resources
       Recipe: motd::default

           - update content in file /etc/motd from e3b0c4 to 578467
           --- /etc/motd	2010-01-12 13:28:22.000000000 +0000
           +++ /tmp/chef-rendered-template20150513-2331-ecq0cq	2015-05-13 19:19:09.405673021 +0000
           @@ -1 +1,6 @@
           +
           +hostname:  default-centos-66
           +fqdn:      default-centos-66
           +memory:    244120kB

           - restore selinux security context

       Running handlers:
       Running handlers complete
       Chef Client finished, 1/1 resources updated in 9.814841645 seconds
       Finished converging <default-centos-66> (11m51.96s).
-----> Kitchen is finished. (11m52.42s)
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
Instance           Driver   Provisioner  Verifier  Transport  Last Action
default-centos-66  Vagrant  ChefZero     Busser    Ssh        Converged
```

`kitchen converge` takes longer the first time you run it on a new instance because Test Kitchen needs to install the Chef tools. Run `kitchen converge` a second time to see how much faster it is.

```bash
# ~/motd
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Converging <default-centos-66>...
       Preparing files for transfer
       Preparing dna.json
       Resolving cookbook dependencies with Berkshelf 3.2.3...
       Removing non-cookbook files before transfer
       Preparing validation.pem
       Preparing client.rb
-----> Chef Omnibus installation detected (install only if missing)
       Transferring files to <default-centos-66>
       Starting Chef Client, version 12.3.0
       [2015-05-13T19:23:29+00:00] WARN: Child with name 'dna.json' found in multiple directories: /tmp/kitchen/dna.json and /tmp/kitchen/dna.json
       resolving cookbooks for run list: ["motd::default"]
       Synchronizing Cookbooks:
         - motd
       Compiling Cookbooks...
       Converging 1 resources
       Recipe: motd::default
        (up to date)

       Running handlers:
       Running handlers complete
       Chef Client finished, 0/1 resources updated in 2.740175698 seconds
       Finished converging <default-centos-66> (0m12.16s).
-----> Kitchen is finished. (0m12.75s)
```

This run was faster &ndash; 12.75 seconds compared to almost 12 minutes &ndash; not only because the instance already had the Chef tools installed, but also because it was already in the desired state, so Chef had to do no work.
