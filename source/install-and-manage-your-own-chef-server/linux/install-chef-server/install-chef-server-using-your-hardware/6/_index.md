## 6. Copy the RSA key to your workstation and generate your knife configuration file

Now you need to generate the configuration file, <code class="file-path">knife.rb</code>, that enables `knife` to authenticate commands with the Chef server. You also need to copy the RSA key (the <code class="file-path">.pem</code> file) that you created in the previous step to enable `knife` to authenticate calls to the Chef server. This authentication process ensures that the Chef server responds only to requests made by trusted users.

### Option 1: Download the Starter Kit

We recommend this method if you're using the Chef management console.

The easiest way to set up your `knife` configuration file and get a copy of your <code class="file-path">.pem</code> file is to download the Starter Kit from your Chef server. This is the same process you followed when you signed up for hosted Chef.

From your workstation,

1. From a web browser, navigate to your Chef server's hostname.
1. Sign in using the username and password you entered in the previous step.
1. From the **Administration** tab, select your organization.
1. Select **Starter Kit** from the menu on the left.
1. Click the **Download Starter Kit** button.
1. Click **Proceed**. Save the file <code class="file-path">chef-starter.zip</code> to your computer.
1. Extract <code class="file-path">chef-starter.zip</code> to your <code class="file-path">~/chef-repo</code> directory.

Now verify that the <code class="file-path">~/chef-repo/.chef</code> directory on your workstation contains knife configuration file and your RSA key.

TODO: VERIFY output

```bash
# ~/chef-repo
$ ls ~/chef-repo/.chef
admin.pem knife.rb
```

### Option 2: Copy the RSA key and generate the knife configuration file manually

If you're not using the management console, here's now to set things up manually.

First, from your Chef server, run `pwd` to verify the current directory.

```bash
# ~/root
$ pwd
/root
```

Then verify that your <code class="file-path">.pem</code> file is in that directory.

```bash
# ~/root
$ ls *.pem
admin.pem
```

Note the full path to the <code class="file-path">.pem</code> file. In this example, it's <code class="file-path">~/root/admin.pem</code>.

Now you need to copy the RSA key that you just created from your Chef server to your workstation.  

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
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>scp root@52.25.201.190:/root/admin.pem .chef/admin.pem</span><span class='line output'>root@52.25.201.190's password: ********</span><span class='line output'>admin.pem                                     100% 1674     1.6KB/s   00:00</span></code></pre></td></tr></table></div></div>
          </div>
<p>If you&#39;re using key-based authentication to connect to your Chef server, the command is similar to this.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~/chef-repo</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span></pre></td><td class='code'><pre><code><span class='line command'>scp -i ~/.ssh/my.pem root@52.25.201.190:/root/admin.pem .chef/admin.pem</span><span class='line output'>admin.pem                                     100% 1674     1.6KB/s   00:00</span></code></pre></td></tr></table></div></div>
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
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>. &quot;C:\Program Files (x86)\PuTTY\pscp.exe&quot; root@52.25.201.190:/root/admin.pem .chef/admin.pem</span><span class='line output'>root@52.25.201.190's password: ********</span><span class='line output'>admin.pem                 | 1 kB |   1.6 kB/s | ETA: 00:00:00 | 100%</span></code></pre></td></tr></table></div></div>
          </div>
<p>Here&#39;s an example that uses <code>pscp</code> and key-based authentication.</p>
<div class="window Win32">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Windows PowerShell: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>PS ></span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>. &quot;C:\Program Files (x86)\PuTTY\pscp.exe&quot; -i 'C:\Users\User\.ssh\admin.ppk' root@52.25.201.190:/root/admin.pem .chef/admin.pem</span><span class='line output'>admin.pem                 | 1 kB |   1.6 kB/s | ETA: 00:00:00 | 100%</span></code></pre></td></tr></table></div></div>
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
admin.pem
```

[TIP] Once you verify that a copy of your RSA key exists on your workstation, you can safely delete it from your Chef server if you don't want other users to access it.

Next, to generate your knife configuration file, create <code class="file-path">~/.chef-repo/.chef/knife.rb</code> on your workstation like this, replacing `{admin-username}`, `{chef-server-fqdn}`, and `{short-org-name}` with your values. Do not modify `{current_dir}`.

```ruby
# ~/.chef-repo/.chef/knife.rb
current_dir = File.dirname(__FILE__)
log_level                :info
log_location             STDOUT
node_name                '{admin-username}'
client_key               "#{current_dir}/{admin-username}.pem"
chef_server_url          'https://{chef-server-fqdn}/organizations/{short-org-name}'
cache_type               'BasicFile'
cache_options( :path => "#{ENV['HOME']}/.chef/checksums" )
cookbook_path            ["#{current_dir}/../cookbooks"]"
```

Here's an example of what your completed <code class="file-path">knife.rb</code> file will look like.

```ruby
# ~/.chef-repo/.chef/knife.rb
current_dir = File.dirname(__FILE__)
log_level                :info
log_location             STDOUT
node_name                'admin'
client_key               "#{current_dir}/admin.pem"
chef_server_url          'https://ec2-52-25-201-190.us-west-2.compute.amazonaws.com/organizations/learnchef'
cache_type               'BasicFile'
cache_options( :path => "#{ENV['HOME']}/.chef/checksums" )
cookbook_path            ["#{current_dir}/../cookbooks"]
```
