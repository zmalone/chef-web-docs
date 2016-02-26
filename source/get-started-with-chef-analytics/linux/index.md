---
title: 'Get started with Chef Analytics'
layout: lesson-overview
platform: 'Get started with Chef Analytics'
logo: chef-analytics.svg
order: 3
---
Whether you're managing ten nodes or ten thousand, having real-time visibility into what's happening on the Chef server can help you stay on top of your Chef infrastructure. For example, say you want to know:

* when are users updating cookbooks?
* what changes were made immediately before my cookbook stopped working?
* when are new nodes added or existing ones removed?
* are my servers meeting our compliance requirements each time `chef-client` runs?

To answer these questions, you could periodically check the Chef management console or run `knife` to get the current state of your infrastructure. But pulling data doesn't give you a real-time view into your infrastructure. You could have nodes report back, for example, by writing a [handler](https://docs.chef.io/handlers.html), when events you care about occur. But that would require you to set up a reporting mechanism on each node, which is extra process to maintain and something that's likely not realistic as your infrastructure grows.

That's where Chef Analytics comes in. Chef Analytics provides real-time visibility into what is happening on the Chef server, including what’s changing, who made those changes, and when they occurred.

<img src="/assets/images/networks/analytics.png" style="width: 100%; box-shadow: none;" alt="Your workstation, Chef server, Chef Analytics, and nodes" />

Chef Analytics enables you to write _rules_, which describe the events you care about, and _alerts_ and _notifications_, which are the actions that occur in response to an event. Alerts appear in the Chef Analytics web interface. Notifications can be sent through email, instant messaging services like HipChat and Slack, a post to an HTTP service, or to Splunk.

In this tutorial, you'll set up a Chef Analytics server, connect it to your Chef server, and configure it to alert you when your node completes a `chef-client` run.

![Adding a new rule](chef-analytics/alert-converged.png)

After completing this tutorial, you should be able to:

* install and configure Chef Analytics and connect it to your Chef server.
* use the Chef Analytics web interface to view events that happen on your Chef server.
* notify your team when `chef-client` completes on a node.

Let's get started by making sure you're set up to run Chef Analytics.
