## Summary

In this lesson you updated your cookbook, uploaded it to the Chef server, and saw the changes appear on your node.

To update your cookbook you used a _template_. A [template][template] enables you to write a single, general recipe that’s customized for a particular node as the recipe runs. That means you don’t have to write a custom version of your recipe for every node.

You also ran `knife winrm` to update your node. [knife winrm][knifewinrm] invokes the command you specify over a WinRM connection on a node &ndash; in our case `chef-client`. You didn't have to specify the run-list because you already set that up when you bootstrapped the node.

[COMMENT] Alternatively, you could connect directly into your server and run `chef-client` manually. In this lesson, we use `knife winrm` because it enables us to do all of our work from our local workstation.

### Templates work through node objects

To understand how templates work, you should first understand a bit more about nodes. Recall that a _node_ represents a server and is typically a virtual machine or physical server &ndash; basically any compute resource in your infrastructure that's managed by Chef. When you bootstrapped your node, the Chef server created what's called a _node object_ for you. This node object contains a number of attributes that describe the node, and these attributes are saved on the Chef server.

When a recipe runs, a `node` object is loaded into the program. Chef loads the node's attributes from the Chef server into memory. For our home page, we want to display the server's fully qualified domain name (FQDN). To do so, we access the `fqdn` attribute of the `node` object.

[template]: https://docs.chef.io/templates.html
[knifewinrm]: https://docs.chef.io/plugin_knife_windows.html
