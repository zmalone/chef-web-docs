## 5. Integrate the change locally

When you clicked **Approve**, Chef Delivery merged the `add-delivery-config` branch into `master` on Chef Delivery's Git server. Now you need to merge the updated `master` branch back to your local repository.

First, run `git branch` to verify that you're currently on the `add-delivery-config` branch.

```bash
$ git branch
* add-delivery-config
  master
```

Now run `git fetch delivery` to download the changes from the remote delivery repo on the Chef Delivery server to your local repo.

```bash
$ git fetch delivery
remote: Counting objects: 1, done.
remote: Total 1 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (1/1), done.
From ssh://test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel
   77fe036..a9471ce  master     -> delivery/master
```

Run `git checkout master` to switch to the `master` branch.

```bash
$ git checkout master
Switched to branch 'master'
Your branch is behind 'delivery/master' by 2 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)
```

Now run `git pull delivery` to merge the changes into your local copy of `master`.

```bash
$ git pull delivery
Updating a4d9499..a9471ce
Fast-forward
 .delivery/config.json | 10 ++++++++++
 1 file changed, 10 insertions(+)
 create mode 100644 .delivery/config.json
```

### A note about remotes

If you're a Git user, you're likely accustomed to working with the `origin` remote, but in this lesson, you fetched and pulled from `delivery`.

You pulled from `delivery` because we're cloning an existing GitHub project locally and creating a new Git repo that's hosted on our Chef Delivery Server.

`origin` refers to the original remote on GitHub, and `delivery` refers to our new remote that's hosted on our Chef Delivery server.

To see this, run `git remote -v` to see your remote repositories.

```bash
# ~/Development/deliver-customers-rhel
$ git remote -v
delivery	ssh://tpetchel@test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel (fetch)
delivery	ssh://tpetchel@test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel (push)
origin	https://github.com/learn-chef/deliver-customers-rhel.git (fetch)
origin	https://github.com/learn-chef/deliver-customers-rhel.git (push)
```

Remember, you don't have to use Chef Delivery's Git server. We do so for learning purposes and because using the Git server that Chef Delivery already provides is the easiest way to get started.

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/deliver-customers-rhel/tree/add-delivery-config-v1.0.0) (tag `add-delivery-config-v1.0.0`.)
