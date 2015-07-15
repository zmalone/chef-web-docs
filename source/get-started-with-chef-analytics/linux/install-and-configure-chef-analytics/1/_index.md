## 1. Install Chef Analytics on its own server

Click the button to get the Chef Analytics package for Red Hat Enterprise Linux, CentOS or Ubuntu.

<a class='accent-button radius' href='https://downloads.chef.io/analytics/' target='_blank'>Install Chef Analytics&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

It's likely that you're viewing this web page from your workstation, and that your Chef Analytics server is running without a graphical user interface. The easiest way to get the download link from your workstation to your Chef server is to locate and copy the link you need, and then paste it into a `wget` command through an SSH session to your Chef Analytics server.

Here's an example of how to download and install Chef Analytics on Red Hat Enterprise Linux or CentOS. Be sure to replace the package URL with the latest one from the download page.

```bash
$ sudo yum install wget -y
$ wget https://web-dl.packagecloud.io/chef/stable/packages/el/6/opscode-analytics-1.1.3-1.el6.x86_64.rpm
$ sudo yum install opscode-analytics-1.1.3-1.el6.x86_64.rpm -y
```

And here's an example for Ubuntu.

```bash
$ sudo apt-get install wget -y
$ wget https://web-dl.packagecloud.io/chef/stable/packages/ubuntu/trusty/opscode-analytics_1.1.4-1_amd64.deb
$ sudo pkg -i opscode-analytics_1.1.4-1_amd64.deb
```


While you wait for the package to download and install, you can proceed to the next step, where you'll provide some information about your Chef Analytics server to your Chef server.
