## 5. Install the management console and reporting features

The [Chef management console](https://docs.chef.io/manage.html) and [Chef reporting](https://docs.chef.io/install_reporting.html) are examples of additional features that you can add to your Chef server.

The management console is the web-based interface into Chef server. You may not need it for large node deployments, but it's a great way to get started with Chef server because it enables you to interact with nodes and understand how Chef server works. Chef reporting tracks what happens when `chef-client` runs on your nodes. Chef server uses this information to build reports.

The management console and reporting features also install prerequisites that [Chef Analytics](http://docs.chef.io/analytics.html) and other features require.

Chef Analytics requires the  and [reporting](https://docs.chef.io/install_reporting.html) features to be installed on your Chef server.

Run these commands on your Chef server to install the Chef management console.

```bash
$ sudo chef-server-ctl install opscode-manage
$ sudo chef-server-ctl reconfigure
$ sudo opscode-manage-ctl reconfigure
```

Then run these commands to install the reporting feature.

```bash
$ sudo chef-server-ctl install opscode-reporting
$ sudo chef-server-ctl reconfigure
$ sudo opscode-reporting-ctl reconfigure
```
