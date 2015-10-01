## 6. Run the audit and watch it fail

From your workstation, run `chef-client` with audit mode enabled a second time.

Choose the option that matches how you connect to your Red Hat Enterprise Linux or CentOS node.

### Option 1: Use a user name and password

Replace <code class="placeholder">ADDRESS</code> with your remote node's external address, <code class="placeholder">USER</code> with your username, and <code class="placeholder">PASSWORD</code> with your password.

```bash
# ~/chef-repo
$ knife ssh ADDRESS 'sudo chef-client --audit-mode audit-only' --manual-list --ssh-user USER --ssh-password 'PASSWORD'
```

### Option 2: Use key-based authentication

Replace <code class="placeholder">ADDRESS</code> with your remote node's external address, <code class="placeholder">USER</code> with your username, and <code class="placeholder">IDENTITY\_FILE</code> with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.

```bash
# ~/chef-repo
$ knife ssh ADDRESS 'sudo chef-client --audit-mode audit-only' --manual-list --ssh-user USER --identity-file IDENTITY_FILE
```

### See the failure from the output

You'll see from the output that although `iptables` is enabled, running, and permits outbound traffic, it doesn't have the expected rules for inbound connections. This causes the audit run to fail.

```bash
# ~/chef-repo
[...]
52.27.18.148 Validate web services
52.27.18.148   Ensure no web files are owned by the root user
52.27.18.148     /var/www/html/pages is not owned by the root user
52.27.18.148     /var/www/html/pages/page2.html is not owned by the root user
52.27.18.148     /var/www/html/pages/page1.html is not owned by the root user
52.27.18.148     /var/www/html/index.html is not owned by the root user
52.27.18.148
52.27.18.148 Validate network configuration and firewalls
52.27.18.148   Ensure the firewall is active
52.27.18.148     enables the iptables service
52.27.18.148     has iptables running
52.27.18.148     accepts SSH connections (FAILED - 1)
52.27.18.148     accepts HTTP connections (FAILED - 2)
52.27.18.148     rejects all other connections (FAILED - 3)
52.27.18.148     permits all outbound traffic
52.27.18.148
52.27.18.148 Failures:
52.27.18.148
52.27.18.148   1) Validate network configuration and firewalls Ensure the firewall is active accepts SSH connections
52.27.18.148      Failure/Error: expect(iptables).to have_rule('-A INPUT -i eth0 -p tcp -m tcp --dport 22 -m state --state NEW -j ACCEPT')
52.27.18.148        expected iptables to have rule "-A INPUT -i eth0 -p tcp -m tcp --dport 22 -m state --state NEW -j ACCEPT"
[...]
```

On the Chef Analytics server, navigate to the **Alerts** tab, and you'll see that three alerts were triggered during the `chef-client` run.

![The failure in the Alert tab](chef-analytics/compliance-alert-failure-iptables.png)

From the **Nodes** tab, you'll also see that your node's status is orange, which indicates that the audit run failed.

![The failure in the Nodes tab](chef-analytics/compliance-node-failure.png)
