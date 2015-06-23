---
title: 'Get started with Chef analytics'
layout: lesson-overview
platform: Get started with Chef Analytics
logo: chef-analytics.svg
order: 3
---
[INTRO BLURB ABOUT ANALYTICS]

<img src="/assets/images/networks/analytics.png" style="width: 100%; box-shadow: none;" alt="Your workstation, a Chef server, and nodes" />

* Chef server and Chef Analytics run on Ubuntu and Red Hat Enterprise Linux or CentOS.
* Your node, or the server that you want to manage with Chef, can run any of the UNIX, Linux or Windows operating systems [that Chef supports](https://docs.chef.io/supported_platforms.html).
* Your workstation can be any OS you choose &ndash; be it Linux, Mac OS, or Windows.

In this tutorial, you'll set up Chef Analytics to email you when your node completes a `chef-client` run.

![Adding a new rule](chef-analytics/notification-email.png)

After completing this lesson, you'll:

* be able to set up and work with a Chef server in your own infrastructure.
* be able to set up a Chef reporting server.
* be able to set up a Chef
* be more productive by using community cookbooks from Chef Supermarket to perform common tasks.
* be able to use encrypted data bags to protect sensitive data.
* know how to use tools such as Berkshelf to resolve dependencies among your cookbooks.

You'll need X systems to complete this tutorial &ndash; your workstation, a server to run Chef server, a server to run Chef Analytics, and a node to manage. We'll review the system requirements in the following lesson.

For this tutorial, you'll need four computers, all accessible from the same network.

* Your workstation
* A server to run Chef server
* A server to run Chef Analytics
* A node to manage

[COMMENT] Chef server and Chef Analytics must exist on separate systems due to the heavy processing requirements of Chef Analytics.

Let's get started by setting up your workstation and setting up the servers you'll need.
