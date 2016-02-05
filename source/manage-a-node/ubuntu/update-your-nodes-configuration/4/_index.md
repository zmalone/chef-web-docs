## 4. Confirm the result

Open a web browser from your workstation and navigate to your web server.

![The home page with FQDN](misc/webserver-template-remote.png)

Chef discovers and adds the FQDN for you automatically!

If you bootstrapped a Vagrant instance, the easiest way to verify the configuration is to create an SSH connection to the instance and run `curl localhost`.

```bash
$ vagrant ssh
Welcome to Ubuntu 14.04.3 LTS (GNU/Linux 3.19.0-25-generic x86_64)

 * Documentation:  https://help.ubuntu.com/
Last login: Fri Feb  5 13:28:02 2016 from 10.0.2.2
[vagrant@localhost ~]$ curl localhost
<html>
  <body>
    <h1>hello from vagrant.vm<</h1>
  </body>
</html>
[vagrant@localhost ~]$ exit
logout
Connection to 127.0.0.1 closed.
```

The home page now displays "hello from vagrant.vm" instead of "hello world".
