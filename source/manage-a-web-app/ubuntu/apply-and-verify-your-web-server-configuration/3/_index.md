## 3. Bootstrap your node

Now that you have a node to bootstrap running, it's time to bootstrap it.

In [Manage a node](/manage-a-node/ubuntu/), we provided you with a virtual machine that uses a user name and password to authenticate. For learning purposes, this is just fine.

In production, we recommend that you use key-based authentication instead of a user name and password because it can be more secure. This option is also common for learning purposes when you use Amazon EC2 instances because EC2 typically works using key-based authentication.

Choose the option below that matches how you can authenticate and bootstrap your node.

### Option 1: Use a user name and password

This is what we did in [Manage a node](/manage-a-node/ubuntu/). From your workstation, run this command to bootstrap your node. Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo
$ knife bootstrap {address} --ssh-user {user} --ssh-password '{password}' --sudo --use-sudo-password --node-name web_app_ubuntu --run-list 'recipe[web_application]'
```

You'll see lots of output as your node installs `chef-client` and runs the `web_application` cookbook.

### Option 2: Use key-based authentication

From your workstation, run this command to bootstrap your node. Replace `{address}` with your remote node's external address, and `{identity-file}` with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.

```bash
# ~/chef-repo
$ knife bootstrap {address} --ssh-user {user} --sudo --identity-file {identity-file} --node-name web_app_ubuntu --run-list 'recipe[web_application]'
```

You'll see lots of output as your node installs `chef-client` and runs the `web_application` cookbook.
