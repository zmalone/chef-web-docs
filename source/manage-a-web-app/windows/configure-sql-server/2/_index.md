## 2. Create the configuration file

When you install SQL Server in unattended mode, you provide a [configuration file](https://technet.microsoft.com/en-us/library/dd239405\(v=sql.120\).aspx) that lists your preferred setup options.

A typical configuration file might look like this.

```ini
;Configuration.ini

;SQL Server 2014 Configuration File
[OPTIONS]
ACTION="Install"
ENU="True"
QUIET="True"
QUIETSIMPLE="False"
UPDATEENABLED="True"
ERRORREPORTING="False"
FEATURES=SQLENGINE,FULLTEXT,DQ,RS,SSMS,ADV_SSMS
UPDATESOURCE="MU"
HELP="False"
INDICATEPROGRESS="True"
X86="False"
INSTALLSHAREDDIR="C:\Program Files\Microsoft SQL Server"
INSTALLSHAREDWOWDIR="C:\Program Files (x86)\Microsoft SQL Server"
INSTANCENAME="MSSQLSERVER"
SQMREPORTING="False"
INSTANCEID="MSSQLSERVER"
SQLSYSADMINACCOUNTS="Administrators"
RSINSTALLMODE="DefaultNativeMode"
INSTANCEDIR="C:\Program Files\Microsoft SQL Server"
AGTSVCACCOUNT="NT AUTHORITY\NETWORK SERVICE"
AGTSVCPASSWORD="Password"
AGTSVCSTARTUPTYPE="Automatic"
COMMFABRICPORT="0"
COMMFABRICNETWORKLEVEL="0"
COMMFABRICENCRYPTION="0"
MATRIXCMBRICKCOMMPORT="0"
SQLSVCSTARTUPTYPE="Automatic"
FILESTREAMLEVEL="0"
ENABLERANU="False"
SQLCOLLATION="SQL_Latin1_General_CP1_CI_AS"
SQLSVCACCOUNT="NT AUTHORITY\SYSTEM"
ADDCURRENTUSERASSQLADMIN="False"
TCPENABLED="1"
NPENABLED="0"
BROWSERSVCSTARTUPTYPE="Automatic"
RSSVCACCOUNT="NT Service\ReportServer"
RSSVCPASSWORD="Password"
RSSVCSTARTUPTYPE="Automatic"
FTSVCACCOUNT="NT Service\MSSQLFDLauncher"
```

To provide this configuration file to the SQL Server installer, we could add a file like this to our cookbook and use the `cookbook_file` resource to copy the file to a temporary directory. One problem with this approach is that it makes the cookbook less reusable &ndash; if you want to use this cookbook from another cookbook, you won't be able to change any of the settings.

To make the cookbook more reusable, let's create a template that will be filled in with custom _node attributes_ that we define. We'll provide a default set of attribute values; a second cookbook that uses this one can override any attributes as needed.

### Create the configuration template file

```bash
# ~/chef-repo
$ chef generate template cookbooks/awesome_customers ConfigurationFile.ini
```

### Create the attributes file

```bash
# ~/chef-repo
$ chef generate attribute cookbooks/awesome_customers
```



Create a recipe named <code class="file-path">database.rb</code> to hold your database configuration code.

```bash
# ~/chef-repo
$ chef generate recipe cookbooks/awesome_customers database
Compiling Cookbooks...
Recipe: code_generator::recipe
  * directory[cookbooks/awesome_customers/spec/unit/recipes] action create (up to date)
  * cookbook_file[cookbooks/awesome_customers/spec/spec_helper.rb] action create_if_missing (up to date)
  * template[cookbooks/awesome_customers/spec/unit/recipes/database_spec.rb] action create_if_missing
    - create new file cookbooks/awesome_customers/spec/unit/recipes/database_spec.rb
    - update content in file cookbooks/awesome_customers/spec/unit/recipes/database_spec.rb from none to 6027f9
    (diff output suppressed by config)
  * template[cookbooks/awesome_customers/recipes/database.rb] action create
    - create new file cookbooks/awesome_customers/recipes/database.rb
    - update content in file cookbooks/awesome_customers/recipes/database.rb from none to 97f98b
    (diff output suppressed by config)
```
