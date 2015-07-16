## 2. Bootstrap an Ubuntu node and apply the basic_audit cookbook

Now let's bootstrap your node and apply the `basic_audit` cookbook.

IF YOU HAVE AN EXISTING NODE THAT YOU WANT TO USE, you can modify the run-list and run `chef-client`...

[SHOW HOW]

Follow the steps in one of the sections below to bootstrap either a Linux or a Windows Server node to your Chef server.

Choose the option below that matches how you can authenticate and bootstrap your node.

### Option 1: Use a user name and password

This is what we did in [Learn to manage a node](/manage-a-node/ubuntu/). From your workstation, run this command to bootstrap your node. Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo
$ knife bootstrap {address} --ssh-user {user} --ssh-password '{password}' --sudo --use-sudo-password --node-name audit1 --run-list 'recipe[firewall::default], recipe[basic_audit::enable_ftp]'
```

You'll see lots of output as your node installs `chef-client` and runs the `basic_audit` cookbook.

### Option 2: Use key-based authentication

From your workstation, run this command to bootstrap your node. Replace `{address}` with your remote node's external address, and `{identity-file}` with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.

```bash
# ~/chef-repo
$ knife bootstrap {address} --ssh-user {user} --sudo --identity-file {identity-file} --node-name audit1 --run-list 'recipe[firewall::default], recipe[basic_audit::enable_ftp]'
```

You'll see lots of output as your node installs `chef-client` and runs the `basic_audit` cookbook.

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

From the **Timeline** tab, you'll see...

![The boostrap event in the Timeline tab](chef-analytics/compliance-bootstrap-timeline.png)

From the **Nodes** tab, you'll see that the `chef-client` run that was performed during the bootstrap process succeeded.

![The converge event in the Nodes tab](chef-analytics/compliance-bootstrap-nodes.png)

The audit test wasn't run ... we'll see that in a bit.
