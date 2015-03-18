## 6. Verify your node's configuration

Now log in to your node the same way you did before.

Next, we'll run a few commands to help verify that the node is in the expected state. This time, we'll verify that:

* the MySQL service is running.
* the `products` database exists.
* `db_admin` is enabled as a local database user.
* `db_admin` has rights only to the `products` database.
* the `customers` database table exists and contains the sample data.

### Verify that the MySQL service is running

Run the following `netstat` command.

```bash
$ sudo netstat -tap | grep mysql
tcp        0      0 *:mysql                 *:*                     LISTEN      27856/mysqld
```

You'll see that the `mysqld` service is in the `LISTEN` state.

### Verify that the products database exists

Run `mysqlshow` to display database information.

```bash
# ~
$ mysqlshow -h 127.0.0.1 -uroot -plearnchef_mysql
+--------------------+
|     Databases      |
+--------------------+
| information_schema |
| products           |
| mysql              |
| performance_schema |
+--------------------+
```

`products` is listed as a database name.

### Verify that db_admin is enabled as a local database user

Run the following `mysql` command.

```bash
$ mysql -h 127.0.0.1 -uroot -plearnchef_mysql -e "select user,host from mysql.user;"
+----------+-----------+
| user     | host      |
+----------+-----------+
| root     | %         |
| db_admin | 127.0.0.1 |
+----------+-----------+
```

`db_admin@127.0.0.1` exists, so our cookbook did what we expected.

### Verify that db_admin has rights only to the products database

Run the following `mysql` command.

```bash
$ mysql -h 127.0.0.1 -uroot -plearnchef_mysql -e "show grants for 'db_admin'@'127.0.0.1';"
+-----------------------------------------------------------------------------------------------------------------+
| Grants for db_admin@127.0.0.1                                                                                   |
+-----------------------------------------------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO 'db_admin'@'127.0.0.1' IDENTIFIED BY PASSWORD '*B28723EAECAD3130F237F666A671416DAED862F0' |
| GRANT ALL PRIVILEGES ON `products`.* TO 'db_admin'@'127.0.0.1'                                                  |
+-----------------------------------------------------------------------------------------------------------------+
```

The result shows that `db_admin` has rights only to the `products` database, just as we expect.

### Verify the customers database table exists and contains the sample data

Run the following `mysql` command.

```bash
$ mysql -h 127.0.0.1 -uroot -plearnchef_mysql -Dproducts -e "select id,first_name from customers;"
+----------------------------------+------------+
| id                               | first_name |
+----------------------------------+------------+
| 9fad8e3a-c9c3-11e4-ba15-02793a4a | Jane       |
| 9fadaa2f-c9c3-11e4-ba15-02793a4a | Dave       |
+----------------------------------+------------+
```

"Jane" and "Dave" match the first names that we provided in your SQL script.

Everything checks out! You can now close your SSH session.
