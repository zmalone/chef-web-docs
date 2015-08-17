## 4. Apply the configuration and start the server

From your Chef server, run the following command to apply the configuration settings and start the server.

```bash
$ sudo chef-server-ctl reconfigure
Starting Chef Client, version 12.4.0.rc.2
resolving cookbooks for run list: ["private-chef::default"]
Synchronizing Cookbooks:
  - enterprise
  - private-chef
  - apt
  - yum
  - runit
  - packagecloud
Compiling Cookbooks...
[...]
Running handlers:
Running handlers complete
Chef Client finished, 412/431 resources updated in 318.868487796 seconds
opscode Reconfigured!
```
