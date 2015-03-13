## 2. Use Berkshelf to update your dependencies

Now run `berks update` to update the dependency tree.

```bash
# ~/chef-repo/cookbooks/web_application
$ berks update
Resolving cookbook dependencies...
Fetching 'web_application' from source at .
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
Using resource-control (0.1.1)
Using smf (2.2.5)
Using web_application (0.3.0) from source at .
Using yum (3.5.3)
Using yum-epel (0.6.0)
Using yum-mysql-community (0.1.14)
```

You'll see that the dependency list includes version `0.3.0` of your cookbook.

```bash
# ~/chef-repo/cookbooks/web_application
Using web_application (0.3.0) from source at .
```
