If you're receiving an error like the following it most likely means you'll need to regenerate your validation key:

```bash
INFO: Client key /etc/chef/client.pem is not present - registering
INFO: HTTP Request Returned 401 Unauthorized: Failed to authenticate as ORGANIZATION-validator. Ensure that your node_name and client key are correct.
FATAL: Stacktrace dumped to c:/chef/cache/chef-stacktrace.out
FATAL: Net::HTTPServerException: 401 "Unauthorized"
```

---

##### Troubleshooting Steps

1. Check if there's a file named "ORGANIZATION-validator.pem" in the following locations:

        ~/.chef
        ~/projects/current_project/.chef
        /etc/chef

  If one is present, verify that it has the correct read permissions.

1. If there's no file, you will need to regenerate your validation key.

  You can recreate this key by going to the [Opscode Management Console](https://manage.opscode.com) and selecting 'organizations' in the upper right side of the screen.

  You can then select 'Regenerate validation key' next to the organization you need the key for.

  [WARN] Existing nodes will not work until you distribute the new `validation.pem`!

  [NOTE] See our [screencast on managing your Chef pem files](/screencasts/manage-pem-files) for more detailed steps.
