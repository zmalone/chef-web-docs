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

### Optional: Delete the RSA private key from your node

During the bootstrap process, an RSA private key is generated on your node to enable your node to make API calls to the Chef server. The default location of this key is <code class="file-path">C:\chef\client.pem</code> on Windows Server. 

If you plan to bootstrap your node a second time, for example, to practice the process, you'll need to log in to your node and delete the RSA private key file, like this (you'll need to open your command prompt as **Administrator**.) 

```ps
$ rm C:\chef\client.pem
```

### Optional: Tear down your instance

Deleting a node from your Chef server removes any data about that node from the server &ndash; it doesn't automatically tear down the instance.

Don't forget to tear down any cloud instances that you used to complete the tutorial.