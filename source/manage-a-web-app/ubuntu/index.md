---
title: 'Manage a basic Ubuntu web application'
layout: lesson-overview
platform: Ubuntu
logo: ubuntu.svg
order: 3
---
In this tutorial, you'll have the opportunity to practice what you've learned in the previous tutorials. Here's a quick recap:

* In [Learn the Chef basics](/learn-the-basics/ubuntu), you learned how Chef works by running `chef-client` in local mode to configure an Ubuntu server directly.
* In [Manage a node](/tutorials/manage-a-node/ubuntu/), you learned how to set up your Chef server and bootstrap and manage a server, also called a _node_, remotely from your workstation.
* In [Get started with Test Kitchen](/tutorials/local-development/ubuntu/), you learned how _local development_ with Test Kitchen helps shorten the development process. With Test Kitchen, you apply your cookbook to a temporary instance that resembles production before you apply your work to a bootstrapped node.

Now you'll build a basic but complete web application on Ubuntu called Customers that uses a web server, a database, and scripting. Such a configuration is commonly called a _LAMP stack_. LAMP stands for Linux, Apache, MySQL, and PHP. You'll write a cookbook that's named `awesome_customers_ubuntu`.

In the first part of this tutorial, you'll use an iterative process to build and verify each part of your web application. You'll do this by using Test Kitchen and a virtual machine that runs on your workstation.

After successfully verifying the completed web application locally, you'll set up an Ubuntu 14.04 node to bootstrap, upload your cookbook to the Chef server, bootstrap your node, and apply your web server configuration.

By the end, you'll have a web application that looks like this:

![the resulting web page](misc/manage_customers_node.png)

Setting up a LAMP stack is a great next step to building your Chef skills because it:

* enables you to exercise the skills you've already learned.
* introduces just enough complexity to demonstrate real-world Chef usage patterns.
* uses off-the-shelf software that you probably already know.

After completing this tutorial, you should be able to:

* use attributes to create reusable Chef cookbooks that enable you to build more complex systems.
* use community cookbooks from Chef Supermarket to perform common tasks.
* use Berkshelf to resolve dependencies among your cookbooks.

[COMMENT] You don't need to understand all the details about how Apache and MySQL work to complete this tutorial. The goal is to learn skills and patterns that will help you apply Chef to your specific infrastructure challenges.

You'll get started by making sure your workstation is set up for local development with Test Kitchen, VirtualBox, and Vagrant.

[COMMENT] You can [follow this quickstart](/manage-a-web-app/ubuntu/bring-up-the-web-app-using-test-kitchen/) if you've gone through the tutorial previously, or you have enough familiarity with Chef and just want to see the Customers web application in action.
