## 2. Install Chef server

It's likely that you're viewing this web page from your workstation, and that your system for running Chef server is running without a graphical user interface. The easiest way to get the download link from your workstation to your Chef server is to [copy the link you need from the download page](https://downloads.chef.io/chef-server/) and then paste it into a `wget` command through an SSH session to your Chef server.

Here's an example of how to download and install Chef server on Red Hat Enterprise Linux or CentOS. Replace <code class="placeholder">PACKAGE\_URL</code> and <code class="placeholder">PACKAGE\_NAME</code> with the latest one from the download page.

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
