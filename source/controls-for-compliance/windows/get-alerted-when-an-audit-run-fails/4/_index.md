## 4. Run the audit cookbook

Now let's run the `audit` cookbook on your node. You already verified that the audit passes when you ran it through Test Kitchen, so let's verify that the alert doesn't trigger.

Because you already applied the `webserver` cookbook to your node, this time you'll specify the `--audit-mode audit-only` option to run only the audit code on your node.

Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo
$ knife winrm {address} 'chef-client --audit-mode audit-only' --manual-list --winrm-user {user} --winrm-password '{password}'
```

### Verify that the alert didn't trigger

You'll see from the output of your `chef-client` run that the audit tests pass. From the **Alerts** tab on the Chef Analytics web interface, verify that no alerts appear.

![A successful audit run](chef-analytics/complaince-clean-run.png)

[TIP] Your audit and operations teams can create a [scheduled task](https://getchef.zendesk.com/hc/en-us/articles/205233360) to run `chef-client` automatically at regular intervals. For example, the audit team might configure the command `chef-client --audit-mode audit-only` to run just the `audit` cookbook every 24 hours, and the operations team might configure the command `chef-client --audit-mode disabled` to run the `webserver` cookbook every 30 minutes or some other interval.
