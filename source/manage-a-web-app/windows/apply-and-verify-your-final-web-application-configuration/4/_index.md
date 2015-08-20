## 4. Use Berkshelf to upload the awesome_customers cookbook

Because we know that only `awesome_customers` needs to be uploaded to the Chef server, we can add it as an argument to the `berks upload` command. Run it like this.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks upload awesome_customers
Uploaded awesome_customers (0.3.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

The `awesome_customers` cookbook was uploaded because its version has changed.

[COMMENT] Berkshelf requires a trusted SSL certificate in order to upload cookbooks. If you're using your own Chef server, and not hosted Chef, you'll need to configure Chef server [to use a trusted SSL certificate](https://osxdominion.wordpress.com/2015/02/25/configuring-chef-server-12-to-use-trusted-ssl-certs/). The [Chef documentation](http://docs.chef.io/server_security.html#ssl-protocols) describes how Chef server works with SSL certificates.<br/><br/>Alternatively, for testing purposes you can run `berks upload --no-ssl-verify` to disable SSL verification. We're working to make Berkshelf's default behavior easier to use and more secure.
