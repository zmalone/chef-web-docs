## 1. Set up reporting on the Chef server

Chef Analytics requires the [reporting](https://docs.chef.io/install_reporting.html) feature to be installed on your Chef server.

Chef reporting tracks what happens when `chef-client` runs on your nodes. Chef server uses this information to build reports.

You install Chef reporting just like the Chef management console and other Chef server features. First, you run the `chef-server-ctl install` command to install the feature. Then you run commands to configure and activate the feature.

From your Chef server, run the following to install Chef reporting.

```bash
# ~
$ sudo chef-server-ctl install opscode-reporting
tarting Chef Client, version 12.4.0.rc.2
resolving cookbooks for run list: ["private-chef::add_ons_wrapper"]
Synchronizing Cookbooks:
  - yum
  - packagecloud
  - private-chef
  - runit
  - apt
  - enterprise
Compiling Cookbooks...
Converging 14 resources
[...]
Running handlers:
-- Installed Add-On Package: opscode-reporting
  - #<Class:0x0000000424cc10>::AddonInstallHandler
Running handlers complete
Chef Client finished, 2/10 resources updated in 31.148619997 seconds
```

Now reconfigure Chef server.

```bash
# ~
$ sudo chef-server-ctl reconfigure
Starting Chef Client, version 12.4.0.rc.2
resolving cookbooks for run list: ["private-chef::default"]
Synchronizing Cookbooks:
  - yum
  - packagecloud
  - runit
  - enterprise
  - apt
  - private-chef
Compiling Cookbooks...
[...]
Recipe: private-chef::default
  * file[/etc/opscode/chef-server-running.json] action create (up to date)

Running handlers:
Running handlers complete
Chef Client finished, 32/390 resources updated in 35.212935898 seconds
opscode Reconfigured!
```

Reconfigure Chef reporting.

```bash
# ~
$ sudo opscode-reporting-ctl reconfigure
[...]
Starting Chef Client, version 11.12.2
resolving cookbooks for run list: ["opscode-reporting::default"]
Synchronizing Cookbooks:
  - opscode-reporting
  - enterprise
  - runit
  - build-essential
  - yum
Compiling Cookbooks...
[...]
Running handlers:
Running handlers complete

Chef Client finished, 43/48 resources updated in 25.032896707 seconds
opscode-reporting Reconfigured!
```

Finally, verify the installation.

```bash
# ~
$ sudo opscode-reporting-ctl test
Configuring logging...
Creating platform...
Configured URL: https://ip-172-31-13-105.us-west-2.compute.internal
Creating org pedant-testorg-21264
Starting Pedant Run: 2015-06-16 17:47:06 UTC
setting up rspec config for #<Pedant::ReportingPlatform:0x00000001097d78>
Configuring RSpec for Multi-Tenant Tests
[...]
Finished in 2 minutes 37.5 seconds
222 examples, 0 failures, 4 pending
```
