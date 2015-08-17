## 4. Use Berkshelf to upload the awesome_customers cookbook

Because we know that only `awesome_customers` needs to be uploaded to the Chef server, we can add it as an argument to the `berks upload` command. Run it like this.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks upload awesome_customers
Uploaded awesome_customers (0.2.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

The `awesome_customers` cookbook was uploaded because its version has changed.
