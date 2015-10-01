## 1. Create the create-database.sql SQL script file

Let's start by creating a script file named <code class="file-path">create-database.sql</code>.

Run the following command to create an empty file in our cookbook.

```bash
# ~/chef-repo
$ chef generate file cookbooks/awesome_customers create-database.sql
Compiling Cookbooks...
Recipe: code_generator::cookbook_file
  * directory[cookbooks/awesome_customers/files/default] action create
    - create new directory cookbooks/awesome_customers/files/default
  * template[cookbooks/awesome_customers/files/default/create-database.sql] action create
    - create new file cookbooks/awesome_customers/files/default/create-database.sql
    - update content in file cookbooks/awesome_customers/files/default/create-database.sql from none to e3b0c4
    (diff output suppressed by config)
```

This command added the <code class="file-path">create-database.sql</code> file to the <code class="file-path">~/chef-repo/cookbooks/awesome_customers/files/default</code> directory.
