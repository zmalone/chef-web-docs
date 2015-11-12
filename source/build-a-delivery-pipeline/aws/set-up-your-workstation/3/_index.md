## 3. Connect the Delivery CLI to the Chef Delivery server

Next, you'll run the `delivery setup` command to create a file that configures the `delivery` command line interface (CLI) to contact the Chef Delivery server. The command you'll run creates a configuration file named <code class="file-path">.delivery/cli.toml</code>.

The placement of the `.delivery` directory in your file hierarchy is significant. Like Git, Chef Delivery searches the current directory and parent directories for its server settings. Because server settings are unique to an organization, we recommend that you create a directory for each organization you belong to and run the `delivery setup` command from that directory.

Create a working directory for your organization. This tutorial uses `Development`. You can also use <code class="file-path">~/Development</code> for purposes of this tutorial, or you can use your organization name. Just remember to change the paths you see throughout the tutorial.

```bash
$ cd ~
$ mkdir Development
$ cd Development
```

From your workstation terminal, configure the `delivery` command line interface (CLI) to contact the Chef Delivery server at <code class="placeholder">DELIVERY_SERVER</code>, with your <code class="placeholder">ENTERPRISE</code>, <code class="placeholder">ORGANIZATION</code> and <code class="placeholder">USERNAME</code>. In this tutorial, use the IP address of your Chef Delivery server for the `--server` argument.

```bash
# ~/Development
$ delivery setup --server=DELIVERY_SERVER --ent=ENTERPRISE --org=ORGANIZATION --user=USERNAME
```

Here's an example.

```bash
# ~/Development
$ delivery setup --server=10.194.11.99 --ent=chef --org=Development --user=sally
```

This example produces this <code class="file-path">.delivery/cli.toml</code> file.
