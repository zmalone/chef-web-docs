## 4. Apply the configuration and start the server

From your Chef server, run the following command to apply the configuration settings and start the server.

```bash
$ sudo chef-server-ctl reconfigure
Starting Chef Client, version 12.5.1
resolving cookbooks for run list: ["private-chef::default"]
Synchronizing Cookbooks:
  - private-chef (0.1.0)
  - enterprise (0.5.1)
  - apt (2.7.0)
  - yum (3.6.0)
  - openssl (4.4.0)
  - runit (1.6.0)
  - chef-sugar (3.1.1)
  - packagecloud (0.0.18)
Compiling Cookbooks...
[...]
Running handlers:
Running handlers complete

Chef Client finished, 416/484 resources updated in 03 minutes 41 seconds
Chef Server Reconfigured!
```
