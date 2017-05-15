If the Chef compliance scanner fails to create a connection, you'll see something like this:

![](compliance/connectivity_report_fail_centos7.png)

If you see this error, verify that:

* you can [manually connect over SSH](#step2) using your key pair.
* your node is [configured for non-interactive sessions](#step3).
* the Chef compliance scanner has the [SSH private key](#step4).

If the connectivity test still fails, log in to your Chef compliance scanner and run this command. The output may help you find the source of the failure.

```bash
[root@chef-compliance ~]$ sudo chef-compliance-ctl tail core
[...]
2016-04-13_20:16:30.06851 20:16:30.068 ERR => Failed to parse json from detection run on sshKey://root@10.1.1.35:22 using login key fe5ad500-1319-4c57-637d-ab0dd70aa254: unexpected end of JSON input
2016-04-13_20:16:30.06853 20:16:30.068 DEB => Raw output was: Transport error, can't connect to 'ssh' backend: SSH session could not be established
```

Press Control+C to exit the `chef-compliance-ctl tail core` command.

You can also [reach out to us](https://discourse.chef.io) on Discourse.
