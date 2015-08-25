## 2. Apply your cookbook on your node

When you bootstrapped your node, your node did an initial check-in to the Chef server and ran `chef-client` against the run-list.

In _Learn to manage a Windows Server node_, you ran `knife winrm` from your workstation to [run chef-client on your node](/manage-a-node/windows/update-your-nodes-configuration#step3) to apply an updated cookbook. Some actions, such as [performing a remote installation of SQL Server](https://tickets.opscode.com/browse/COOK-1172), introduce complications when performed over the WinRM protocol.

To avoid these complications, the easiest way to run the cookbook is to connect directly to your node and run `chef-client`. `chef-client` will check in to the Chef server, download the latest cookbooks and data about your node, and apply the cookbooks from the run-list.

Later, you can consider how you want to run `chef-client` on your Windows Server nodes. Popular options among Chef users include:

* creating a scheduled task that runs `chef-client` on a regular basis.
* using [push jobs](https://docs.chef.io/push_jobs.html) to trigger `chef-client` to run.
* setting up an SSH server on the node and running [knife ssh](https://docs.chef.io/knife_ssh.html) to run `chef-client` on the node from a remote computer.

For now, connect to your node the same way you did before &ndash; either directly or over Remote Desktop and run `chef-client` from a command prompt or PowerShell window.

[COMMENT] Be sure to start a new command prompt or PowerShell session to ensure that your system's `%PATH%` variable includes the Chef tools.

```ps
$ chef-client
Starting Chef Client, version 12.4.1
[2015-08-25T16:58:46+00:00] INFO: *** Chef 12.4.1 ***
[2015-08-25T16:58:46+00:00] INFO: Chef-client pid: 3864
[2015-08-25T16:58:53+00:00] INFO: Run List is [recipe[awesome_customers]]
[2015-08-25T16:58:53+00:00] INFO: Run List expands to [awesome_customers]
[2015-08-25T16:58:53+00:00] INFO: Starting Chef Run for web_app_windows
[2015-08-25T16:58:53+00:00] INFO: Running start handlers
[2015-08-25T16:58:53+00:00] INFO: Start handlers complete.
resolving cookbooks for run list: ["awesome_customers"]
[...]
    - execute "powershell.exe" -NoLogo -NonInteractive -NoProfile -ExecutionPolicy Bypass -InputFormat None -File "C:/Us
ers/ADMINI~1/AppData/Local/Temp/2/chef-script20150825-3864-1oz1wrt.ps1"
[2015-08-25T17:02:26+00:00] INFO: Chef Run complete in 213.681434 seconds
[2015-08-25T17:02:26+00:00] INFO: Removing cookbooks/awesome_customers/metadata.rb from the cache; it is no longer neede
d by chef-client.

Running handlers:
[2015-08-25T17:02:26+00:00] INFO: Running report handlers
Running handlers complete
[2015-08-25T17:02:26+00:00] INFO: Report handlers complete
Chef Client finished, 8/11 resources updated in 225.024867 seconds
[2015-08-25T17:02:26+00:00] INFO: Sending resource update report (run-id: 099367e0-dcf7-4b96-8ee7-626e5badf918)
```

You'll see lots of output as `chef-client` applies the database configuration to your node.

Remain connected to your node. Next, you'll run a few commands to confirm that the system is properly configured.
