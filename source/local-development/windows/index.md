---
title: 'Learn to develop your Windows Server infrastructure code locally'
layout: lesson-overview
platform: Windows Server
logo: windows.svg
order: 2
---
In [Learn to manage a basic Windows Server web application](/manage-a-web-app/windows), you built a basic but complete web application on Windows Server 2012 R2 that uses a web server, a database, and ASP.NET code.

The basic process you followed was to:

1. Write a small amount of Chef code that expresses some new policy or feature.
1. Resolve any dependencies your cookbook has on other cookbooks.
1. Upload your code to the Chef server.
1. Run `chef-client` to apply the updated policy on your node.
1. Log on to your node and manually verify that it's configured as you expect.
1. Repeat the process.

<img src="/assets/images/misc/dev_cycle.png" style="width:60%; box-shadow: none;" alt="The current development cycle" />

What if you want to quickly experiment with a new feature, or you make a mistake and have to repeat the process? It can take some time to tear down your existing node, provision and bootstrap a new one, upload your cookbooks, and run `chef-client`. How can we speed up this cycle and shorten the development process?

One answer is [Test Kitchen](http://kitchen.ci). Test Kitchen is a tool that runs your infrastructure code in an isolated environment that resembles your production environment. With Test Kitchen, you continue to write your Chef code from your workstation, but instead of uploading your code to the Chef server and applying it to a node, Test Kitchen applies your code to a temporary environment, such as a virtual machine on your workstation or a cloud or container instance. We consider using a temporary environment to be _local development_, no matter where that environment is located. With local development, you can iterate faster and correct mistakes earlier in the development process. Once you've written and verified your code locally, you can upload your cookbooks to the Chef server, bootstrap your node, and run `chef-client` on your node.

<img src="/assets/images/networks/workstation-vm.png" style="width:40%; box-shadow: none;" alt="Your workstation, Test Kitchen, and a virtual machine" />

In this tutorial, you'll use Test Kitchen to apply the `awesome_customers` cookbook you created in the previous tutorial on either an Amazon EC2 instance or a virtual machine on your workstation under Hyper-V or VirtualBox and Vagrant.

Recall that the `awesome_customers` cookbook configures a basic web application that reads customer records from a database and displays the results on a web page.

![the resulting web page](misc/webapp_result_windows_local.png)

Another benefit to using Test Kitchen is that the operating system of your virtual environment doesn't need to match your workstation's. So even though you're configuring Windows Server, your workstation can be Mac OS, Windows, or some flavor of Linux.

After completing this lesson, you'll:

* understand how to set up your environment to run temporary Windows Server instances either on your workstation or in the cloud.
* know how to use Test Kitchen to apply your cookbooks to your temporary Windows Server instances.
* gain confidence that the changes you make to your cookbooks will work like you expect in production.

You'll get started by setting up Chef DK and the virtualization tools on your workstation.
