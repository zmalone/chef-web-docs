## 4. Verify the bootstrap process was successful

We named your node `web_app_windows` in the `knife bootstrap` command. Run `knife node list` to list all of your nodes and then search for `web_app_windows` in the output to verify that your node successfully bootstrapped.

```bash
# ~/chef-repo
$ knife node list | grep web_app_windows
web_app_windows
```

Great! Your node is now associated with your Chef server and it ran the `web_application` cookbook. Now we can verify that its configuration matches what we expect.
