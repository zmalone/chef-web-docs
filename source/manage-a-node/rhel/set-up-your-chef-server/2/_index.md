## 2. Configure your workstation to communicate with the Chef server

[knife](https://docs.chef.io/knife.html) is the command-line tool that provides an interface between your workstation and the Chef server. `knife` enables you to upload your cookbooks to the Chef server and work with _nodes_, the servers that you manage.

`knife` requires two files to communicate with the Chef server &ndash; an RSA private key and a configuration file.

Every request to the Chef server is authenticated through an RSA public key-pair. The Chef server holds the public part; you hold the private part.

The configuration file is typically named <code class="file-path">knife.rb</code>. It contains information such as the Chef server's URL, the location of your RSA private key, and the default location of your cookbooks.

Both of these files are typically located in a directory named <code class="file-path">.chef</code>. Every time `knife` runs, it looks in the current working directory for the <code class="file-path">.chef</code> directory. If the <code class="file-path">.chef</code> directory does not exist, `knife` searches up the directory tree for a <code class="file-path">.chef</code> directory. This process is similar to how tools such as Git work.

The next step is to create the <code class="file-path">~/learn-chef/.chef</code> directory and add your RSA private key and `knife` configuration files.

[TIP] Because `knife` searches up the directory tree for a <code class="file-path">.chef</code> directory, you can have multiple <code class="file-path">.chef</code> directories in your tree. The <code class="file-path">~/learn-chef/.chef</code> directory gives you a default `knife` configuration for most projects, but you can also create a <code class="file-path">.chef</code> directory lower in the tree to configure other projects to work with another Chef server.

### Create the .chef directory

Create the <code class="file-path">~/learn-chef/.chef</code> directory, like this.

```bash
# ~/learn-chef
$ mkdir ~/learn-chef/.chef
```

### Generate your knife configuration file

1. Sign in to [https://manage.chef.io/](https://manage.chef.io/).
1. From the **Administration** tab, select your organization.
1. From the menu on the left, select **Generate Knife Config** and save the file.

![](misc/manage_generate_knife_config.png)

From the command line, copy <code class="file-path">knife.rb</code> to your <code class="file-path">~/learn-chef/.chef</code> directory. For example:

```bash
$ cp ~/Downloads/knife.rb ~/learn-chef/.chef
```

### Generate your RSA private key file

1. Sign in to [https://manage.chef.io/](https://manage.chef.io/).
1. From the **Administration** tab, select **Users** from the menu on the left.
1. Select your user name, select **Reset key** from the menu on the left. Then select **Reset key** from the window that appears.

![](misc/manage_reset_key.png)

A second window appears that displays your private key. From the bottom of that window, click **Download** to download your private key file.

![](misc/manage_download_key.png)

From the command line, copy your private key file to your <code class="file-path">~/learn-chef/.chef</code> directory. For example:

```bash
$ cp ~/Downloads/your_name.pem ~/learn-chef/.chef
```

### Verify your connection to the Chef server

First, validate that your <code class="file-path">~/learn-chef/.chef</code> contains your <code class="file-path">knife.rb</code> file and your private key file.

```bash
# ~/learn-chef
$ ls ~/learn-chef/.chef
knife.rb  your_name.pem
```

Now, validate your connection to the Chef server. One way to do that is to run the `knife ssl check` command.

```bash
# ~/learn-chef
$ knife ssl check
Connecting to host api.chef.io:443
Successfully verified certificates from `api.chef.io'
```
