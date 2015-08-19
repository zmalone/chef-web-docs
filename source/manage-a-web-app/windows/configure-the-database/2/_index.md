## 2. Add commands to the SQL script file

Now let's add commands to the script file that perform the following tasks:

1. Create a database named `learnchef`.
1. Create a table named `customers` in the `learnchef` database.
1. Add sample data to the `customers` table.

Add the following to your <code class="file-path">create-database.sql</code> file.

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
