## 4. Grant the Customers application access to the customer data

Applications that run in the `Products` application pool run under `IIS APPPOOL\Products`. We need to grant this user with query access to the `customers` table in the `learnchef` database.

We'll follow the same process that we used to create the `learnchef` database, the `customers` table, and add some sample data.

1. Create a file that's part of the cookbook that contains SQL commands to grant access.
1. In the `database` recipe, copy that file to the Chef cache.
1. In the `database` recipe, use the `powershell_script` resource to execute the SQL script.

### Create the grant-access.sql file

Let's start by creating a script file named <code class="file-path">grant-access.sql</code>.

Run the following command to create an empty file in our cookbook.

```bash
# ~/chef-repo
$ chef generate file cookbooks/awesome_customers grant-access.sql
Compiling Cookbooks...
Recipe: code_generator::cookbook_file
  * directory[cookbooks/awesome_customers/files/default] action create
    - create new directory cookbooks/awesome_customers/files/default
  * template[cookbooks/awesome_customers/files/default/grant-access.sql] action create
    - create new file cookbooks/awesome_customers/files/default/grant-access.sql
    - update content in file cookbooks/awesome_customers/files/default/grant-access.sql from none to e3b0c4
    (diff output suppressed by config)
```

This command added the <code class="file-path">grant-access.sql</code> file to the <code class="file-path">~/chef-repo/cookbooks/awesome_customers/files/default</code> directory.

### Add SQL commands to grant-access.sql

Add the following code to <code class="file-path">grant-access.sql</code> to grant query access to the `IIS APPPOOL\Products` user.

```sql
-- ~/chef-repo/cookbooks/awesome_customers/files/default/grant-access.sql

USE master;
GO
USE learnchef;
GO
-- Allow the Windows user 'IIS APPPOOL\Products' to login.
CREATE LOGIN [IIS APPPOOL\Products] FROM WINDOWS
GO
-- Create the corresponding user.
CREATE USER [IIS APPPOOL\Products]
GO
-- Grant query access to the user.
GRANT SELECT ON customers TO [IIS APPPOOL\Products]
GO
```

## Execute the SQL script from your database recipe


Append the following code to your `database` recipe, <code class="file-path">database.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Run a SQL file that grants database access to IIS APPPOOL\Products.
# Start by creating a path to the SQL file in the Chef cache.
grant_access_script_path = win_friendly_path(File.join(Chef::Config[:file_cache_path], 'grant-access.sql'))

# Copy the SQL file from the cookbook to the Chef cache.
cookbook_file grant_access_script_path do
  source 'grant-access.sql'
end

#
powershell_script 'Grant SQL access to IIS APPPOOL\Products' do
  code <<-EOH
    Import-Module "#{sqlps_module_path}"
    Invoke-Sqlcmd -InputFile #{grant_access_script_path}
  EOH
  guard_interpreter :powershell_script
  not_if <<-EOH
    Import-Module "#{sqlps_module_path}"
    $sp = Invoke-Sqlcmd -Database learnchef -Query "EXEC sp_helprotect @username = 'IIS APPPOOL\\Products', @name = 'customers'"
    ($sp.ProtectType.Trim() -eq 'Grant') -and ($sp.Action.Trim() -eq 'Select')
  EOH
end
```
