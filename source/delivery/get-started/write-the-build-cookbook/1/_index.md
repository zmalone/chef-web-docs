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

The build cookbook exists in the <% fp '.delivery' %> directory. Modify<br><% fp '~/Development/deliver-customers-rhel/.delivery/build-cookbook/metadata.rb' %> like this. The metadata file lists which cookbooks the build cookbook depends on.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/metadata.rb
name 'build-cookbook'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
version '0.1.0'

depends 'delivery-truck'
```

Now modify <% fp '~/Development/deliver-customers-rhel/.delivery/build-cookbook/Berksfile' %> like this. The <% fp 'Berksfile' %> describes where to get dependent cookbooks.

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

We also specify where to get `delivery-sugar`, which is a cookbook that `delivery-truck` depends on.

The [Learn to manage a basic Red Hat Enterprise Linux web application](/manage-a-web-app/rhel) tutorial [explains Berkshelf in greater detail](/manage-a-web-app/rhel/apply-and-verify-your-web-server-configuration).

### Include the delivery-truck cookbook's recipes

Now you'll include each of the `delivery-truck` cookbook's recipes in your build cookbook's recipes.

For example, make your `build-cookcook` cookbook's default recipe, <% fp 'default.rb' %>, look like this.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/default.rb
include_recipe 'delivery-truck::default'
```

Make your `lint` recipe, <% fp 'lint.rb' %>, look like this.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/lint.rb
include_recipe 'delivery-truck::lint'
```

Follow the same pattern for all recipes: <% fp 'default.rb' %>, <% fp 'deploy.rb' %>, <% fp 'functional.rb' %>, <% fp 'lint.rb' %>, <% fp 'provision.rb' %>, <% fp 'publish.rb' %>, <% fp 'quality.rb' %>, <% fp 'security.rb' %>, <% fp 'smoke.rb' %>, <% fp 'syntax.rb' %>, and <% fp 'unit.rb' %>.

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
 13 files changed, 16 insertions(+)
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

[COMMENT] If you use GitHub, you know that pull requests let you tell others about your changes. The `delivery review` command is similar. It allows others to review your changes. Once approved, Delivery merges your changes into `master` and continues through the rest of the pipeline.

The first stage of the pipeline, Verify, begins and the Delivery UI appears. Trace the change's progress through the pipeline just as you did when you validated the pipeline.

1. Review the changes in the web interface. Click **Approve** when all tests pass.
1. Watch the change progress through the Build and Acceptance stages.
1. After the Acceptance stage completes, press the **Deliver** button.
1. Watch the change progress through the Acceptance, Union, Rehearsal, and Delivered stages.

As each stage runs, notice that it still doesn't do much work, even though the `awesome_customers` cookbook is part of the Git repo.

For example, the `delivery-truck` cookbook's `lint` recipe runs Foodcritic and RuboCop ([source code](https://github.com/chef-cookbooks/delivery-truck/blob/master/recipes/lint.rb)).

```ruby
# lint.rb
changed_cookbooks.each do |cookbook|
  # Run Foodcritic against any cookbooks that were modified.
  execute "lint_foodcritic_#{cookbook.name}" do
    command "foodcritic -f correctness #{foodcritic_tags} #{foodcritic_excludes} #{cookbook.path}"
  end

  # Run Rubocop against any cookbooks that were modified.
  execute "lint_rubocop_#{cookbook.name}" do
    command "rubocop #{cookbook.path}"
    only_if { File.exist?(File.join(cookbook.path, '.rubocop.yml')) }
  end
end
```

But you'll see in the Delivery UI that 0 resources updated during the lint phase.

![](delivery/lint-no-action.png)

That's because the `delivery-truck` cookbook acts only on cookbooks that have _changed_ as part of the current Git commit. This enables the pipeline to move more quickly by performing only necessary work.

The `changed_cookbooks` method, which the `delivery-sugar` cookbook defines, detects which cookbooks in the repo's <% fp 'cookbooks' %> directory have changed. Your build cookbook changed, but the `awesome_customers` cookbook did not.

Although the phases did no real work, this is a good indication that the `delivery-truck` cookbook is properly integrated.

### Integrate the change locally

Just as you did for the initial `add-delivery-config` branch that set up the project, you now need to pull Delivery's `master` branch locally. Here's how.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'delivery/master'.
$ git pull --prune
From ssh://test@10.194.13.148:8989/test/learn-chef/deliver-customers-rhel
 x [deleted]         (none)     -> delivery/_for/master/add-delivery-truck
remote: Counting objects: 1, done.
remote: Total 1 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (1/1), done.
   eb8e5b7..c7b5796  master     -> delivery/master
Updating eb8e5b7..c7b5796
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
 13 files changed, 16 insertions(+)
```

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/customers-web-app-delivery/tree/ref-add-delivery-truck-v1.0.0) (tag `ref-add-delivery-truck-v1.0.0`.)
