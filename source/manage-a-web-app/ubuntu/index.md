---
title: 'Learn to manage a basic web application on Ubuntu'
layout: lesson-overview
platform: Ubuntu
logo: ubuntu.svg
order: 3
---
In [Learn the basics](/learn-the-basics/ubuntu) and [Manage a node](/manage-a-node/ubuntu/), you learned how Chef works by configuring a web server and a custom home page. Let's extend what you learned by building a basic but complete web application on Ubuntu that uses a web server, a database, and scripting.

In this tutorial, you'll write Chef code from your workstation, upload your code to a Chef server, and have your Ubuntu node pull that code from the Chef server and apply it.

<img src="/assets/images/networks/workstation-server-node.png" style="width: 100%; box-shadow: none;" alt="Your workstation, a Chef server, and nodes" />

You've seen this setup in [Manage a node](/manage-a-node/ubuntu/). There, you uploaded your cookbooks to the Chef server from your workstation. To apply your cookbook to your node, you ran the `knife ssh` command, which created an SSH connection from your workstation to your node and ran `chef-client` on your node. When your node ran `chef-client`, it pulled the latest cookbooks from the Chef server.

In this tutorial, the node will host the web application, which reads customer records from a database and displays the results on a web page. By the end, you'll have a web application that looks like this:

![the resulting web page](/assets/images/ubuntu/webapp_result.png)

A web application configuration that uses a database and scripting is commonly called a _LAMP stack_. LAMP stands for Linux, Apache, MySQL, and PHP. You'll work with all of these components in this tutorial.

Setting up a LAMP stack is a great next step to building your Chef skills because it:

* enables you to exercise the skills you've already learned.
* introduces just enough complexity to demonstrate real-world Chef usage patterns.
* uses off-the-shelf software that you're likely familiar with.

After completing this lesson, you'll:

* be able to use attributes to create reusable Chef cookbooks that enable you to build more complex systems.
* be more productive by using community cookbooks from Chef Supermarket to perform common tasks.
* know how to use tools such as Berkshelf to resolve dependencies among your cookbooks.

You'll get started by setting up your workstation, a Chef server, and a node to manage.
