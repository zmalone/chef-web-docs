## 7. Destroy your Test Kitchen instances

You can experiment more with your Test Kitchen instances if you'd like. After you're done, run `kitchen destroy` to destroy them.

```bash
# ~/chef-repo/cookbooks/audit
$ kitchen destroy
-----> Starting Kitchen (v1.4.0)
-----> Destroying <default-ubuntu-1404>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-ubuntu-1404> destroyed.
       Finished destroying <default-ubuntu-1404> (0m3.59s).
-----> Kitchen is finished. (0m4.37s)
```

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen destroy
-----> Starting Kitchen (v1.4.0)
-----> Destroying <default-ubuntu-1404>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-ubuntu-1404> destroyed.
       Finished destroying <default-ubuntu-1404> (0m3.53s).
-----> Kitchen is finished. (0m4.28s)
```
