To prepare your Red Hat Enterprise Linux system, ensure that your system:

* has 4GB total memory.
* has a hostname that can be accessed from your workstation and nodes.
* is connected to NTP.
* has [Apache Qpid](http://docs.chef.io/install_server_pre.html#apache-qpid) disabled.
* provides inbound access (including firewall) on port 443 (HTTPS).
* has [SELinux disabled or set to permissive mode](http://docs.chef.io/install_server_pre.html#selinux).

You may also want to open port 22 (SSH) so you can configure Chef server from your workstation.