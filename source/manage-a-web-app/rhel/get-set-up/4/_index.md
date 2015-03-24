## 4. Create a Chef repository

It's common to place your Chef code in what's called a Chef repository, or _Chef repo_. A [Chef repo](https://docs.chef.io/chef_repo.html) holds your cookbooks and other files you need to define your policy.

If you don't already have a Chef repo set up, run the following command to create one.

```bash
# ~
$ chef generate repo ~/chef-repo --policy-only
Compiling Cookbooks...
Recipe: code_generator::repo
[...]
    - create new file /home/user/chef-repo/cookbooks/README.md
    - update content in file /home/user/chef-repo/cookbooks/README.md from none to 5b0411
    (diff output suppressed by config)
```

[COMMENT] You can use a directory other than <code class="file-path">~/chef-repo</code>; just ensure that you have full access rights to that directory. Remember to adjust the paths we show as needed.

Now `cd` to your <code class="file-path">~/chef-repo</code> directory.

```bash
# ~
$ cd ~/chef-repo
```
