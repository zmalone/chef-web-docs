## 3. Apply the awesome_customers cookbook to your Test Kitchen instance

In the previous lesson, you created the virtual machine and applied your cookbook to it in separate steps. As a shortcut, you can just run `kitchen converge` and Test Kitchen will create the virtual machine if it does not exist.

First, run `kitchen list` to verify that the instance does not yet exist.

```bash
# ~/manage-a-web-app-windows/chef-repo/cookbooks/awesome_customers
$ kitchen list
Instance           Driver   Provisioner  Verifier  Transport  Last Action
default-centos-66  Vagrant  ChefZero     Busser    Ssh        <Not Created>
```

Now run `kitchen converge` to apply the cookbook to the Windows Server virtual machine.

```bash
# ~/manage-a-web-app-windows/chef-repo/cookbooks/awesome_customers
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Creating <default-centos-66>...
       Bringing machine 'default' up with 'virtualbox' provider...
[...]
       Recipe: iptables::default

            - execute /usr/sbin/rebuild-iptables

       Running handlers:
       Running handlers complete
       Chef Client finished, 126/149 resources updated in 2120.254447762 seconds
       Finished converging <default-centos-66> (36m12.34s).
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
