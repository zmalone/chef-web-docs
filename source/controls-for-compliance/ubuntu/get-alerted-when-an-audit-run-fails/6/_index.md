## 6. Run chef-client on the node

(SHOW COMMANDS AGAIN, THIS TIME, WITH `--audit-mode enabled`)

```bash
# ~/chef-repo
52.27.227.31 Starting Chef Client, version 12.4.1
52.27.227.31 resolving cookbooks for run list: ["firewall::default", "basic_audit::disable_ftp", "basic_audit::audit"]
52.27.227.31 Synchronizing Cookbooks:
52.27.227.31   - firewall
52.27.227.31   - poise
52.27.227.31   - basic_audit
52.27.227.31 Compiling Cookbooks...
52.27.227.31 Converging 5 resources
52.27.227.31 Recipe: firewall::default
52.27.227.31   * firewall[default] action enable
52.27.227.31     * apt_package[ufw] action install (up to date)
52.27.227.31     * template[/etc/default/ufw] action create (up to date)
52.27.227.31     - install ufw, template some defaults, and ufw enable
52.27.227.31   * apt_package[ufw] action nothing (skipped due to action :nothing)
52.27.227.31   * template[/etc/default/ufw] action nothing (skipped due to action :nothing)
52.27.227.31   * service[ufw] action enable (up to date)
52.27.227.31   * service[ufw] action start (up to date)
52.27.227.31   * firewall_rule[allow world to ssh] action allow (up to date)
52.27.227.31 Recipe: basic_audit::disable_ftp
52.27.227.31   * service[vsftpd] action stop
52.27.227.31     - stop service service[vsftpd]
52.27.227.31   * service[vsftpd] action disable
52.27.227.31     - disable service service[vsftpd]
52.27.227.31   * apt_package[vsftpd] action remove
52.27.227.31     - remove  package vsftpd
52.27.227.31   * firewall_rule[close_ftp] action reject
52.27.227.31     - firewall_rule[close_ftp] in proto tcp to any port 21 from any
52.27.227.31 Starting audit phase
52.27.227.31
52.27.227.31 Validate services
52.27.227.31   Ensure FTP access is not permitted
52.27.227.31     is not running the vsftpd service
52.27.227.31     is not listening on port 21
52.27.227.31
52.27.227.31 Finished in 0.1223 seconds (files took 0.26185 seconds to load)
52.27.227.31 2 examples, 0 failures
52.27.227.31 Auditing complete
52.27.227.31
52.27.227.31 Running handlers:
52.27.227.31 Running handlers complete
52.27.227.31   Chef Client finished, 5/10 resources updated in 3.538372353 seconds
52.27.227.31     2/2 controls succeeded
```

No alert comes through and you'll see that the run succeeded from the Nodes tab - we're all set!

![The success ASDSDADA in the Nodes tab](chef-analytics/compliance-node-success.png)
