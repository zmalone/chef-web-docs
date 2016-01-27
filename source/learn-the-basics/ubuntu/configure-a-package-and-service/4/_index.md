## 4. Confirm your web site is running

Run the `curl` command to confirm that your web page is available.

```bash
# ~/chef-repo
$ curl localhost
<html>
  <body>
    <h1>hello world</h1>
  </body>
</html>
```

The free trial virtual machine does not have a public IP address, but if you're working through this tutorial on your own VM, you can access your web server from a browser on another machine. You'll see something like this.

![The basic home page](misc/webserver-basic-remote.png)
