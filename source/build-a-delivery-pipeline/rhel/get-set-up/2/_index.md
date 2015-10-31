## 2. Plan your Delivery cluster

We use the term _Delivery cluster_ to define the collection of machines that make up a Chef Delivery setup.

The installation procedure you'll use explains how to create a Delivery cluster suitable for most production environments. However, this tutorial requires a less complex configuration, which you can use if you prefer.

For this tutorial, your Delivery cluster will consist of:

* a Chef Delivery server.
* a Chef server.
* a build node to run the Verify and Build stages.
* a server to run each of the Acceptance, Union, Rehearsal, and Delivered stages, which host the Customers web application.

This tutorial doesn't require you to set up Chef Analytics or Chef Supermarket, or to have three build nodes, as is described in the installation procedure. They are optional.

You can run Chef Delivery, Chef server, and your build node on any [supported platform](https://docs.chef.io/install_delivery_cluster.html#prerequisites).

Your web application servers for the Acceptance, Union, Rehearsal, and Delivered stages must run Red Hat Enterprise Linux or CentOS because the `awesome_customers` cookbook targets those platforms. We recommend that you use Red Hat Enterprise Linux 6.5 or CentOS 6.5.

Your web application servers for this tutorial do not need to be as powerful as what you might need in production. If you're using AWS, you can use t2.micro instances, which is a single 2.5GHz CPU, 1 GB of memory, and 8 GB of disk space. You'll also need to ensure that your web application servers have inbound network access on ports 22 (SSH), 80 (HTTP), and 443 (HTTPS).

### Plan whether to use a provisioning node or your workstation to install Chef Delivery

The installation procedure recommends that you set up a dedicated _provisioning node_ and install the Delivery cluster from there. In general, having a provisioning node gives you a persistent node in your production environment that you can always use to install and administer your Delivery cluster.

However, for evaluation and learning purposes, you can provision your cluster from your workstation. You can even provision your Delivery cluster from a virtual machine running on your workstation. Just ensure that your system meets the [prerequisites](https://docs.chef.io/install_dk.html#review-prerequisites) for running the Chef Development Kit.

### Plan how you'll bring up your cluster

The installation procedure shows you how to use the `delivery-cluster` cookbook to install Chef Delivery, either from your provisioning node or your workstation. You'll be asked how you want your cluster set up (for example, whether to use your existing Chef server or to create a new one) and the installer takes the appropriate actions.

Before you run the cookbook, you'll need to decide how you want to provision, or bring up, the machines you'll need. The `delivery-cluster` cookbook provides two options.

1. If you use Amazon Web Services (AWS), use the _AWS provisioner_. The `delivery-cluster` automatically provisions the servers on EC2 instances and installs the software for you. For AWS users, this is the fastest way to get set up.
1. Otherwise, use what's called the _SSH provisioner_. This method requires you to bring up the necessary machines and provide SSH access and a passwordless `sudo` account on each. You provide the IP address and logon credentials for each server, and the `delivery-cluster` cookbook installs the software for you. This method can take more time to set up, but gives you complete control over how you provision your cluster.
