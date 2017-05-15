To help distinguish between remotes pulled from other servers, Chef Automate and the `delivery` command line tool look for a remote named `delivery` to identify the remote associated with Chef Automate's repository for this project. The `delivery init` command sets up the `delivery` remote for you.

`origin` refers to the original remote on GitHub and `delivery` refers to the new remote that's hosted on Chef Automate's Git server. Chef Automate does not interact with the `origin` remote.

To see this, run `git remote -v` to see your remote repositories.

```bash
# ~/learn-chef/cookbooks/learn_chef_apache2
$ git remote -v
delivery	ssh://admin@default@test-t8g63tmuzohfpopb.us-east-1.opsworks-cm.io:8989/default/my-org/learn_chef_apache2 (fetch)
delivery	ssh://admin@default@test-t8g63tmuzohfpopb.us-east-1.opsworks-cm.io:8989/default/my-org/learn_chef_apache2 (push)
origin	https://github.com/learn-chef/learn_chef_apache2.git (fetch)
origin	https://github.com/learn-chef/learn_chef_apache2.git (push)
```

You can also run `git remote show delivery` to see that `git pull` merges changes from Chef Automate's `master` branch.

```bash
# ~/learn-chef/cookbooks/learn_chef_apache2
$ git remote show delivery
* remote delivery
  Fetch URL: ssh://admin@default@test-t8g63tmuzohfpopb.us-east-1.opsworks-cm.io:8989/default/my-org/learn_chef_apache2
  Push  URL: ssh://admin@default@test-t8g63tmuzohfpopb.us-east-1.opsworks-cm.io:8989/default/my-org/learn_chef_apache2
  HEAD branch: master
  Remote branch:
    master tracked
  Local branch configured for 'git pull':
    master merges with remote master
  Local ref configured for 'git push':
    master pushes to master (up to date)
```

In practice, you might have just one remote &ndash; `delivery`. In this module, the `origin` remote exists only as a way for you to obtain starter code that we provide for you.

Also remember that you don't have to use Chef Automate's Git server. We do so for learning purposes and because using the Git server that Chef Automate already provides is the easiest way to get started.
