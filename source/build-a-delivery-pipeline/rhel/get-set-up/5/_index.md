## 5. Set up your workstation

The installation procedure had you install the Chef Development Kit, or Chef DK. You'll also need to install Vagrant and VirtualBox to enable you to verify new features before you submit them to the pipeline.

[TIP] This section explains the manual steps to help you understand exactly what software you need to install and how to install it. Alternatively, you can also run the [ChefDK_Bootstrap](https://github.com/Nordstrom/chefdk_bootstrap) script to setup your Windows or Mac workstation for Chef development. The script installs [commonly used development tools](https://github.com/Nordstrom/chefdk_bootstrap#what-does-it-do) such as the Atom text editor, Git, VirtualBox, and Vagrant.

### Install VirtualBox

Install VirtualBox. VirtualBox manages your virtual machine instances.

#### Install VirtualBox on Windows using Chocolatey

If you use [Chocolatey](https://chocolatey.org) to manage software packages on Windows, run this command to install VirtualBox.

```ps
$ choco install virtualbox
Chocolatey v0.9.9.8
Installing the following packages:
virtualbox
By installing you accept licenses for the packages.

virtualbox v5.0.4.102546

[...]

Chocolatey installed 1/1 package(s). 0 package(s) failed.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
```

#### Install VirtualBox using the installer

If you're on a Linux or Mac OS workstation or don't use Chocolatey, download and install VirtualBox from the VirtualBox web site.

<a class='accent-button radius' href='https://www.virtualbox.org/wiki/Downloads' target='_blank'>Install VirtualBox&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

<hr>

#### Windows only - Update your PATH environment variable

By default, VirtualBox is installed to <code class="file-path">C:\Program Files\Oracle\VirtualBox</code> on Windows. However, the installer does not add this path to your `PATH` environment variable. Run these commands to add VirtualBox to your system path.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH")
$ $vbox_path = "C:\Program Files\Oracle\VirtualBox"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$vbox_path")
```

<hr>

#### Verify the installation

Now run the following command to verify that VirtualBox is installed.

```bash
# ~
$ VBoxManage --version
5.0.4r102546
```

### Install Vagrant

Next, install Vagrant. Test Kitchen uses Vagrant to communicate with VirtualBox and to configure aspects of the virtual machine such as available memory, host name, and network settings.

#### Install Vagrant on Windows using Chocolatey

If you use [Chocolatey](https://chocolatey.org) to manage software packages on Windows, run this command to install Vagrant.

```ps
$ choco install vagrant
Chocolatey v0.9.9.8
Installing the following packages:
vagrant
By installing you accept licenses for the packages.

vagrant v1.7.4

[...]

Chocolatey installed 1/1 package(s). 0 package(s) failed.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
```

#### Install Vagrant using the installer

If you're on a Linux or Mac OS workstation or don't use Chocolatey, download and install Vagrant from the Vagrant web site.

<a class='accent-button radius' href='https://www.vagrantup.com/downloads.html' target='_blank'>Install Vagrant&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

<hr>

#### Windows only - Update your PATH environment variable

By default, Vagrant is installed to <code class="file-path">C:\HashiCorp\Vagrant\bin</code> on Windows. However, the installer does not add this path to your `PATH` environment variable. Run these commands to add Vagrant to your system path.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH")
$ $vagrant_path = "C:\HashiCorp\Vagrant\bin"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$vagrant_path")
```

<hr>

### Verify the installation

Now run the following to verify that Vagrant is installed.

```bash
# ~
$ vagrant --version
Vagrant 1.7.4
```
