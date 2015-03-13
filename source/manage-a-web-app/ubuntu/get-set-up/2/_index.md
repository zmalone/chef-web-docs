## 2. Get a node to manage

Recall that a _node_ is any physical machine, cloud instance, or virtual machine that Chef manages.

All you need right now is the ability to bring up a clean instance of Ubuntu 14.04 that will serve as your node. Your node should not be your workstation. Be sure that:

* it has a public IP address.
* it can be opened to Internet traffic on ports 22 and 80.
* it meets the [system requirements](https://docs.chef.io/chef_system_requirements.html#chef-client) for running `chef-client`.
* you have root or `sudo` access.

[WARN] Software such as Apache is configured differently in various releases of Ubuntu. For learning purposes, we recommend that you use Ubuntu 14.04 as your node so that you can more easily verify your progress. However, if you're unable to use Ubuntu 14.04, other versions of Ubuntu can work with some modification.
