To help distinguish between remotes pulled from other servers, Delivery and the delivery command line tool look for a remote named `delivery` to identify the remote associated with Delivery's repository for this project. The `delivery init` command sets up the `delivery` remote for you.

`origin` refers to the original remote on GitHub and `delivery` refers to the new remote that's hosted on Delivery's Git server. Delivery does not interact with the `origin` remote.

To see this, run `git remote -v` to see your remote repositories.

```ps
# ~/delivery-demo/awesome_customers_delivery
$ git remote -v
delivery        ssh://tpetchel@delivery-demo@10.0.0.12:8989/delivery-demo/delivery-demo/awesome_customers_delivery (fetch)
delivery        ssh://tpetchel@delivery-demo@10.0.0.12:8989/delivery-demo/delivery-demo/awesome_customers_delivery (push)
origin  https://github.com/learn-chef/awesome_customers_delivery.git (fetch)
origin  https://github.com/learn-chef/awesome_customers_delivery.git (push)
```

You can also run `git remote show delivery` to see that `git pull` merges changes from Delivery's `master` branch.

```ps
# ~/delivery-demo/awesome_customers_delivery
$ git remote show delivery
* remote delivery
  Fetch URL: ssh://tpetchel@delivery-demo@10.0.0.12:8989/delivery-demo/delivery-demo/awesome_customers_delivery
  Push  URL: ssh://tpetchel@delivery-demo@10.0.0.12:8989/delivery-demo/delivery-demo/awesome_customers_delivery
  HEAD branch: master
  Remote branch:
    master tracked
  Local branch configured for 'git pull':
    master merges with remote master
  Local ref configured for 'git push':
    master pushes to master (up to date)
```

In practice, you might have just one remote &ndash; `delivery`. In this tutorial, the `origin` remote exists only as a way for you to obtain starter code that we provide for you.

Also remember that you don't have to use Delivery's Git server. We do so for learning purposes and because using the Git server that Delivery already provides is the easiest way to get started.
