To help distinguish between remotes pulled from other servers, Chef Automate and the delivery command line tool look for a remote named `delivery` to identify the remote associated with Chef Automate's repository for this project. The `delivery init` command sets up the `delivery` remote for you.

`origin` refers to the original remote on GitHub and `delivery` refers to the new remote that's hosted on Chef Automate's Git server. Chef Automate does not interact with the `origin` remote.

To see this, run `git remote -v` to see your remote repositories.

```ps
# C:\Users\Administrator\cookbooks\awesome_customers_delivery
$ git remote -v
delivery        ssh://jsmith@mammalia@delivery.chordata.biz:8989/mammalia/diprotodontia/awesome_customers_delivery (fetch)
delivery        ssh://jsmith@mammalia@delivery.chordata.biz:8989/mammalia/diprotodontia/awesome_customers_delivery (push)
origin  https://github.com/learn-chef/awesome_customers_delivery.git (fetch)
origin  https://github.com/learn-chef/awesome_customers_delivery.git (push)
```

You can also run `git remote show delivery` to see that `git pull` merges changes from Chef Automate's `master` branch.

```ps
# C:\Users\Administrator\cookbooks\awesome_customers_delivery
$ git remote show delivery
* remote delivery
  Fetch URL: ssh://jsmith@mammalia@delivery.chordata.biz:8989/mammalia/diprotodontia/awesome_customers_delivery
  Push  URL: ssh://jsmith@mammalia@delivery.chordata.biz:8989/mammalia/diprotodontia/awesome_customers_delivery
  HEAD branch: master
  Remote branch:
    master tracked
  Local branch configured for 'git pull':
    master merges with remote master
  Local ref configured for 'git push':
    master pushes to master (up to date)
```

In practice, you might have just one remote &ndash; `delivery`. In this tutorial, the `origin` remote exists only as a way for you to obtain starter code that we provide for you.

Also remember that you don't have to use Chef Automate's Git server. We do so for learning purposes and because using the Git server that Chef Automate already provides is the easiest way to get started.
