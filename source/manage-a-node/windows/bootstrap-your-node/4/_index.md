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
  <h1 class="titleInside">Terminal: ~/chef-repo</h1>
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
