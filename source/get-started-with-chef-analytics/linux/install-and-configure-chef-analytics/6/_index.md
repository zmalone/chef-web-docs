## 6. Run chef-client on your node

Now run `chef-client` on the node that you boostrapped when you set up your Chef server.

<a class="help-button radius" href="#" data-reveal-id="chef-client-cheat-help-modal">Remind me how!</a>

<div id="chef-client-cheat-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">Here are some of the common ways to run chef-client on your node from your workstation</h3>
  <h4>Linux node: user name and password</h4>
  <p>Replace <code>{address}</code> with your remote node&#39;s external address, <code>{user}</code> with your username, and <code>{password}</code> with your password.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~/chef-repo</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span></pre></td><td class='code'><pre><code><span class='line command'>knife ssh {address} 'sudo chef-client' --manual-list --ssh-user {user} --ssh-password '{password}'</span></code></pre></td></tr></table></div></div>
          </div>
  <h4>Linux node: key-based authentication</h4>
  <p>Replace <code>{address}</code> with your remote node&#39;s external address and <code>{identity-file}</code> with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~/chef-repo</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span></pre></td><td class='code'><pre><code><span class='line command'>knife ssh {address} 'sudo chef-client' --manual-list --ssh-user {user} --identity-file {identity-file}</span></code></pre></td></tr></table></div></div>
            </div>
  <h4>Windows Server node</h4>
  <p>
Replace <code>{address}</code>, <code>{user}</code>, and <code>{password}</code> with your values.
</p>
<div id="knife-command" class="window" ng-non-bindable>
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
        <td class="code"><pre><code><span class="line command">knife winrm {address} chef-client --manual-list --winrm-user {user} --winrm-password &#39;{password}&#39;</span></code></pre></td>
      </tr>
    </tbody></table></div></div>
</div>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

Now go back to the Chef Analytics home page in your web browser.

![The Chef Analytics timeline](chef-analytics/timeline.png)
