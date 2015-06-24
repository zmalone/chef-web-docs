## 4. Configure Chef Analytics

When you prepared your Chef server to work with Chef Analytics, the Chef server generated files that Chef Analytics needs. In this step, you'll copy these files to your Chef Analytics machine and configure Chef Analytics to work with your Chef server.

First, you need to copy the files in the <code class="file-path">/etc/opscode-analytics</code> directory from your Chef server to your Chef Analytics server. The way you do this depends on how you access your servers. For example, if you're using key-based authentication, then you might not be able to connect directly from one system to the other.

One way to copy the files is to:

1. Archive the <code class="file-path">/etc/opscode-analytics</code> directory into a single <code class="file-path">.tar</code> file on your Chef server.
1. Run `scp` to securely copy the <code class="file-path">.tar</code> archive to your workstation.
1. Extract the archive from your workstation to your Chef Analytics server.

The following commands use key-based authentication to perform these steps, and are all run from your workstation. Replace `{identity-file}`, `{user}`, `{ip-chef-server}`, and `{ip-analytics}` with your values.

```bash
$ ssh -i {identity-file} {user}@{ip-chef-server} sudo tar -czvf /tmp/opscode-analytics.tar /etc/opscode-analytics
tar: Removing leading `/' from member names
/etc/opscode-analytics/
/etc/opscode-analytics/webui_priv.pem
/etc/opscode-analytics/actions-source.json
$ scp -p -i {identity-file} {user}@{ip-chef-server}:/tmp/opscode-analytics.tar /tmp
opscode-analytics.tar                         100% 1975     1.9KB/s   00:00
$ cat /tmp/opscode-analytics.tar | ssh -i {identity-file} {user}@{ip-analytics} sudo tar -xzf - -C /
```

[WINDOWS] If you're on a Windows workstation, you need to install a program to securely copy files from Linux to Windows. [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/) and [WinSCP](http://winscp.net) are popular options.<br><br>The [PuTTY User Manual](http://the.earth.li/~sgtatham/putty/0.60/htmldoc/Chapter5.html) shows how to use PuTTY's PSCP utility to securely copy a file from Linux to Windows.<br>If you're using Amazon EC2 to host your node, the [AWS documentation](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html) can help get you started.

Next you'll switch over to your Chef Analytics server.

From your Chef Analytics server, create the file <code class="file-path">/etc/opscode-analytics/opscode-analytics.rb</code> and add the following to it. Replace `{fqdn-analytics}` with the hostname of your Chef Analytics system.

```ruby
# /etc/opscode-analytics/opscode-analytics.rb
analytics_fqdn '{fqdn-analytics}'
topology 'standalone'
```

Now run the following command to verify that Chef Analytics has all the files it needs.

```bash
# ~
$ sudo opscode-analytics-ctl preflight-check

[SUCCESS] Preflight check successful!
```

If there are any errors in the preflight check, correct them before moving to the next step.

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

Finally, verify your Chef Analytics configuration.

```bash
# ~
$ opscode-analytics-ctl test
Running with options:

{:config_file=>"/opt/opscode-analytics/embedded/service/analytics-test/config.rb", :smoke_tests_only=>true}

Running tests from the following directory:
/opt/opscode-analytics/embedded/service/analytics-test/spec/integration

Randomized with seed 48629


basic server state check
  is running

Finished in 0.05267 seconds
1 example, 0 failures

Randomized with seed 48629

```
