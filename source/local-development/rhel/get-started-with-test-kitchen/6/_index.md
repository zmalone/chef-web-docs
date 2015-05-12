## 6. Delete the Test Kitchen instance

We're all done with our virtual machine, so now run the `kitchen destroy` command to delete it.

```bash
# ~/motd
$ kitchen destroy
-----> Starting Kitchen (v1.4.0)
-----> Destroying <default-centos-66>...
       Vagrant instance <default-centos-66> destroyed.
       Finished destroying <default-centos-66> (0m3.59s).
-----> Kitchen is finished. (0m4.06s)
```

Run `kitchen list` and you'll see that the machine is back at the `Last Action` column shows that the virtual machine no longer exists.

```bash
# ~/motd
$ kitchen list
Instance           Driver   Provisioner  Verifier  Transport  Last Action
default-centos-66  Vagrant  ChefZero     Busser    Ssh        <Not Created>
```
