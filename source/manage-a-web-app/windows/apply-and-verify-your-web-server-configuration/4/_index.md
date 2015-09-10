## 4. Verify the bootstrap process was successful

We named your node `web_app_windows` in the `knife bootstrap` command. Run `knife node list` to list all of your nodes and then search for `web_app_windows` in the output to verify that your node successfully bootstrapped.

On a Windows workstation, you would run:

```ps
# ~/chef-repo
$ knife node list | findstr web_app_windows
web_app_windows
```

On Linux or Mac OS, you would run:

```bash
# ~/chef-repo
$ knife node list | grep web_app_windows
web_app_windows
```

Great! Your node is now associated with your Chef server and it ran the `awesome_customers` cookbook. Now we can verify that its configuration matches what we expect.
