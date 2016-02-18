## 3. Bootstrap your node

Now let's bootstrap your node and apply the `hello_chef_server` cookbook.

These pages show you how to bootstrap the node [you prepared earlier](/install-and-manage-your-own-chef-server/linux/get-set-up#step3).

* [Red Hat Enterprise Linux or CentOS](/manage-a-node/rhel/bootstrap-your-node/)
* [Windows Server](/manage-a-node/windows/bootstrap-your-node/)
* [Ubuntu](/manage-a-node/ubuntu/bootstrap-your-node/)

When you bootstrap your node, be sure to update the `--run-list` option to use the `hello_chef_server` cookbook. Here's a complete example for a Linux node.

```bash
# ~/chef-repo
$ knife bootstrap 54.69.233.208 --ssh-user root --sudo --identity-file ~/.ssh/my.pem --node-name node1 --run-list 'recipe[hello_chef_server]'
```