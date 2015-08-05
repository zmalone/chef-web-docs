## 1. Set up your workstation

### Install the Chef development kit on your workstation

Install Chef DK on your workstation now if you haven't already. Chef DK comes with Test Kitchen, so there's nothing additional to set up.

<a class='accent-button radius' href='https://downloads.chef.io/chef-dk/' target='_blank'>Install Chef DK&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

### Install VirtualBox

Next, install VirtualBox. VirtualBox is software that manages your virtual machine instances.

<a class='accent-button radius' href='https://www.virtualbox.org/wiki/Downloads' target='_blank'>Install VirtualBox&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

Then run the following command to verify that VirtualBox is installed.

```bash
# ~
$ VBoxManage --version
4.3.26r98988
```

[WINDOWS] By default, VirtualBox is installed to <code class="file-path">C:\Program Files\Oracle\VirtualBox</code> on Windows. However, this path is not added to the `PATH` environment variable. Either `cd` to this directory or add it to your `PATH` before you run `VBoxManage`.

### Install Vagrant

Next, install Vagrant. Vagrant is software that Test Kitchen can use to communicate with VirtualBox and configure aspects of the virtual machine such as available memory, host name, and network settings.

<a class='accent-button radius' href='https://www.vagrantup.com/downloads.html' target='_blank'>Install Vagrant&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

Then run the following to verify that Vagrant is installed.

```bash
# ~
$ vagrant --version
Vagrant 1.7.2
```

### INSTALL VAGRANT-WINRM

### Build a Windows Server 2012 R2 Vagrant box

Test Kitchen works with virtualization and cloud providers to create temporary instances to test your infrastructure code. In this tutorial, you'll work with Vagrant to manage virtual machines on your workstation. When Vagrant creates a virtual machine instances, it loads an image, or _box_, that captures a snapshot of the operating system [in a preconfigured state].

For some operating systems, Test Kitchen can automatically download a Vagrant box for you. It's also common to build your own box if you need it to contain certain software or security updates. Because of the way Windows Server 2012 R2 is licensed, we can't provide you with a preconfigured box. However, you can build your own by downloading the evaluation version of Windows Server 2012 R2 and running a [Packer](https://packer.io/) script to [XxX].

1. Install Packer.
1. Clone the repo or download the .zip file.
1. Run the template. NOte it can take serveral hours. (& note at top)

 called
When you use Test Kitchen with Vagrant to run virtual machines on your workstation, Vagrant

When Test Kitchen runs, it downloads the base virtual machine image, called a _box_,

![Download the .zip file from GitHub](misc/github_download_zip.png)

http://www.hurryupandwait.io/blog/creating-windows-base-images-for-virtualbox-and-hyper-v-using-packer-boxstarter-and-vagrant

In order to run the template, you will need the following: 1. Packer installed with a minimum version of 0.8.1. 2. Virtualbox 3. An ISO file. The template is hardcoded to look for this at iso/9600.17050.WINBLUE_REFRESH.140317-1640_X64FRE_SERVER_EVAL_EN-US-IR3_SSS_X64FREE_EN-US_DV9.ISO. New evaluation ISOs of windows 2012R2 can be downloaded from msdn.



### (Optional) Learn about Test Kitchen

The first part of this tutorial uses Test Kitchen to apply your audit and infrastructure code on a local virtual machine.

If you're not familiar with Test Kitchen, follow this Learn Chef tutorial to get set up with the tools and learn how Test Kitchen works.

We have one version of the tutorial that shows you how to work with a Red Hat Enterprise Linux or CentOS virtual machine and another version that uses Ubuntu. We'll have a version for Windows Server available soon.

<a class='accent-button radius' href='/local-development/rhel/' target='_blank'>Learn to develop your infrastructure code locally (Red Hat Enterprise Linux)&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

<a class='accent-button radius' href='/local-development/ubuntu/' target='_blank'>Learn to develop your infrastructure code locally (Ubuntu)&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>
