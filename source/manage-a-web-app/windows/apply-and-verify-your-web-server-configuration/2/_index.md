## 2. Get a node to bootstrap

In [Learn to manage a Windows Server node](/manage-a-node/windows/), you bootstrapped a node that we provided. Now it's time to bootstrap a Windows Server 2012 R2 node that you own to give you experience working with your own infrastructure.

Chef provides ways to provision a node and bootstrap it all in one step &ndash; we'll cover this in a later tutorial. For learning purposes, it's best to start by bringing up your own node manually and bootstrapping it separately.

In case you haven't yet prepared your node, here's the checklist that lists what you need to do to prepare your Windows Server 2012 R2 node for use with Chef.

<a class="help-button radius" href="#" data-reveal-id="knife-help-modal-windows">Checklist for Windows Server nodes</a>

<div id="knife-help-modal-windows" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">To prepare your Windows Server node, ensure that:</h3>
  <ul>
    <li>your node's IP address is accessible from your network.</li>
    <li>you have Administrator access on the node.</li>
    <li>your node has inbound access (including firewall) on ports 5985 and 5986 (WinRM), 3389 (RDP), and 80 (HTTP).</li>
    <li>your node has outbound access (including firewall) on port 443 (HTTPS).</li>
    <li>your node <a href="https://docs.chef.io/plugin_knife_windows.html#requirements" target="_blank">is configured</a> to accept outside WinRM connections. Most commonly, you'll need to run these commands on your Windows Server node from PowerShell before you bootstrap it.<p></p>
    <div class="window Win32">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Command Prompt: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>&nbsp;</span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>&nbsp;</span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span></pre></td><td class='code'><pre><code><span class='line command'>winrm quickconfig -q</span><span class='line command'>winrm set winrm/config/winrs '@{MaxMemoryPerShellMB=&quot;1024&quot;}'</span><span class='line command'>winrm set winrm/config '@{MaxTimeoutms=&quot;1800000&quot;}'</span><span class='line command'>winrm set winrm/config/service '@{AllowUnencrypted=&quot;true&quot;}'</span><span class='line command'>winrm set winrm/config/service/auth '@{Basic=&quot;true&quot;}'</span><span class='line output'>&nbsp;</span><span class='line command'>netsh advfirewall firewall add rule name=&quot;WinRM 5985&quot; protocol=TCP dir=in localport=5985 action=allow</span><span class='line command'>netsh advfirewall firewall add rule name=&quot;WinRM 5986&quot; protocol=TCP dir=in localport=5986 action=allow</span><span class='line output'>&nbsp;</span><span class='line command'>net stop winrm</span><span class='line command'>sc.exe config winrm start= auto</span><span class='line command'>net start winrm</span></code></pre></td></tr></table></div></div>
    </li>
  </ul>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>
