## 2. Create an encrypted data bag item for the database user's password

In this part we'll set up a user who can administer the database. Like we did in the previous lesson, let's create encrypted data bag items to hold that user's database password.

First create a file named <code class="file-path">db\_admin.json</code> in the <code class="file-path">data\_bags/passwords</code> directory and add these contents.

```ruby
# ~/chef-repo/data_bags/passwords/sql_server_root_password.json
{
  "id": "db_admin",
  "password": "database_password"
}
```

Now run this command to encrypt the data bag item and upload it to the Chef server.

```bash
# ~/chef-repo
$ knife data bag from file passwords db_admin.json --secret-file /tmp/encrypted_data_bag_secret
Updated data_bag_item[passwords::db_admin]
```

Verify that you can successfully decrypt the data bag item.

```bash
$ knife data bag show passwords db_admin --secret-file /tmp/encrypted_data_bag_secret
id:       db_admin
password: database_password
```

We used the same secret file to encrypt the database user's password as we did the MySQL root password, so our attributes file is already set up to decrypt the data.
