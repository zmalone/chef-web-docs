This isn't really an error, but can be confusing to new users. When you try to install a cookbook with changes that have not been committed to git you will get this error:

```bash
Installing getting-started to /home/jes/chef-repo/.chef/../cookbooks
ERROR: You have uncommitted changes to your cookbook repo:
 M cookbooks/getting-started/recipes/default.rb
?? .chef/
?? log
Commit or stash your changes before importing cookbooks
```

- - -

##### Troubleshooting

You can solve this by committing your changes. For example, this would commit all new changes with the message "updates".

    $ git commit -am "Updating so I can install a site cookbook"

Re-run the `knife cookbook site install` command again to install the community cookbook.
