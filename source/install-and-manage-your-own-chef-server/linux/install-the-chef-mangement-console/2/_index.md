## 2. Reconfigure Chef server

The install process downloaded and installed the management console package. After you install a feature, you must reconfigure the Chef server and the feature.

Run the following to reconfigure Chef server.

```bash
$ sudo chef-server-ctl reconfigure
Starting Chef Client, version 12.4.0.rc.2
resolving cookbooks for run list: ["private-chef::default"]
Synchronizing Cookbooks:
  - enterprise
  - packagecloud
  - private-chef
  - yum
  - apt
  - runit
Compiling Cookbooks...
[...]
Running handlers:
Running handlers complete
Chef Client finished, 19/350 resources updated in 33.839620088 seconds
opscode Reconfigured!
```

Now run this to reconfigure the management console.

```bash
# ~
$ sudo opscode-manage-ctl reconfigure
Starting Chef Client, version 12.0.3
resolving cookbooks for run list: ["opscode-manage::default"]
Synchronizing Cookbooks:
  - opscode-manage
  - enterprise
  - private_chef_addon
  - runit
  - unicorn
  - packagecloud
Compiling Cookbooks...
[...]
Recipe: opscode-manage::nginx
  * service[nginx] action restart
    - restart service service[nginx]

Running handlers:
Running handlers complete
Chef Client finished, 74/81 resources updated in 55.616616854 seconds
opscode-manage Reconfigured!
```
