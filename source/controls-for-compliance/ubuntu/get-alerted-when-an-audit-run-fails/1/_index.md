## 1. Upload the basic\_audit cookbook to the Chef server

Because the `basic_audit` cookbook depends on the `firewall` cookbook, an easy way to upload it is through Berkshelf.

```bash
# ~/chef-repo
$ berks install
Resolving cookbook dependencies...
Fetching 'basic_audit' from source at .
Using poise (2.1.0)
Using firewall (1.5.1)
Using basic_audit (0.1.0) from source at .
```

```bash
# ~/chef-repo
$ berks upload --no-ssl-verify
Uploaded basic_audit (0.1.0) to: 'https://your-chef-server:443/organizations/your-org-name'
Uploaded firewall (1.5.1) to: 'https://your-chef-server:443/organizations/your-org-name'
Uploaded poise (2.1.0) to: 'https://your-chef-server:443/organizations/your-org-name'
```

The output confirms that the cookbooks successfully uploaded to your Chef server, but you can also run the following command to verify this.

```bash
# ~/chef-repo
$ knife cookbook list
basic_audit   0.1.0
firewall      1.5.1
poise         2.1.0
```
