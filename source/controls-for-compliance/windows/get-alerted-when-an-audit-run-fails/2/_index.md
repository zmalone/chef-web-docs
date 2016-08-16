## 2. Apply the webserver cookbook to a node

> Perform this step from your workstation.

Next, let's apply the `webserver` cookbook to your node.

If you already have a Windows Server node that's bootstrapped to your Chef server, you can continue to use it by updating its run-list to include the `webserver` and `audit` cookbooks (option 1.)

If you don't have a Windows Server node, follow option 2.

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

Replace <code class="placeholder">ADDRESS</code> with your remote node's external address, <code class="placeholder">USER</code> with your username, and <code class="placeholder">PASSWORD</code> with your password.

```bash
# ~/chef-repo
$ knife winrm ADDRESS 'chef-client --audit-mode disabled' --manual-list --winrm-user USER --winrm-password 'PASSWORD'
```

### Option 2: Bootstrap a new Windows Server node

First, prepare a clean Windows Server 2012 R2 instance to bootstrap. Use the following checklist to verify that your instance is ready to use with Chef.

<a class="button radius cta" href="#" data-reveal-id="knife-help-modal-windows">Checklist for Windows Server nodes</a>

<div id="knife-help-modal-windows" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">To prepare your Windows Server node, ensure that:</h3>
  <ul>
    <li>the knife windows plugin <a href="/manage-a-node/windows/bootstrap-your-node#step3" target="_blank">is installed</a> on your workstation.</li>
    <li>your node's IP address is accessible from your network.</li>
    <li>you have Administrator access on the node.</li>
    <li>your node has inbound access (including firewall) on ports 5985 and 5986 (WinRM).</li>
    <li>your node has outbound access (including firewall) on port 443 (HTTPS).</li>
    <li>your node <a href="https://docs.chef.io/plugin_knife_windows.html#requirements" target="_blank">is configured</a> to accept outside WinRM connections. Most commonly, you'll need to run these commands on your Windows Server node from PowerShell before you bootstrap it.<p></p>
    <div class="window Win32">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Windows PowerShell: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>&nbsp;</span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>&nbsp;</span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span></pre></td><td class='code'><pre><code><span class='line command'>winrm quickconfig -q</span><span class='line command'>winrm set winrm/config/winrs '@{MaxMemoryPerShellMB=&quot;1024&quot;}'</span><span class='line command'>winrm set winrm/config '@{MaxTimeoutms=&quot;1800000&quot;}'</span><span class='line command'>winrm set winrm/config/service '@{AllowUnencrypted=&quot;true&quot;}'</span><span class='line command'>winrm set winrm/config/service/auth '@{Basic=&quot;true&quot;}'</span><span class='line output'>&nbsp;</span><span class='line command'>netsh advfirewall firewall add rule name=&quot;WinRM 5985&quot; protocol=TCP dir=in localport=5985 action=allow</span><span class='line command'>netsh advfirewall firewall add rule name=&quot;WinRM 5986&quot; protocol=TCP dir=in localport=5986 action=allow</span><span class='line output'>&nbsp;</span><span class='line command'>net stop winrm</span><span class='line command'>sc.exe config winrm start= auto</span><span class='line command'>net start winrm</span></code></pre></td></tr></table></div></div>
    </li>
  </ul>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

Now bootstrap your node.

[COMMENT] Although you set both the `audit` and `webserver` cookbooks' default recipes as part of the run-list, only the infrastructure code, not the audit code, is run during the bootstrap process. You'll run the audit code in a later step.

Replace <code class="placeholder">ADDRESS</code> with your remote node's external address, <code class="placeholder">USER</code> with your username, and <code class="placeholder">PASSWORD</code> with your password.

```bash
# ~/chef-repo
$ knife bootstrap windows winrm ADDRESS --winrm-user USER --winrm-password 'PASSWORD' --node-name webserver1 --run-list 'recipe[webserver::default],recipe[audit::default]'
```

### View the events in the Timeline view

Now log in to the web interface for your Chef Analytics server. From the **Timeline** tab, you'll see the recent activity on your node.

Here's what the events look like when you bootstrap a node.

![The bootstrap event in the Timeline tab](chef-analytics/compliance-bootstrap-timeline.png)

From the **Nodes** tab, you'll see that the `chef-client` run also succeeded.

![The converge event in the Nodes tab](chef-analytics/compliance-bootstrap-nodes.png)
