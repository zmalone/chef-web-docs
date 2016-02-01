## 3. Use Berkshelf to upload the awesome_customers cookbook to the Chef server

Run `berks upload awesome_customers` to upload the `awesome_customers_rhel` cookbook to the Chef server.

```bash
# ~/learn-chef/cookbooks/awesome_customers
$ berks upload awesome_customers
Uploaded awesome_customers (0.3.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

[COMMENT] Remember to pass the `--no-ssl-verify` flag or set up a trusted SSL certificate if you're working with your own on-premises Chef server.

As before, the `awesome_customers_rhel` cookbook was uploaded because its version has changed.
