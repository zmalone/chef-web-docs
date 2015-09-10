## 4. Create a Chef repository on your workstation

It's common to place your Chef code in what's called a Chef repository, or _Chef repo_. A [Chef repo](https://docs.chef.io/chef_repo.html) holds your cookbooks and other files you need to define your policy.

Most users maintain their Chef code in a central code repository such as Git. For now, you'll just maintain the code locally on your workstation. Later, you'll upload the code from your local Chef repository to your Chef server.

If you don't already have a Chef repo set up on your workstation, run the following command to create one.

```bash
# ~
$ chef generate repo ~/chef-repo
Compiling Cookbooks...
Recipe: code_generator::repo
Compiling Cookbooks...
Recipe: code_generator::repo
  * directory[/home/user/chef-repo] action create
    - create new directory /home/user/chef-repo
[...]
    - create new file /home/user/chef-repo/.gitignore
    - update content in file /home/user/chef-repo/.gitignore from none to 3523c4
    (diff output suppressed by config)
```

[COMMENT] You can use a directory other than <code class="file-path">~/chef-repo</code>; just ensure that you have full access rights to that directory. Remember to adjust the paths we show as needed.

Now you need to add files to your local Chef repository that enable you to communicate with your Chef server.

If you have an existing Chef repository on your workstation that's configured to communicate with your Chef server, you can copy the <code class="file-path">.chef</code> directory from that Chef repository to your new one. Or, [install the Starter Kit](/manage-a-node/rhel/set-up-your-chef-server#step2) to create the <code class="file-path">.chef</code> directory and the certificates and other files you need.

Finally, confirm that your Chef repository is set up to communicate with Chef server. `cd` to your <code class="file-path">~/chef-repo</code> directory and confirm that the <code class="file-path">.chef</code> directory contains a <code class="file-path">knife.rb</code> file and two <code class="file-path">.pem</code> files.

```bash
# ~
$ cd ~/chef-repo
$ ls .chef
knife.rb org-validator.pem admin.pem
```
