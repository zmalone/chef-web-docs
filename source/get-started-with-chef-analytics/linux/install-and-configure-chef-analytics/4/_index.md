## 4. Configure Chef Analytics

[CALLOUT rhel/platform-logos/chef-analytics.svg] Perform this part from your Chef Analytics server.

From your Chef Analytics server, create the file <code class="file-path">/etc/opscode-analytics/opscode-analytics.rb</code> and add the following to it. Replace <code class="placeholder">ANALYTICS_FQDN</code> with the hostname of your Chef Analytics system.

```ruby
# /etc/opscode-analytics/opscode-analytics.rb
analytics_fqdn 'ANALYTICS_FQDN'
topology 'standalone'
```

Now run the following command to verify that Chef Analytics has all the files it needs.

```bash
# ~
$ sudo opscode-analytics-ctl preflight-check

[SUCCESS] Preflight check successful!
```

If there are any errors in the preflight check, correct them before moving to the next step.

[COMMENT] If the preflight checks fails, trying running<br>`ln -s /usr/bin/curl /opt/opscode-analytics/embedded/bin/curl` on your Analytics server and then run the preflight check again. This will create a symlink to the system `curl`, which is required for the configuration to succeed.<br><br>This is a known issue, and we're working on a permanent fix for it.

Reconfigure Chef Analytics to use the updated configuration settings.

```bash
# ~
$ sudo opscode-analytics-ctl reconfigure
Starting Chef Client, version 11.18.0
Compiling Cookbooks...
Recipe: opscode-analytics::default
  * directory[/etc/opscode-analytics] action create
    - change owner from '999' to 'root'
    - change group from '999' to 'root'
Generating RSA private key, 2048 bit long modulus
[...]
Recipe: opscode-analytics::alaska
  * runit_service[alaska] action restart
    - restart service runit_service[alaska]
  * execute[restart_alaska_log_service] action run
    - execute /opt/opscode-analytics/embedded/bin/sv restart /opt/opscode-analytics/sv/alaska/log

Running handlers:
Running handlers complete
Chef Client finished, 282/302 resources updated in 112.87384101 seconds
opscode-analytics Reconfigured!
```
