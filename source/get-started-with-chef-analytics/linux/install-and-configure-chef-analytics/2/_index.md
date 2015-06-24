## 2. Connect your Chef server to Chef Analytics

Now you need to provide some information about your Chef Analytics system to your Chef server. In this step, you'll continue to work from your Chef server.

First, stop your Chef server.

```bash
# ~
$ sudo chef-server-ctl stop
ok: down: bookshelf: 0s, normally up
ok: down: nginx: 0s, normally up
ok: down: oc_bifrost: 0s, normally up
ok: down: oc_id: 0s, normally up
ok: down: opscode-chef-mover: 85322s, normally up
ok: down: opscode-erchef: 0s, normally up
ok: down: opscode-expander: 0s, normally up
ok: down: opscode-expander-reindexer: 0s, normally up
ok: down: opscode-reporting: 0s, normally up
ok: down: opscode-solr4: 0s, normally up
ok: down: postgresql: 0s, normally up
ok: down: rabbitmq: 1s, normally up
ok: down: redis_lb: 0s, normally up
```

From your Chef server, add the FQDN for the Chef server and the Chef analytics server to <code class="file-path">/etc/opscode/chef-server.rb</code>. Replace `{fqdn-chef-server}` with your Chef server's FQDN and `{fqdn-analytics}` with your Chef Analytics server's FQDN. For `redirect_uri`, the ending slash is required.

```ruby
# /etc/opscode/chef-server.rb
oc_id['applications'] = {
  'analytics' => {
    'api_fqdn' => '{fqdn-chef-server}', # Chef server
    'redirect_uri' => 'https://{fqdn-analytics}/' # Chef Analytics
  }
}
```

Also, add the following to <code class="file-path">/etc/opscode/chef-server.rb</code> to enable remote access to RabbitMQ on the Chef server. Replace `{ip-chef-server}` with your Chef server's public IP address (not its hostname.)

```ruby
# /etc/opscode/chef-server.rb
rabbitmq['vip'] = '{ip-chef-server}'
rabbitmq['node_ip_address'] = '0.0.0.0'
```

Reconfigure the Chef server.

```bash
# ~
$ sudo chef-server-ctl reconfigure
Starting Chef Client, version 12.4.0.rc.2
resolving cookbooks for run list: ["private-chef::default"]
Synchronizing Cookbooks:
  - yum
  - enterprise
  - private-chef
  - runit
  - apt
  - packagecloud
Compiling Cookbooks...
[...]
Running handlers:
Running handlers complete
Chef Client finished, 32/357 resources updated in 51.37811144 seconds
opscode Reconfigured!
```

This step reconfigures the Chef server and creates the <code class="file-path">/etc/opscode-analytics/actions-source.json</code> file, which is required by Chef Analytics in a later step.

Confirm that <code class="file-path">actions-source.json</code> was properly written.

```bash
# ~
$ sudo cat /etc/opscode-analytics/actions-source.json
{
  "private_chef": {
    "api_fqdn": "ec2-52-27-41-27.us-west-2.compute.amazonaws.com",
    "oc_id_application": {
      "name": "analytics",
      "uid": "334a0a7fdd90b9739990a4b451fd2a3b4cab8eb9d98933f5e746c3ade1da08a3",
      "secret": "35b2cdc8648ffdd4854d0c78ab8f8bfc320424fa7e9cf0089776a88fabfa115f",
      "redirect_uri": "https://ec2-52-11-26-69.us-west-2.compute.amazonaws.com/"
    },
    "rabbitmq_host": "52.27.41.27",
    "rabbitmq_port": "5672",
    "rabbitmq_vhost": "/analytics",
    "rabbitmq_exchange": "actions",
    "rabbitmq_user": "actions",
    "rabbitmq_password": "6b3c755ff7c06f1264fdcea31060f298baae39aebd938a515d19ae45b97a56b3061f902118bcaf78651bd65f7970817c056c"
  }
}
```

Restart the Chef server.

```bash
# ~
$ sudo chef-server-ctl restart
ok: run: bookshelf: (pid 12710) 1s
ok: run: nginx: (pid 12740) 0s
ok: run: oc_bifrost: (pid 12745) 1s
ok: run: oc_id: (pid 12775) 0s
ok: run: opscode-chef-mover: (pid 12778) 1s
ok: run: opscode-erchef: (pid 12803) 0s
ok: run: opscode-expander: (pid 12830) 0s
ok: run: opscode-expander-reindexer: (pid 12859) 0s
ok: run: opscode-reporting: (pid 12885) 1s
ok: run: opscode-solr4: (pid 12912) 0s
ok: run: postgresql: (pid 12942) 0s
ok: run: rabbitmq: (pid 12945) 1s
ok: run: redis_lb: (pid 12978) 0s
```

Finally, reconfigure the Chef management console.

```bash
# ~
$ sudo opscode-manage-ctl reconfigure
Starting Chef Client, version 12.0.3
resolving cookbooks for run list: ["opscode-manage::default"]
[...]
Recipe: opscode-manage::nginx
  * service[nginx] action nothing (skipped due to action :nothing)
  * template[/var/opt/opscode/nginx/etc/addon.d/30-opscode-manage_upstreams.conf] action create (up to date)
  * template[/var/opt/opscode/nginx/etc/addon.d/30-opscode-manage_internal.conf] action create (up to date)
  * template[/var/opt/opscode/nginx/etc/addon.d/30-opscode-manage_external.conf] action create (up to date)
  * template[/var/opt/opscode/nginx/etc/nginx.d/manage.conf] action delete (up to date)
Recipe: opscode-manage::default
  * file[/var/opt/opscode-manage/etc/opscode-manage-running.json] action create (up to date)

Running handlers:
Running handlers complete
Chef Client finished, 5/68 resources updated in 12.49658619 seconds
opscode-manage Reconfigured!
```
