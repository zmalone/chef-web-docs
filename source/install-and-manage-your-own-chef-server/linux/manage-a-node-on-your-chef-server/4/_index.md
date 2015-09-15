## 4. Confirm the result

During the bootstrap process,`chef-client` applied the `hello_chef_server` cookbook, which configured the file <code class="file-path">hello.txt</code> in the Chef cache directory.

Log into your node and verify that <code class="file-path">hello.txt</code> was correctly written. On Linux, the default location of the Chef cache directory is <code class="file-path">/var/chef/cache</code>. On Windows Server, it's <code class="file-path">C:\chef\cache</code>.

### Confirm the result on a Linux node

From your Linux node, the following to write <code class="file-path">hello.txt</code> to the console.

```bash
$ more /var/chef/cache/hello.txt
Hello, Chef server!
```

Alternatively, you can use the `knife ssh` command from your workstation. Here's now to do it using key-based authentication.

```bash
# ~
$ knife ssh {address} 'more /var/chef/cache/hello.txt' --manual-list --ssh-user {user} --identity-file {identity-file}
52.25.26.65 Hello, Chef server!
```

### Confirm the result on a Windows Server node

From your Windows Server node, run this to write <code class="file-path">hello.txt</code> to the console.

```ps
$ Get-Content C:\chef\cache\hello.txt
Hello, Chef server!
```

Congratulations! You've successfully configured your own Chef server and can use it to bootstrap and mangage your nodes.
