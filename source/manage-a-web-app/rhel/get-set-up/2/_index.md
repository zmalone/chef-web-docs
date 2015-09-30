## 2. Get a node to manage

Recall that a _node_ is any physical machine, cloud instance, or virtual machine that Chef manages.

All you need to do right now is bring up a clean instance of Red Hat Enterprise Linux 6.5 or CentOS 6.5 that will serve as your node. Your node should not be your workstation. Be sure that:

* its IP address is accessible from your network.
* it has inbound network access on ports 22 (SSH) and 80 (HTTP) and outbound network access on port 443 (HTTPS).
* it meets the [system requirements](https://docs.chef.io/chef_system_requirements.html#chef-client) for running `chef-client`.
* you have root or `sudo` access.

[WARN] Software such as Apache is configured differently in various releases of Red Hat Enterprise Linux and CentOS. For learning purposes, we recommend that you use Red Hat Enterprise Linux 6.5 or CentOS 6.5 as your node so that you can more easily verify your progress. However, if you're unable to use Red Hat Enterprise Linux 6.5 or CentOS 6.5, other versions can work with some modification.

[WARN] Some of the cookbooks and features that you'll use in this tutorial require `chef-client` version 12.4.0 or greater on your node. If you have an existing node that has a prior version of `chef-client`, [upgrade to the latest version](https://downloads.chef.io/chef-client/).
