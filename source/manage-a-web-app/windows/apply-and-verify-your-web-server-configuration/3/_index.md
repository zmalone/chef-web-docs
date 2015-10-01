## 3. Bootstrap your node

Now that you have a node running, it's time to bootstrap it.

Replace `ADDRESS` with your remote node's external address, `USER` with your username, and `PASSWORD` with your password.

```bash
# ~/chef-repo
$ knife bootstrap windows winrm ADDRESS --winrm-user USER --winrm-password 'PASSWORD' --node-name web_app_windows --run-list 'recipe[awesome_customers]'
```

You'll see lots of output as your node installs `chef-client` and runs the `awesome_customers` cookbook.

[COMMENT] If you need help troubleshooting, refer to the checklist in the previous step. If you still need help, ask us at the bottom of this page.
