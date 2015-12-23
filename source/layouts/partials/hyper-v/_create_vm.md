If your download is complete, you now have everything you need to create the base virtual machine. You have a location to store it, a Hyper-V virtual switch, and the Windows Server 2012 R2 ISO image on your hard drive.

Run these commands to create a new virtual machine, mount the ISO image to it as a DVD drive, and start the virtual machine.

```ps
$ $vm = New-VM -Name WindowsServer2012R2 -MemoryStartupBytes 1GB -NewVHDPath "C:\Hyper-V\WindowsServer2012R2.vhdx" -NewVHDSizeBytes 40GB -Path "C:\Hyper-V" -SwitchName ExternalSwitch
$ $vm | Add-VMDvdDrive -Path "C:\iso\9600.17050.WINBLUE_REFRESH.140317-1640_X64FRE_SERVER_EVAL_EN-US-IR3_SSS_X64FREE_EN-US_DV9.ISO"
$ $vm | Set-VM -AutomaticStartAction StartIfRunning -AutomaticStopAction ShutDown
$ $vm | Start-VM
```

The [New-VM](https://technet.microsoft.com/library/hh848537.aspx) command also creates a new virtual hard disk drive for the virtual machine that can grow as large as 40 GB and associates the virtual machine with your virtual switch.
