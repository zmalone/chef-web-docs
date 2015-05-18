## 3. Use Berkshelf to upload the awesome_customers cookbook to the Chef server

Run `berks upload awesome_customers` to upload the `awesome_customers` cookbook to the Chef server.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks upload awesome_customers
Uploaded awesome_customers (0.3.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

As before, the `awesome_customers` cookbook was uploaded because its version has changed.
