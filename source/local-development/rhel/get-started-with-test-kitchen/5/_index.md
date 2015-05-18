## 5. Verify that your Test Kitchen instance contains the updated MOTD

Now let's log in to your virtual machine and verify that the MOTD was updated on your CentOS virtual machine.

<img src="/assets/images/misc/local_dev_workflow3_4.png" style="box-shadow: none;" alt=""/>

Run `kitchen login` to log on to your instance.

```bash
# ~/motd
$ kitchen login
Last login: Wed May 13 19:52:53 2015 from 10.0.2.2

hostname:  default-centos-66
fqdn:      default-centos-66
memory:    244120kB
cpu count: 1
```

The MOTD appears as expected and displays the information about your instance.

You can now log out from your Test Kitchen instance.

```bash
# ~
$ logout
Connection to 127.0.0.1 closed.
```
