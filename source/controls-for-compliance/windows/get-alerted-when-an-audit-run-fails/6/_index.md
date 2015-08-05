## 6. Run the audit and watch it fail

From your workstation, run `chef-client` with audit mode enabled a second time.

Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo
$ knife winrm {address} 'chef-client --audit-mode audit-only' --manual-list --winrm-user {user} --winrm-password '{password}'
```

### See the failure from the output

You'll see from the output that the audit run fails because there are no firewall rules defined that block public ICMPv4 traffic. The PowerShell command returns `False`, while the audit test expects `True`.

```bash
# ~/chef-repo
[...]
54.68.228.148 [2015-08-04T19:33:02+00:00] INFO: Starting audit phase
54.68.228.148 [2015-08-04T19:33:03+00:00] INFO:
54.68.228.148 [2015-08-04T19:33:03+00:00] INFO: Validate web services
54.68.228.148 [2015-08-04T19:33:03+00:00] INFO:   Ensure no web files are owned by the Administrators group
54.68.228.148 [2015-08-04T19:33:03+00:00] INFO:     c:/inetpub/wwwroot/Default.htm must not be owned by Administrators
54.68.228.148 [2015-08-04T19:33:03+00:00] INFO:     c:/inetpub/wwwroot/pages/Page1.htm must not be owned by Administrators
54.68.228.148 [2015-08-04T19:33:04+00:00] INFO:     c:/inetpub/wwwroot/pages/Page2.htm must not be owned by Administrators
54.68.228.148 [2015-08-04T19:33:04+00:00] INFO:
54.68.228.148 [2015-08-04T19:33:04+00:00] INFO: Validate network configuration and firewalls
54.68.228.148 [2015-08-04T19:33:04+00:00] INFO:   Ensure the firewall blocks public ICMPv4 Echo Request messages
54.68.228.148 [2015-08-04T19:33:05+00:00] INFO:     has at least one rule that blocks access (FAILED - 1)
54.68.228.148 [2015-08-04T19:33:05+00:00] INFO: Successfully executed all `control_group` blocks and contained examples
54.68.228.148 [2015-08-04T19:33:05+00:00] INFO:
54.68.228.148 Failures:
54.68.228.148
54.68.228.148   1) Validate network configuration and firewalls Ensure the firewall blocks public ICMPv4 Echo Request messages has at least one rule that blocks access
54.68.228.148      Failure/Error: expect(command(<<-EOH
54.68.228.148        expected "False\n" to match /True/
54.68.228.148        Diff:
54.68.228.148        @@ -1,2 +1,2 @@
54.68.228.148        -/True/
54.68.228.148        +False
[...]
```

On the Chef Analytics server, navigate to the **Alerts** tab, and you'll see that three alerts were triggered during the `chef-client` run.

![The failure in the Alert tab](chef-analytics/compliance-alert-failure-icmp.png)

From the **Nodes** tab, you'll also see that your node's status is orange, which indicates that the audit run failed.

![The failure in the Nodes tab](chef-analytics/compliance-node-failure.png)
