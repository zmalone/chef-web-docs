---
title: 'Learn to manage a basic Windows Server web application'
layout: lesson-overview
platform: Windows Server
logo: windows.svg
order: 2
---
In [Learn the Chef basics on Windows Server](/learn-the-basics/windows) and [Learn to manage a Windows Server node](/manage-a-node/windows/), you learned how Chef works by configuring a web server and a custom home page. Let's extend this by building a basic but complete web application on Windows Server that uses a web server, a database, and scripting.

In this tutorial, you'll write Chef code from your workstation, upload your code to a Chef server, and have your Windows Server node pull that code from the Chef server and apply it.

<img src="/assets/images/networks/workstation-server-node.png" style="width: 100%; box-shadow: none;" alt="Your workstation, a Chef server, and nodes" />

You've seen this setup in [Learn to manage a Windows Server node](/manage-a-node/windows/). There, you uploaded your cookbook to the Chef server from your workstation. To apply your cookbook to your node, you ran the `knife ssh` command, which created an SSH connection from your workstation to your node and ran `chef-client` on your node. When your node ran `chef-client`, it pulled the latest cookbooks from the Chef server.

In this tutorial, the node will host the web application, which reads customer records from a database and displays the results on a web page. By the end, you'll have a web application that looks like this:

![the resulting web page](/assets/images/misc/webapp_result_windows.png)

A web application configuration that uses a database and scripting is commonly called a _LAMP stack_. The LAMP  acronym comes from Linux and stands for Linux, Apache, MySQL, and PHP. On Windows, such a configuration is also commonly called a _WISA stack_, which stands for Windows, IIS, SQL Server, and ASP.NET. Both terms can be used when referring to the Windows configuration. You'll work with all of the WISA components in this tutorial.

Setting up a LAMP, or WISA, stack is a great next step to building your Chef skills because it:

* enables you to exercise the skills you've already learned.
* introduces just enough complexity to demonstrate real-world Chef usage patterns.
* uses off-the-shelf software that you probably already know.

After completing this lesson, you'll:

* be able to use attributes to create reusable Chef cookbooks that enable you to build more complex systems.
* know how to incorporate PowerShell DSC in your Chef recipes.
* be more productive by using community cookbooks from Chef Supermarket to perform common tasks.
* know how to use tools such as Berkshelf to resolve dependencies among your cookbooks.

[COMMENT] You don't need to understand all the details about how IIS and SQL Server work to complete this tutorial. The goal is to learn skills and patterns that will help you apply Chef to your specific infrastructure challenges.

You'll get started by setting up your workstation, a Chef server, and a node to manage.
