## 2. Write the Chef server configuration file

After you install the Chef server package, you must configure the Chef server. The configuration process runs `chef-client` locally to apply the changes to the system. Having a separate configuration step gives you the chance to make any additional changes.

The [Chef server configuration file](https://docs.chef.io/config_rb_server.html), <code class="file-path">/etc/opscode/chef-server.rb</code>, contains additional Chef server settings. If you leave this file empty, Chef server uses the default behavior, but let's add a few options to ensure that Chef server is configured with a hostname that's accessible to the rest of your network.

[COMMENT] This step is especially important in cloud environments such as Amazon EC2, where each instance is assigned a hostname on the private network and the firewall routes traffic between the private network and the public Internet. This step ensures that the Chef server uses the public hostname that's accessible from outside the firewall.

First, get the fully-qualified domain name (FQDN) for your Chef server that's accessible from the rest of your network. Then write out <code class="file-path">/etc/opscode/chef-server.rb</code>, like this, replacing `{chef-server-fqdn}` with your Chef server's FQDN.

```ruby
# /etc/opscode/chef-server.rb
server_name = {chef-server-fqdn}
api_fqdn server_name
bookshelf['vip'] = server_name
nginx['url'] = "https://#{server_name}"
nginx['server_name'] = server_name
nginx['ssl_certificate'] = "/var/opt/opscode/nginx/ca/#{server_name}.crt"
nginx['ssl_certificate_key'] = "/var/opt/opscode/nginx/ca/#{server_name}.key"
lb['fqdn'] = server_name
```

These configuration options ensure that Chef server uses the public hostname in its configuration.
