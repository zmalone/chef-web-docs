## 3. Run the cookbook on your node

Now that your updated cookbook is on the Chef server, you can run `chef-client` on your node. The `chef-client` command pulls from Chef server the latest cookbooks from the node's run-list and applies the run-list to the node.

To run `chef-client` on your note remotely from your workstation, you'll run the [knife ssh](https://docs.chef.io/knife_ssh.html) command. `knife ssh` takes the command to run on the node as an argument. Here, we'll run `sudo chef-client`.

As with `knife bootstrap`, the options to provide to `knife ssh` depend on how you would normally connect to your node over SSH.

Choose the option that matches how you normally connect to your node over SSH.

### Update your node using a username and password

Replace <code class="placeholder">ADDRESS</code>, <code class="placeholder">USER</code>, and <code class="placeholder">PASSWORD</code> with your values.

```bash
# ~/learn-chef
$ knife ssh ADDRESS 'sudo chef-client' --manual-list --ssh-user USER --ssh-password 'PASSWORD'
40.76.28.32 Starting Chef Client, version 12.5.1
40.76.28.32 resolving cookbooks for run list: ["learn_chef_httpd"]
40.76.28.32 Synchronizing Cookbooks:
40.76.28.32   - learn_chef_httpd (0.2.0)
40.76.28.32 Compiling Cookbooks...
40.76.28.32 Converging 4 resources
40.76.28.32 Recipe: learn_chef_httpd::default
40.76.28.32   * yum_package[httpd] action install (up to date)
40.76.28.32   * service[httpd] action enable (up to date)
40.76.28.32   * service[httpd] action start (up to date)
40.76.28.32   * template[/var/www/html/index.html] action create
40.76.28.32     - update content in file /var/www/html/index.html from ef4ffd to 67d031
40.76.28.32     --- /var/www/html/index.html	2015-12-03 17:22:00.545190361 +0000
40.76.28.32     +++ /var/www/html/.index.html20151203-11236-muaex2	2015-12-03 19:57:39.502865516 +0000
40.76.28.32     @@ -1,6 +1,6 @@
40.76.28.32      <html>
40.76.28.32        <body>
40.76.28.32     -    <h1>hello world</h1>
40.76.28.32     +    <h1>hello from learn-chef.b10.internal.cloudapp.net</h1>
40.76.28.32        </body>
40.76.28.32      </html>
40.76.28.32     - restore selinux security context
40.76.28.32   * service[iptables] action stop (up to date)
40.76.28.32
40.76.28.32 Running handlers:
40.76.28.32 Running handlers complete
40.76.28.32 Chef Client finished, 1/5 resources updated in 06 seconds
```

### Update your node using key-based authentication

Replace <code class="placeholder">ADDRESS</code> with your remote node's external address, <code class="placeholder">USER</code> with your username, and <code class="placeholder">IDENTITY\_FILE</code> with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.

```bash
# ~/learn-chef
$ knife ssh ADDRESS 'sudo chef-client' --manual-list --ssh-user USER --identity-file IDENTITY_FILE
40.76.28.32 Starting Chef Client, version 12.5.1
40.76.28.32 resolving cookbooks for run list: ["learn_chef_httpd"]
40.76.28.32 Synchronizing Cookbooks:
40.76.28.32   - learn_chef_httpd (0.2.0)
40.76.28.32 Compiling Cookbooks...
40.76.28.32 Converging 4 resources
40.76.28.32 Recipe: learn_chef_httpd::default
40.76.28.32   * yum_package[httpd] action install (up to date)
40.76.28.32   * service[httpd] action enable (up to date)
40.76.28.32   * service[httpd] action start (up to date)
40.76.28.32   * template[/var/www/html/index.html] action create
40.76.28.32     - update content in file /var/www/html/index.html from ef4ffd to 67d031
40.76.28.32     --- /var/www/html/index.html	2015-12-03 17:22:00.545190361 +0000
40.76.28.32     +++ /var/www/html/.index.html20151203-11236-muaex2	2015-12-03 19:57:39.502865516 +0000
40.76.28.32     @@ -1,6 +1,6 @@
40.76.28.32      <html>
40.76.28.32        <body>
40.76.28.32     -    <h1>hello world</h1>
40.76.28.32     +    <h1>hello from learn-chef.b10.internal.cloudapp.net</h1>
40.76.28.32        </body>
40.76.28.32      </html>
40.76.28.32     - restore selinux security context
40.76.28.32   * service[iptables] action stop (up to date)
40.76.28.32
40.76.28.32 Running handlers:
40.76.28.32 Running handlers complete
40.76.28.32 Chef Client finished, 1/5 resources updated in 06 seconds
```

### Update a local virtual machine using a forwarded port

Replace <code class="placeholder">PORT</code> with your SSH forwarded port, for example, 2222, and <code class="placeholder">IDENTITY\_FILE</code> with your SSH identify file, for example <code class="file-path">/home/user/.vagrant/machines/default/virtualbox/private_key</code>.

```bash
# ~/learn-chef
$ knife ssh localhost --ssh-port PORT 'sudo chef-client' --manual-list --ssh-user vagrant --identity-file IDENTITY_FILE
localhost Starting Chef Client, version 12.5.1
localhost resolving cookbooks for run list: ["learn_chef_httpd"]
localhost Synchronizing Cookbooks:
localhost   - learn_chef_httpd (0.2.0)
localhost Compiling Cookbooks...
localhost Converging 4 resources
localhost Recipe: learn_chef_httpd::default
localhost   * yum_package[httpd] action install (up to date)
localhost   * service[httpd] action enable (up to date)
localhost   * service[httpd] action start (up to date)
localhost   * template[/var/www/html/index.html] action create
localhost     - update content in file /var/www/html/index.html from ef4ffd to 0a7ee1
localhost     --- /var/www/html/index.html	2015-12-03 17:18:14.677999934 +0000
localhost     +++ /var/www/html/.index.html20151203-2159-tr52ik	2015-12-03 19:54:55.230604816 +0000
localhost     @@ -1,6 +1,6 @@
localhost      <html>
localhost        <body>
localhost     -    <h1>hello world</h1>
localhost     +    <h1>hello from localhost</h1>
localhost        </body>
localhost      </html>
localhost     - restore selinux security context
localhost   * service[iptables] action stop (up to date)
localhost
localhost Running handlers:
localhost Running handlers complete
localhost Chef Client finished, 1/5 resources updated in 04 seconds
```

<hr>

[COMMENT] Remember, in practice it's common to configure Chef to act as a service that runs periodically or in response to an event, such as a commit to source control. For now, we're updating our server configuration by running `chef-client` manually.

<a class="help-button radius" href="#" data-reveal-id="knife-help-modal">Need help troubleshooting?</a>

<div id="knife-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">If the operation times out or fails, here are some things to try</h3>
  <ul>
    <li>Ensure that your environment is active before you run <code>knife</code>. For example, CloudShare instances suspend after a period of inactivity. <img class="border" src="/assets/images/rhel/cloudshare-suspend.png"></img></li>
    <li>Ensure that you run <code>knife</code> commands from your <code class="file-path">learn-chef</code> directory or one of its sub-directories.</li>
    <li>Ensure you have a <code class="file-path">learn-chef/.chef</code> directory and that it contains a <code class="file-path">knife.rb</code> file and your RSA private key file. If you don't, <a href="/manage-a-node/rhel/set-up-your-chef-server#step2" target="_blank">configure your workstation to communicate with Chef server</a>.</li>
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
