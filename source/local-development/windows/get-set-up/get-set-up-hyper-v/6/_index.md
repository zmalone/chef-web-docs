## 6. Create a base virtual machine

For some operating systems, Test Kitchen can automatically download a base virtual machine for you. It's also common to build your own box if you need it to contain certain software or security updates. Because of the way Windows Server 2012 R2 is licensed, we can't provide you with a preconfigured virtual machine. Here, you'll use the evaluation version of Windows Server 2012 R2 to build your own.

In this part, you'll perform these steps to set up your base virtual machine.

1. Download the evaluation version of Windows Server 2012 R2 as an .iso image.
1. Create a Hyper-V virtual switch to provide your virtual machine with Internet access.
1. Create a location to store virtual machines
1. Create an empty base virtual machine
1. Connect to your virtual machine through Hyper-V Manager
1. Install Windows Server 2012 R2 on your virtual machine
1. Configure the base virtual machine to accept remote WinRM connections
1. Shut down your virtual machine

### Download the evaluation version of Windows Server 2012 R2

To install Windows Server on your virtual machine, you'll download the evaluation version of Windows Server as an ISO image and mount that image as a DVD drive. When your virtual machine boots, it will run the installer from the virtual DVD drive.

Download the ISO image of the evaluation version of Windows Server 2012 R2 to your workstation from this URL to the <code class="file-path">C:\iso</code> directory on your workstation. If you can't download the file to this location, you can choose another &ndash; just be sure to change <code class="file-path">C:\iso</code> to your path in the steps that follow.

<http://care.dlservice.microsoft.com/dl/download/6/2/A/62A76ABB-9990-4EFC-A4FE-C7D698DAEB96/9600.17050.WINBLUE_REFRESH.140317-1640_X64FRE_SERVER_EVAL_EN-US-IR3_SSS_X64FREE_EN-US_DV9.ISO>

While you wait for the download, you can continue to the next step.

### Create a Hyper-V virtual switch

Recall that the `awesome_customers` cookbook downloads the SQL Server 2012 Express installer from download.microsoft.com. So when you create the base virtual machine, you'll need to configure access to the Internet.

So do so, you'll choose the network adapter on your workstation that can access the Internet and create a [virtual switch](https://technet.microsoft.com/en-us/library/Hh831823.aspx) that provides the virtual machine with access to that adapter.

The first step is to list all network adapters. From a PowerShell window on your workstation, run the [Get-NetAdapter](https://technet.microsoft.com/library/JJ130867.aspx) cmdlet to list all available adapters.

```ps
$ Get-NetAdapter

Name                      InterfaceDescription                    ifIndex Status       MacAddress             LinkSpeed
----                      --------------------                    ------- ------       ----------             ---------
Wi-Fi                     Broadcom 802.11n Network Adapter              6 Up           6C-4A-97-DC-40-22       450 Mbps
Bluetooth Network Conn... Bluetooth Device (Personal Area Netw...       5 Disconnected 6C-4A-97-DC-40-22         3 Mbps
Ethernet                  Broadcom NetXtreme Gigabit Ethernet           3 Disconnected BB-21-66-79-AD-7D          0 bps
```

The output you see depends on what network adapters you have installed. In this example, a Wi-Fi adapter is configured for external network traffic.

The next step is to create a variable that refers to your public network adapter. Run this from your PowerShell window, replacing `Wi-Fi` with the value in the `Name` column that matches your external adapter.

```ps
$ $net_adapter = Get-NetAdapter -Name Wi-Fi
```

Now run [New-VMSwitch](https://technet.microsoft.com/library/hh848455.aspx) to create the virtual switch. You'll use the name of the switch, `ExternalSwitch`, in the next step when you create the base virtual machine.

```ps
$ New-VMSwitch -Name ExternalSwitch -NetAdapterName $net_adapter.Name -AllowManagementOS $True -Notes "Provide public network access to VMs"

Name           SwitchType NetAdapterInterfaceDescription
----           ---------- ------------------------------
ExternalSwitch External   Broadcom 802.11n Network Adapter
```

### Create a location to store virtual machines

Now let's create a location on disk to store the base virtual machines and the virtual machines that Test Kitchen creates.

For this tutorial, we'll use <code class="file-path">C:\Hyper-V</code>. You can use a different location if you prefer, just be sure to replace <code class="file-path">C:\Hyper-V</code> with your path in the steps that follow.

Run this command to create the directory.

```ps
$ mkdir C:\Hyper-V
```

### Create an empty base virtual machine

You now have everything you need to create the base virtual machine. You have a location to store it, a Hyper-V virtual switch, and the Windows Server 2012 R2 .iso on your hard drive.

Run these commands to create a new virtual machine, mount the .iso to it as a DVD drive, and start the virtual machine.

```ps
$ $vm = New-VM -Name WindowsServer2012R2 -MemoryStartupBytes 1GB -NewVHDPath "C:\Hyper-V\WindowsServer2012R2.vhdx" -NewVHDSizeBytes 40GB -Path "C:\Hyper-V" -SwitchName ExternalSwitch
$ $vm | Add-VMDvdDrive -Path "C:\iso\9600.17050.WINBLUE_REFRESH.140317-1640_X64FRE_SERVER_EVAL_EN-US-IR3_SSS_X64FREE_EN-US_DV9.ISO"
$ $vm | Set-VM -AutomaticStartAction StartIfRunning -AutomaticStopAction ShutDown
$ $vm | Start-VM
```

The [New-VM](https://technet.microsoft.com/library/hh848537.aspx) command also creates a new virtual hard disk drive for the virtual machine that can grow up to 40GB and associates the virtual machine with your virtual switch.

### Connect to your virtual machine through Hyper-V Manager

Now start Hyper-V Manager on your workstation, either from the **Start** screen or by running this command.

```ps
$ C:\Windows\System32\mmc.exe C:\Windows\System32\virtmgmt.msc
```

Your base virtual machine appears in the **Virtual Machines** panel.

![Hyper-V Manager](misc/hyperv-view-vm.png)

Now connect to your virtual machine either by double-clicking it or from the **Connect** option in the **Actions** pane.

### Install Windows Server 2012 R2 on your virtual machine

At this point your virtual machine has an empty hard drive and is mounted to your .iso file as a virtual DVD drive. Now you need to install Windows Server 2012 R2 on the hard drive.

The `New-VM` cmdlet that you ran earlier sets this boot order:

1. Network
1. Hard disk drive
1. DVD drive

Your network doesn't have a boot server and your hard drive does not yet have an operating system installed on it, so the startup process automatically moves to booting from the DVD drive. You'll see the Windows Server installer start automatically.

![Windows setup](misc/hyperv-windows-setup.png)

Proceed through the installation process. Here are the options you'll need for some steps. For the remaining steps, choose the default option.

* Select **Windows Server 2012 Standard Evaluation (Server with a GUI)** when prompted to select the operating system you want to install.
* Choose **Custom: Install Windows only (advanced)** when prompted which type of installation do you want.

From the **Settings** screen, you'll be prompted to create a password for the `Administrator` user. Note the password that you choose.

### Configure the base virtual machine to accept remote WinRM connections

In [Learn to manage a basic Windows Server web application](/manage-a-web-app/windows), you configured your node to accept remote WinRM connections before you bootstrapped it. You'll need to follow a similar process on your base virtual machine.

After the Windows Server installation completes, connect to your virtual machine as `Administrator`. Then, from a PowerShell window, run these commands.

```ps
$ winrm quickconfig -q
$ winrm set winrm/config '@{MaxTimeoutms="1800000"}'
$ winrm set winrm/config/service '@{AllowUnencrypted="true"}'
$ winrm set winrm/config/service/auth '@{Basic="true"}'

$ netsh advfirewall firewall add rule name="WinRM 5985" protocol=TCP dir=in localport=5985 action=allow
$ netsh advfirewall firewall add rule name="WinRM 5986" protocol=TCP dir=in localport=5986 action=allow

$ net stop winrm
$ sc.exe config winrm start= auto
$ net start winrm
```

### Shut down your virtual machine

The final step is to shut down your virtual machine, either from the instance or through Hyper-V. This step is important because Test Kitchen requires the instance to be shut down so that it can properly create the differencing disk.
