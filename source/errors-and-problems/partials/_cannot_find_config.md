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

You can work around this issue by supplying the full path to your `client.rb`:

    $ chef-client -c /etc/chef/client.rb
