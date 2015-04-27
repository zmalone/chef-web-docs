## 2. Create the database recipe

Create a recipe named <code class="file-path">database.rb</code> to hold your database configuration code.

```bash
# ~/chef-repo
$ chef generate recipe cookbooks/web_application database
Compiling Cookbooks...
Recipe: code_generator::recipe
  * directory[cookbooks/web_application/spec/unit/recipes] action create (up to date)
  * cookbook_file[cookbooks/web_application/spec/spec_helper.rb] action create_if_missing (up to date)
  * template[cookbooks/web_application/spec/unit/recipes/database_spec.rb] action create_if_missing
    - create new file cookbooks/web_application/spec/unit/recipes/database_spec.rb
    - update content in file cookbooks/web_application/spec/unit/recipes/database_spec.rb from none to 6027f9
    (diff output suppressed by config)
  * template[cookbooks/web_application/recipes/database.rb] action create
    - create new file cookbooks/web_application/recipes/database.rb
    - update content in file cookbooks/web_application/recipes/database.rb from none to 97f98b
    (diff output suppressed by config)
```
