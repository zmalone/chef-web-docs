## 4. Confirm the result

Open a web browser from your workstation and navigate to your web server.

![The home page with FQDN](misc/webserver-template-remote.png)

Chef discovers and adds the FQDN for you automatically!

If you bootstrapped a Vagrant instance, the easiest way to verify the configuration is to create an SSH connection to the instance and run `curl localhost`.

```bash
$ vagrant ssh
Last login: Thu Dec  3 19:54:48 2015 from 10.0.2.2
[vagrant@localhost ~]$ curl localhost
<html>
  <body>
    <h1>hello from localhost</h1>
  </body>
</html>
[vagrant@localhost ~]$ exit
logout
Connection to 127.0.0.1 closed.
```

The home page now displays "hello from localhost" instead of "hello world".
