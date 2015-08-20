## 6. Verify your node's configuration

You're probably anxious to see the working Customers application. From a browser on your workstation, navigate to your site's <code class="file-path">/Products/Customers.aspx</code> page, for example, <code class="file-path">http://54.186.5.41/Products/Customers.aspx</code>.

You'll see this.

![the resulting web page](/assets/images/misc/webapp_result_windows.png)

Wonderful! You've successfully configured an entire application stack on Windows Server using Chef!

To help you understand how your node was configured, let's run a few additional commands on your node. Running these commands can also help you diagnose any issues if you weren't able to access the Customers application from your workstation.

Start by connecting to your Windows Server node.

### Verify that the app pool, Web site, and app exist [TODO]

Run this [Get-WebAppPoolState](https://technet.microsoft.com/en-us/library/ee807832.aspx) cmdlet to get the state of the Products application pool.

```ps
$ Get-WebAppPoolState -Name Products

Value
-----
Started
```

Now run this [Get-WebSite](https://technet.microsoft.com/en-us/library/ee790588.aspx) PowerShell cmdlet to get the state of the Customers Web site.

```ps
$ Get-Website -Name Customers

Name             ID   State      Physical Path                  Bindings
----             --   -----      -------------                  --------
Customers        1    Started    C:\inetpub\sites\Customers     http *:80:
```

Finally, run this [Get-WebApplication](https://technet.microsoft.com/en-us/library/ee790554.aspx) cmdlet to get the state of the Customers Web app.

```ps
$ Get-WebApplication -Name Products

Name             Application pool   Protocols    Physical Path
----             ----------------   ---------    -------------
Products         Products           http         C:\inetpub\apps\Customers
```

### Verify that SQL Server grants query access to the IIS APPPOOL\Products user

Run this `Invoke-Sqlcmd` cmdlet to verify that SQL Server grants the `Select` action to the `IIS APPPOOL\Products` user.

```ps
$ Invoke-Sqlcmd -Database learnchef -Query "EXEC sp_helprotect @username = 'IIS APPPOOL\Products', @name = 'customers'"


Owner       : dbo
Object      : customers
Grantee     : IIS APPPOOL\Products
Grantor     : dbo
ProtectType : Grant
Action      : Select
Column      : (All+New)
```

You can also verify the state of your node by browsing the <code class="file-path">C:\inetpub</code> directory and from the IIS Management Console. When you're done, you can close your connection.
