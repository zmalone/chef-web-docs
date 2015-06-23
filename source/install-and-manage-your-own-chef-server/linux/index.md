---
title: 'Learn to install and manage your own Chef Server'
layout: lesson-overview
platform: 'Get started with Chef server'
logo: chef-server.svg
order: 1
---
[COMMENT] If you're new to Chef, we recommend that you first work through _Learn the Chef_ basics for [Red Hat Enterprise Linux](/learn-the-basics/rhel/), [Ubuntu](/learn-the-basics/ubuntu/), or [Windows Server](/learn-the-basics/windows/) and _Learn to manage a node_ for [Red Hat Enterprise Linux](/manage-a-node/rhel/), [Ubuntu](/manage-a-node/ubuntu/), or [Windows Server](/manage-a-node/windows/). These tutorials teach you the basics of how Chef works on a virtual machine that we provide.

In [Learn to manage a node](/manage-a-node/ubuntu/), you learned how to write a Chef cookbook from your workstation, upload your cookbook to the Chef server, bootstrap a node, and apply your cookbook to your node. You signed up for a hosted Chef account, which provides you with access to a Chef server that we manage for you.

<img src="/assets/images/networks/workstation-server-node.png" style="width: 100%; box-shadow: none;" alt="Your workstation, a Chef server, and nodes" />

Working with hosted Chef is a great way to get started, and in the long run can minimize the cost of maintaining a Chef server. But you might want to maintain a Chef server on your own infrastructure if you:

* require Chef to run behind a firewall.
* want access to features that require a Chef server that you maintain, such as:
  * [Chef Manage](http://docs.chef.io/manage.html)
  * [Reporting](http://docs.chef.io/reporting.html)
  * [Push Jobs](http://docs.chef.io/push_jobs.html)
  * [Chef Analytics](http://docs.chef.io/analytics.html)
  * [Replication](http://docs.chef.io/server_replication.html)
  * [High Availability](http://docs.chef.io/server_high_availability.html)
* simply prefer to maintain your own Chef server on premises.

In this tutorial, you'll install and configure a Chef server as part of your own infrastructure. Then you'll write and upload a basic cookbook to your Chef server, bootstrap a node, and apply your cookbook to that node.

After completing this lesson, you'll:

* be able to install Chef server, customize its configuration, and prepare your workstation to remotely manage nodes.
* know how to install the Chef management console and other Chef server features.
* experience the process of uploading a cookbook to your Chef server, bootstrapping a node, and applying that cookbook to your node.

You'll get started by setting up your workstation and performing prerequisite tasks for your Chef server.
