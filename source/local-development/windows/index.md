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

Say you want to quickly experiment with a new feature, or you make a mistake and have to repeat the process? It can take some time to tear down your existing node, provision and bootstrap a new one, upload your cookbooks, and run `chef-client`. How can we speed up this cycle and shorten the development process?

One answer is [Test Kitchen](http://kitchen.ci). Test Kitchen is a tool that runs your infrastructure code in an isolated environment that resembles your production environment. With Test Kitchen, you continue to write your Chef code from your workstation, but instead of uploading your code to the Chef server and applying it to a node, Test Kitchen applies your code to a temporary environment, such as a virtual machine on your workstation or a cloud or container instance. Doing so enables you to iterate faster and correct mistakes earlier in the process. Only after you've written and verified your configuration code do you need to upload your cookbooks to the Chef server, bootstrap your node, and run `chef-client` on your node.

In this tutorial, you'll use Test Kitchen together with the virtualization tools [VirtualBox](https://www.virtualbox.org) and [Vagrant](https://www.vagrantup.com) to apply the `awesome_customers` cookbook you created in the previous tutorial on a virtual machine on your workstation.

<img src="/assets/images/networks/workstation-vm.png" style="width:40%; box-shadow: none;" alt="Your workstation, Test Kitchen, and a virtual machine" />

Another benefit to using Test Kitchen is that the operating system of your virtual environment doesn't need to match your workstation's. So even though you're configuring Windows Server, your workstation can be Mac OS, Windows, or another Linux distribution.

Recall that the `awesome_customers` cookbook configures a basic web application that reads customer records from a database and displays the results on a web page.

![the resulting web page](/assets/images/misc/webapp_result_test_kitchen.png)

After completing this lesson, you'll:

* know how to use Test Kitchen to apply your cookbooks locally on temporary instances.
* be able to set up basic network settings for your instance, such as its IP address.
* understand how to transfer your data bags and secret key file from your workstation to your instance.

You'll get started by setting up Chef DK and the virtualization tools on your workstation.
