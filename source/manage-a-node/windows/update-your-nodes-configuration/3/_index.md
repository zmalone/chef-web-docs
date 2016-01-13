## 3. Run the cookbook on your node

Run `knife winrm` to run your cookbook on your node. Replace <code class="placeholder">ADDRESS</code>, <code class="placeholder">USER</code>, and <code class="placeholder">PASSWORD</code> with your values.

```bash
# ~/learn-chef
$ knife winrm ADDRESS chef-client --manual-list --winrm-user USER --winrm-password 'PASSWORD' --winrm-transport ssl --winrm-ssl-verify-mode verify_none 
```

The `knife winrm` command takes the command to run on your node. Here we specify `chef-client`, which causes the node to check in with the Chef server to obtain the latest cookbooks and then apply them.

[COMMENT] As before, in production we recommend that you replace the  `--winrm-ssl-verify-mode` with the `--ca-trust-file` option to supply the certificate that validates the identity of your node.<br><br>In production, you might instead configure `chef-client` to run automatically on a regular basis or in response to some event or trigger, such as when code is checked in to your repository.