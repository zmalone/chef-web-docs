## 2. Apply the webserver cookbook to a node

[CALLOUT networks/workstation.png] Perform this step from your workstation.

Next, let's apply the `webserver` cookbook to your node.

If you already have an Ubuntu 14.04 node that's bootstrapped to your Chef server, you can continue to use it by updating its run-list to include the `webserver` and `audit` cookbooks (option 1.)

If you don't have an Ubuntu 14.04 node, follow option 2.

### Option 1: Update the run-list on an existing node and run chef-client

From your workstation, run the following command to set the run-list to contain only the `webserver` and `audit` cookbooks. Replace `webserver1` with your node's name.

```bash
# ~/chef-repo
$ knife node run_list set webserver1 'recipe[webserver::default],recipe[audit::default]'
webserver1:
  run_list:
    recipe[webserver::default]
    recipe[audit::default]
```

[WINDOWS] When running `knife` on Windows, consider [activating the chef PowerShell module](http://docs.chef.io/release_notes.html#import-module-chef) to make it easier to use strings from the command line.

Now run `chef-client` on your node. We want to run only the `webserver` cookbook, so we use the `--audit-mode disabled` option to disable the `audit` cookbook (`disabled` is also the default).

Choose the option that matches how you connect to your Ubuntu node.

#### Option a: Use a user name and password

Replace <code class="placeholder">ADDRESS</code> with your remote node's external address, <code class="placeholder">USER</code> with your username, and <code class="placeholder">PASSWORD</code> with your password.

```bash
# ~/chef-repo
$ knife ssh ADDRESS 'sudo chef-client --audit-mode disabled' --manual-list --ssh-user USER --ssh-password 'PASSWORD'
```

#### Option b: Use key-based authentication

Replace <code class="placeholder">ADDRESS</code> with your remote node's external address, <code class="placeholder">USER</code> with your username, and <code class="placeholder">IDENTITY\_FILE</code> with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.

```bash
# ~/chef-repo
$ knife ssh ADDRESS 'sudo chef-client --audit-mode disabled' --manual-list --ssh-user USER --identity-file IDENTITY_FILE
```

### Option 2: Bootstrap a new Ubuntu 14.04 node

First, prepare a clean Ubuntu 14.04 instance to bootstrap. Be sure that:

* its IP address is accessible from your network.
* it has inbound network access on ports 22 (SSH) and 80 (HTTP) and outbound network access on port 443 (HTTPS).
* it meets the [system requirements](https://docs.chef.io/chef_system_requirements.html#chef-client) for running `chef-client`.
* you have root or `sudo` access.

Now bootstrap your node. Choose the option below that matches how you can authenticate and bootstrap your node.

[COMMENT] Although you set both the `audit` and `webserver` cookbooks' default recipe as part of the run-list, only the infrastructure code, not the audit code, is run during the bootstrap process. You'll run the audit code in a later step.

#### Option a: Use a user name and password

Replace <code class="placeholder">ADDRESS</code> with your remote node's external address, <code class="placeholder">USER</code> with your username, and <code class="placeholder">PASSWORD</code> with your password.

```bash
# ~/chef-repo
$ knife bootstrap ADDRESS --ssh-user USER --ssh-password 'PASSWORD' --sudo --use-sudo-password --node-name webserver1 --run-list 'recipe[webserver::default],recipe[audit::default]'
```

#### Option b: Use key-based authentication

Replace <code class="placeholder">ADDRESS</code> with your remote node's external address, and <code class="placeholder">IDENTITY\_FILE</code> with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.

```bash
# ~/chef-repo
$ knife bootstrap ADDRESS --ssh-user USER --sudo --identity-file IDENTITY_FILE --node-name webserver1 --run-list 'recipe[webserver::default],recipe[audit::default]'
```

<a class="help-button radius" href="#" data-reveal-id="knife-help-modal">Need help troubleshooting?</a>

<div id="knife-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">If the operation times out or fails, here are some things to try</h3>
  <ul>
    <li>Ensure that you run <code>knife</code> commands from your <code class="file-path">chef-repo</code> directory or one of its sub-directories.</li>
    <li>Ensure you have a <code class="file-path">chef-repo/.chef</code> directory and that it contains a <code class="file-path">knife.rb</code> file and two <code class="file-path">.pem</code> files. If you don't, <a href="/manage-a-node/ubuntu/set-up-your-chef-server#step2" target="_blank">install the Starter Kit</a>.</li>
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

### View the events in the Timeline view

Now log in to the web interface for your Chef Analytics server. From the **Timeline** tab, you'll see the recent activity on your node.

Here's what the events look like when you bootstrap a node.

![The bootstrap event in the Timeline tab](chef-analytics/compliance-bootstrap-timeline.png)

From the **Nodes** tab, you'll see that the `chef-client` run also succeeded.

![The converge event in the Nodes tab](chef-analytics/compliance-bootstrap-nodes.png)
