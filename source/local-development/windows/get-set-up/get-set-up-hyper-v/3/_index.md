## 3. Enable the Hyper-V Windows feature

You'll use Test Kitchen to create an instance under Hyper-V later in this tutorial. For now, let's ensure you have everything you'll need to create and connect to your instance.

On Windows 8.1 and Windows 10, the easiest way to enable Hyper-V is to run this PowerShell command.

```ps
$ Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

You'll need to reboot your workstation after the installation completes.

The [Hyper-V documentation](https://technet.microsoft.com/en-us/library/hh846766.aspx#BKMK_Step1) provides additional options, including how to enable Hyper-V through the user interface.

Next, ensure that the Hyper-V module for PowerShell is enabled. First, run this command to list all loaded Hyper-V cmdlets.

```ps
$ Get-Command –Module Hyper-V
```

If the command returns no results, run these commands to load the Hyper-V PowerShell module.

```ps
$ Import-Module ServerManager
$ Add-WindowsFeature RSAT-Hyper-V-Tools –IncludeAllSubFeature

Success Restart Needed Exit Code      Feature Result
------- -------------- ---------      --------------
True    No             Success        {Hyper-V Module for Windows PowerShell, Hy...
```

Now list all loaded Hyper-V cmdlets a second time.

```ps
$ Get-Command –Module Hyper-V

CommandType     Name                                               ModuleName
-----------     ----                                               ----------
Cmdlet          Add-VMDvdDrive                                     Hyper-V
Cmdlet          Add-VMFibreChannelHba                              Hyper-V
Cmdlet          Add-VMHardDiskDrive                                Hyper-V
[...]
Cmdlet          Test-VHD                                           Hyper-V
Cmdlet          Test-VMNetworkAdapter                              Hyper-V
Cmdlet          Test-VMReplicationConnection                       Hyper-V
```