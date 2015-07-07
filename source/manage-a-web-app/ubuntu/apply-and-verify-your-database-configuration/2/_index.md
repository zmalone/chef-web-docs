## 2. Use Berkshelf to upload the cookbooks to the Chef server

Now run `berks upload` to upload everything to the Chef server.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks upload
Skipping apt (2.6.1) (frozen)
Skipping awesome_customers (0.1.0) (frozen)
Uploaded build-essential (2.2.3) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded chef-sugar (3.1.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded database (4.0.6) to: 'https://api.opscode.com:443/organizations/your-org-name'
Skipping firewall (1.5.0) (frozen)
Skipping httpd (0.2.14) (frozen)
Uploaded mariadb (0.3.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded mysql (6.0.23) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded mysql2_chef_gem (1.0.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded openssl (4.2.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded postgresql (3.4.16) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded rbac (1.0.3) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded smf (2.2.7) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded yum (3.6.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded yum-epel (0.6.2) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded yum-mysql-community (0.1.17) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

One advantage to pinning to specific cookbook versions is that Berkshelf can skip the upload process for cookbook versions that already exist on the Chef server. However, you'll notice that your `awesome_customers` was skipped as well!

```bash
# ~/chef-repo/cookbooks/awesome_customers
Skipping awesome_customers (0.1.0) (frozen)
```

That's because the Chef server already has version `0.1.0`, so Berkshelf didn't upload it again. This is actually a good thing because it helps ensure that each cookbook version has no variants.
