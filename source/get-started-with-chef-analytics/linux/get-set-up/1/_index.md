## 1. Set up your workstation, Chef server, and a node to manage

Chef Analytics requires a Chef server that's maintained in your infrastructure &ndash; whether it's hosted on premises or in the cloud.

If you don't already have a Chef server that you can configure to work with Chef Analytics, follow this Learn Chef tutorial to get set up.

<a class='accent-button radius' href='/install-and-manage-your-own-chef-server/linux/' target='_blank'>Learn to install and manage your own Chef Server&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

After completing this tutorial, you'll have:

* the Chef development tools installed on your workstation
* a Chef server running in your infrastructure
* the `hello_chef_server` cookbook on your Chef server
* a bootstrapped Linux or Windows Server node containing the `hello_chef_server` cookbook in its run-list
