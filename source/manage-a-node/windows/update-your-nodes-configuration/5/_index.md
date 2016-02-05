## How to clean up your environment

Perform these steps if you want to clean up your Chef server after you complete this tutorial or you want to repeat the tutorial from the beginning.

### Delete the node from the Chef server

As you experiment, it's a good idea to delete information about your node from the Chef server when you no longer need it. That way, your Chef server contains only relevant information. In practice, it's up to you whether to delete node information when you retire a production system from service.

From your workstation, run these commands to delete the data about your node from the Chef server.

```bash
# ~/learn-chef
$ knife node delete node1 --yes
Deleted node[node1]
$ knife client delete node1 --yes
Deleted client[node1]
```

### Tear down your node

Deleting a node from your Chef server removes any data about that node from the server &ndash; it doesn't automatically tear down the instance.

Don't forget to tear down any cloud instances that you used to complete the tutorial.