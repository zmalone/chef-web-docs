## 5. Verify that your Test Kitchen instance contains the updated MOTD

Now let's log in to your virtual machine and verify that the MOTD was updated on your Ubuntu virtual machine.

<img src="/assets/images/misc/local_dev_workflow3_4.png" style="box-shadow: none;" alt=""/>

Run `kitchen login` to log on to your instance.

```bash
# ~/motd
$ kitchen login
Welcome to Ubuntu 14.04 LTS (GNU/Linux 3.13.0-24-generic x86_64)

 * Documentation:  https://help.ubuntu.com/

hostname:  default-ubuntu-1404
fqdn:      default-ubuntu-1404
memory:    243796kB
cpu count: 1
Last login: Wed Jul  1 16:00:58 2015 from 10.0.2.2
```

The MOTD appears as expected and displays the information about your instance.

If you don't see the system info appear in the MOTD, then the system may not yet have updated it. In this case, run the following to print the updated MOTD to the console.

```bash
$ run-parts /etc/update-motd.d
Welcome to Ubuntu 14.04 LTS (GNU/Linux 3.13.0-24-generic x86_64)

 * Documentation:  https://help.ubuntu.com/

hostname:  default-ubuntu-1404
fqdn:      default-ubuntu-1404
memory:    243796kB
cpu count: 1
```

You can now log out from your Test Kitchen instance.

```bash
# ~
$ logout
Connection to 127.0.0.1 closed.
```
