## 3. Apply the awesome_customers cookbook to your Test Kitchen instance

In the previous lesson, you created the virtual machine and applied your cookbook to it in separate steps. As a shortcut, you can just run `kitchen converge` and Test Kitchen will create the virtual machine if it does not exist.

First, run `kitchen list` to verify that the instance does not yet exist.

```bash
# ~/manage-a-web-app-ubuntu/chef-repo/cookbooks/awesome_customers
$ kitchen list
Instance             Driver   Provisioner  Verifier  Transport  Last Action
default-ubuntu-1404  Vagrant  ChefZero     Busser    Ssh        <Not Created>
```

Now run `kitchen converge` to apply the cookbook to the Ubuntu virtual machine.

```bash
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Creating <default-ubuntu-1404>...
       Bringing machine 'default' up with 'virtualbox' provider...
[...]
       Recipe: awesome_customers::webserver

           * service[customers :restart apache2-customers] action restart
             - restart service service[customers :restart apache2-customers]


       Running handlers:
       Running handlers complete
       Chef Client finished, 143/219 resources updated in 215.707646962 seconds
       Finished converging <default-ubuntu-1404> (4m20.34s).
-----> Kitchen is finished. (6m7.75s)
```

[COMMENT] Notice that you didn't have to run Berkshelf to resolve the your cookbook's dependencies on other cookbooks from Chef Supermarket. Test Kitchen takes care of this for you!

Verify that the process completed with no errors.

### From a Linux or Mac OS workstation

```bash
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
$ echo $?
0
```

### From a Windows workstation

```ps
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/awesome_customers
$ echo $LastExitCode
0
```

If you receive an error code, locate and fix any errors you see in the Test Kitchen output.
