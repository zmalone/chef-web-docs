## 1. Create the basic_audit cookbook

```bash
# ~/chef-repo
$ chef generate cookbook cookbooks/basic_audit
Compiling Cookbooks...
Recipe: code_generator::cookbook
  * directory[/home/user/chef-repo/cookbooks/basic_audit] action create
    - create new directory /home/user/chef-repo/cookbooks/basic_audit
[...]
  * cookbook_file[/home/user/chef-repo/cookbooks/basic_audit/.gitignore] action create
    - create new file /home/user/chef-repo/cookbooks/basic_audit/.gitignore
    - update content in file /home/user/chef-repo/cookbooks/basic_audit/.gitignore from none to dd37b2
    (diff output suppressed by config)
```
