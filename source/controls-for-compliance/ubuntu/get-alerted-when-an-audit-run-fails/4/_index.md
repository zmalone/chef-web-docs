## 4. Run the audit cookbook

Now let's run the `audit` cookbook on your node. You already verified that the audit passes when you ran it through Test Kitchen, so let's verify that the alert doesn't trigger.

Because you already applied the `webserver` cookbook to your node, this time you'll specify the `--audit-mode audit-only` option to run only the audit code on your node.

Choose the option that matches how you connect to your Ubuntu node.

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

### Verify that the alert didn't trigger

You'll see from the output of your `chef-client` run that the audit tests pass. From the **Alerts** tab on the Chef Analytics web interface, verify that no alerts appear.

![A successful audit run](chef-analytics/complaince-clean-run.png)

[TIP] Your audit and operations teams can create a cron job to run `chef-client` automatically at regular intervals. For example, the audit team might configure the command `chef-client --audit-mode audit-only` to run just the `audit` cookbook every 24 hours, and the operations team might configure the command `chef-client --audit-mode disabled` to run the `webserver` cookbook every 30 minutes or some other interval.
