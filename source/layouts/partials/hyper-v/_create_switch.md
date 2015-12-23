To do so, you'll choose the network adapter on your workstation that can access the Internet and create a [virtual switch](https://technet.microsoft.com/en-us/library/Hh831823.aspx) that provides the virtual machine with access to that adapter.

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

Now run [New-VMSwitch](https://technet.microsoft.com/library/hh848455.aspx) to create the virtual switch. You'll use the name of the switch, `ExternalSwitch`, in a later step when you create the base virtual machine.

```ps
$ New-VMSwitch -Name ExternalSwitch -NetAdapterName $net_adapter.Name -AllowManagementOS $True -Notes "Provide public network access to VMs"

Name           SwitchType NetAdapterInterfaceDescription
----           ---------- ------------------------------
ExternalSwitch External   Broadcom 802.11n Network Adapter
```