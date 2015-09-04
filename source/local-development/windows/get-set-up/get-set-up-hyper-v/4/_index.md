## 4. Enable the Hyper-V Windows feature

You'll use Test Kitchen to create an instance under Hyper-V later in this tutorial. For now, let's ensure you have everything you'll need to create and connect to your instance.

On Windows 8.1 and Windows 10, the easiest way to enable Hyper-V is to run this PowerShell command.

```ps
$ Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

You'll need to reboot your workstation after the installation completes.

The [Hyper-V documentation](https://technet.microsoft.com/en-us/library/hh846766.aspx#BKMK_Step1) provides additional options, including how to enable Hyper-V through the user interface.
