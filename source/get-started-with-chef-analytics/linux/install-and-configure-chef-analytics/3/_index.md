## 3. Copy the configuration files to your Chef Analytics server

[CALLOUT rhel/platform-logos/chef-server.svg,rhel/platform-logos/chef-analytics.svg] You'll begin on your Chef server and then move to your Chef Analytics server.

When you prepared your Chef server to work with Chef Analytics, the Chef server generated files that Chef Analytics needs. In this step, you'll copy these files to your Chef Analytics server and configure Chef Analytics to work with your Chef server.

First, you need to copy the files in the <code class="file-path">/etc/opscode-analytics</code> directory from your Chef server to your Chef Analytics server. The way you do this depends on how you access your servers. For example, if you're using key-based authentication, then you might not be able to connect directly from one server to the other.

One way to copy the files is to:

1. Archive the <code class="file-path">/etc/opscode-analytics</code> directory into a single <code class="file-path">.tar</code> file on your Chef server.
1. Run `scp` or another secure copy utility to copy the <code class="file-path">.tar</code> archive to your workstation.
1. Extract the archive from your workstation to your Chef Analytics server.

<a class="help-button radius" href="#" data-reveal-id="transfer-files-help-modal">Show me how!</a>

<div id="transfer-files-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3>To copy the files from Chef server to Chef Analytics</h3>

<p>Choose the steps that match your workstation setup and how you connect to your servers. These steps are performed from your workstation.</p>

<h4>Copy the files from a Mac OS or Linux workstation</h4>

<p>Here&#39;s how to copy the files using a user name and password. Replace <code class="placeholder">USER</code>, <code class="placeholder">CHEF\_SERVER\_IP\_ADDRESS</code>, and <code class="placeholder">ANALYTICS\_IP\_ADDRESS</code> with your values.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>$</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>$</span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>ssh -t USER@CHEF_SERVER_IP_ADDRESS sudo tar -czvf /tmp/opscode-analytics.tar /etc/opscode-analytics</span><span class='line output'>USER@CHEF_SERVER_IP_ADDRESS's password: ********</span><span class='line output'>tar: Removing leading `/' from member names</span><span class='line output'>/etc/opscode-analytics/</span><span class='line output'>/etc/opscode-analytics/webui_priv.pem</span><span class='line output'>/etc/opscode-analytics/actions-source.json</span><span class='line command'>scp -p USER@CHEF_SERVER_IP_ADDRESS:/tmp/opscode-analytics.tar /tmp</span><span class='line output'>USER@CHEF_SERVER_IP_ADDRESS's password: ********</span><span class='line output'>opscode-analytics.tar                         100% 1975     1.9KB/s   00:00</span><span class='line command'>cat /tmp/opscode-analytics.tar | ssh  USER@ANALYTICS_IP_ADDRESS sudo tar -xzf - -C /</span><span class='line output'>USER@ANALYTICS_IP_ADDRESS's password: ********</span></code></pre></td></tr></table></div></div>
          </div>
<p>Here&#39;s how to copy the files using key-based authentication. Replace <code class="placeholder">IDENTITY\_FILE</code>, <code class="placeholder">USER</code>, <code class="placeholder">CHEF\_SERVER\_IP\_ADDRESS</code>, and <code class="placeholder">ANALYTICS\_IP\_ADDRESS</code> with your values.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>$</span><span class='line-number'>&nbsp;</span><span class='line-number'>$</span></pre></td><td class='code'><pre><code><span class='line command'>ssh -t -i IDENTITY_FILE USER@CHEF_SERVER_IP_ADDRESS sudo tar -czvf /tmp/opscode-analytics.tar /etc/opscode-analytics</span><span class='line output'>tar: Removing leading `/' from member names</span><span class='line output'>/etc/opscode-analytics/</span><span class='line output'>/etc/opscode-analytics/webui_priv.pem</span><span class='line output'>/etc/opscode-analytics/actions-source.json</span><span class='line command'>scp -p -i IDENTITY_FILE USER@CHEF_SERVER_IP_ADDRESS:/tmp/opscode-analytics.tar /tmp</span><span class='line output'>opscode-analytics.tar                         100% 1975     1.9KB/s   00:00</span><span class='line command'>cat /tmp/opscode-analytics.tar | ssh -i IDENTITY_FILE USER@ANALYTICS_IP_ADDRESS sudo tar -xzf - -C /</span></code></pre></td></tr></table></div></div>
          </div>
<h4>Copy the files from a Windows workstation</h4>

<p>Mac OS and most Linux distributions come with an SSH client and secure copy utility. On Windows, you&#39;ll need to install them. <a href="http://www.putty.org">PuTTY</a> is a popular SSH client for connecting to Linux machines, and comes with a secure copy utility. <a href="http://winscp.net">WinSCP</a> is another popular option for securely copying files. If you&#39;re using Amazon EC2 to host your node, the <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html">AWS documentation</a> can also help get you started.</p>

<p>Here&#39;s how to use PuTTY&#39;s <a href="http://the.earth.li/~sgtatham/putty/0.53b/htmldoc/Chapter7.html#7">Plink</a> and <a href="http://the.earth.li/~sgtatham/putty/0.53b/htmldoc/Chapter5.html">PSCP</a> utilities to copy the files using a user name and password. Replace <code class="placeholder">USER</code>, <code class="placeholder">CHEF\_SERVER\_IP\_ADDRESS</code>, and <code class="placeholder">ANALYTICS\_IP\_ADDRESS</code> with your values.</p>
<div class="window Win32">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Windows PowerShell: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>&amp; plink.exe -t USER@CHEF_SERVER_IP_ADDRESS sudo tar -czvf /tmp/opscode-analytics.tar /etc/opscode-analytics</span><span class='line output'>USER@CHEF_SERVER_IP_ADDRESS's password: ********</span><span class='line output'>tar: Removing leading `/' from member names</span><span class='line output'>/etc/opscode-analytics/</span><span class='line output'>/etc/opscode-analytics/actions-source.json</span><span class='line output'>/etc/opscode-analytics/webui_priv.pem</span><span class='line command'>&amp; pscp.exe -p USER@CHEF_SERVER_IP_ADDRESS:/tmp/opscode-analytics.tar C:\temp</span><span class='line output'>USER@CHEF_SERVER_IP_ADDRESS's password: ********</span><span class='line output'>opscode-analytics.tar     | 1 kB |   1.9 kB/s | ETA: 00:00:00 | 100%</span><span class='line command'>&amp; pscp.exe -p C:\temp\opscode-analytics.tar  USER@ANALYTICS_IP_ADDRESS:/tmp</span><span class='line output'>USER@CHEF_SERVER_IP_ADDRESS's password: ********</span><span class='line output'>opscode-analytics.tar     | 1 kB |   1.9 kB/s | ETA: 00:00:00 | 100%</span><span class='line command'>&amp; plink.exe USER@ANALYTICS_IP_ADDRESS 'tar -xzf /tmp/opscode-analytics.tar -C /'</span><span class='line output'>USER@CHEF_SERVER_IP_ADDRESS's password: ********</span></code></pre></td></tr></table></div></div>
          </div>
<p>Here&#39;s the same operation, but using key-based authentication. Replace <code class="placeholder">IDENTITY\_FILE</code>, <code class="placeholder">USER</code>, <code class="placeholder">CHEF_SERVER\_IP\_ADDRESS</code>, and <code class="placeholder">ANALYTICS\_IP\_ADDRESS</code> with your values.</p>
<div class="window Win32">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Windows PowerShell: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span><span class='line-number'>PS ></span></pre></td><td class='code'><pre><code><span class='line command'>&amp; plink.exe -t -i 'IDENTITY_FILE' USER@CHEF_SERVER_IP_ADDRESS sudo tar -czvf /tmp/opscode-analytics.tar /etc/opscode-analytics</span><span class='line output'>tar: Removing leading `/' from member names</span><span class='line output'>/etc/opscode-analytics/</span><span class='line output'>/etc/opscode-analytics/actions-source.json</span><span class='line output'>/etc/opscode-analytics/webui_priv.pem</span><span class='line command'>&amp; pscp.exe -p -i 'IDENTITY_FILE' USER@CHEF_SERVER_IP_ADDRESS:/tmp/opscode-analytics.tar C:\temp</span><span class='line output'>opscode-analytics.tar     | 1 kB |   1.9 kB/s | ETA: 00:00:00 | 100%</span><span class='line command'>&amp; pscp.exe -p -i 'IDENTITY_FILE' C:\temp\opscode-analytics.tar USER@ANALYTICS_IP_ADDRESS:/tmp</span><span class='line output'>opscode-analytics.tar     | 1 kB |   1.9 kB/s | ETA: 00:00:00 | 100%</span><span class='line command'>&amp; plink.exe -i 'IDENTITY_FILE' USER@ANALYTICS_IP_ADDRESS 'tar -xzf /tmp/opscode-analytics.tar -C /'</span></code></pre></td></tr></table></div></div>
          </div>
<div class="alert-box comment"><i class="fa fa-2x fa-info-circle blueiconcolor"></i>&nbsp; These examples assume that the path to the PuTTY utilities are on your system path, for example<br/><code>set PATH=C:\Program Files (x86)\PuTTY;%PATH%</code>.</div>

  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

Next you'll switch over to your Chef Analytics server.
