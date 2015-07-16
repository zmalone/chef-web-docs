## 4. Run chef-client on the node

TODO: Add to run-list during bootstrap - you forgot ;)
TODO: Add Splunk to notification types in previous email

[audit mode](https://docs.chef.io/ctl_chef_client.html#run-in-audit-mode)

Linux node: user name and password

Replace {address} with your remote node's external address, {user} with your username, and {password} with your password.

```bash
# ~/chef-repo
$ knife ssh {address} 'sudo chef-client' --manual-list --ssh-user {user} --ssh-password '{password}' --audit-mode audit-only
```

Linux node: key-based authentication

Replace {address} with your remote node's external address and {identity-file} with your SSH identify file, for example ~/.ssh/my.pem.

```bash
# ~/chef-repo
$ knife ssh {address} 'sudo chef-client --audit-mode audit-only' --manual-list --ssh-user {user} --identity-file {identity-file}
```

```bash
# ~/chef-repo
52.27.227.31 Starting Chef Client, version 12.4.1
52.27.227.31 resolving cookbooks for run list: ["firewall::default", "basic_audit::enable_ftp", "basic_audit::audit"]
52.27.227.31 Synchronizing Cookbooks:
52.27.227.31   - firewall
52.27.227.31   - poise
52.27.227.31   - basic_audit
52.27.227.31 Compiling Cookbooks...
52.27.227.31 Starting audit phase
52.27.227.31
52.27.227.31 Validate services
52.27.227.31   Ensure FTP access is not permitted
52.27.227.31     is not running the vsftpd service (FAILED - 1)
52.27.227.31     is not listening on port 21 (FAILED - 2)
52.27.227.31
52.27.227.31 Failures:
52.27.227.31
52.27.227.31   1) Validate services Ensure FTP access is not permitted is not running the vsftpd service
52.27.227.31      Failure/Error: expect(service('vsftpd')).to_not be_running
52.27.227.31        expected Service "vsftpd" not to be running
52.27.227.31      # /var/chef/cache/cookbooks/basic_audit/recipes/audit.rb:9:in `block (3 levels) in from_file'
52.27.227.31
52.27.227.31   2) Validate services Ensure FTP access is not permitted is not listening on port 21
52.27.227.31      Failure/Error: expect(port(21)).to_not be_listening
52.27.227.31        expected Port "21" not to be listening
52.27.227.31      # /var/chef/cache/cookbooks/basic_audit/recipes/audit.rb:14:in `block (3 levels) in from_file'
52.27.227.31
52.27.227.31 Finished in 0.1166 seconds (files took 0.25291 seconds to load)
52.27.227.31 2 examples, 2 failures
52.27.227.31
52.27.227.31 Failed examples:
52.27.227.31
52.27.227.31 rspec /var/chef/cache/cookbooks/basic_audit/recipes/audit.rb[1:1:1] # Validate services Ensure FTP access is not permitted is not running the vsftpd service
52.27.227.31 rspec /var/chef/cache/cookbooks/basic_audit/recipes/audit.rb[1:1:2] # Validate services Ensure FTP access is not permitted is not listening on port 21
52.27.227.31
52.27.227.31 Audit phase exception:
52.27.227.31   Audit phase found failures - 2/2 controls failed
52.27.227.31
52.27.227.31   Running handlers:
52.27.227.31   Running handlers complete
52.27.227.31   Chef Client finished, 0/0 resources updated in 1.520743151 seconds
52.27.227.31     0/2 controls succeeded
52.27.227.31 [2015-07-16T01:36:22+00:00] FATAL: Stacktrace dumped to /var/chef/cache/chef-stacktrace.out
52.27.227.31 [2015-07-16T01:36:22+00:00] ERROR: Found 1 errors, they are stored in the backtrace
52.27.227.31 [2015-07-16T01:36:22+00:00] FATAL: Chef::Exceptions::ChildConvergeError: Chef run process exited unsuccessfully (exit code 1)
```

From the **Alert** tab, ...

![The failure in the Alert tab](chef-analytics/compliance-alert-failure.png)

You'll also see ...

![The failure in the Nodes tab](chef-analytics/compliance-node-failure.png)
