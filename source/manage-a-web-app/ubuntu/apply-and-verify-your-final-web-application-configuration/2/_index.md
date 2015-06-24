## 2. Use Berkshelf to update your dependencies

Now run `berks update` to update the dependency tree.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks update
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using database (4.0.6)
Using awesome_customers (0.3.0) from source at .
Using chef-sugar (3.1.1)
Using build-essential (2.2.3)
Using apt (2.6.1)
Using firewall (0.11.8)
Using httpd (0.2.14)
Using mariadb (0.3.0)
Using mysql (6.0.23)
Using mysql2_chef_gem (1.0.1)
Using openssl (4.2.0)
Using postgresql (3.4.16)
Using rbac (1.0.3)
Using smf (2.2.7)
Using yum (3.6.1)
Using yum-mysql-community (0.1.17)
Using yum-epel (0.6.2)
```

You'll see that the dependency list includes version `0.3.0` of your cookbook.

```bash
# ~/chef-repo/cookbooks/awesome_customers
Using awesome_customers (0.3.0) from source at .
```
