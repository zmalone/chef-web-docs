## 2. Create the database recipe

Create a recipe named <code class="file-path">database.rb</code> to hold your database configuration code.

```bash
# ~/learn-chef
$ chef generate recipe cookbooks/awesome_customers database
Compiling Cookbooks...
Recipe: code_generator::recipe
  * directory[cookbooks/awesome_customers_rhel/spec/unit/recipes] action create (up to date)
  * cookbook_file[cookbooks/awesome_customers_rhel/spec/spec_helper.rb] action create_if_missing (up to date)
  * template[cookbooks/awesome_customers_rhel/spec/unit/recipes/database_spec.rb] action create_if_missing
    - create new file cookbooks/awesome_customers_rhel/spec/unit/recipes/database_spec.rb
    - update content in file cookbooks/awesome_customers_rhel/spec/unit/recipes/database_spec.rb from none to 6027f9
    (diff output suppressed by config)
  * template[cookbooks/awesome_customers_rhel/recipes/database.rb] action create
    - create new file cookbooks/awesome_customers_rhel/recipes/database.rb
    - update content in file cookbooks/awesome_customers_rhel/recipes/database.rb from none to 97f98b
    (diff output suppressed by config)
```
