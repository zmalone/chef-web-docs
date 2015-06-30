## 2. Use Berkshelf to upload the cookbooks to the Chef server

Now run `berks upload` to upload everything to the Chef server.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks upload
Uploaded apt (2.7.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Skipping awesome_customers (0.1.0) (frozen)
Uploaded build-essential (2.2.3) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded chef-sugar (3.1.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded database (4.0.6) to: 'https://api.opscode.com:443/organizations/your-org-name'
Skipping httpd (0.2.18) (frozen)
Skipping iptables (1.0.0) (frozen)
Uploaded mariadb (0.3.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded mysql (6.0.24) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded mysql2_chef_gem (1.0.2) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded openssl (4.2.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded postgresql (3.4.16) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded rbac (1.0.3) to: 'https://api.opscode.com:443/organizations/your-org-name'
Skipping selinux (0.9.0) (frozen)
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
