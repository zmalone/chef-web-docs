## 2. Use Berkshelf to install your dependencies

Now run `berks install` to update the dependency tree.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks install
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using httpd (0.2.18)
Using awesome_customers (0.3.0) from source at .
Using build-essential (2.2.3)
Using apt (2.7.0)
Using database (4.0.6)
Using iptables (1.0.0)
Using mariadb (0.3.0)
Using mysql (6.0.24)
Using mysql2_chef_gem (1.0.2)
Using openssl (4.2.0)
Using chef-sugar (3.1.1)
Using postgresql (3.4.16)
Using rbac (1.0.3)
Using selinux (0.9.0)
Using yum (3.6.1)
Using smf (2.2.7)
Using yum-epel (0.6.2)
Using yum-mysql-community (0.1.17)
```

You'll see that the dependency list includes version `0.3.0` of your cookbook.

```bash
# ~/chef-repo/cookbooks/awesome_customers
Using awesome_customers (0.3.0) from source at .
```
