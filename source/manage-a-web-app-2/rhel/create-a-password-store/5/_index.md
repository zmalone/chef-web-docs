## 5. Verify the contents of your data bag

The `knife data bag` command performed the encryption and uploaded the data to your Chef server. Let's confirm that the data is encrypted and that we can decrypt it using our secret key file.

Run this command to show the contents of the `sql_server_root_password` item in the `passwords` data bag.

```bash
# ~/learn-chef
$ knife data bag show passwords sql_server_root_password
id:       sql_server_root_password
password:
  cipher:         aes-256-cbc
  encrypted_data: d6Lbq+83+cjfheU4sHF5c33EmtGMTmxO1yuPryHuOqI=

  iv:             IeEuOPyQR/iXxn7DTPoUKQ==

  version:        1
```

The data comes back encrypted because you did not specify a secret key to decrypt the file. This is good because it confirms that the data is safely encrypted on the Chef server.

Run the same command again, but this time specify the `--secret-file` argument like you did when you encrypted the data bag item.

### From a Linux or Mac OS workstation

```bash
# ~/learn-chef
$ knife data bag show passwords sql_server_root_password --secret-file /tmp/encrypted_data_bag_secret
id:       sql_server_root_password
password: learnchef_mysql
```

### From a Windows workstation

```ps
# ~\chef-repo
$ knife data bag show passwords sql_server_root_password --secret-file C:\temp\encrypted_data_bag_secret
id:       sql_server_root_password
password: learnchef_mysql
```

The output confirms that your secret key file can successfully decrypt your data bag item. In the next lesson, you'll learn how to decrypt the data bag item from your Chef recipe.
