## 3. Get the IIS cookbook

Now let's practice uploading a cookbook to the Chef server.

In [Learn the Chef basics](/tutorials/learn-the-basics/windows/free/), you wrote a cookbook that configures an IIS web server. You'll run that cookbook on your new node.

But the virtual machine you used earlier is likely gone! Instead of having you type in the cookbook again, let's get a copy from Chef Supermarket. [Chef Supermarket](https://supermarket.chef.io/) is a place for the community to share cookbooks. Chef Supermarket contains the Learn Chef IIS cookbook for you to download.

First, create the <code class="file-path">~/learn-chef/cookbooks</code> directory. Your `knife` configuration file lists this directory as the default location for cookbooks.

```bash
# ~/learn-chef
$ cd ~/learn-chef
$ mkdir cookbooks
```

From your <code class="file-path">~/learn-chef</code> directory, run these commands to download the cookbook from Chef Supermarket and extract it to your <code class="file-path">~/learn-chef/cookbooks</code> directory.

```bash
# ~/learn-chef
$ knife cookbook site download learn_chef_iis
Downloading learn_chef_iis from the cookbooks site at version 0.2.1 to C:/Users/chef/learn-chef/learn_chef_iis-
0.2.1.tar.gz
Cookbook saved: C:/Users/chef/learn-chef/learn_chef_iis-0.2.1.tar.gz
$ tar -zxvf learn_chef_iis-0.2.1.tar.gz -C cookbooks
x learn_chef_iis/
x learn_chef_iis/.kitchen.yml
x learn_chef_iis/Berksfile
x learn_chef_iis/chefignore
x learn_chef_iis/metadata.json
x learn_chef_iis/metadata.rb
x learn_chef_iis/README.md
x learn_chef_iis/recipes/
x learn_chef_iis/templates/
x learn_chef_iis/templates/default/
x learn_chef_iis/templates/default/Default.htm.erb
x learn_chef_iis/recipes/default.rb
$ rm learn_chef_iis*.tar.gz
```
