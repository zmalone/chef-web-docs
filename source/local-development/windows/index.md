---
title: 'Develop your Windows Server infrastructure code locally'
layout: lesson-overview
platform: Windows Server
logo: windows.svg
order: 2
---
In [Manage a Windows Server node](/tutorials/manage-a-node/windows/), you built a basic web server configuration on Windows Server 2012 R2. As part of the process, you set up a Chef server, brought up a node to manage, and bootstrapped your node.

The bootstrap process installed the Chef tools on your node, pulled the latest cookbooks from the Chef server, and performed an initial `chef-client` run on your node. After the bootstrap process completed, you made a small change to your web server cookbook and applied that change to your node. The overall process looks like this:

1. Write a small amount of Chef code that expresses some new policy or feature.
1. Upload your code to the Chef server.
1. Run `chef-client` to apply the updated policy on your node.
1. Log in to your node and manually verify that it's configured as you expect.
1. Repeat the process.

<img src="/assets/images/misc/dev_cycle_4.png" style="width:50%; height:auto; box-shadow:none;" alt="The current development cycle" />

What if you want to quickly experiment with a new feature, or you make a mistake and have to restart the process? It can take some time to tear down your existing node, provision and bootstrap a new one, upload your cookbooks, and run `chef-client`. How can we speed up this cycle and shorten the development process?

One answer is [Test Kitchen](http://kitchen.ci). Test Kitchen is a tool that runs your infrastructure code in an isolated environment that resembles your production environment. With Test Kitchen, you continue to write your Chef code from your workstation, but instead of uploading your code to the Chef server and applying it to a node, Test Kitchen applies your code to a temporary environment, such as a virtual machine on your workstation or a cloud or container instance.

We consider using a temporary environment to be _local development_, no matter where that environment is located. With local development, you can iterate faster and correct mistakes earlier in the development process. Once you've written and verified your code locally, you can upload your cookbooks to the Chef server, bootstrap your node, and run `chef-client` on your node.

Local development shifts the development workflow to one that focuses on correcting mistakes earlier in the development process, _before_ you apply  your changes to production systems. In this workflow, you:

1. Write a small amount of Chef code that expresses some new policy or feature.
1. Verify your change on local test instances.
1. Upload your code to the Chef server.
1. Run `chef-client` to apply the updated policy on your node.
1. Repeat the process.

<img src="/assets/images/misc/dev_cycle_4_2.png" style="width:50%; height:auto; box-shadow:none;" alt="The improved development cycle" />

Another benefit to using Test Kitchen is that the operating system of your virtual environment doesn't need to match your workstation's. So even though you're configuring Windows Server, your workstation can be Mac OS, Windows, or Linux.

In this tutorial, you'll use Test Kitchen to apply a basic cookbook that writes a settings file to disk. You'll have the option to configure Test Kitchen to work with Amazon EC2 instance or a virtual machine on your workstation under Hyper-V or VirtualBox and Vagrant.

After completing this tutorial, you'll understand the basics of how to use Test Kitchen to apply your cookbooks locally on temporary instances.

Let's get started by setting up the virtualization tools on your workstation.
