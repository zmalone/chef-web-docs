If you're seeing an error like:

```bash
WARN: *****************************************
WARN: Can not find config file: /etc/chef/client.rb, using defaults.
WARN: No such file or directory - /etc/chef/client.rb
# ... output truncated ... #
FATAL: Chef::Exceptions::PrivateKeyMissing: I cannot read /etc/chef/validation.pem, which you told me to use to sign requests!
```

- - -

##### Troubleshooting

This error is related to bug [CHEF-2317](http://tickets.opscode.com/browse/CHEF-2317) on Windows, and can also happen on Linux or Mac.

You can work around this issue by supplying the full path to your `client.rb`:

    $ chef-client -c /etc/chec/client.rb