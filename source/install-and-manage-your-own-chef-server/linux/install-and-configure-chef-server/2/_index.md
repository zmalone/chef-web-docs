## 2. Write the Chef server configuration file

The [Chef server configuration file](https://docs.chef.io/config_rb_server.html), <code class="file-path">/etc/opscode/chef-server.rb</code>, contains additional Chef server settings.

Chef server uses the default behavior if you can leave this file empty, but let's add a few options to ensure that Chef server is configured with a hostname that's accessible to the rest of your network.

[COMMENT] This step is especially important in cloud environments such as Amazon EC2, where each instance is assigned a hostname on the private network and the firewall routes traffic between the private network and the public Internet. This step ensures that the Chef server uses the public hostname that's accessible from outside the firewall.

In this part, you'll create an environment variable on your Chef server that defines your server's public hostname. Then you'll use that environment variable from your configuration file.

First, get the hostname or FQDN for your Chef server that's accessible from the rest of your network. Then add the environment variable to <code class="file-path">~/.bash_profile</code> and restart `bash`.

<a class="help-button radius" href="#" data-reveal-id="set-fqdn-help-modal">Show me how!</a>

<div id="set-fqdn-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">Set the environment variable</h3>
<p>To set <code>$CHEF_SERVER_FQDN</code> and make the change permanent, even after you reboot your server, open <code class="file-path">~/.bash_profile</code> from your text editor and append the line <code>export CHEF_SERVER_FQDN=&lt;public-hostname&gt;</code>, for example:</p>
<div class="window ">
              <nav class="control-window">
                <div class="close">&times;</div>
                <div class="minimize"></div>
                <div class="deactivate"></div>
              </nav>
              <h1 class="titleInside">Editor: ~/.bash_profile</h1>
              <div class="container"><div class="editor"><div class='highlight shell'><pre><table style="border-spacing: 0"><tbody><tr><td class="gutter gl" style="text-align: right"><pre class="lineno">1</pre></td><td class="code"><pre><span class="nb">export </span><span class="nv">CHEF_SERVER_FQDN</span><span class="o">=</span>ec2-52-26-2-168.us-west-2.compute.amazonaws.com<span class="w">
</span></pre></td></tr></tbody></table></pre></div></div></div></div>
<p>Then restart <code>bash</code> and confirm that your environment variable was properly written.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span><span class='line-number'>$</span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>. ~/.bash_profile</span><span class='line command'>echo $CHEF_SERVER_FQDN</span><span class='line output'>ec2-52-26-2-168.us-west-2.compute.amazonaws.com</span></code></pre></td></tr></table></div></div>
    </div>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

Now write out <code class="file-path">/etc/opscode/chef-server.rb</code>, like this.

```ruby
# /etc/opscode/chef-server.rb
server_name = ENV['CHEF_SERVER_FQDN']
api_fqdn server_name
bookshelf['vip'] = server_name
nginx['url'] = "https://#{server_name}"
nginx['server_name'] = server_name
nginx['ssl_certificate'] = "/var/opt/opscode/nginx/ca/#{server_name}.crt"
nginx['ssl_certificate_key'] = "/var/opt/opscode/nginx/ca/#{server_name}.key"
lb['fqdn'] = server_name
```

These configuration options ensure that Chef server uses the public hostname in its configuration.

[RUBY] The configuration file is Ruby, so you can use the [ENV](http://ruby-doc.org/core-2.1.4/ENV.html) class to read your environment variable.
