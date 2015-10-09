## 3. Get a node to manage

Recall that a _node_ is any physical machine, cloud instance, or virtual machine that Chef manages.

All you need to do right now is bring up a clean instance of any machine running a [supported platform](https://docs.chef.io/supported_platforms.html) that meets the [system requirements](https://docs.chef.io/chef_system_requirements.html#chef-client) for running `chef-client`.

Use the following checklists to help ensure that your node is ready for use with Chef.

<a class="help-button radius" href="#" data-reveal-id="knife-help-modal">Checklist for Linux nodes</a> <a class="help-button radius" href="#" data-reveal-id="knife-help-modal-windows">Checklist for Windows Server nodes</a>

<div id="knife-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">To prepare your Linux node, ensure that:</h3>
  <ul>
    <li>your node's IP address is accessible from your network.</li>
    <li>you have root or <code>sudo</code> access on the node.</li>
    <li>your node has inbound access (including firewall) on port 22 (SSH).</li>
    <li>your node has outbound access (including firewall) on port 443 (HTTPS).</li>
  </ul>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

<div id="knife-help-modal-windows" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">To prepare your Windows Server node, ensure that:</h3>
  <ul>
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
