If you're seeing an error like:

```bash
Client key /etc/chef/client.pem is notresent - registering
WARN: Failed to read the private key /etc/che/validation.pem: #<Errno::ENOENT: No such file or directory - /etc/chef/validaton.pem>
FATAL: Stacktrace dumped to /etc/chef/cache/chef-stacktrace.out
FATAL: Chef::Exceptions::PrivateKeyMissing: I cannot read /etc/chef/validation.pem, which you told me to use to sign requests
```

it means that Chef could not find your validation.pem.

- - -

##### Troubleshooting

1. Make sure your `validation.pem` or `ORGANIZATION-validator.pem` is downloaded and accessible by the current user.

1. Make sure your `client.rb` points to the location of your validator pem.
