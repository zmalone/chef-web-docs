## 3. Run the SQL script file

Now let's add code to our `database` recipe that copies <code class="file-path">create-database.sql</code> from the cookbook to a working directory and applies it.

Recall that so far <code class="file-path">database.rb</code> looks like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Install SQL Server.
include_recipe 'sql_server::server'
```

### Create a working path

The first step is to copy <code class="file-path">create-database.sql</code> to a working directory where it will run.

Start by creating a variable named `create_database_script_path` that holds the full path to <code class="file-path">create-database.sql</code>. We create a variable so that we can define the location one time, but reference that location multiple times.

We'll use what's called the _Chef cache_ as our working directory. The Chef cache is the location that holds cookbooks and temporary files. It's commonly used to store downloaded files and scripts, such as our SQL commands file, in a location that's isolated from the rest of the system.

Append this to <code class="file-path">database.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Run a SQL file that creates the database, a database table, and adds sample table rows.
# Start by creating a path to the SQL file in the Chef cache.
create_database_script_path = win_friendly_path(File.join(Chef::Config[:file_cache_path], 'create-database.sql'))
```

This code uses `Chef::Config[:file_cache_path]` to read the location of the Chef cache from the [chef-client configuration file](https://docs.chef.io/config_rb_client.html). Although the location of the Chef cache can vary, it's typically located at <code class="file-path">C:\chef\cache</code> on Windows.

The [File.join](http://ruby-doc.org/core-2.2.0/File.html#method-c-join) part combines the Chef cache directory with the SQL script filename to create a full path.

The `win_friendly_path` part ensures that the Windows path separator `\` (and not the Linux path separator `/`) is used in the full path. When writing Chef recipes for Windows, it's common to use this to ensure that the Windows path separator is used consistently. Ensuring that the Windows path separator is used can be important when:

* a Ruby method, Chef utility, or another cookbook returns a path and you want to ensure that it's formatted properly for Windows.
* you pass a path name to a Windows command-line utility or to a Windows programming interface such as PowerShell which requires the `\` path separator.

The [windows](https://supermarket.chef.io/cookbooks/windows) cookbook provides `win_friendly_path` as a helper, or utility, method. We can use it here because the `sql_server` cookbook depends on the `windows` cookbook and loads it for us.

### Copy the SQL script from the cookbook to the Chef cache

Append the following `cookbook_file` resource to your `database` recipe to copy the SQL script file from your cookbook to the path you just defined.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Copy the SQL file from the cookbook to the Chef cache.
cookbook_file create_database_script_path do
  source 'create-database.sql'
end
```

The `create_database_script_path` is the full path to the SQL script file, for example, <code class="file-path">C:\chef\cache\create-database.sql</code> and is the destination of the copy operation. The `source` attribute defines the source of the copy operation, <code class="file-path">files/default/create-database.sql</code> in your `awesome_customers` cookbook.

### Run the SQL script

Now that the file is copied to your Chef cache directory, you can run it. We'll use the `powershell_script` resource to run the PowerShell [Invoke-Sqlcmd](https://msdn.microsoft.com/en-us/library/cc281720\(v=sql.110\).aspx) cmdlet to execute the script.

When we run the `Invoke-Sqlcmd` cmdlet, we need to ensure that the `SQLPS` module is loaded. Let's create a variable that contains the full path to the module so we can reuse it.

Append this code to your `database` recipe.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Get the full path to the SQLPS module.
sqlps_module_path = ::File.join(ENV['programfiles(x86)'], 'Microsoft SQL Server\110\Tools\PowerShell\Modules\SQLPS')
```

We can use the system's environment variables to get the correct path to the <code class="file-path">Program Files (x86)</code> directory (typically <code class="file-path">C:\Program Files (x86)</code>).

The Ruby [ENV](http://ruby-doc.org/core-2.2.0/ENV.html) class reads environment variables. This code joins the full path to the <code class="file-path">Program Files (x86)</code> directory to the fixed  path to the `SQLPS` module.

Now append this code to run the SQL script.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Run the SQL file only if the 'learnchef' database has not yet been created.
powershell_script 'Initialize database' do
  code <<-EOH
    Import-Module "#{sqlps_module_path}"
    Invoke-Sqlcmd -InputFile #{create_database_script_path}
  EOH
  guard_interpreter :powershell_script
  only_if <<-EOH
    Import-Module "#{sqlps_module_path}"
    (Invoke-Sqlcmd -Query "SELECT COUNT(*) AS Count FROM sys.databases WHERE name = 'learnchef'").Count -eq 0
  EOH
end
```

This code uses the heredoc mechanism that you used when you set up IIS and ASP.NET so that you can express the PowerShell code more naturally. The `#{}` syntax is what's called _string interpolation_. String interpolation enables you to replace placeholders within a string with the values they represent. Although heredocs enable you to define multiple lines of pre-formatted text, you can still use string interpolation in a heredoc to substitute placeholders with other values. Here, we reference the `create_database_script_path` variable so that we can pass the full path to the SQL script file to the `Invoke-Sqlcmd` cmdlet.

The `only_if` part enables the SQL script to run only when needed. In this case, we run the script only when the `learnchef` database does not exist.

[START_MODAL sql-script Should the SQL script be more granular?]

Recall that the SQL script file looks like this:

```sql
-- ~/chef-repo/cookbooks/awesome_customers/files/default/create-database.sql

USE master;
GO
-- Create the learnchef database.
CREATE DATABASE learnchef;
GO
USE learnchef;
GO
-- Create the customers table.
CREATE TABLE customers(
  id uniqueidentifier NOT NULL DEFAULT newid(),
  PRIMARY KEY(id),
  first_name VARCHAR(64),
  last_name VARCHAR(64),
  email VARCHAR(64)
);
GO
-- Add sample data to the table.
INSERT INTO customers(id, first_name, last_name, email) VALUES(newid(), 'Jane', 'Smith', 'jane.smith@example.com');
INSERT INTO customers(id, first_name, last_name, email) VALUES(newid(), 'Dave', 'Richards', 'dave.richards@example.com');
GO
```

Our `only_if` guard tests only for when the `learnchef` database doesn't exist; it doesn't cover the case where the `customers` table or the sample data doesn't exist. This is fine for learning purposes. In practice, you would need to decide how granular your scripts and your tests need to be. For example, you might break this script into three separate scripts &ndash; one to create the database, one to create the table, and one to create the sample data &ndash; if there is a chance that one component might be changed or removed by some other process.

[END_MODAL]

Your entire `database` recipe looks like this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/database.rb
# Install SQL Server.
include_recipe 'sql_server::server'

# Run a SQL file that creates the database, a database table, and adds sample table rows.
# Start by creating a path to the SQL file in the Chef cache.
create_database_script_path = win_friendly_path(File.join(Chef::Config[:file_cache_path], 'create-database.sql'))

# Copy the SQL file from the cookbook to the Chef cache.
cookbook_file create_database_script_path do
  source 'create-database.sql'
end

# Get the full path to the SQLPS module.
sqlps_module_path = ::File.join(ENV['programfiles(x86)'], 'Microsoft SQL Server\110\Tools\PowerShell\Modules\SQLPS')

# Run the SQL file only if the 'learnchef' database has not yet been created.
powershell_script 'Initialize database' do
  code <<-EOH
    Import-Module "#{sqlps_module_path}"
    Invoke-Sqlcmd -InputFile #{create_database_script_path}
  EOH
  guard_interpreter :powershell_script
  only_if <<-EOH
    Import-Module "#{sqlps_module_path}"
    (Invoke-Sqlcmd -Query "SELECT COUNT(*) AS Count FROM sys.databases WHERE name = 'learnchef'").Count -eq 0
  EOH
end
```
