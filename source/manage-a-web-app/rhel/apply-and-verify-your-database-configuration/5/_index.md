## 5. Apply your cookbook on your node

When you bootstrapped your node, your node did an initial check-in to the Chef server and ran `chef-client` against the run-list.

To update your node's configuration, let's run `knife ssh` to apply your updated cookbook.

Choose the same option &ndash; either to use a user name and password or key-based authentication &ndash; that you did earlier when you bootstrapped your node.

### Option 1: Use a user name and password

Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo/cookbooks/web_application
$ knife ssh {address} 'sudo chef-client' --manual-list --ssh-user {user} --ssh-password '{password}'
```

### Option 2: Use key-based authentication

Replace `{address}` with your remote node's external address and `{identity-file}` with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.

```bash
# ~/chef-repo/cookbooks/web_application
$ knife ssh {address} 'sudo chef-client' --manual-list --ssh-user {user} --identity-file {identity-file}
```
