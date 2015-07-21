## 2. Apply the webserver cookbook to a node

### Option 1: Bootstrap a new Ubuntu 14.04 node

Choose the option below that matches how you can authenticate and bootstrap your node.

#### Option a: Use a user name and password

From your workstation, run this command to bootstrap your node. Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo
$ knife bootstrap {address} --ssh-user {user} --ssh-password '{password}' --sudo --use-sudo-password --node-name webserver1 --run-list 'recipe[webserver::default], recipe[audit::default]'
```

You'll see lots of output as your node installs `chef-client` and runs the `webserver` cookbook.

#### Option b: Use key-based authentication

From your workstation, run this command to bootstrap your node. Replace `{address}` with your remote node's external address, and `{identity-file}` with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.

```bash
# ~/chef-repo
$ knife bootstrap {address} --ssh-user {user} --sudo --identity-file {identity-file} --node-name webserver1 --run-list 'recipe[webserver::default], recipe[audit::default]'
```

You'll see lots of output as your node installs `chef-client` and runs the `webserver` cookbook.

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

### Option 2: Update the run-list on an existing node

If you already have an Ubuntu 14.04 instance...

```bash
# ~/chef-repo
$ knife node run_list set webserver1 'recipe[webserver::default], recipe[audit::default]'
webserver1:
  run_list:
    recipe[webserver::default]
    recipe[audit::default]
```

When running `knife` from Windows PowerShell, surround the string with triple single quotes (''' '''), like this.

```ps
# ~/chef-repo
$ knife node run_list set webserver1 '''recipe[webserver::default], recipe[audit::default]'''
webserver1:
  run_list:
    recipe[webserver::default]
    recipe[audit::default]
```

### View the bootstrap event in the Timeline view

After you bootstrap

![The boostrap event in the Timeline tab](chef-analytics/compliance-bootstrap-timeline.png)

From the **Nodes** tab, you'll see that the `chef-client` run that was performed during the bootstrap process succeeded.

![The converge event in the Nodes tab](chef-analytics/compliance-bootstrap-nodes.png)
