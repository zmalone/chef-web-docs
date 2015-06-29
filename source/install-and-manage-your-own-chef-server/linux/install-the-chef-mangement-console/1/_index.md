## 1. Install the management console

Run the following to install the Chef management console.

```bash
# ~
$ sudo chef-server-ctl install opscode-manage
Starting Chef Client, version 12.4.0.rc.2
resolving cookbooks for run list: ["private-chef::add_ons_wrapper"]
Synchronizing Cookbooks:
  - enterprise
  - yum
  - packagecloud
  - private-chef
  - runit
  - apt
Compiling Cookbooks...
Converging 3 resources
[...]
Running handlers:
-- Installed Add-On Package: opscode-manage
  - #<Class:0x00000003d075e8>::AddonInstallHandler
Running handlers complete
Chef Client finished, 7/7 resources updated in 51.529171977 seconds
```
