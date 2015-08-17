## 1. Install Chef Analytics on its own server

Click the button to get the Chef Analytics package for Red Hat Enterprise Linux, CentOS or Ubuntu.

<a class='accent-button radius' href='https://downloads.chef.io/analytics/' target='_blank'>Install Chef Analytics&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

It's likely that you're viewing this web page from your workstation, and that your Chef Analytics server is running without a graphical user interface. The easiest way to get the download link from your workstation to your Chef server is to locate and copy the link you need, and then paste it into a `wget` command through an SSH session to your Chef Analytics server.

Here's an example of how to download and install Chef Analytics on Red Hat Enterprise Linux or CentOS. Replace `PACKAGE_URL` and `PACKAGE_NAME` with the latest one from the download page.

```bash
$ sudo yum install wget -y
$ wget PACKAGE_URL
$ sudo rpm -Uvh PACKAGE_NAME
```

And here's an example for Ubuntu.

```bash
$ sudo apt-get install wget -y
$ wget PACKAGE_URL
$ sudo dpkg -i PACKAGE_NAME
```


While you wait for the package to download and install, you can proceed to the next step, where you'll provide some information about your Chef Analytics server to your Chef server.
