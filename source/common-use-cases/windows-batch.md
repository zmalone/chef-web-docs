---
title: 'Windows Batch'
long_title: 'Execute an Inline Batch Script on a Windows Node'
order: 5
layout: 'common-use-case'
description: 'See an example of executing an inline batch script on a Windows node.'
---

Windows Batch
=================
This guide will cover installing the [knife-windows](http://docs.opscode.com/plugin_knife_windows.html) plugin, preparing a Windows node for use with Chef, and executing a simple inline batch script. This tutorial assumes that you have already completed the `Workstation Setup` and `Using Chef Repo` sections of learnchef, so that you have a working `chef-repo`.

---

##### Prepare the Workstation

1. Install the `knife-windows` Ruby gem on your workstation. You may or may not need to preface this command with `sudo`. In a terminal:

		$ gem install knife-windows 


1. Create a cookbook called `learnchef-batch`. In a terminal:

		$ knife cookbook create learnchef-batch

	A new `learnchef-batch` directory will have been added the the `chef-repo/cookbooks` directory.


1. Open the `chef-repo/coobooks/learnchef-batch/recipes/default.rb` file and add the following:

	```

	batch "Which platform?" do
	  code <<-EOH
	@ECHO OFF
	 
	ECHO The platform = %OS% >> %SystemDrive%\platform.txt

	  EOH
	end
	```

1. Upload our new `learnchchef-batch` cookbook to the Chef Server. In a terminal:

		$ knife cookbook upload learnchef-batch

---

##### Preparing the Windows node

In order to use Chef to manage a Windows node, we will need to either enabled `winrm` on the node, or install a standalone SSH server to acommidate the bootstrapping process. In this tutorial, we will enable `winrm`. On the Windows node, from a `Powershell` or `cmd.exe` session with administrative rights:

	> winrm quickconfig -q
	> winrm set winrm/config/winrs @{MaxMemoryPerShellMB="300"}
	> winrm set winrm/config @{MaxTimeoutms="1800000"}
	> winrm set winrm/config/service @{AllowUnencrypted="true"}
	> winrm set winrm/config/service/auth @{Basic="true"}

[NOTE] See the [knife-windows](https://github.com/opscode/knife-windows#knife-bootstrap-windows-ssh) documentation for instructions on using a standalone SSH server to bootstrap a Windows node.

---

##### Bootstrapping the Windows node via Winrm

Now that we have both our Windows node prepared and our `learnchef-batch` cookbook uploaded to the Chef Server, we can bootstrap the Windows node via `winrm`. You will need to know the username and password of an administrator on the Windows node. In a terminal:

	$ knife bootstrap windows winrm <node_FQDN_or_IP> \
	 --winrm-user="<administrative_user>" \
	 --winrm-password="<admin_user_password>" \
	 --run-list="recipe[learnchef-batch::default]"

---

##### Verify the changes
Lets verify that a `platform.txt` got created at the Windows `%SystemDrive%` (typically `C:\`) location on the Windows node.

1. Open a new window in `Explorer.exe` on the Windows node and paste `%SystemDrive%` into the location bar.

1. Open `platform.txt` in `Notepad.exe`. You should see:


	The platform = Windows_NT


---

##### Recap

In this tutorial we:

- Installed the `knife-windows` plugin (in the form of a Ruby gem) onto our workstation
- Created a new cookbook `learnchef-batch`
- Used the [batch](http://docs.opscode.com/resource_batch.html) resource to execute a batch script
