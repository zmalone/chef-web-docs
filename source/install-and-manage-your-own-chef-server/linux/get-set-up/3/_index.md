## 3. Get a node to manage

Recall that a _node_ is any physical machine, cloud instance, or virtual machine that Chef manages.

All you need to do right now is bring up a clean instance of any machine running a [supported platform](https://docs.chef.io/supported_platforms.html) that meets the [system requirements](https://docs.chef.io/chef_system_requirements.html#chef-client) for running `chef-client`.

These pages show you how to prepare a Linux or Windows Server node for use with Chef server.

* [Red Hat Enterprise Linux or CentOS](/manage-a-node/rhel/get-a-node-to-bootstrap/)
* [Windows Server](/manage-a-node/windows/get-a-node-to-bootstrap/)
* [Ubuntu](/manage-a-node/ubuntu/get-a-node-to-bootstrap/)

[COMMENT] The easiest way to get started is to use a system that has full Internet access. However, many users run Chef behind the firewall. [Check out this blog post](https://www.chef.io/blog/2014/10/28/working-with-chef-behind-your-firewall/) to learn more.