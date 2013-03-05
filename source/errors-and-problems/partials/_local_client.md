If you're getting an error like:

```bash
ERROR: Failed to authenticate to https://api.opscode.com/organizations/ORGANIZATION as USERNAME with key /path/to/USERNAME.pem
Response:  Failed to authenticate as USERNAME. Ensure that your node_name and client key are correct.
```

when issuing `knife` commands, it means your local `client.rb` is unable to authenticate you to the Chef Server.

---

##### Troubleshooting Steps

1. Verify you have the correct values in your `knife.rb` file, especially `node_name` and `client_key`.

1. Check if the file referenced in `client_key` above (usually `USERNAME.pem`) exists. Some common locations include :

        ~/.chef
        ~/projects/current_project/.chef
        /etc/chef

  If one is present, verify that it has the correct read permissions.

1. If there's no file, you will need to regenerate your client key.

  [NOTE] See our [screencast on managing your Chef pem files](/screencasts/manage-pem-files) for more detailed steps.
