## 2. Get a node to bootstrap

In [Manage a node](/manage-a-node/rhel/), you bootstrapped a node that we provided. Now it's time to bootstrap a Red Hat Enterprise Linux 6.5 or CentOS 6.5 node that you own to give you experience working with your own infrastructure.

Chef provides ways to provision a node and bootstrap it all in one step &ndash; we'll cover this in a later tutorial. For learning purposes, it's best to start by bringing up your own node manually and bootstrapping it separately.

Remember, your node can be any physical machine, virtual machine, or cloud instance, as long as:

* its IP address is accessible from your network.
* it has inbound network access on ports 22 (SSH) and 80 (HTTP) and outbound network access on port 443 (HTTPS).
* it meets the [system requirements](https://docs.chef.io/chef_system_requirements.html#chef-client) for running `chef-client`.
* you have root or `sudo` access.
