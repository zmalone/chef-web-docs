---
title: 'Get started with Chef Analytics'
layout: lesson-overview
platform: 'Get started with Chef Analytics'
logo: chef-analytics.svg
order: 3
---
In [Learn to install and manage your own Chef server](/install-and-manage-your-own-chef-server/linux/), you learned how to install and configure a Chef server on premises, in your own infrastructure. Running Chef server on premises is ideal when you need to run Chef behind the firewall or when you need access to additional features.

In the process, you installed the Chef management console, the web-based interface into Chef server. The Chef management console is a great way to get a glimpse into your infrastructure and fine-tune individual nodes, but does not necessarily give you the real-time visibility you need, especially as your Chef infrastructure grows into tens, hundreds, or even thousands of nodes.

As a basic example, say you wan to notify your team when `chef-client` completes on your nodes. You could periodically check your nodes in the Chef management console and write an email when nodes check in to Chef server, but that's a manual process that likely wouldn't scale. You could write a [Chef handler](https://docs.chef.io/handlers.html) that sends email when `chef-client` completes. But that would require you to set up the handler on each node and would also require each node to have its own mail client and outbound port access &ndash; requirements that are likely not realistic in production.

That's where [Chef Analytics](https://docs.chef.io/analytics.html) comes in. Chef Analytics provides real-time visibility into what is happening on the Chef server, including what’s changing, who made those changes, and when they occurred.

<img src="/assets/images/networks/analytics.png" style="width: 100%; box-shadow: none;" alt="Your workstation, Chef server, Chef Analytics, and nodes" />

Chef Analytics enables you to notify your team when certain events occur on the Chef server, such as when:

* a cookbook is uploaded to Chef server.
* resources have changed on a node during a successful `chef-client` run.
* a `chef-client` run or [audit mode run](https://docs.chef.io/analytics.html#audit-mode) fails.

A notification can be in the form of an email, a post to the HipChat instant messaging Web service, or a post to any HTTP endpoint.

In this tutorial, you'll set up Chef Analytics to email you when your node completes a `chef-client` run.

![Adding a new rule](chef-analytics/notification-email.png)

After completing this lesson, you'll be able to:

* install and configure Chef Analytics and connect it to your Chef server.
* use the Chef Analytics web interface to view events that happen on your Chef server.
* notify your team when `chef-client` completes on a node.

Let's get started by performing the prerequisite tasks to run Chef Analytics.
