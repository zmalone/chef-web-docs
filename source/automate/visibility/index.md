---
title: 'Gain visibility into your infrastructure with Chef Automate'
layout: lesson-overview
platform: Gain visibility into your infrastructure with Chef Automate
logo: insight.svg
order: 2
---
Whether you're managing ten nodes or ten thousand, having real-time visibility can help you stay on top of your infrastructure. For example, say you want to know:

* when are users updating cookbooks?
* what changes were made immediately before my cookbook stopped working?
* what is the status of my production infrastructure?
* when are new nodes added or existing ones removed?
* are my servers meeting our compliance requirements?

To answer these questions, you could periodically check the Chef management console or run `knife` to get the current state of your infrastructure. But pulling data doesn't give you a real-time view into your infrastructure. You could have nodes report back, for example, by writing a [handler](https://docs.chef.io/handlers.html), when events you care about occur. But that would require you to set up a reporting mechanism on each node, which is extra process to maintain and something that's likely not realistic as your infrastructure grows.

That's where Chef Automate come in. Chef Automate provides real-time visibility into what is happening on the Chef server, `chef-client`, and Chef Compliance, including what’s changing, who made those changes, and when they occurred.

[PRODNOTE] Get updated diagram and create a version that highlights visibility.

![](automate/Chef-Automate.png)

In the [previous tutorial](/automate/install/), you brought up a preconfigured demo environment that runs in Amazon Web Services (AWS). In this tutorial, you'll bootstrap nodes provided by the demo environment to run a basic web application cookbook named `awesome_customers_delivery`, which displays fictitious customer data to the user. If you've gone through the [Manage a basic web application](/manage-a-web-app/ubuntu/) tutorial, you'll be familiar with this cookbook (this tutorial is not a prerequisite).

Here's what the Customers web application looks like.

<img style="max-width:100%;" src="/assets/images/delivery/acceptance-customers-verify.png"/>

[PRODNOTE] Update screenshot ^.

You'll see how Chef Automate provides insight into what's happening on your Chef server, such as when `chef-client` completes. You'll also see how to use Chef Automate to detect when a `chef-client` run fails and then remedy the failure.

The bootstrap process prepares your environment for the next tutorial, [Deploy a cookbook with Chef Automate](/automate/deploy-cookbook/), where you'll walk through delivering the web application cookbook using Chef Automate's workflow features.

## Before you begin

The best way to get started with Chef Automate is to bring up a preconfigured demo environment that runs in Amazon Web Services (AWS). [Get the Chef Automate demo environment](/automate/install/) if you haven't already.
