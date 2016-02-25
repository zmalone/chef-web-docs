## 7. Run chef-client on your node

[CALLOUT networks/workstation.png] Perform this part from your workstation.

Now let's run the `hello_chef_server` cookbook on the node that you bootstrapped in the previous tutorial, [Learn to install and manage your own Chef server](/install-and-manage-your-own-chef-server/linux/).

<a class="help-button radius" href="#" data-reveal-id="chef-client-cheat-help-modal">Remind me how!</a>

<div id="chef-client-cheat-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">Here are some of the common ways to run chef-client on your node from your workstation</h3>
  <h4>Linux node: user name and password</h4>
  <p>Replace <code class="placeholder">ADDRESS</code> with your remote node&#39;s external address, <code class="placeholder">USER</code> with your username, and <code class="placeholder">PASSWORD</code> with your password.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~/chef-repo</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span></pre></td><td class='code'><pre><code><span class='line command'>knife ssh ADDRESS 'sudo chef-client' --manual-list --ssh-user USER --ssh-password 'PASSWORD'</span></code></pre></td></tr></table></div></div>
          </div>
  <h4>Linux node: key-based authentication</h4>
  <p>Replace <code class="placeholder">ADDRESS</code> with your remote node&#39;s external address and <code class="placeholder">IDENTITY_FILE</code> with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~/chef-repo</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span></pre></td><td class='code'><pre><code><span class='line command'>knife ssh ADDRESS 'sudo chef-client' --manual-list --ssh-user USER --identity-file IDENTITY_FILE</span></code></pre></td></tr></table></div></div>
            </div>
  <h4>Windows Server node</h4>
  <p>
Replace <code class="placeholder">ADDRESS</code>, <code class="placeholder">USER</code>, and <code class="placeholder">PASSWORD</code> with your values.
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
        <td class="code"><pre><code><span class="line command">knife winrm ADDRESS chef-client --manual-list --winrm-user USER --winrm-password &#39;PASSWORD&#39;</span></code></pre></td>
      </tr>
    </tbody></table></div></div>
</div>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

Now go back to the Chef Analytics home page in your web browser. You'll see an entry for your `chef-client` run on the **Timeline** tab.

![The Chef Analytics timeline](chef-analytics/timeline.png)
