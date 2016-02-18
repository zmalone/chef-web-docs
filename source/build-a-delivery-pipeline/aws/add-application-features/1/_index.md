## 1. Set up your workstation for local development

Let's begin by installing [VirtualBox](https://www.virtualbox.org) and [Vagrant](https://www.vagrantup.com), which will enable you to verify your work on a local virtual machine.

The [workstation setup](/build-a-delivery-pipeline/aws/set-up-your-workstation/) had you install the Chef Development Kit, or Chef DK. You'll also need to install Vagrant and VirtualBox to enable you to verify new features before you submit them to the pipeline.

[TIP] This section explains the manual steps to help you understand exactly what software you need to install and how to install it. Alternatively, you can also run the [ChefDK_Bootstrap](https://github.com/Nordstrom/chefdk_bootstrap) script to setup your Windows or Mac workstation for Chef development. The script installs [commonly used development tools](https://github.com/Nordstrom/chefdk_bootstrap#what-does-it-do) such as the Atom text editor, Git, VirtualBox, and Vagrant.

### Before you begin

Ensure that your workstation supports and is configured to use CPU virtualization. This setting is typically configured through your system's BIOS.

If you're using a virtual machine as your workstation through a program such as VMWare Fusion, ensure that nested virtualization is enabled on the virtual machine.

Also ensure that your workstation meets the [system requirements](https://www.virtualbox.org/wiki/End-user_documentation) requirements for running VirtualBox.

If you are unable to run virtual machines from your workstation, you can skip the steps that involve verifying the changes locally.

### Install VirtualBox

Install VirtualBox. VirtualBox manages your virtual machine instances.

<a class='accent-button radius' href='https://www.virtualbox.org/wiki/Downloads' target='_blank'>Install VirtualBox&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

[WINDOWS] If you're on a Windows workstation, [read about other ways](/local-development/windows/get-set-up/get-set-up-vagrant/#step1) you can install VirtualBox and how to ensure your PATH environment variable is properly set.

Then the following command to verify that VirtualBox is installed.

```bash
# ~
$ VBoxManage --version
5.0.14r105127
```

### Install Vagrant

Next, install Vagrant. Test Kitchen uses Vagrant to communicate with VirtualBox and to configure aspects of the virtual machine such as available memory, host name, and network settings.

<a class='accent-button radius' href='https://www.vagrantup.com/downloads.html' target='_blank'>Install Vagrant&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

[WINDOWS] If you're on a Windows workstation, [read about other ways](/local-development/windows/get-set-up/get-set-up-vagrant/#step2) you can install Vagrant and how to ensure your PATH environment variable is properly set.

Then run the following to verify that Vagrant is installed.

```bash
# ~
$ vagrant --version
Vagrant 1.8.1
```
