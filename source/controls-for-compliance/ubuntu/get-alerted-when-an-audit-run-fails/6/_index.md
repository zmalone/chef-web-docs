## 6. Watch the audit failure

```bash
# ~/chef-repo
$ knife ssh {address} 'sudo chef-client --audit-mode audit-only' --manual-list --ssh-user {user} --identity-file {identity-file}
```
knife ssh 52.27.87.170 'sudo chef-client --audit-mode audit-only' --manual-list --ssh-user ubuntu --identity-file ~/.ssh/tpetchel.pem

You'll see from the output that

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

From the **Alert** tab, ...

![The failure in the Alert tab](chef-analytics/compliance-alert-failure.png)

You'll also see ...

![The failure in the Nodes tab](chef-analytics/compliance-node-failure.png)
