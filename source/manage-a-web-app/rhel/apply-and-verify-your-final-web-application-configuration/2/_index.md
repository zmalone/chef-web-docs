## 2. Use Berkshelf to update your dependencies

Now run `berks update` to update the dependency tree.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks update
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using apt (2.7.0)
Using apache2 (3.0.1)
Using chef-sugar (3.0.1)
Using build-essential (2.2.1)
Using database (4.0.3)
Using iptables (1.0.0)
Using logrotate (1.9.1)
Using mariadb (0.3.0)
Using mysql (6.0.18)
Using mysql2_chef_gem (1.0.1)
Using openssl (4.0.0)
Using postgresql (3.4.18)
Using rbac (1.0.2)
Using selinux (0.9.0)
Using smf (2.2.6)
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
