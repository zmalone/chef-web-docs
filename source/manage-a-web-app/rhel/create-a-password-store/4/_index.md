## 4. Verify the contents of your data bag

The `knife data bag` command performed the encryption and uploaded the data to your Chef server. Let's confirm that the data is encrypted and that we can decrypt it using our secret key file.

Run this command to show the contents of the `test` item in the `passwords` data bag.

```bash
# ~/chef-repo
$ knife data bag show passwords test
id:       test
password:
  cipher:         aes-256-cbc
  encrypted_data: d6Lbq+83+cjfheU4sHF5c33EmtGMTmxO1yuPryHuOqI=

  iv:             IeEuOPyQR/iXxn7DTPoUKQ==

  version:        1
```

The data comes back encrypted because you did not specify a secret key to decrypt the file. This is good because it confirms that the data is safely encrypted on the Chef server.

Run the same command again, but this time specify the `--secret-file` argument like you did when you encrypted the data bag item.

```bash
# ~/chef-repo
$ knife data bag show passwords test --secret-file /tmp/encrypted_data_bag_secret
id:       test
password: learnchef
```

The output confirms that your secret key file can successfully decrypt your data bag item.
