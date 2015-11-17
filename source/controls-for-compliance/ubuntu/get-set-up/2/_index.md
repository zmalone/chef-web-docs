## 2. Set up Chef server, a node to manage, and Chef Analytics

The second part of this tutorial uses your own Chef server, an Ubuntu 14.04 node, and a Chef Analytics server that runs in your infrastructure.

If you don't already have a Chef server and Chef Analytics set up, follow this Learn Chef tutorial before you continue.

<a class='accent-button radius' href='/get-started-with-chef-analytics/linux/' target='_blank'>Get started with Chef Analytics&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

After completing this tutorial, you'll have:

* the Chef development tools installed on your workstation.
* a Chef server running in your infrastructure.
* an Ubuntu 14.04 node to manage.
* a Chef Analytics server running in your infrastructure.

[COMMENT] In the _Get started with Chef Analytics_ tutorial, you'll have the option to choose which operating system to run on your node. We recommend that you use Ubuntu 14.04 so that you have a node that's already set up to use in this tutorial.

[WARN] Chef audit mode requires `chef-client` version 12.1.0 or greater on your node. If you have an existing node that has a prior version of `chef-client`, [upgrade to the latest version](https://downloads.chef.io/chef-client/).
