## 1. Use Berkshelf to update your dependencies

Initially, you ran `berks install` to install the cookbooks on your workstation. This time run `berks update` to install the cookbooks that you do not yet have.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks update
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using awesome_customers (0.2.0) from source at .
Using chef-sugar (3.1.1)
Using chef_handler (1.2.0)
Installing iis (4.1.1)
Using openssl (4.3.2)
Using sql_server (2.4.0)
Using windows (1.38.1)
```

You'll see that Berkshelf downloaded the `iis` cookbook. The `iis` cookbook depends on the `windows` cookbook, but that dependency was resolved when Berkshelf downloaded the `sql_server` cookbook, which also depends on `windows`.
