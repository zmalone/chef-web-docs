## 2. Create the webserver recipe

Remember, our goals for this part are to:

* install IIS.
* set up IIS to run ASP.NET applications.

The first step is to create the recipe file, <code class="file-path">webserver.rb</code>. Run the following command to generate it.

```bash
# ~/chef-repo
$ chef generate recipe cookbooks/awesome_customers webserver
Compiling Cookbooks...
Recipe: code_generator::recipe
[...]
  * template[cookbooks/awesome_customers/recipes/webserver.rb] action create
    - create new file cookbooks/awesome_customers/recipes/webserver.rb
    - update content in file cookbooks/awesome_customers/recipes/webserver.rb from none to bc6813
    (diff output suppressed by config)
```
