## 3. Get the Apache cookbook

Now let's practice uploading a cookbook to the Chef server.

In [Learn the Chef basics](/learn-the-basics/rhel/), you wrote a cookbook that configures an Apache web server. You'll run that cookbook on your new node.

But the virtual machine you used earlier is likely gone! Instead of having you type in the cookbook again, let's get a copy from Chef Supermarket. [Chef Supermarket](https://supermarket.chef.io/) is a place for the community to share cookbooks. Chef Supermarket contains the Learn Chef Apache cookbook for you to download.

First, create the <code class="file-path">~/learn-chef/cookbooks</code> directory. Your `knife` configuration file lists this directory as the default location for cookbooks.

```bash
# ~/learn-chef
$ cd ~/learn-chef
$ mkdir cookbooks
```

From your <code class="file-path">~/learn-chef</code> directory, run these commands to download the cookbook from Chef Supermarket and extract it to your <code class="file-path">~/learn-chef/cookbooks</code> directory.

```bash
# ~/learn-chef
$ knife cookbook site download learn_chef_httpd
Downloading learn_chef_httpd from the cookbooks site at version 0.2.0 to /home/chef/learn-chef/learn_chef_httpd-0.2.0.tar.gz
Cookbook saved: /home/chef/learn-chef/learn_chef_httpd-0.2.0.tar.gz
$ tar -zxvf learn_chef_httpd-0.2.0.tar.gz -C cookbooks
learn_chef_httpd/
learn_chef_httpd/.kitchen.yml
learn_chef_httpd/Berksfile
learn_chef_httpd/chefignore
learn_chef_httpd/metadata.json
learn_chef_httpd/metadata.rb
learn_chef_httpd/README.md
learn_chef_httpd/recipes/
learn_chef_httpd/templates/
learn_chef_httpd/templates/default/
learn_chef_httpd/templates/default/index.html.erb
learn_chef_httpd/recipes/default.rb
$ rm learn_chef_httpd*.tar.gz
```
