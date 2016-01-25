## 1. Install components

[TIP] If you installed Chef Delivery from your workstation, you can continue to use that same workstation. You can also skip steps 1.1, 1.2, and 1.3 and [move on to step 1.4](#step1.4).

### 1.1. Install Git

You'll need [Git](https://git-scm.com/downloads) to obtain starter code for your project and to interact with Delivery's Git server.

[WINDOWS] On Windows, Git 2.6 is not currently supported for use with Chef Delivery.

[WINDOWS] Many Windows users use Git BASH, which is part of [Git for Windows](https://git-for-windows.github.io). [posh-git](https://github.com/dahlbyk/posh-git) is another popular option, which provides access to Git from Windows PowerShell.

### 1.2. Install the Chef Development Kit

The Chef Development Kit, or Chef DK, gives you the tools needed to write Chef code from your workstation.

[Install the Chef DK](https://downloads.chef.io/chef-dk/) now if you haven't already.

Be sure to set the system Ruby; for details, see [Add Ruby to $PATH](https://docs.chef.io/install_dk.html#add-ruby-to-path).

### 1.3. Install the knife push plugin

The `knife push` plugin enables you to view the status of the build nodes in your Delivery cluster. Install the plugin like this.

```bash
$ chef gem install knife-push
Fetching: knife-push-0.5.2.gem (100%)
Successfully installed knife-push-0.5.2
1 gem installed
```

### 1.4. Install the Delivery CLI

[PRODNOTE] We need to lock down which OS versions each of these is available from. For example, we don't build packages for Ubuntu 15.04+, so `sudo apt-get install delivery-cli` won't work (you need to build from sources, but there's a work-around even to that.)

You'll use the `delivery` command line interface (CLI) to interact with Chef Delivery. Follow the procedure that matches your workstation OS.

[START_TABS cli Mac OS X, RHEL, Ubuntu, Windows]

[START_TAB cliMacOSX active]

1. [Download the package](https://s3.amazonaws.com/delivery-packages/cli/deliverycli-0.0.0%2B20151118205039-1.pkg).
1. Click the package and install.
1. You may need to allow the package on the machine. To do this, open **System Preferences** > **Security & Privacy**, and click **Allow**. You may also go to your <code class="file-path">~/Downloads</code> folder and right-click the package to open the installer. Accept the agreement to install the package.

[END_TAB]

[START_TAB cliWindows]

1. [Download the Delivery CLI installer](https://s3.amazonaws.com/delivery-packages/cli/delivery-cli-0.0.0%2B20151020165859-1-x64.msi).
1. Click the package and install.
1. Modify your `PATH` environment variable to include the path to the `delivery` executable. For example: <code class="file-path">C:\\chef\\delivery-cli\\bin</code>.

[END_TAB]

[START_TAB cliRHEL]

Download the Delivery CLI package like this.

```bash
$ curl -o delivery-cli.rpm https://s3.amazonaws.com/delivery-packages/cli/delivery-cli-20150408004719-1.x86_64.rpm
```

Then run this to install it.

```bash
$ sudo yum install delivery-cli.rpm
```

[END_TAB]

[START_TAB cliUbuntu]

Run this command to add packagecloud.io's repository to your `apt` sources list.

```bash
# ~
$ curl https://packagecloud.io/install/repositories/chef/current/script.deb.sh | sudo bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  5128    0  5128    0     0   4870      0 --:--:--  0:00:01 --:--:--  4874
Detected operating system as Ubuntu/vivid.
Checking for curl...
Detected curl...
Running apt-get update... done.
Installing apt-transport-https... done.
Installing /etc/apt/sources.list.d/chef_current.list...done.
Importing packagecloud gpg key... done.
Running apt-get update... done.

The repository is setup! You can now install packages.
```

Then run this command to install the Delivery CLI package.

```bash
# ~
$ sudo apt-get install delivery-cli

```

[END_TAB]

[END_TABS]

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
5.0.4r102546
```

### Install Vagrant

Next, install Vagrant. Test Kitchen uses Vagrant to communicate with VirtualBox and to configure aspects of the virtual machine such as available memory, host name, and network settings.

<a class='accent-button radius' href='https://www.vagrantup.com/downloads.html' target='_blank'>Install Vagrant&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

[WINDOWS] If you're on a Windows workstation, [read about other ways](/local-development/windows/get-set-up/get-set-up-vagrant/#step2) you can install Vagrant and how to ensure your PATH environment variable is properly set.

Then run the following to verify that Vagrant is installed.

```bash
# ~
$ vagrant --version
Vagrant 1.7.4
```
