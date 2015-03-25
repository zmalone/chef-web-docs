## 1. Create the user recipe

First, create a recipe to define the `web_admin` user and group.

```bash
# ~/chef-repo
$ chef generate recipe cookbooks/web_application user
Compiling Cookbooks...
Recipe: code_generator::recipe
[...]
    - create new file cookbooks/web_application/recipes/user.rb
    - update content in file cookbooks/web_application/recipes/user.rb from none to 8602b0
    (diff output suppressed by config)
```
