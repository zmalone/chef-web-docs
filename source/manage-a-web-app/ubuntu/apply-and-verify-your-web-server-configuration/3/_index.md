## 3. Bootstrap your node

Now that you have a node running, it's time to bootstrap it.

In [Manage a node](/manage-a-node/ubuntu/), we provided you with a virtual machine that uses a user name and password to authenticate. For learning purposes, this is just fine.

In production, we recommend that you use key-based authentication instead of a user name and password because it can be more secure. This option is commonly used with Amazon EC2 instances because EC2 typically works using key-based authentication.

Choose the option below that matches how you can authenticate and bootstrap your node.

### Option 1: Use a user name and password

This is what we did in [Manage a node](/manage-a-node/ubuntu/). From your workstation, run this command to bootstrap your node. Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo
$ knife bootstrap {address} --ssh-user {user} --ssh-password '{password}' --sudo --use-sudo-password --node-name web_app_ubuntu --run-list 'recipe[awesome_customers]'
```

You'll see lots of output as your node installs `chef-client` and runs the `awesome_customers` cookbook.

### Option 2: Use key-based authentication

From your workstation, run this command to bootstrap your node. Replace `{address}` with your remote node's external address, and `{identity-file}` with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.

```bash
# ~/chef-repo
$ knife bootstrap {address} --ssh-user {user} --sudo --identity-file {identity-file} --node-name web_app_ubuntu --run-list 'recipe[awesome_customers]'
```

You'll see lots of output as your node installs `chef-client` and runs the `awesome_customers` cookbook.

<a class="help-button radius" href="#" data-reveal-id="knife-help-modal">Need help troubleshooting?</a>

<div id="knife-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">If the operation times out or fails, here are some things to try</h3>
  <ul>
    <li>Ensure that your environment is active before you run <code>knife</code>. For example, CloudShare instances suspend after a period of inactivity. <img class="border" src="/assets/images/ubuntu/cloudshare-suspend.png"></img></li>
    <li>Ensure that you run <code>knife</code> commands from your <code class="file-path">chef-repo</code> directory or one of its sub-directories.</li>
    <li>Ensure you have a <code class="file-path">chef-repo/.chef</code> directory and that it contains a <code class="file-path">knife.rb</code> file and two <code class="file-path">.pem</code> files. If you don't, <a href="/manage-a-node/ubuntu/set-up-your-chef-server/#2installthestarterkit" target="_blank">install the Starter Kit</a>.</li>
    <li>Ensure that your node's IP address is accessible from your network.</li>
    <li>Ensure the user name you provide has root or <code>sudo</code> access on the node.</li>
    <li>Ensure your workstation has outbound access (including firewall) on these ports:
      <ul>
        <li>22 (SSH)</li>
        <li>80 (HTTP)</li>
        <li>443 (HTTPS)</li>
      </ul>
    </li>
    <li>Ensure your node has inbound access (including firewall) on these ports:
      <ul>
        <li>22 (SSH)</li>
      </ul>
    </li>
    <li>Ensure your node has outbound access (including firewall) on these ports:
      <ul>
        <li>443 (HTTPS)</li>
      </ul>
    </li>
  </ul>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>
