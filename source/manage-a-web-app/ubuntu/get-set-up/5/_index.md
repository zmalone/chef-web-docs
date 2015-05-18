## 5. Create the awesome_customers cookbook

Recall that a cookbook provides structure to your Chef code. A cookbook contains things such as recipes and templates. We'll create one cookbook to describe our web application's configuration.

Run the following `chef generate` command to create a cookbook named `awesome_customers`.

```bash
# ~/chef-repo
$ chef generate cookbook cookbooks/awesome_customers
Compiling Cookbooks...
Recipe: code_generator::cookbook
  * directory[/home/user/chef-repo/cookbooks/awesome_customers] action create
    - create new directory /home/user/chef-repo/cookbooks/awesome_customers
[...]
    - update content in file /home/user/chef-repo/cookbooks/awesome_customers/recipes/default.rb from none to 5416ed
    (diff output suppressed by config)
```
