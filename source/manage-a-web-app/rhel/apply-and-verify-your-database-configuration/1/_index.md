## 1. Use Berkshelf to update your dependencies

Initially, you ran `berks install` to install the cookbooks on your workstation. This time run `berks update` to install the cookbooks that you do not yet have.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks update
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Installing database (4.0.6)
Using awesome_customers (0.1.0) from source at .
Installing chef-sugar (3.1.1)
Installing apt (2.7.0)
Installing build-essential (2.2.3)
Using iptables (1.0.0)
Installing mariadb (0.3.0)
Using httpd (0.2.18)
Installing mysql (6.0.24)
Installing mysql2_chef_gem (1.0.2)
Installing openssl (4.2.0)
Installing postgresql (3.4.16)
Installing rbac (1.0.3)
Using selinux (0.9.0)
Installing smf (2.2.7)
Installing yum (3.6.1)
Installing yum-epel (0.6.2)
Installing yum-mysql-community (0.1.17)
```

You'll see that Berkshelf downloaded `mysql2_chef_gem` `mysql`, `database`, and their dependencies.
