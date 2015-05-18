## 4. Verify the bootstrap process was successful

We named your node `web_app_ubuntu` in the `knife bootstrap` command. Run `knife node list` to list all of your nodes and then search for `web_app_ubuntu` in the output to verify that your node successfully bootstrapped.

```bash
# ~/chef-repo
$ knife node list | grep web_app_ubuntu
web_app_ubuntu
```

Great! Your node is now associated with your Chef server and it ran the `awesome_customers` cookbook. Now we can verify that its configuration matches what we expect.
