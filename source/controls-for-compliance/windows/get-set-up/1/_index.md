## 1. Set up your Test Kitchen environment for local development

Test Kitchen works with virtualization and cloud providers to create temporary instances to test your infrastructure code. We often call the software that connects Test Kitchen to the provider a _driver_. Popular drivers are listed [here](https://docs.chef.io/kitchen.html#drivers).

In this tutorial, you'll have the option to use either the Vagrant or Amazon EC2 driver to manage temporary virtual machines.

[COMMENT] With some modification, you can use one of the other [popular drivers](https://docs.chef.io/kitchen.html#drivers). When we show you how to set up your Test Kitchen configuration file, refer to that driver's documentation to learn how to modify your configuration file.

### Option 1: Get set up with Test Kitchen and EC2

This option uses Amazon EC2 to manage virtual machine instances in the cloud.

Choose this option if you prefer to work with cloud instances and have access to an Amazon EC2 account. ([Sign up for an AWS account](http://aws.amazon.com) if you don't have one.)

<a class="button radius" href="/controls-for-compliance/windows/get-set-up/get-set-up-ec2/">Get set up with Test Kitchen and EC2</a>

### Option 2: Get set up with Test Kitchen and Vagrant

This option uses the virtualization tools [VirtualBox](https://www.virtualbox.org) and [Vagrant](https://www.vagrantup.com) to manage virtual machine instances on your workstation.

Choose this option if you prefer to work with virtual machines locally and your workstation can run Windows Server 2012 R2 as a VM (we recommend 50 GB disk space and 16 GB memory; your workstation must be configured to use CPU virtualization).

This option takes longer to set up because you need to build your own Windows Server 2012 R2 base image. The build process can take up to several hours.

<a class="button radius" href="/controls-for-compliance/windows/get-set-up/get-set-up-vagrant/">Get set up with Test Kitchen and Vagrant</a>
