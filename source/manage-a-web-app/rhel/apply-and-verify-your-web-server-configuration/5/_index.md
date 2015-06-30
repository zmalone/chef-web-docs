## 5. Verify your node's configuration

Now let's log in to your node and run a few commands to help verify that the node is in the expected state. Specifically, we'll verify that the `web_admin` user is set up and that Apache is running and serves your home page.

First, log in to your node over SSH. If you're using a user name and password to authenticate, the command is similar to this.

```bash
# ~/chef-repo
$ ssh root@52.10.205.36
```

If you're using key-based authentication, the command is similar to this.

```bash
# ~/chef-repo
$ ssh -i ~/.ssh/my.pem root@52.10.205.36
```

[WINDOWS] Mac OS and most Linux distributions come with an SSH client. On Windows, [PuTTY](http://www.putty.org) is a popular SSH client for connecting to Linux machines.

Now that we're logged in, we'll verify that:

* the user `web_admin` exists.
* `web_admin` owns the default home page.
* the `httpd` service is running.
* the home page is in the location we expect.
* the home page is being served and is accessible externally.

### Fetch details for user web_admin

```bash
# ~
$ getent passwd web_admin
web_admin:x:498:500::/home/web_admin:/bin/bash
```

### Verify that web_admin owns the default home page

```bash
$ stat -c "%U %G" /var/www/customers/public_html/index.php
web_admin web_admin
```

### Verify that the httpd-customers service is running

```bash
# ~
$ sudo service httpd-customers status
httpd-customers (pid  2335) is running...
```

### Verify that the home page is in the location we expect

```bash
# ~
$ more /var/www/customers/public_html/index.php
<html>This is a placeholder</html>
```

### Verify that the web page is being served and is accessible externally

First close your SSH session.

```bash
# ~
$ exit
logout
Connection to 52.10.205.36 closed.
```

From your workstation, verify that your web site is accessible. Either navigate to your site from a web browser, or run one of the following commands:

### From a Linux or Mac OS workstation

```bash
# ~
$ curl 52.10.205.36
<html>This is a placeholder</html>
```

### From a Windows workstation

```ps
# ~
$ (Invoke-WebRequest 52.10.205.36).RawContent
HTTP/1.1 200 OK
Accept-Ranges: bytes
Content-Length: 34
Date: Fri, 13 Mar 2015 19:13:30 GMT
ETag: "22-51130067de9ed"
Last-Modified: Fri, 13 Mar 2015 18:54:08 GMT
Server: Apache

<html>This is a placeholder</html>
```
