## 6. Prepare your data bag item for source control

The `knife data bag` command performed the encryption and uploaded the data to your Chef server. But notice that the `test` data bag item on your local system still contains unencrypted data.

```bash
# ~/chef-repo
$ cat ~/chef-repo/data_bags/passwords/test.json
{
  "id": "test",
  "password": "learnchef"
}
```

You never want to store this data in source control or any other non-secure location. Although we won't work with source control in this tutorial, let's encrypt your data bag item locally to see how to prepare sensitive data for use with source control.

Run the same `knife data bag from file` command that you ran earlier, but this time provide the `--local-mode` argument to apply the encryption to your local system, and not the Chef server.

```bash
# ~/chef-repo
$ knife data bag from file passwords test.json --secret-file /tmp/encrypted_data_bag_secret --local-mode
Updated data_bag_item[passwords::test]
```

Your <code class="file-path">test.json</code> file is now encrypted, and is safe to commit to source control.

```bash
# ~/chef-repo
$ cat ~/chef-repo/data_bags/passwords/test.json
{
  "id": "test",
  "password": {
    "encrypted_data": "uOMfNY8Fs+dc5ldkmA3yROvUq7Rq6V3Xx6BcC0Vwhd4=\n",
    "iv": "y/GG/9AaRHAMd5BnyE1u2w==\n",
    "version": 1,
    "cipher": "aes-256-cbc"
  }
}
```

[WARN] Remember, _never_ commit passwords or other sensitive data to source control in plain text because it will forever exist in that file's version history.<br>Also never store your secret key in source control. We created the secret key file in a temporary directory to help prevent this from happening by accident.

[TIP] It's still up to you to implement an appropriate distribution mechanism for your secret keys. [chef-vault](https://github.com/Nordstrom/chef-vault) is commonly used to solve the key distrubition problem. `chef-vault` uses the existing RSA keypair that your node uses to communicate with the Chef server to create an asymmmetric key used for decryption. This provides a more automatic key distribution mechanism and enables you to control which nodes have access to sensitive data.
