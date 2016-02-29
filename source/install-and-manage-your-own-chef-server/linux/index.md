---
title: 'Install and manage your own Chef server'
layout: lesson-overview
platform: 'Get started with Chef server'
logo: chef-server.svg
order: 1
---
<br>

[COMMENT] If you're new to Chef, we recommend that you first work through the [Learn the Chef basics](/tutorials/#learn-the-basics) and [Learn to manage a node](/tutorials/#manage-a-node) tutorials. The first tutorial teaches you the basics of how Chef works on a virtual machine that we provide. The second tutorial shows how to use hosted Chef, which is a Chef server that we manage for you. Both tutorials come in versions for Red Hat Enterprise Linux, Windows Server, and Ubuntu.

In [Learn to manage a node](/tutorials/#manage-a-node), you learned how to write a Chef cookbook from your workstation, upload your cookbook to the Chef server, bootstrap a node, and apply your cookbook to your node. You signed up for a hosted Chef account, which provides you with access to a Chef server that we manage for you.

<img src="/assets/images/networks/workstation-server-node.png" style="width: 100%; box-shadow: none;" alt="Your workstation, a Chef server, and nodes" />

Working with hosted Chef is a great way to get started, and in the long run can minimize the cost of maintaining a Chef server. But you might want to maintain a Chef server in your own infrastructure if you:

* require Chef to run behind the firewall.
* want access to [Chef Analytics](http://docs.chef.io/analytics.html) and other features that require an on premises Chef server, such as [Chef Manage](http://docs.chef.io/manage.html), [Reporting](http://docs.chef.io/reporting.html), [Push Jobs](http://docs.chef.io/push_jobs.html), [Replication](http://docs.chef.io/server_replication.html), and [High Availability](http://docs.chef.io/server_high_availability.html).
* simply prefer to maintain your own Chef server on premises or your preferred cloud provider.

In this tutorial, you'll install and configure a Chef server as part of your own infrastructure. Then you'll write and upload a basic cookbook to your Chef server, bootstrap a node, and apply your cookbook to that node.

After completing this tutorial, you should be able to:

* install Chef server, customize its configuration, and prepare your workstation to remotely manage nodes.
* upload a cookbook to your Chef server, bootstrap a node, and apply that cookbook to your node.
* install the Chef management console and other Chef server features.

You'll start by setting up your workstation.
