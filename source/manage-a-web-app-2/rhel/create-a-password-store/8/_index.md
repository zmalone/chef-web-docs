## 8. Prepare your data bag items for source control

The `knife data bag` command performed the encryption and uploaded the data to your Chef server. This step did not affect the file on your workstation.

For example, notice that the `sql_server_root_password` data bag item on your local system still contains unencrypted data.

```bash
# ~/learn-chef
$ cat ~/learn-chef/data_bags/passwords/sql_server_root_password.json
{
  "id": "sql_server_root_password",
  "password": "learnchef_mysql"
}
```

You never want to store this data in source control or any other non-secure location. Although we won't work with source control in this tutorial, let's encrypt your data bag items locally to see how to prepare sensitive data for use with source control.

Run the same `knife data bag from file` command that you ran earlier, but this time provide the `--local-mode` argument to apply the encryption to your local system, and not the Chef server.

First, encrypt your MySQL password locally.

### From a Linux or Mac OS workstation

```bash
# ~/learn-chef
$ knife data bag from file passwords sql_server_root_password.json --secret-file /tmp/encrypted_data_bag_secret --local-mode
Updated data_bag_item[passwords::sql_server_root_password]
```

### From a Windows workstation

```ps
# ~\chef-repo
$ knife data bag from file passwords sql_server_root_password.json --secret-file C:\temp\encrypted_data_bag_secret --local-mode
Updated data_bag_item[passwords::sql_server_root_password]
```

Now encrypt your database password.

### From a Linux or Mac OS workstation

```bash
# ~/learn-chef
$ knife data bag from file passwords db_admin_password.json --secret-file /tmp/encrypted_data_bag_secret --local-mode
Updated data_bag_item[passwords::db_admin_password]
```

### From a Windows workstation

```ps
# ~\chef-repo
$ knife data bag from file passwords db_admin_password.json --secret-file C:\temp\encrypted_data_bag_secret --local-mode
Updated data_bag_item[passwords::db_admin_password]
```

Your data bag items are now encrypted locally, and are safe to commit to source control.

```bash
# ~/learn-chef
$ cat ~/learn-chef/data_bags/passwords/sql_server_root_password.json
{
  "id": "sql_server_root_password",
  "password": {
    "encrypted_data": "nKTHAg+Y3xE56PGUrxVMgdbi6VcLSCLqKIB1tcPlqyMmFU/Fcb5B2+Rjv8w0\nkiKt\n",
    "iv": "y/GG/9AaRHAMd5BnyE1u2w==\n",
    "version": 1,
    "cipher": "aes-256-cbc"
  }
}
```

[WARN] Remember, _never_ commit passwords or other sensitive data to source control in plain text because it will forever exist in that file's version history.

[WARN] Also never store your secret key in source control. We created the secret key file in a temporary directory to help prevent this from happening by accident. If you use Git, you can also add an entry to your <code class="file-path">gitignore</code> file to explicitly ignore your secret key file.

[TIP] It's still up to you to implement an appropriate distribution mechanism for your secret keys. [chef-vault](https://github.com/Nordstrom/chef-vault) is commonly used to solve the key distribution problem. `chef-vault` uses the existing RSA key pair that your node uses to communicate with the Chef server to create an asymmetric key used for decryption. This provides a more automatic key distribution mechanism and enables you to control which nodes have access to sensitive data.
