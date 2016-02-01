## 1. Create the user recipe

First, create a recipe named `user`.

```bash
# ~/learn-chef
$ chef generate recipe cookbooks/awesome_customers user
Compiling Cookbooks...
Recipe: code_generator::recipe
[...]
    - create new file cookbooks/awesome_customers_rhel/recipes/user.rb
    - update content in file cookbooks/awesome_customers_rhel/recipes/user.rb from none to 8602b0
    (diff output suppressed by config)
```
