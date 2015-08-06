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

### Install the vagrant-winrm plugin

Test Kitchen uses the [vagrant-winrm](https://github.com/criteo/vagrant-winrm) Vagrant plugin to enable the host machine to connect to Windows instances over the WinRM protocol.

Install the plugin like this.

```bash
# ~
$ vagrant plugin install vagrant-winrm
Installing the 'vagrant-winrm' plugin. This can take a few minutes...
Installed the plugin 'vagrant-winrm (0.7.0)'!
```

### Build a Windows Server 2012 R2 Vagrant box

Test Kitchen works with virtualization and cloud providers to create temporary instances to test your infrastructure code. We often call the software that connects Test Kitchen to the provider a _driver_. In this tutorial, you'll use the Vagrant driver to manage virtual machines on your workstation. When Vagrant creates a virtual machine instance, it loads an image, or _box_, which captures a snapshot of the operating system in a preconfigured state.

For some operating systems, Test Kitchen can automatically download a Vagrant box for you. It's also common to build your own box if you need it to contain certain software or security updates. Because of the way Windows Server 2012 R2 is licensed, we can't provide you with a preconfigured box. Here, you'll use the evaluation version of Windows Server 2012 R2 to build your own box.

In this part, you'll perform these steps.

1. Download the evaluation version of Windows Server 2012 R2.
1. Install [Packer](https://packer.io/) on your workstation. You'll use Packer to create a Windows Server machine image.
1. Get the [packer-templates](https://github.com/mwrock/packer-templates) project from GitHub.
1. Run the Packer template to generate a Vagrant box.
1. Register the box with your local Vagrant catalog.

Read [this blog post](http://www.hurryupandwait.io/blog/creating-windows-base-images-for-virtualbox-and-hyper-v-using-packer-boxstarter-and-vagrant) for more information about the process.

#### Download the evaluation version of Windows Server 2012 R2

Download the ISO image of the evaluation version of Windows Server 2012 R2 to your workstation from this URL.

<http://care.dlservice.microsoft.com/dl/download/6/2/A/62A76ABB-9990-4EFC-A4FE-C7D698DAEB96/9600.17050.WINBLUE_REFRESH.140317-1640_X64FRE_SERVER_EVAL_EN-US-IR3_SSS_X64FREE_EN-US_DV9.ISO>

The Packer template that you'll run later reads this file from your <code class="file-path">/iso</code> or <code class="file-path">C:\iso</code> directory. If you can't download the file to this location, you can choose another. We'll show you how to modify the Packer template to read from your path.

While you wait for the download, you can continue to the next step.

#### Install Packer on your workstation

Next, install Packer. Packer is the software that builds the Vagrant box from your ISO image.

<a class='accent-button radius' href='https://packer.io/downloads.html' target='_blank'>Install Packer&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

#### Get the packer-templates project from GitHub

Now download the latest `packer-templates` project from GitHub. This project uses Packer to build the Vagrant box from your ISO image. It also installs all Windows updates and reduces the size of the image as much as possible.

If you use Git, clone the repository to where you do your development work, for example, <code class="file-path">~/Development/mwrock</code>.

```bash
# ~/Development/mwrock
$ git clone https://github.com/mwrock/packer-templates.git
Cloning into 'packer-templates'...
remote: Counting objects: 186, done.
remote: Total 186 (delta 0), reused 0 (delta 0), pack-reused 186
Receiving objects: 100% (186/186), 33.37 KiB | 0 bytes/s, done.
Resolving deltas: 100% (87/87), done.
Checking connectivity... done.
```

If you don't use Git, you can download a .zip file that contains the latest version from GitHub.

![Download the .zip file from GitHub](misc/github_download_zip.png)

<a class='accent-button radius' href='https://github.com/mwrock/packer-templates' target='_blank'>Download the .zip file&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

#### Run the Packer template to generate a Vagrant box

Now run Packer to apply the template to your ISO image.

```bash
# ~/Development/mwrock/packer-templates
$ packer build -force vbox-2012r2.json
virtualbox-iso output will be in this color.

==> virtualbox-iso: Downloading or copying ISO
    virtualbox-iso: Downloading or copying: file:///iso/9600.17050.WINBLUE_REFRESH.140317-1640_X64FRE_SERVER_EVAL_EN-US-IR3_SSS_X64FREE_EN-US_DV9.ISO
==> virtualbox-iso: Creating floppy disk...
    virtualbox-iso: Copying: answer_files/2012_r2/Autounattend.xml
    virtualbox-iso: Copying: scripts/postunattend.xml
    virtualbox-iso: Copying: scripts/boxstarter.ps1
    virtualbox-iso: Copying: scripts/package.ps1
==> virtualbox-iso: Creating virtual machine...
==> virtualbox-iso: Creating hard drive...
==> virtualbox-iso: Attaching floppy disk...
==> virtualbox-iso: Creating forwarded port mapping for SSH (host port 4059)
==> virtualbox-iso: Executing custom VBoxManage commands...
    virtualbox-iso: Executing: modifyvm packer-virtualbox-iso-1438115991 --natpf1 guest_winrm,tcp,,55985,,5985
    virtualbox-iso: Executing: modifyvm packer-virtualbox-iso-1438115991 --memory 2048
    virtualbox-iso: Executing: modifyvm packer-virtualbox-iso-1438115991 --cpus 2
==> virtualbox-iso: Starting the virtual machine...
==> virtualbox-iso: Waiting 10s for boot...
==> virtualbox-iso: Typing the boot command...
==> virtualbox-iso: Waiting for WinRM to become available...
==> virtualbox-iso: Connected to WinRM!
==> virtualbox-iso: Uploading VirtualBox version info (4.3.30)
==> virtualbox-iso: Gracefully halting virtual machine...
    virtualbox-iso: Removing floppy drive...
==> virtualbox-iso: Preparing to export machine...
    virtualbox-iso: Deleting forwarded port mapping for SSH (host port 4059)
==> virtualbox-iso: Exporting virtual machine...
    virtualbox-iso: Executing: export packer-virtualbox-iso-1438115991 --output output-virtualbox-iso/packer-virtualbox-iso-1438115991.ovf
==> virtualbox-iso: Unregistering and deleting virtual machine...
==> virtualbox-iso: Running post-processor: vagrant
==> virtualbox-iso (vagrant): Creating Vagrant box for 'virtualbox' provider
    virtualbox-iso (vagrant): Copying from artifact: output-virtualbox-iso/packer-virtualbox-iso-1438115991-disk1.vmdk
    virtualbox-iso (vagrant): Copying from artifact: output-virtualbox-iso/packer-virtualbox-iso-1438115991.ovf
    virtualbox-iso (vagrant): Renaming the OVF to box.ovf...
    virtualbox-iso (vagrant): Using custom Vagrantfile: vagrantfile-windows.template
    virtualbox-iso (vagrant): Compressing: Vagrantfile
    virtualbox-iso (vagrant): Compressing: box.ovf
    virtualbox-iso (vagrant): Compressing: metadata.json
    virtualbox-iso (vagrant): Compressing: packer-virtualbox-iso-1438115991-disk1.vmdk
Build 'virtualbox-iso' finished.

==> Builds finished. The artifacts of successful builds are:
--> virtualbox-iso: VM files in directory: output-virtualbox-iso
--> virtualbox-iso: 'virtualbox' provider box: windows2012r2min-virtualbox.box
```

If you downloaded the ISO image to a directory other than <code class="file-path">/iso</code> or <code class="file-path">C:\iso</code>, [modify vbox-2012r2.json](https://github.com/mwrock/packer-templates/blob/8b4e62a014a571666a4534458426ff397932b330/vbox-2012r2.json#L49) to point to your path.

[COMMENT] This process applies all Windows updates and makes the image as small as possible. It can take several hours to complete. While you wait, you can complete the remaining steps on this page to set up Chef server, Chef Analytics, and a node to manage.

#### Register the box with your local Vagrant catalog

After the Packer process finishes, confirm that <code class="file-path">windows2012r2min-virtualbox.box</code> exists in your <code class="file-path">packer-templates</code> directory.

```bash
# ~/Development/mwrock/packer-templates
$ ls windows2012r2min-virtualbox.box
windows2012r2min-virtualbox.box
```

Now run this command to add the box to your local Vagrant catalog.

```bash
# ~/Development/mwrock/packer-templates
$ vagrant box add windows-2012r2 windows2012r2min-virtualbox.box
==> box: Adding box 'windows-2012r2' (v0) for provider:
    box: Downloading: file:///Users/user/Development/mwrock/packer-templates/windows2012r2min-virtualbox.box
==> box: Successfully added box 'windows-2012r2' (v0) for 'virtualbox'!
```

Now confirm that the box is successfully registered.

```bash
# ~/Development/mwrock/packer-templates
$ vagrant box list
windows-2012r2       (virtualbox, 0)
```

### (Optional) Learn about Test Kitchen

The first part of this tutorial uses Test Kitchen to apply your audit and infrastructure code on a local virtual machine.

If you're not familiar with Test Kitchen, follow this Learn Chef tutorial to get set up with the tools and learn how Test Kitchen works.

We have one version of the tutorial that shows you how to work with a Red Hat Enterprise Linux or CentOS virtual machine and another version that uses Ubuntu. Either will teach you what you need to know to use Test Kitchen in this tutorial. We'll have a version for Windows Server available soon.

<a class='accent-button radius' href='/local-development/rhel/' target='_blank'>Learn to develop your infrastructure code locally (Red Hat Enterprise Linux)&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

<a class='accent-button radius' href='/local-development/ubuntu/' target='_blank'>Learn to develop your infrastructure code locally (Ubuntu)&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>
