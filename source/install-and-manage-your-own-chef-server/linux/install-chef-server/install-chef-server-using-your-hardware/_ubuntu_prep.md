To prepare your Ubuntu system, ensure that your system:

* has 4GB total memory.
* has a hostname that can be accessed from your workstation and nodes.
* is connected to NTP.
* provides inbound access (including firewall) on port 443 (HTTPS).
* has [AppArmor disabled or set to complaining mode](http://docs.chef.io/install_server_pre.html#apparmor).

You may also want to open port 22 (SSH) so you can configure Chef server from your workstation. Also, we recommend that you run `apt-get update` to update your local package cache.
