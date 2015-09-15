## 4. Bootstrap your node

<div class="indent" id="bootstrap-intro" data-type="windows-fundamentals" ng-non-bindable>
From your workstation, run this command to bootstrap your node. Replace <code>{{address}}</code> with your remote node's external address, <code>{{user}}</code> with your username, and <code>{{password}}</code> with your password.
</div>
<p/>
<div id="bootstrap-command" class="window" ng-non-bindable>
  <nav class="control-window">
    <div class="close">&times;</div>
    <div class="minimize"></div>
    <div class="deactivate"></div>
  </nav>
  <h1 class="titleInside">Terminal: ~\chef-repo</h1>
  <div class="container" data-type="windows-fundamentals"><div class="terminal"><table>
    <tbody>
      <tr>
        <td class="gutter"><pre class="line-numbers"><span class="line-number">$</span></pre></td>
        <td class="code"><pre><code><span class="line command">knife bootstrap windows winrm {{address}} --winrm-user {{user}} --winrm-password '{{password}}' --node-name node1 --run-list 'recipe[learn\_chef\_iis]'</span></code></pre></td>
      </tr>
    </tbody></table></div></div>
</div>

[COMMENT] This is a long command &ndash; use the scrollbar to see the entire thing.

[WINDOWS] This command uses Windows Remote Management (WinRM), a popular network protocol for connecting to Windows Server remotely. Although WinRM is how you typically connect to Windows, you can also bootstrap [using the Secure Shell (SSH) protocol](https://docs.chef.io/plugin_knife_windows.html#bootstrap-windows-ssh), which is more typical of Linux-based systems.

The optional `--node-name` argument uniquely identifies the node with the Chef server. Its value can be whatever you want. The server's FQDN is the default. If you previously used the name `node1` to bootstrap a different node, you'll need to choose a different name or remove the previous node.

<a class="help-button radius" href="#" data-reveal-id="knife-help-modal">Need help troubleshooting?</a>

<div id="knife-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">If the operation times out or fails, here are some things to try</h3>
  <ul>
    <li>Ensure that your environment is active before you run <code>knife</code>. For example, CloudShare instances suspend after a period of inactivity. <img class="border" src="/assets/images/windows/cloudshare-suspend.png"></img></li>
    <li>Ensure that you run <code>knife</code> commands from your <code class="file-path">chef-repo</code> directory or one of its sub-directories.</li>
    <li>Ensure you have a <code class="file-path">chef-repo\.chef</code> directory and that it contains a <code class="file-path">knife.rb</code> file and two <code class="file-path">.pem</code> files. If you don't, <a href="/manage-a-node/windows/set-up-your-chef-server#step2" target="_blank">install the Starter Kit</a>.</li>
    <li>Ensure that you have the <a href="/manage-a-node/windows/bootstrap-your-node#step3" target="_blank">knife windows plugin</a> installed.</li>
    <li>Ensure that your node's IP address is accessible from your network.</li>
    <li>Ensure the user name you provide has Administrator access on the node.</li>
    <li>Ensure your workstation has outbound access (including firewall) on these ports:
      <ul>
        <li>22 (SSH)</li>
        <li>80 (HTTP)</li>
        <li>443 (HTTPS)</li>
        <li>5985 and 5986 (WinRM)</li>
      </ul>
    </li>
    <li>Ensure your node has inbound access (including firewall) on these ports:
      <ul>
        <li>22 (SSH)</li>
        <li>5985 and 5986 (WinRM)</li>
      </ul>
    </li>
    <li>Ensure your node has outbound access (including firewall) on these ports:
      <ul>
        <li>443 (HTTPS)</li>
      </ul>
    </li>
    <li>Ensure your node <a href="https://docs.chef.io/plugin_knife_windows.html#requirements" target="_blank">is configured</a> to accept outside WinRM connections. Most commonly, you'll need to run these commands on your Windows Server node from PowerShell before you bootstrap it.<p></p>
    <div class="window Win32">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Windows PowerShell: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>&nbsp;</span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>&nbsp;</span><span class='line-number'>></span><span class='line-number'>></span><span class='line-number'>></span></pre></td><td class='code'><pre><code><span class='line command'>winrm quickconfig -q</span><span class='line command'>winrm set winrm/config/winrs '@{MaxMemoryPerShellMB=&quot;300&quot;}'</span><span class='line command'>winrm set winrm/config '@{MaxTimeoutms=&quot;1800000&quot;}'</span><span class='line command'>winrm set winrm/config/service '@{AllowUnencrypted=&quot;true&quot;}'</span><span class='line command'>winrm set winrm/config/service/auth '@{Basic=&quot;true&quot;}'</span><span class='line output'>&nbsp;</span><span class='line command'>netsh advfirewall firewall add rule name=&quot;WinRM 5985&quot; protocol=TCP dir=in localport=5985 action=allow</span><span class='line command'>netsh advfirewall firewall add rule name=&quot;WinRM 5986&quot; protocol=TCP dir=in localport=5986 action=allow</span><span class='line output'>&nbsp;</span><span class='line command'>net stop winrm</span><span class='line command'>sc.exe config winrm start= auto</span><span class='line command'>net start winrm</span></code></pre></td></tr></table></div></div>
    </li>
  </ul>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>
