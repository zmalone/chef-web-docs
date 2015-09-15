## 7. Destroy your Test Kitchen instances

You can experiment more with your Test Kitchen instances if you'd like. After you're done, run `kitchen destroy` to destroy them.

```bash
# ~/chef-repo/cookbooks/audit
$ kitchen destroy
-----> Starting Kitchen (v1.4.0)
-----> Destroying <default-windows-2012r2>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-windows-2012r2> destroyed.
       Finished destroying <default-windows-2012r2> (0m4.71s).
-----> Kitchen is finished. (0m6.69s)
```

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen destroy
-----> Starting Kitchen (v1.4.0)
-----> Destroying <default-windows-2012r2>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-windows-2012r2> destroyed.
       Finished destroying <default-windows-2012r2> (0m3.71s).
-----> Kitchen is finished. (0m4.41s)
```
