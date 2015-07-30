---
title: 'Audit a Windows Server node for compliance'
layout: lesson-overview
platform: 'Windows Server'
logo: windows.svg
order: 3
---

## Notes

50GB HDD space?

https://github.com/djberg96/win32-file

Get set up - install vagrant-winrm Vagrant plugin

http://kitchen.ci/blog/test-kitchen-windows-test-flight-with-vagrant/

Install Packer
https://www.packer.io/intro/getting-started/setup.html

```bash
----> Starting Kitchen (v1.4.0)
>>>>>> ------Exception-------
>>>>>> Class: Kitchen::UserError
>>>>>> Message: WinRM Transport requires the vagrant-winrm Vagrant plugin to properly communicate with this Vagrant VM. Please install this plugin with: `vagrant plugin install vagrant-winrm' and try again.
>>>>>> ----------------------
>>>>>> Please see .kitchen/logs/kitchen.log for more details
>>>>>> Also try running `kitchen diagnose --all` for configuration
```

```bash
# ~
$ vagrant plugin install vagrant-winrm
Installing the 'vagrant-winrm' plugin. This can take a few minutes...
Installed the plugin 'vagrant-winrm (0.7.0)'!
```

Step to make the box (install Packer)

make blah

A VirtualBox window will come up with the VM running. It's waiting for a WinRM connection.

```
[...]
==> virtualbox-iso: Starting the virtual machine...
==> virtualbox-iso: Waiting 10s for boot...
==> virtualbox-iso: Typing the boot command...
==> virtualbox-iso: Waiting for WinRM to become available...
```

From your Windows Server instance, run the following command from a Command Prompt window (run as `Administrator`), not PowerShell.

```cmd
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

```bash
$ vagrant box add windows-2012r2 windows2012r2min-virtualbox.box
==> box: Adding box 'windows-2012r2' (v0) for provider:
    box: Downloading: file:///Users/thomaspetchel/Development/mwrock/packer-templates/windows2012r2min-virtualbox.box
==> box: Successfully added box 'windows-2012r2' (v0) for 'virtualbox'!
```

```bash
$ vagrant box list
windows-2012r2       (virtualbox, 0)
```

```bash
# ~/chef-repo/cookbooks/test
kitchen list
Instance                Driver   Provisioner  Verifier  Transport  Last Action
default-windows-2012r2  Vagrant  ChefZero     Busser    Winrm      <Not Created>
```



-- -- --




Whether you must comply with regulatory frameworks such as PCI, HIPAA, or Dodd-Frank, or you have internal company standards you must meet, adhering to your compliance policies helps you deliver safe, secure applications and services.

Meeting the challenge of compliance requires both planning and action, and can be broken down into these stages:

* **Analyze** &mdash; Be clear about your compliance requirements and the desired state of your infrastructure.
* **Specify** &mdash; Translate your desired state into a formal language that precisely specifies your requirements.
* **Test** &mdash; Verify whether the actual state of your infrastructure meets the desired state. Automated tests scale better than manual tests, and can be written even before a new software system or service is developed to provide a clear set of standards that must be met.
* **Certify** &mdash; Although not always required, many compliance processes require a final human sign off. The better your tests, the shorter the certification step can be.

With Chef, you write code to describe the desired state of your infrastructure. When Chef runs, it applies the configuration only when the current state differs from the desired state.

Chef's [audit mode](https://docs.chef.io/analytics.html#audit-mode) enables you to write _controls_, or automated test code, that check whether your requirements are being met. Like your infrastructure code, you can collaborate on, version, and deploy these controls as part of your production pipeline. Because the tests are automated, you can apply them repeatedly, giving you increased confidence that even minor changes won't break any compliance rules.  

You can run audit mode alone or you can use it along with Chef Analytics. In [Get started with Chef Analytics](/get-started-with-chef-analytics/linux/), you learned how Chef Analytics provides visibility into what's happening on your Chef server. If you use Chef Analytics with audit mode, you can write Chef Analytics rules that automatically notify the relevant people and services if an audit run exposes a problem.

<img src="/assets/images/networks/analytics.png" style="width: 100%; box-shadow: none;" alt="Your workstation, Chef server, Chef Analytics, and nodes" />

In this tutorial, you'll first use audit mode to discover an infrastructure change that, while appearing well-intentioned and functional, actually violates your compliance policy. Then you'll connect your audit and infrastructure code to Chef Analytics. Next, you'll write an additional control that highlights the need to repair existing infrastructure and you'll also have Chef Analytics issue an alert when the audit fails.

After completing this lesson, you'll be able to:

* write and apply controls, both to a local virtual machine and to a node bootstrapped to your Chef server.
* verify and resolve audit failures.
* use Chef Analytics to create alerts that signal when your infrastructure falls out of compliance.

Let's get started by ensuring you're all set up.
