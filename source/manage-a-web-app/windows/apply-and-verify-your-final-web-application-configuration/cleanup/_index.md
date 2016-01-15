## How to clean up your environment

Perform these steps if you want to clean up your workstation or your Chef server after you complete this tutorial or you want to repeat the tutorial from the beginning.

### Remove the cookbooks from the Chef server

From your workstation, run the `knife cookbook list` command to list the cookbooks that exist on your Chef server.

Then run  `knife cookbook delete <cookbook-name>` to delete any cookbooks you no longer want.

The [bulk delete](https://docs.chef.io/knife_cookbook.html#bulk-delete) option is an easy way to remove multiple cookbooks. For example, `knife cookbook bulk delete . -p` will entirely remove all cookbooks from your Chef server.

[WARN] Be sure not to remove any cookbooks that are used by other nodes in your network.

### Remove the cookbooks from your Berkshelf cache

Berkshelf installs dependent cookbooks to the <code class="file-path">~/.berkshelf/cookbooks</code> directory on your workstation so that they can be shared among all of your cookbooks.

From your workstation, you can remove individual cookbooks you no longer need from this directory, or remove them all like this.

```bash
$ rm -r ~/.berkshelf/cookbooks
```

### Delete your Chef repository

From your workstation, this command will delete your Chef repository from disk.

```bash
$ rm -r ~/chef-repo
```

### Delete the node from the Chef server

From your workstation, run these commands to delete the data about your node from the Chef server.

```bash
# ~/chef-repo
$ knife node delete web_app_windows --yes
Deleted node[web_app_windows]
$ knife client delete web_app_windows --yes
Deleted client[web_app_windows]
```

### Tear down your node

Deleting a node from your Chef server removes any data about that node from the server &ndash; it doesn't automatically tear down the instance.

Don't forget to tear down any cloud instances that you used to complete the tutorial. If you're using the free trial virtual machine that we provide, that instance will automatically expire 24 hours after you started it.
