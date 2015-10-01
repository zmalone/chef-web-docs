## 6. Run the audit and watch it fail

From your workstation, run `chef-client` with audit mode enabled a second time.

Choose the option that matches how you connect to your Ubuntu node.

### Option 1: Use a user name and password

Replace `ADDRESS` with your remote node's external address, `USER` with your username, and `PASSWORD` with your password.

```bash
# ~/chef-repo
$ knife ssh ADDRESS 'sudo chef-client --audit-mode audit-only' --manual-list --ssh-user USER --ssh-password 'PASSWORD'
```

### Option 2: Use key-based authentication

Replace `ADDRESS` with your remote node's external address, `USER` with your username, and `IDENTITY_FILE` with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.

```bash
# ~/chef-repo
$ knife ssh ADDRESS 'sudo chef-client --audit-mode audit-only' --manual-list --ssh-user USER --identity-file IDENTITY_FILE
```

### See the failure from the output

You'll see from the output that although UFW is enabled and running, its status is inactive. This causes the audit run to fail.

```bash
# ~/chef-repo
[...]
52.27.87.170 Validate network configuration and firewalls
52.27.87.170   Ensure the firewall is active
52.27.87.170     has the firewall active (FAILED - 1)
52.27.87.170
52.27.87.170 Failures:
52.27.87.170
52.27.87.170   1) Validate network configuration and firewalls Ensure the firewall is active has the firewall active
52.27.87.170      Failure/Error: expect(command('ufw status').stdout).to match(/Status: active/)
52.27.87.170        expected "Status: inactive\n" to match /Status: active/
52.27.87.170        Diff:
52.27.87.170        @@ -1,2 +1,2 @@
52.27.87.170        -/Status: active/
52.27.87.170        +Status: inactive
52.27.87.170      # /var/chef/cache/cookbooks/audit/recipes/default.rb:21:in `block (3 levels) in from_file'
[...]
```

On the Chef Analytics server, navigate to the **Alerts** tab, and you'll see that the alert was triggered during the `chef-client` run.

![The failure in the Alert tab](chef-analytics/compliance-alert-failure.png)

From the **Nodes** tab, you'll also see that your node's status is orange, which indicates that the audit run failed.

![The failure in the Nodes tab](chef-analytics/compliance-node-failure.png)
