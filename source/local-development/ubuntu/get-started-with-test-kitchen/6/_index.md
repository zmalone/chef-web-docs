## 6. Delete the Test Kitchen instance

We're all done with our virtual machine, so now run the `kitchen destroy` command to delete it.

<img src="/assets/images/misc/local_dev_workflow5.png" style="box-shadow: none;" alt=""/>

```bash
# ~/motd
$ kitchen destroy
-----> Starting Kitchen (v1.4.0)
-----> Destroying <default-ubuntu-1404>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-ubuntu-1404> destroyed.
       Finished destroying <default-ubuntu-1404> (0m3.54s).
-----> Kitchen is finished. (0m4.30s)
```

Run `kitchen list` and you'll see that the `Last Action` column shows that the virtual machine no longer exists.

```bash
# ~/motd
$ kitchen list
Instance             Driver   Provisioner  Verifier  Transport  Last Action
default-ubuntu-1404  Vagrant  ChefZero     Busser    Ssh        <Not Created>
```
