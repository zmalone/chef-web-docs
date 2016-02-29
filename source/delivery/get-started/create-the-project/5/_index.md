## 5. Integrate the change locally

When you clicked **Approve**, Chef Delivery merged the `add-delivery-config` branch into `master` on Delivery's Git server. Now you need to pull Delivery's updated `master` into your `master` branch.

First, switch to the `master` branch.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'delivery/master' by 1 commit.
  (use "git push" to publish your local commits)
```

Now pull the latest from Delivery to your local repo.

```bash
# ~/Development/deliver-customers-rhel
$ git pull --prune
From ssh://test@10.194.13.148:8989/test/learn-chef/deliver-customers-rhel
 x [deleted]         (none)     -> delivery/_for/master/add-delivery-config
remote: Counting objects: 1, done.
remote: Total 1 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (1/1), done.
   2786af8..eb8e5b7  master     -> delivery/master
Updating 55945db..eb8e5b7
Fast-forward
 .delivery/config.json | 10 ++++++++++
 1 file changed, 10 insertions(+)
 create mode 100644 .delivery/config.json
```

The `--prune` option removes references to any remote-tracking that no longer exist on the remote server. `delivery/_for/master/add-delivery-config` is an intermediate branch that Delivery creates as part of the integration process.

### A note about Git remotes

To help distinguish between remotes pulled from other servers, Delivery and the delivery command line tool look for a remote named `delivery` to identify the remote associated with Delivery's repository for this project. The `delivery init` command sets up the `delivery` remote for you.

`origin` refers to the original remote on GitHub and `delivery` refers to the new remote that's hosted on Delivery's Git server. Delivery does not interact with the `origin` remote.

To see this, run `git remote -v` to see your remote repositories.

```bash
# ~/Development/deliver-customers-rhel
$ git remote -v
delivery	ssh://tpetchel@test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel (fetch)
delivery	ssh://tpetchel@test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel (push)
origin	https://github.com/learn-chef/customers-web-app-delivery.git (fetch)
origin	https://github.com/learn-chef/customers-web-app-delivery.git (push)
```

In practice, you'll typically have just one remote &ndash; `delivery`. The `origin` remote exists only as a way for you to obtain starter code that we provide for you.

Also remember that you don't have to use Delivery's Git server. We do so for learning purposes and because using the Git server that Delivery already provides is the easiest way to get started.

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/customers-web-app-delivery/tree/ref-add-delivery-config-v1.0.0) (tag `ref-add-delivery-config-v1.0.0`.)
