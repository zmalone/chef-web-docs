## 4. Run the audit cookbook

Now let's run the `audit` cookbook on your node and verify that the alert doesn't trigger.

[BOTH WAYS, EXPLAIN WHAT TO REPLACE]

```bash
# ~/chef-repo
$ knife ssh {address} 'sudo chef-client --audit-mode audit-only' --manual-list --ssh-user {user} --identity-file {identity-file}
```

![A successful audit run](chef-analytics/complaince-clean-run.png)

[TIP] Your audit and operations teams can create a cron job to run `chef-client` automatically at regular intervals. For example, the audit team might configure the command `chef-client --audit-mode audit-only` to run just the `audit` cookbook every 24 hours, and the operations team might configure the command `chef-client --audit-mode disabled` to run the `webserver` cookbook every 30 minutes or some other interval.
