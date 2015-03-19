## 5. Confirm the result

Two things just happened.

First, your node was associated with your hosted Chef account. To verify this, navigate to the [Chef management console](https://manage.chef.io/organizations). From the **Nodes** tab, you'll see an entry for the node you just bootstrapped.

![The bootstrapped node](windows/management-console-node.png)

You can also verify that the node successfully bootstrapped by running the `knife node list` command.

```bash
# ~/chef-repo
$ knife node list
node1
```

You can use the `knife node show` command to view data about your node.

```bash
# ~/chef-repo
$ knife node show node1
Node Name:   node1
Environment: _default
FQDN:        WIN-8LVQPQO00I4
IP:          172.32.66.6
Run List:    recipe[learn_chef_iis]
Roles:
Recipes:     learn_chef_iis, learn_chef_iis::default
Platform:    windows 6.2.9200
Tags:
```

The second thing that happened was that your node did an initial check in with the Chef server and ran the IIS cookbook. To verify this, open a web browser from your workstation and navigate to your web server.

![The basic home page](misc/webserver-basic-remote.png)

[WARN] The IP address that's returned by the `knife node show` command is often the node's _internal_ IP address. Make sure you're using your node's public IP address or host name.
