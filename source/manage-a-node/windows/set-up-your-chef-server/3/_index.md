## 3. Get the IIS cookbook

In [Learn the Chef basics](/learn-the-basics/windows/), you wrote a cookbook that configures an IIS web server. You'll run that cookbook on your new node.

But the virtual machine you used earlier is likely gone! Instead of having you type in the cookbook again, let's get a copy from Chef Supermarket instead. [Chef Supermarket](https://supermarket.chef.io/) is a place for the community to share cookbooks. Chef Supermarket contains the Learn Chef IIS cookbook for you to download.

From your <code class="file-path">~/chef-repo</code> directory, run these commands to download the cookbook from Chef Supermarket and extract it.

```bash
# ~/chef-repo
$ knife cookbook site download learn_chef_iis
Downloading learn_chef_iis from the cookbooks site at version 0.2.0 to C:/Users/chef/chef-repo/learn_chef_iis-
0.2.0.tar.gz
Cookbook saved: C:/Users/chef/chef-repo/learn_chef_iis-0.2.0.tar.gz
$ tar -zxvf learn_chef_iis-0.2.0.tar.gz -C cookbooks
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
x learn_chef_iis/templates/default/index.html.erb
x learn_chef_iis/recipes/default.rb
$ rm learn_chef_iis*.tar.gz
```
