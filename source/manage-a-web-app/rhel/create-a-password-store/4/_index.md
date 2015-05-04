## 4. Put the MySQL root password in the data bag

To securely store the MySQL root password in the data bag, we need to create an encrypted data bag item.

Data bag items are stored as files. Create a file named <code class="file-path">sql\_server\_root\_password.json</code> in the <code class="file-path">data\_bags/passwords</code> directory and add these contents.

```ruby
# ~/chef-repo/data_bags/passwords/sql_server_root_password.json
{
  "id": "sql_server_root_password",
  "password": "learnchef_mysql"
}
```

[COMMENT] If you prefer, you can use a different password. Just replace `learnchef_mysql` with your password.

Every data bag item has an `id` field that identifies it. `"password": "learnchef_mysql"` is the data in the form of a key-value pair. A data bag item can have multiple key-value pairs.

Now run this command to encrypt the data bag item and upload it to the Chef server. The `--secret-file` argument specifies the location of your secret key file that's used to perform the encryption.

### From a Linux or Mac OS workstation

```bash
# ~/chef-repo
$ knife data bag from file passwords sql_server_root_password.json --secret-file /tmp/encrypted_data_bag_secret
Updated data_bag_item[passwords::sql_server_root_password]
```

### From a Windows workstation

```ps
# ~\chef-repo
$ knife data bag from file passwords sql_server_root_password.json --secret-file C:\temp\encrypted_data_bag_secret
Updated data_bag_item[passwords::sql_server_root_password]
```
