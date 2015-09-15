## 5. Connect to your Chef server and install a text editor

In this tutorial, you'll work from both your workstation and your Chef server. We recommend that you open an SSH connection to your Chef server from your workstation so that you can perform all steps from one place.

<a class="help-button radius" href="#" data-reveal-id="connect-ssh-help-modal">Show me how!</a>

<div id="connect-ssh-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
<h4><a class="section-link" name="connectfromamacosorlinuxworkstation" href="#connectfromamacosorlinuxworkstation">&#167;</a>Connect to your Chef server over SSH from a Mac OS or Linux workstation</h4>

<p>Here&#39;s an example of how to create an SSH connection using a user name and password.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>ssh root@52.25.201.190</span><span class='line output'>root@52.25.201.190's password: ********</span></code></pre></td></tr></table></div></div>
          </div>
<p>If you&#39;re using key-based authentication, the command is similar to this.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~/chef-repo</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span></pre></td><td class='code'><pre><code><span class='line command'>ssh -i ~/.ssh/my.pem root@52.25.201.190</span></code></pre></td></tr></table></div></div>
          </div>
<h4><a class="section-link" name="connectfromawindowsworkstation" href="#connectfromawindowsworkstation">&#167;</a>Connect to your Chef server over SSH from a Windows workstation</h4>

<p>Mac OS and most Linux distributions come with an SSH client. On Windows, you&#39;ll need to install one. <a href="http://www.putty.org">PuTTY</a> is a popular SSH client for connecting to Linux machines.</p>

<p>If your Linux machine uses key-based authentication, you&#39;ll need to <a href="http://the.earth.li/~sgtatham/putty/0.64/htmldoc/Chapter8.html#pubkey">convert your private key</a> to a format PuTTY can use.</p>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

The first thing you should do is install a text editor on your Chef server. If you don't have a preferred editor, we recommend `vim`. This [interactive Vim tutorial](http://www.openvim.com/tutorial.html) can help you get oriented to the commands you'll need to create, edit, and save a file. `emacs` and `nano` are also popular text command-line based editors.
