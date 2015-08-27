## 3. Set data attributes to customize the installation

In [Learn to manage a Windows Server node](/manage-a-node/windows/), you learned about some of the built-in node attributes that Chef provides, such as the node's IP address. You can also define your own custom attributes that are specific to your policy.

The `sql_server` cookbook defines [a number of node attributes](https://github.com/opscode-cookbooks/sql_server/blob/master/attributes/server.rb) that control how SQL Server is installed, such as the installation directory and which features to install. These values are written to the configuration file that the installer uses to customize the installation.

When you call one cookbook from another, you can specify, or _override_, that cookbook's node attributes with your values. Although in most cases we can use the default values, we also want to:

* indicate that we accept the terms of the end-user license agreement (EULA.) Accepting the EULA is mandatory to install SQL Server.
* install SQL Server 2012 Express and not SQL Server 2008 R2 Express, which is the default.
* name the SQL Server instance 'MSSQLSERVER'. Using this name simplifies the later process of setting up a database instance.
* specify not to install updates during the installation process. For our project, we don't need product updates.

### Create the custom attributes file

Let's create an attributes file that will define all of the custom attributes for your web application cookbook.

Run the following to create an attributes file named <code class="file-path">default.rb</code>.

```bash
# ~/chef-repo
$ chef generate attribute cookbooks/awesome_customers default
Compiling Cookbooks...
Recipe: code_generator::attribute
  * directory[cookbooks/awesome_customers/attributes] action create
    - create new directory cookbooks/awesome_customers/attributes
  * template[cookbooks/awesome_customers/attributes/default.rb] action create
    - create new file cookbooks/awesome_customers/attributes/default.rb
    - update content in file cookbooks/awesome_customers/attributes/default.rb from none to e3b0c4
    (diff output suppressed by config)
```

This command added the <code class="file-path">default.rb</code> attribute file to the <code class="file-path">~/chef-repo/cookbooks/awesome_customers/attributes</code> directory.

### Override the sql_server cookbook's default attributes

Earlier, we listed the functionality we need to override. Here are the `sql_server` cookbook's attributes for these items, their default values, and the values we need to use.

| Attribute                              | Default value       | New value       |
|---------------------------------------:|---------------------|-----------------|
| `default['sql_server']['accept_eula']`    | `false`             | `true`          |
| `default['sql_server']['version']`        | `'2008'`            | `'2012'`        |
| `default['sql_server']['instance_name']`  | `'SQLEXPRESS'`      | `'MSSQLSERVER'` |
| `default['sql_server']['update_enabled']` | `true`              | `false`         |

To override these attributes, you create new ones that use the same names and define the values you want to use.

Add the following to <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/attributes/default.rb
default['sql_server']['accept_eula'] = true
default['sql_server']['version'] = '2012'
default['sql_server']['instance_name']  = 'MSSQLSERVER'
default['sql_server']['update_enabled'] = false
```
