## 2. Use Berkshelf to upload the cookbooks to the Chef server

Now run `berks upload` to upload everything to the Chef server.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks upload
Skipping awesome_customers (0.2.0) (frozen)
Skipping chef-sugar (3.1.1) (frozen)
Skipping chef_handler (1.2.0) (frozen)
Uploaded iis (4.1.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
Skipping openssl (4.3.2) (frozen)
Skipping sql_server (2.4.0) (frozen)
Skipping windows (1.38.1) (frozen)
```

Berkshelf uploaded our new dependency &ndash; the `iis` cookbook &ndash; and skipped the others because the Chef server already has the required versions.

One advantage to pinning to specific cookbook versions is that Berkshelf can skip the upload process for cookbook versions that already exist on the Chef server. However, you'll notice that your `awesome_customers` was skipped as well!

```bash
# ~/chef-repo/cookbooks/awesome_customers
Skipping awesome_customers (0.2.0) (frozen)
```

That's because the Chef server already has version `0.2.0`, so Berkshelf didn't upload it again. This is actually a good thing because it helps ensure that each cookbook version has no variants.
