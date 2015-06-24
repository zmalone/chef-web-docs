## 1. Set up a mail server

You can use your organization's SMTP email server for this tutorial if you are able to. If you do so, you’ll need to know your SMTP server's hostname and username and password if it requires authentication. But for learning purposes, you can also set up a basic mail server on the system running Chef Analytics.

If you want to set up a basic mail server, run the command for the operating system your Chef Analytics server is running on.

[TIP] You may have to update your operating system's package cache before you install the package.

#### Red Hat Enterprise Linux and CentOS

```bash
$ sudo yum install mailx
```

#### Ubuntu

```bash
$ sudo apt-get install mailutils
```

From the configuration screen that appears, choose **Internet Site**. You can leave the other settings at their default values.
