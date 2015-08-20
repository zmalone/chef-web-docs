## 5. Apply your cookbook

Update your node's configuration by running `knife winrm` as you did before.

Here's a reminder of how to do this.

Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo
$ knife winrm {address} 'chef-client' --manual-list --winrm-user {user} --winrm-password '{password}'
```

<a class="help-button radius" href="#" data-reveal-id="knife-help-modal">Need help troubleshooting?</a>

<div id="knife-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">If the operation times out or fails, here are some things to try</h3>
  <ul>
    <li>Ensure that your environment is active before you run <code>knife</code>. For example, CloudShare instances suspend after a period of inactivity. <img class="border" src="/assets/images/windows/cloudshare-suspend.png"></img></li>
    <li>Ensure that you run <code>knife</code> commands from your <code class="file-path">chef-repo</code> directory or one of its sub-directories.</li>
    <li>Ensure you have a <code class="file-path">chef-repo/.chef</code> directory and that it contains a <code class="file-path">knife.rb</code> file and two <code class="file-path">.pem</code> files. If you don't, <a href="/manage-a-node/windows/set-up-your-chef-server/#2installthestarterkit" target="_blank">install the Starter Kit</a>.</li>
    <li>Ensure that your node's IP address is accessible from your network.</li>
    <li>Ensure the user name you provide has Administrator privileges on the node.</li>
    <li>Ensure your node has inbound and outbound access (including firewall) on port 443 (HTTPS) and on ports 5985 and 5986 (WinRM).</li>
  </ul>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>
