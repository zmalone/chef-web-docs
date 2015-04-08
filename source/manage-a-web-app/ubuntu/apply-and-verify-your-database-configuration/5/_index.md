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
