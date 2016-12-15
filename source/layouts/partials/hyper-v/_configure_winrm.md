In [Develop a web app cookbook for Windows Server](/manage-a-web-app/windows), you configured your node to accept remote WinRM connections before you bootstrapped it. You'll need to follow a similar process on your base virtual machine.

After the Windows Server installation completes, connect to your virtual machine as `Administrator`. Then, from a PowerShell window, run these commands.

```ps
$ winrm quickconfig -q
$ winrm set winrm/config/winrs '@{MaxMemoryPerShellMB="1024"}'
$ winrm set winrm/config '@{MaxTimeoutms="1800000"}'
$ winrm set winrm/config/service '@{AllowUnencrypted="true"}'
$ winrm set winrm/config/service/auth '@{Basic="true"}'

$ netsh advfirewall firewall add rule name="WinRM 5985" protocol=TCP dir=in localport=5985 action=allow
$ netsh advfirewall firewall add rule name="WinRM 5986" protocol=TCP dir=in localport=5986 action=allow

$ net stop winrm
$ sc.exe config winrm start= auto
$ net start winrm
```
