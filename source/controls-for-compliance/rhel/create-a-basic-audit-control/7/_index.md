## 7. Destroy your Test Kitchen instances

You can experiment more with your Test Kitchen instances if you'd like. After you're done, run `kitchen destroy` to destroy them.

```bash
# ~/chef-repo/cookbooks/audit
$ kitchen destroy
-----> Starting Kitchen (v1.4.0)
-----> Destroying <default-centos-65>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-centos-65> destroyed.
       Finished destroying <default-centos-65> (0m3.29s).
-----> Kitchen is finished. (0m3.75s)
```

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen destroy
-----> Starting Kitchen (v1.4.0)
-----> Destroying <default-centos-65>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-centos-65> destroyed.
       Finished destroying <default-centos-65> (0m3.71s).
-----> Kitchen is finished. (0m4.41s)
```
