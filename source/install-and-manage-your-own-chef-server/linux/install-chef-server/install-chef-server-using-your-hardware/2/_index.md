## 2. Install Chef server

Click the button to get the Chef server package for your version of Red Hat Enterprise Linux/CentOS or Ubuntu.

<a class='accent-button radius' href='https://downloads.chef.io/chef-server/' target='_blank'>Download Chef server&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

It's likely that you're viewing this web page from your workstation, and that your Chef server is running without a graphical user interface. The easiest way to get the download link from your workstation to your Chef server is to locate and copy the link you need, and then paste it into a `wget` command through an SSH session to your Chef server.

Here's an example of how to download and install Chef server on Red Hat Enterprise Linux or CentOS. Replace `PACKAGE_URL` and `PACKAGE_NAME` with the latest one from the download page.

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

### Install a text editor on your Chef server

You'll need to edit a few configuration files, so ensure you have a text editor that you're comfortable working with installed on your Chef server. If you don't have a preferred editor, we recommend `vim`. This [interactive Vim tutorial](http://www.openvim.com/tutorial.html) can help you get oriented to the commands you'll need to create, edit, and save a file.

Next, you'll modify the Chef server configuration file before you configure and start the server.
