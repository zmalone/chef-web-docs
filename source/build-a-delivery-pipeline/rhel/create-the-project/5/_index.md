## 5. Integrate the change locally

When you clicked **Approve**, Chef Delivery merged the `add-delivery-config` branch into `master` on Delivery's Git server. Now you need to pull Delivery's updated `master` into your `master` branch.

First, run `git branch` to verify that you're currently on the `add-delivery-config` branch.

```bash
# ~/Development/deliver-customers-rhel
$ git branch
* add-delivery-config
  master
```

Now run `git fetch delivery` to download the changes from the remote delivery repo on the Chef Delivery server to your local repo.

```bash
# ~/Development/deliver-customers-rhel
$ git fetch delivery
remote: Counting objects: 1, done.
remote: Total 1 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (1/1), done.
From ssh://test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel
   77fe036..a9471ce  master     -> delivery/master
```

Run `git checkout master` to switch to the `master` branch.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout master
Switched to branch 'master'
Your branch is behind 'delivery/master' by 2 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)
```

Now run `git pull delivery` to merge the changes into your local copy of `master`.

```bash
# ~/Development/deliver-customers-rhel
$ git pull delivery
Updating a4d9499..a9471ce
Fast-forward
 .delivery/config.json | 10 ++++++++++
 1 file changed, 10 insertions(+)
 create mode 100644 .delivery/config.json
```

### A note about remotes

To help distinguish between remotes pulled from other servers, Delivery and the delivery command line tool look for a remote named `delivery` to identify the remote associated with Delivery's repository for this project. The `delivery init` command sets up the `delivery` remote for you.

`origin` refers to the original remote on GitHub and `delivery` refers to the new remote that's hosted on Delivery's Git server. Delivery does not interact with the `origin` remote.

To see this, run `git remote -v` to see your remote repositories.

```bash
# ~/Development/deliver-customers-rhel
$ git remote -v
delivery	ssh://tpetchel@test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel (fetch)
delivery	ssh://tpetchel@test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel (push)
origin	https://github.com/learn-chef/deliver-customers-rhel.git (fetch)
origin	https://github.com/learn-chef/deliver-customers-rhel.git (push)
```

In practice, you won't necessarily have multiple remotes. The `origin` remote exists as a way for you to obtain starter code that we provide for you.

Also remember that you don't have to use Delivery's Git server. We do so for learning purposes and because using the Git server that Delivery already provides is the easiest way to get started.

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/deliver-customers-rhel/tree/add-delivery-config-v1.0.0) (tag `add-delivery-config-v1.0.0`.)
