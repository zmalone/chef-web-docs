---
title: 'Learn how to test your Ubuntu infrastructure code'
layout: lesson-overview
platform: Ubuntu
logo: ubuntu.svg
order: 1
---
In [Learn to develop your infrastructure code locally](/local-development/ubuntu/), you used [Test Kitchen](http://kitchen.ci) to configure and run a web application in an isolated environment that resembles your production environment.

Local development with Test Kitchen can greatly speed up the development process because it shortens the time it takes to bring up a machine and apply your Chef code. If you make a mistake or want to try something new, you can run your cookbook again or simply destroy the instance and create a new one.

One advantage to developing locally is that it enables you to confirm that `chef-client` completes successfully in your target environment. However, you still need to verify that your instance was configured as you expect. As your project gets more complex, making a small change to one component can affect the behavior of another.

For example, [TODO: describe a scenario where a small change affects the rest of the system].

As the name suggests, Test Kitchen can also help you automate the verification process much like how it automates the creation and destruction of instances.

<img src="/assets/images/networks/workstation-vm.png" style="width:40%; box-shadow: none;" alt="Your workstation, Test Kitchen, and a virtual machine" />

There are many kinds of testing, such as unit testing and integration testing (to learn more, see Joshua Timberman's [Overview of test driven infrastructure with Chef](/skills/test-driven-development/)). Instead of focusing on the differences among the various kinds of testing, in this tutorial you'll verify that:

* your cookbook put your node in the desired state.
* your resources are properly defined.

[TODO: Add [testing paper](https://github.com/chef/learn-chef/tree/tp/skills-library/source/skills/test-driven-development) to Skills Library and point to it from here.]

Remember, Test Kitchen [works with a number of](http://misheska.com/blog/2014/09/21/survey-of-test-kitchen-providers/) virtualization and cloud providers and with containers. In this tutorial, you'll continue to use Test Kitchen together with the virtualization tools [VirtualBox](https://www.virtualbox.org) and [Vagrant](https://www.vagrantup.com) to manage instances on your workstation. You'll start by [TODO: explain the basic scenario]. Then you'll write tests to verify that the `awesome_customers` cookbook configures your web application properly.

You'll get started by setting up ChefDK and the virtualization tools on your workstation.

[HEADLINE] Writing just one test [is better than nothing]

[HEADLINE] Testing your configuration code through automation gives you increased confidence that your changes will work as you expect in production.

Exercise: change your web application to listen to port 81 instead of port 80 and write a test to confirm that it works.
