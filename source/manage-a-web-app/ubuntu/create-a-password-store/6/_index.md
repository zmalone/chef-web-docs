## 6. Put the customer database password in the data bag

Now let's follow the same process to create an encrypted data bag item to hold the password for our web app's customer database.

Create a file named <code class="file-path">db\_admin.json</code> in the <code class="file-path">data\_bags/passwords</code> directory and add these contents.

```ruby
# ~/chef-repo/data_bags/passwords/db_admin.json
{
  "id": "db_admin",
  "password": "database_password"
}
```

[COMMENT] Again, you can use your own password if you prefer.

Now run the following commands to encrypt the data bag item, upload it to the Chef server, and verify that you can successfully retrieve and decrypt the data back again.

### From a Linux or Mac OS workstation

```bash
# ~/chef-repo
$ knife data bag from file passwords db_admin.json --secret-file /tmp/encrypted_data_bag_secret
Updated data_bag_item[passwords::db_admin]
$ knife data bag show passwords db_admin --secret-file /tmp/encrypted_data_bag_secret
id:       db_admin
password: database_password
```

### From a Windows workstation

```ps
# ~\chef-repo
$ knife data bag from file passwords db_admin.json --secret-file C:\temp\encrypted_data_bag_secret
Updated data_bag_item[passwords::db_admin]
$ knife data bag show passwords db_admin --secret-file C:\temp\encrypted_data_bag_secret
id:       db_admin
password: database_password
```
