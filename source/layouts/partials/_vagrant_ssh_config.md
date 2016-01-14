The directory from where you ran `vagrant init centos-6.5` contains a file named <code class="file-path">Vagrantfile</code>. From that directory, run the `vagrant ssh-config` command to get the connection details.

```bash
$ vagrant ssh-config
Host default
  HostName 127.0.0.1
  User vagrant
  Port 2222
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /home/user/.vagrant/machines/default/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL
```

In this example, any network traffic that's sent to port 2222 on your workstation will be forwarded to port 22 on your virtual machine.

Write down the values of `User`, `Port`, and `IdentityFile`.
