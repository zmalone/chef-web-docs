If you're getting an error like this:

```bash
INFO: Client key /etc/chef/client.pem is not present - registering
INFO: HTTP Request Returned 401 Unauthorized: Failed to authenticate as ORGANIZATION-validator. Synchronize the clock on your host.
FATAL: Stacktrace dumped to /var/chef/cache/chef-stacktrace.out
FATAL: Net::HTTPServerException: 401 "Unauthorized"
```

it means that your system clock has drifted from the actual time by more than 15 minutes. This can be fixed by syncing your clock with an NTP server.