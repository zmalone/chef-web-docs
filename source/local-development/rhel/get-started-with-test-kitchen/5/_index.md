## 5. Verify that your Test Kitchen instance contains the updated MOTD

Now let's verify that the MOTD was updated on your CentOS virtual machine. Run `kitchen login` to log on to your instance.

```bash
# ~/motd
$ kitchen login
Last login: Fri May  8 20:37:49 2015 from 10.0.2.2
Welcome to localhost on localhost.

This server is running centos 6.6.

It has 469392kB RAM and 1 CPUs.
```

The MOTD appears as expected and displays the information about your instance.

You can now log out from your Test Kitchen instance.

```bash
# ~
$ exit
logout
Connection to 127.0.0.1 closed.
```
