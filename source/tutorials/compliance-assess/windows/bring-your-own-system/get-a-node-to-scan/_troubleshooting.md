If the Chef compliance scanner fails to create a connection, you'll see something like this:

![](compliance/connectivity_report_fail_windows2012.png)

If you see this error, verify that:

* you specified the correct username and password to connect to your node.
* your firewall enables inbound access on port 5985.
* you can [manually connect over WinRM](#step2).

If the connectivity test still fails, log in to your Chef compliance scanner and run this command. The output may help you find the source of the failure.

```bash
[root@chef-compliance ~]$ sudo chef-compliance-ctl tail core
2017-02-08_15:16:32.37605 15:16:32.375 ERR => DB error: sql: no rows in result set
2017-02-08_15:16:32.37641 15:16:32.376 DEB => ID of user john-smith changed: 08f330c8-75b9-4267-6724-d9c29c5e6d18 -> 7b97dcfb-04db-401d-9051-960f9059ace4 (resetting)
2017-02-08_15:16:32.37649 15:16:32.376 DEB => Authenticated user: &{PasswordHash: Login:john-smith Name:john-smith IsOrg:false Source:{String: Valid:false} UUID:{ID:08f330c8-75b9-4267-6724-d9c29c5e6d18}}
2017-02-08_15:16:32.37677 15:16:32.376 ERR => DB error: sql: no rows in result set
2017-02-08_15:16:32.37723 15:16:32.377 ERR => DB error: sql: no rows in result set
2017-02-08_15:16:32.37904 15:16:32.379 DEB => Running `echo '{"backend":"winrm","host":"192.168.145.131","user":"Administrator","password":"REDACTED","format":"json","profiles_path":"/var/opt/chef-compliance/core/runtime/compliance-profiles"}' | inspec detect --json-config=-`
[...]
```

Press Control+C to exit the `chef-compliance-ctl tail core` command.

You can also [reach out to us](https://discourse.chef.io) on Discourse.
