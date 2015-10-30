## 1. Incorporate the delivery-truck cookbook

In this part, you'll add a dependency on the `delivery-truck` cookbook and run each of its phases.

First, verify that you're on the `master` branch.

```bash
$ git branch
  add-delivery-config
* master
```

Create a new branch named `add-delivery-truck`.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout -b add-delivery-truck
Switched to a new branch 'add-delivery-truck'
```

Verify that you're on the new branch.

```bash
# ~/Development/deliver-customers-rhel
$ git branch
  add-delivery-config
* add-delivery-truck
  master
```

### Add the dependency

Now modify <code class="file-path">~/Development/deliver-customers-rhel/.delivery/build-cookbook/metadata.rb</code> like this. The metadata file lists which cookbooks the build cookbook depends on.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/metadata.rb
name 'build-cookbook'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
version '0.1.0'

depends 'delivery-truck'
```

Now modify <code class="file-path">~/Development/deliver-customers-rhel/.delivery/build-cookbook/Berksfile</code> like this. The <code class="file-path">Berksfile</code> describes where to get dependent cookbooks.

The [Learn to manage a basic Red Hat Enterprise Linux web application](/manage-a-web-app/rhel) tutorial, [explains the process](/manage-a-web-app/rhel/apply-and-verify-your-web-server-configuration) in more detail.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/Berksfile
source 'https://supermarket.chef.io'

metadata

group :delivery do
  cookbook 'delivery_build', git: 'https://github.com/chef-cookbooks/delivery_build'
  cookbook 'delivery-base', git: 'https://github.com/chef-cookbooks/delivery-base'
  cookbook 'test', path: './test/fixtures/cookbooks/test'
end

cookbook 'delivery-sugar', git: 'https://github.com/chef-cookbooks/delivery-sugar'
cookbook 'delivery-truck', git: 'https://github.com/chef-cookbooks/delivery-truck'
```

[PRODNOTE] `delivery-truck` depends on `delivery-sugar`, but the build process complained about not having it. Maybe I did something wrong. Can someone try omitting the dep on `delivery-sugar` and let me know what happens?

### Include the delivery-truck cookbook's recipes

Now you'll include each of the `delivery-truck` cookbook's recipes in your build cookbook's recipes.

For example, make your `build-cookcook` cookbook's default recipe, <code class="file-path">default.rb</code>, look like this.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/default.rb
include_recipe 'delivery-truck::default'
```

Follow the same pattern for the remaining recipes: <code class="file-path">deploy.rb</code>, <code class="file-path">functional.rb</code>, <code class="file-path">lint.rb</code>, <code class="file-path">provision.rb</code>, <code class="file-path">publish.rb</code>, <code class="file-path">quality.rb</code>, <code class="file-path">security.rb</code>, <code class="file-path">smoke.rb</code>, and <code class="file-path">unit.rb</code>.

### Commit the changes

Run `git status` to see the unstaged changes.

```bash
# ~/Development/deliver-customers-rhel
$ git status
On branch add-delivery-truck
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   .delivery/build-cookbook/Berksfile
	modified:   .delivery/build-cookbook/metadata.rb
	modified:   .delivery/build-cookbook/recipes/default.rb
	modified:   .delivery/build-cookbook/recipes/deploy.rb
	modified:   .delivery/build-cookbook/recipes/functional.rb
	modified:   .delivery/build-cookbook/recipes/lint.rb
	modified:   .delivery/build-cookbook/recipes/provision.rb
	modified:   .delivery/build-cookbook/recipes/publish.rb
	modified:   .delivery/build-cookbook/recipes/quality.rb
	modified:   .delivery/build-cookbook/recipes/security.rb
	modified:   .delivery/build-cookbook/recipes/smoke.rb
	modified:   .delivery/build-cookbook/recipes/syntax.rb
	modified:   .delivery/build-cookbook/recipes/unit.rb
	modified:   .delivery/config.json

no changes added to commit (use "git add" and/or "git commit -a")
```

Now run `git add .` to stage them for commit.

```bash
# ~/Development/deliver-customers-rhel
$ git add .
```

Finally, commit the changes.

```bash
# ~/Development/deliver-customers-rhel
$ git commit -m "pull in delivery-truck cookbook"
[add-delivery-truck 24f7971] pull in delivery-truck cookbook
 14 files changed, 17 insertions(+), 1 deletion(-)
```

### Submit the change for review

When you set up the project, you ran `delivery init` to create the project and move it through the pipeline.

This time, since the project already exists, run `delivery review` to submit your change as a candidate to be merged into the project's `master` branch.

```bash
# ~/Development/deliver-customers-rhel
$ delivery review
Chef Delivery
Loading configuration from /home/thomaspetchel/Development/deliver-customers-rhel
Review for change add-delivery-truck targeted for pipeline master
Created new patchset
https://10.194.11.99/e/test/#/organizations/learn-chef/projects/deliver-customers-rhel/changes/a09401ca-4e39-48e4-96d7-23ed1631f9e0
```

[COMMENT] If you use GitHub, you know that pull requests let you tell others about your changes. The `delivery review` command is similar. It allows others to review your changes. Once approved, your changes can be merged into `master` and continue through the rest of the pipeline.

The first stage of the pipeline, Verify, begins and the Delivery UI appears. Trace the change's progress through the pipeline just as you did when you validated the pipeline.

1. Review the changes in the web interface. Click **Approve** when all tests pass.
1. Watch the change progress through the Build and Acceptance stages.
1. After the Acceptance stage completes, press the **Deliver** button.
1. Watch the change progress through the Acceptance, Union, Rehearsal, and Delivered stages.

[PRODNOTE] Need to go back through and see exactly what happens at each phase. For example, I don't think unit does anything because the cookbook hasn't yet changed. Verify and talk about it here...

Great work. You've successfully incorporated the `delivery-truck` cookbook into your build cookbook.

### Integrate the change locally

Just as you did for the initial `add-delivery-config` branch that set up the project, you now need to merge the `master` branch to your local repository. Here's how.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'delivery/master'.
$ git fetch
remote: Counting objects: 1, done.
remote: Total 1 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (1/1), done.
From ssh://test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel
   a9471ce..bd8a8b2  master     -> delivery/master
$ git pull delivery master
From ssh://test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel
 * branch            master     -> FETCH_HEAD
Updating a9471ce..bd8a8b2
Fast-forward
 .delivery/build-cookbook/Berksfile             | 3 +++
 .delivery/build-cookbook/metadata.rb           | 2 ++
 .delivery/build-cookbook/recipes/default.rb    | 1 +
 .delivery/build-cookbook/recipes/deploy.rb     | 1 +
 .delivery/build-cookbook/recipes/functional.rb | 1 +
 .delivery/build-cookbook/recipes/lint.rb       | 1 +
 .delivery/build-cookbook/recipes/provision.rb  | 1 +
 .delivery/build-cookbook/recipes/publish.rb    | 1 +
 .delivery/build-cookbook/recipes/quality.rb    | 1 +
 .delivery/build-cookbook/recipes/security.rb   | 1 +
 .delivery/build-cookbook/recipes/smoke.rb      | 1 +
 .delivery/build-cookbook/recipes/syntax.rb     | 1 +
 .delivery/build-cookbook/recipes/unit.rb       | 1 +
 .delivery/config.json                          | 2 +-
 14 files changed, 17 insertions(+), 1 deletion(-)
```

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/deliver-customers-rhel/tree/add-delivery-truck-v1.0.0) (tag `add-delivery-truck-v1.0.0`.)
