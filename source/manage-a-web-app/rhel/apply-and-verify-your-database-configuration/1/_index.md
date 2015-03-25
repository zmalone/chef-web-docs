## 1. Use Berkshelf to update your dependencies

Initially, you ran `berks install` to install the cookbooks on your workstation. This time run `berks update` to install the cookbooks that you do not yet have.

```bash
# ~/chef-repo/cookbooks/web_application
$ berks update
Resolving cookbook dependencies...
Fetching 'web_application' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using apache2 (3.0.1)
Installing build-essential (2.2.1)
Installing apt (2.7.0)
Installing chef-sugar (3.0.1)
Installing database (4.0.3)
Using iptables (0.14.1)
Using logrotate (1.9.1)
Installing mariadb (0.3.0)
Installing mysql (6.0.18)
Installing mysql2_chef_gem (1.0.1)
Installing openssl (4.0.0)
Installing postgresql (3.4.18)
Installing rbac (1.0.2)
Using selinux (0.9.0)
Installing smf (2.2.6)
Using web_application (0.1.0) from source at .
Installing yum (3.5.3)
Installing yum-epel (0.6.0)
Installing yum-mysql-community (0.1.14)
```

You'll see that Berkshelf downloaded `mysql2_chef_gem` `mysql`, `database`, and their dependencies.
