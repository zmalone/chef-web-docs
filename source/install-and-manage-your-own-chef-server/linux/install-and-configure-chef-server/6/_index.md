## 6. Copy the RSA key and knife configuration file to your workstation

First, run `pwd` from your Chef server to verify the current directory.

```bash
$ pwd
/root
```

Now you need to copy the RSA key and `knife` configuration file that you just created from your Chef server to your workstation.  

First, from your workstation, create a <code class="file-path">.chef</code> directory in your <code class="file-path">~/chef-repo</code> directory.

```bash
# ~/chef-repo
$ mkdir .chef
```

Now copy your key from your Chef server to the <code class="file-path">.chef</code> directory on your workstation.

<a class="help-button radius" href="#" data-reveal-id="copy-scp-help-modal">Show me how!</a>

<div id="copy-scp-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
<h3>To copy the files from your Chef server to your workstation</h3>
<p>First, run <code>pwd</code> from your Chef server to verify the current directory.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>pwd</span><span class='line output'>/root</span></code></pre></td></tr></table></div></div>
          </div>
<p>Now run the command that corresponds to your workstation setup and how you connect to your Chef server. Replace <code class="file-path">/root</code> with the output of the <code>pwd</code> command you just ran if needed.</p>
<h4><a class="section-link" name="connectfromamacosorlinuxworkstation" href="#connectfromamacosorlinuxworkstation">&#167;</a>Copy the file from the Chef server to a Mac OS or Linux workstation</h4>

<p>Here&#39;s an example of how to use the built-in <code>scp</code> command using a user name and password.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>scp root@52.25.201.190:/root/admin.pem .chef/admin.pem</span><span class='line output'>root@52.25.201.190's password: ********</span><span class='line output'>admin.pem                                     100% 1674     1.6KB/s   00:00</span><span class='line command'>scp root@52.25.201.190:/root/knife.rb .chef/knife.rb</span><span class='line output'>root@52.25.201.190's password: ********</span><span class='line output'>knife.rb                                      100%  455     0.4KB/s   00:00</span></code></pre></td></tr></table></div></div>
          </div>
<p>If you&#39;re using key-based authentication to connect to your Chef server, the command is similar to this.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~/chef-repo</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span></pre></td><td class='code'><pre><code><span class='line command'>scp -i ~/.ssh/my.pem root@52.25.201.190:/root/admin.pem .chef/admin.pem</span><span class='line output'>admin.pem                                     100% 1674     1.6KB/s   00:00</span><span class='line command'>scp -i ~/.ssh/my.pem root@52.25.201.190:/root/knife.rb .chef/knife.rb</span><span class='line output'>knife.rb                                      100%  455     0.4KB/s   00:00</span></code></pre></td></tr></table></div></div>
          </div>
<h4><a class="section-link" name="connectfromawindowsworkstation" href="#connectfromawindowsworkstation">&#167;</a>Copy the file from your Chef server to a Windows workstation</h4>

<p>On Windows, you&#39;ll need to install a program that can securely copy files from Linux. The <a href="http://the.earth.li/~sgtatham/putty/0.60/htmldoc/Chapter5.html">PuTTY User Manual</a> shows how to use the <code>pscp</code> utility to securely copy a file from Linux to Windows.</p>
<p>Here's an example that uses <code>pscp</code> to copy the file from the Chef server to your Windows workstation using a user name and password.</p>
<div class="window Win32">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Windows PowerShell: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>. &quot;C:\Program Files (x86)\PuTTY\pscp.exe&quot; root@52.25.201.190:/root/admin.pem .chef/admin.pem</span><span class='line output'>root@52.25.201.190's password: ********</span><span class='line output'>admin.pem                 | 1 kB |   1.6 kB/s | ETA: 00:00:00 | 100%</span><span class='line command'>. &quot;C:\Program Files (x86)\PuTTY\pscp.exe&quot; root@52.25.201.190:/root/knife.rb .chef/knife.rb</span><span class='line output'>root@52.25.201.190's password: ********</span><span class='line output'>knife.rb                  | 0 kB |   0.4 kB/s | ETA: 00:00:00 | 100%</span></code></pre></td></tr></table></div></div>
          </div>
<p>Here&#39;s an example that uses <code>pscp</code> and key-based authentication.</p>
<div class="window Win32">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Windows PowerShell: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>. &quot;C:\Program Files (x86)\PuTTY\pscp.exe&quot; -i 'C:\Users\User\.ssh\admin.ppk' root@52.25.201.190:/root/admin.pem .chef/admin.pem</span><span class='line output'>admin.pem                 | 1 kB |   1.6 kB/s | ETA: 00:00:00 | 100%</span><span class='line command'>. &quot;C:\Program Files (x86)\PuTTY\pscp.exe&quot; -i 'C:\Users\User\.ssh\admin.ppk' root@52.25.201.190:/root/knife.rb .chef/knife.rb</span><span class='line output'>knife.rb                  | 0 kB |   0.4 kB/s | ETA: 00:00:00 | 100%</span></code></pre></td></tr></table></div></div>
          </div>
<p>If your Linux machine uses key-based authentication, you&#39;ll need to <a href="http://the.earth.li/~sgtatham/putty/0.64/htmldoc/Chapter8.html#pubkey">convert your private key</a> to a format PuTTY can use.</p>
<p>If you're using Amazon EC2 to host your node, the <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html">AWS documentation</a> can help get you started.
</p>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

Now verify that the <code class="file-path">~/chef-repo/.chef</code> directory on your workstation contains your RSA key.

```bash
# ~/chef-repo
$ ls ~/chef-repo/.chef
admin.pem knife.rb
```

[TIP] Once you verify that a copy of your RSA key and knife configuration file exists on your workstation, you can safely delete them from your Chef server if you don't want other users to access them.
