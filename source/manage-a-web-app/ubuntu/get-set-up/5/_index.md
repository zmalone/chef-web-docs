## 5. Create the web_application cookbook

Recall that a cookbook provides structure to your Chef code. A cookbook contains things such as recipes and templates. We'll create one cookbook to describe our web application's configuration.

Run the following `chef generate` command to create a cookbook named `web_application`.

```bash
# ~/chef-repo
$ chef generate cookbook cookbooks/web_application
Compiling Cookbooks...
Recipe: code_generator::cookbook
  * directory[/home/user/chef-repo/cookbooks/web_application] action create
    - create new directory /home/user/chef-repo/cookbooks/web_application
[...]
    - update content in file /home/user/chef-repo/cookbooks/web_application/recipes/default.rb from none to 5416ed
    (diff output suppressed by config)
```
