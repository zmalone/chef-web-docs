## 5. Apply your cookbook

Update your node's configuration by running `chef-client` on your node as you did before.

Connect to your node the same way you did before &ndash; either directly or over Remote Desktop and run `chef-client` from a command prompt or PowerShell window.

```ps
$ chef-client
Starting Chef Client, version 12.4.1
[2015-08-25T17:39:39+00:00] INFO: *** Chef 12.4.1 ***
[2015-08-25T17:39:39+00:00] INFO: Chef-client pid: 3220
[2015-08-25T17:39:46+00:00] INFO: Run List is [recipe[awesome_customers]]
[2015-08-25T17:39:46+00:00] INFO: Run List expands to [awesome_customers]
[2015-08-25T17:39:46+00:00] INFO: Starting Chef Run for web_app_windows
[2015-08-25T17:39:46+00:00] INFO: Running start handlers
[2015-08-25T17:39:46+00:00] INFO: Start handlers complete.
resolving cookbooks for run list: ["awesome_customers"]
[2015-08-25T17:39:47+00:00] INFO: Loading cookbooks [awesome_customers@0.3.0, chef-sugar@3.1.1, chef_handler@1.2.0, open
ssl@4.3.2, sql_server@2.4.0, windows@1.38.1, iis@4.1.1]
Synchronizing Cookbooks:
  - chef-sugar
  - chef_handler
  - openssl
  - sql_server
  - windows
[...]
    - execute "powershell.exe" -NoLogo -NonInteractive -NoProfile -ExecutionPolicy Bypass -InputFormat None -File "C:/Us
ers/ADMINI~1/AppData/Local/Temp/2/chef-script20150825-3220-6yamsy.ps1"
[2015-08-25T17:40:24+00:00] INFO: Chef Run complete in 38.608284 seconds

Running handlers:
[2015-08-25T17:40:24+00:00] INFO: Running report handlers
Running handlers complete
[2015-08-25T17:40:24+00:00] INFO: Report handlers complete
Chef Client finished, 13/23 resources updated in 50.436048 seconds
[2015-08-25T17:40:24+00:00] INFO: Sending resource update report (run-id: bd6d8d80-1623-4ea2-a52c-d8264618de4e)
```
