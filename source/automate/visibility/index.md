---
title: 'Gain visibility into your infrastructure'
layout: lesson-overview
platform: Gain visibility into your infrastructure
logo: delivery.svg
order: 2
---
Whether you're managing ten nodes or ten thousand, having real-time visibility into what's happening on the Chef server can help you stay on top of your Chef infrastructure. For example, say you want to know:

* when are users updating cookbooks?
* what changes were made immediately before my cookbook stopped working?
* what is the status of my production infrastructure?
* when are new nodes added or existing ones removed?
* are my servers meeting our compliance requirements?

To answer these questions, you could periodically check the Chef management console or run `knife` to get the current state of your infrastructure. But pulling data doesn't give you a real-time view into your infrastructure. You could have nodes report back, for example, by writing a [handler](https://docs.chef.io/handlers.html), when events you care about occur. But that would require you to set up a reporting mechanism on each node, which is extra process to maintain and something that's likely not realistic as your infrastructure grows.

That's where Chef Automate's [visibility] capabilities come in. Chef Automate provides real-time visibility into what is happening on the Chef server, including what’s changing, who made those changes, and when they occurred.

Background: Chef Analytics is/was a 1:1, where it was a Chef Server to Analytics interface. Chef Visibility/Insights is 1:many, where you can holistically understand the state of your infrastructure managed by Chef.

Chef Insights integrates with Delivery Workflow, Chef Server, Chef Client, and Chef Compliance to give you actionable data into the status of your infrastructure and team.

![](automate/Chef-Automate.png)

In this tutorial, you'll XYZ.

Then you'll ABC.

After completing this tutorial, you should be able to:

* A
* B
* C

[NOTE ABOUT GETTING DEMO ENV FIRST]

[SOMEWHERE: NOTE ABOUT OTHER SKILLS YOU SHOULD KNOW]

Let's get started by XXXXXX.
