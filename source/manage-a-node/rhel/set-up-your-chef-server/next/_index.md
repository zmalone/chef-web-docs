Great, you're all set up to use a Chef server. With your cookbook uploaded to the Chef server, you're now ready to scale-out your infrastructure!

The next step is to configure a new node and run the cookbook on it. In [Learn the Chef basics](/learn-the-basics/rhel/), you ran `chef-client` in local mode to configure the node directly. Now you'll use `knife` to trigger `chef-client` to run on your node, remotely from your workstation.
