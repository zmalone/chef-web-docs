## 6. Delete the Test Kitchen instance

We're all done with our virtual machine, so now run the `kitchen destroy` command to delete it.

<img src="/assets/images/misc/local_dev_workflow5.png" style="box-shadow: none;" alt=""/>

```bash
# ~/settings
$ kitchen destroy
-----> Starting Kitchen (v1.4.2)
-----> Destroying <default-windows-2012r2>...
       EC2 instance <i-a2354a67> destroyed.
       Finished destroying <default-windows-2012r2> (0m1.27s).
-----> Kitchen is finished. (0m2.50s)
```

Run `kitchen list` and you'll see that the `Last Action` column shows that the virtual machine no longer exists.

```bash
# ~/settings
$ kitchen list
Instance                Driver  Provisioner            Verifier  Transport  Last Action
default-windows-2012r2  Ec2     ChefZeroScheduledTask  Busser    Winrm      <Not Created>
```
