## 1. Use Berkshelf to update your dependencies

Initially, you ran `berks install` to install the cookbooks on your workstation. This time run `berks update` to install the cookbooks that you do not yet have.

```bash
# ~/chef-repo/cookbooks/web_application
$ berks update
Resolving cookbook dependencies...
Fetching 'web_application' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using apt (2.6.1)
Using apache2 (3.0.1)
Installing chef-sugar (2.5.0)
Installing build-essential (2.1.3)
Installing database (4.0.3)
Using firewall (0.11.8)
Using iptables (0.14.1)
Using logrotate (1.9.0)
Installing mariadb (0.2.12)
Installing mysql (6.0.17)
Installing mysql2_chef_gem (1.0.1)
Installing openssl (4.0.0)
Installing postgresql (3.4.18)
Installing rbac (1.0.2)
Installing smf (2.2.5)
Using web_application (0.1.0) from source at .
Installing yum (3.5.3)
Installing yum-epel (0.6.0)
Installing yum-mysql-community (0.1.14)
```

You'll see that Berkshelf downloaded `mysql2_chef_gem` `mysql`, `database`, and their dependencies.


**TODO: THIS IS REALLY HORRIBLE, BUT I NEED TO 'BERKS UPDATE' TWO TIMES IN ORDER FOR ALL DEPS TO UPDATE. WORKING WITH THE ENGINEERING TEAM ON THIS. WON'T SHIP IT LIKE THIS**

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
Installing resource-control (0.1.1)
Using smf (2.2.5)
Using web_application (0.1.0) from source at .
Using yum (3.5.3)
Using yum-epel (0.6.0)
Using yum-mysql-community (0.1.14)
```
