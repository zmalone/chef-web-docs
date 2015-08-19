## 2. Use Berkshelf to upload the cookbooks to the Chef server

Now run `berks upload` to upload everything to the Chef server.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks upload
Skipping apache2 (3.0.1) (frozen)
Skipping apt (2.6.1) (frozen)
Uploaded build-essential (2.1.3) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded chef-sugar (2.5.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded database (4.0.3) to: 'https://api.opscode.com:443/organizations/your-org-name'
Skipping firewall (0.11.8) (frozen)
Skipping iptables (0.14.1) (frozen)
Skipping logrotate (1.9.0) (frozen)
Uploaded mariadb (0.2.12) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded mysql (6.0.17) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded mysql2_chef_gem (1.0.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded openssl (4.0.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded postgresql (3.4.18) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded rbac (1.0.2) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded smf (2.2.5) to: 'https://api.opscode.com:443/organizations/your-org-name'
Skipping awesome_customers (0.1.0) (frozen)
Uploaded yum (3.5.3) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded yum-epel (0.6.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded yum-mysql-community (0.1.14) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

One advantage to pinning to specific cookbook versions is that Berkshelf can skip the upload process for cookbook versions that already exist on the Chef server. However, you'll notice that your `awesome_customers` was skipped as well!

```bash
# ~/chef-repo/cookbooks/awesome_customers
Skipping awesome_customers (0.1.0) (frozen)
```

That's because the Chef server already has version `0.1.0`, so Berkshelf didn't upload it again. This is actually a good thing because it helps ensure that each cookbook version has no variants.


-- -- --


## 2. Use Berkshelf to update your dependencies

Now run `berks update` to update the dependency tree.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks update
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using apache2 (3.0.1)
Using apt (2.6.1)
Using chef-sugar (2.5.0)
Using build-essential (2.1.3)
Using database (4.0.3)
Using firewall (0.11.8)
Using iptables (0.14.1)
Using logrotate (1.9.0)
Using mariadb (0.2.12)
Using mysql (6.0.17)
Using mysql2_chef_gem (1.0.1)
Using openssl (4.0.0)
Using postgresql (3.4.18)
Using rbac (1.0.2)
Using smf (2.2.5)
Using awesome_customers (0.3.0) from source at .
Using yum (3.5.3)
Using yum-epel (0.6.0)
Using yum-mysql-community (0.1.14)
```

You'll see that the dependency list includes version `0.3.0` of your cookbook.

```bash
# ~/chef-repo/cookbooks/awesome_customers
Using awesome_customers (0.3.0) from source at .
```
