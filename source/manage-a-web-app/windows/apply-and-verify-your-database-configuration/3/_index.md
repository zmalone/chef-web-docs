## 3. Verify your node's configuration

Let's run a few commands to help verify that the node is in the expected state. This time, we'll verify that:

* the SQL Server service is running.
* the `learnchef` database exists.
* the `customers` database table exists and contains the sample data.

From a PowerShell session on your node, run these commands to set up PowerShell to manage SQL Server.

```ps
$ Set-ExecutionPolicy RemoteSigned
$ Import-Module SQLPS
```

### Verify that the SQL Server service is running

We expect the name of the running SQL Server service to match the name we gave the instance &ndash; `MSSQLSERVER`.

From your Windows Server node, run the following PowerShell command to get the service status.

```ps
$ Get-Service MSSQL*

Status   Name               DisplayName
------   ----               -----------
Running  MSSQLSERVER        SQL Server (MSSQLSERVER)
```

You'll see that the `MSSQLSERVER` service is running.

### Verify that the learnchef database exists

Run the `Invoke-Sqlcmd` cmdlet to list all databases on the system.

```ps
$ Invoke-Sqlcmd -Query "SELECT name FROM sys.databases"

name
----
master
tempdb
model
msdb
learnchef
```

`learnchef` is listed as a database name.

### Verify that the customers database table exists and contains the sample data

Run the `Invoke-Sqlcmd` cmdlet to query a few fields from all rows in the `customers` table.

```ps
$ Invoke-Sqlcmd -Database learnchef -Query "SELECT id,first_name FROM customers"

id                                                          first_name
--                                                          ----------
cd5f1fd3-aa84-4dd9-8c08-ba0e54afefdb                        Jane
98f65465-9bbd-4551-aafe-c5f212df31db                        Dave
```

"Jane" and "Dave" match the first names that we provided in your SQL script.

Everything checks out! You can now close your connection.
