## 4. Apply your cookbook

Update your node's configuration by running `knife ssh` as you did before.

Here's a reminder of how to do this.

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
