## 3. Run the cookbook on your node

Run `knife winrm` to run your cookbook on your node. Replace <code class="placeholder">ADDRESS</code>, <code class="placeholder">USER</code>, and <code class="placeholder">PASSWORD</code> with your values.

```bash
# ~/learn-chef
$ knife winrm ADDRESS chef-client --manual-list --winrm-user USER --winrm-password 'PASSWORD'
```

Here's an example.

```bash
# ~/learn-chef
$ knife winrm 52.201.225.210 chef-client --manual-list --winrm-user Administrator --winrm-password 'HhrQCP&e*Ey'
52.201.225.210 [2016-05-03T16:40:23+00:00] INFO: *** Chef 12.9.38 ***
52.201.225.210 [2016-05-03T16:40:23+00:00] INFO: Platform: x64-mingw32
52.201.225.210 [2016-05-03T16:40:23+00:00] INFO: Chef-client pid: 3528
52.201.225.210 [2016-05-03T16:40:30+00:00] INFO: Run List is [recipe[learn_chef_iis]]
52.201.225.210 [2016-05-03T16:40:30+00:00] INFO: Run List expands to [learn_chef_iis]
52.201.225.210 [2016-05-03T16:40:30+00:00] INFO: Starting Chef Run for node1
52.201.225.210 [2016-05-03T16:40:30+00:00] INFO: Running start handlers
52.201.225.210 [2016-05-03T16:40:30+00:00] INFO: Start handlers complete.
52.201.225.210 [2016-05-03T16:40:30+00:00] INFO: Loading cookbooks [learn_chef_iis@0.2.1]
52.201.225.210 [2016-05-03T16:40:30+00:00] INFO: Storing updated cookbooks/learn_chef_iis/templates/default/Default.htm.erb in the cache.
52.201.225.210 [2016-05-03T16:40:30+00:00] INFO: Processing powershell_script[Install IIS] action run (learn_chef_iis::default line 9)
52.201.225.210 [2016-05-03T16:40:30+00:00] INFO: Processing powershell_script[Guard resource] action run (dynamically defined)
52.201.225.210 [2016-05-03T16:40:31+00:00] INFO: powershell_script[Guard resource] ran successfully
52.201.225.210 [2016-05-03T16:40:31+00:00] INFO: Processing windows_service[w3svc] action enable (learn_chef_iis::default line 15)
52.201.225.210 [2016-05-03T16:40:31+00:00] INFO: Processing windows_service[w3svc] action start (learn_chef_iis::default line 15)
52.201.225.210 [2016-05-03T16:40:31+00:00] INFO: Processing template[c:\inetpub\wwwroot\Default.htm] action create (learn_chef_iis::default line 19)
52.201.225.210 [2016-05-03T16:40:31+00:00] INFO: template[c:\inetpub\wwwroot\Default.htm] backed up to c:/chef/backup\inetpub\wwwroot\Default.htm.chef-20160503164031.846635
52.201.225.210 [2016-05-03T16:40:31+00:00] INFO: template[c:\inetpub\wwwroot\Default.htm] updated file contents c:\inetpub\wwwroot\Default.htm
52.201.225.210 [2016-05-03T16:40:31+00:00] INFO: Chef Run complete in 1.765626 seconds
52.201.225.210 [2016-05-03T16:40:31+00:00] INFO: Running report handlers
52.201.225.210 [2016-05-03T16:40:31+00:00] INFO: Report handlers complete
52.201.225.210 [2016-05-03T16:40:31+00:00] INFO: Sending resource update report (run-id: 709186a8-a9b3-4fea-84b1-a625bf1767d9)
```

The `knife winrm` command takes the command to run on your node. Here we specify `chef-client`, which causes the node to check-in with the Chef server to obtain the latest cookbooks and then apply them.

[COMMENT] In practice, you might instead configure `chef-client` to run automatically on a regular basis or in response to some event or trigger, such as when code is checked in to your repository.