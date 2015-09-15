## 1. Create the audit cookbook

Start by creating the `audit` cookbook in your Chef repo.

```bash
# ~/chef-repo
$ chef generate cookbook cookbooks/audit
Compiling Cookbooks...
Recipe: code_generator::cookbook
  * directory[/home/user/chef-repo/cookbooks/audit] action create
    - create new directory /home/user/chef-repo/cookbooks/audit
[...]
  * cookbook_file[/home/user/chef-repo/cookbooks/audit/.gitignore] action create
    - create new file /home/user/chef-repo/cookbooks/audit/.gitignore
    - update content in file /home/user/chef-repo/cookbooks/audit/.gitignore from none to dd37b2
    (diff output suppressed by config)
```
