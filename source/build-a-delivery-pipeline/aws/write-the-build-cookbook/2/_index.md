## 2. Publish the awesome_customers cookbook to your Chef server

Where you publish your projects is up to you. You might publish a cookbook project to Chef server, Chef Supermarket, GitHub, or all of the above.

In this tutorial, you'll publish the `awesome_customers` cookbook to Chef server. You'll also need to publish an encrypted data bag to Chef server. This data bag contains encrypted database passwords that `awesome_customers` requires to set up the web application ([learn more about the process](/manage-a-web-app/rhel/create-a-password-store/).)

The `delivery-truck` cookbook's `publish` recipe is already set up to publish your cookbook to Chef server, Chef Supermarket, and GitHub. You set node attributes to specify which targets to publish to.

### Create a branch

First, verify that you're on the `master` branch.

```bash
# ~/Development/deliver-customers-rhel
$ git branch
  add-delivery-config
  add-delivery-truck
* master
```

Run these commands to create the `publish-customers-app` branch and verify that you're on that branch.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout -b publish-customers-app
Switched to a new branch 'publish-customers-app'
$ git branch
  add-delivery-config
  add-delivery-truck
  master
* publish-customers-app
```

### Create a default node attributes file

To enable the `delivery-truck` cookbook to upload your cookbook to Chef server, you need to set a node attribute. First, create a default node attributes file.

Run this command to generate the file.

```bash
# ~/Development/deliver-customers-rhel
$ chef generate attribute .delivery/build-cookbook default
Compiling Cookbooks...
Recipe: code_generator::attribute
  * directory[./.delivery/build-cookbook/attributes] action create
    - create new directory ./.delivery/build-cookbook/attributes
  * template[./.delivery/build-cookbook/attributes/default.rb] action create
    - create new file ./.delivery/build-cookbook/attributes/default.rb
    - update content in file ./.delivery/build-cookbook/attributes/default.rb from none to e3b0c4
    (diff output suppressed by config)
```

### Set the node attribute to publish to Chef server

To tell the `delivery-truck` cookbook that you want to publish your cookbooks to Chef server, you need to set the `node['delivery']['config']['delivery-truck']['publish']['chef_server']` attribute.

Add this to your default node attributes file, <code class="file-path">default.rb</code>.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/attributes/default.rb
default['delivery']['config']['delivery-truck']['publish']['chef_server'] = true
```

The `delivery-truck` cookbook reads this attribute and automatically uploads any changed cookbooks to the Chef server during the publish phase, which is part of the Build stage.

### Prepare your encryption key and encrypted data bag items

If you've gone through the [Learn to manage a basic Red Hat Enterprise Linux web application](/manage-a-web-app/rhel) tutorial, copy your encrypted data bag items, <code class="file-path">db\_admin\_password.json</code> and <code class="file-path">sql\_server\_root\_password.json</code> to the <code class="file-path">~/Development/deliver-customers-rhel/data\_bags/passwords</code> directory. You can then move to the next step. You'll handle getting your data bag encryption key to the Chef server a bit later.

If you haven't gone through this tutorial, or no longer have your encrypted data bag items or your encryption key, you'll create them now.

The first step is to replace the encrypted versions of the data bag items that come with the project with plain-text versions, like this. The passwords can be anything you want.

```ruby
# ~/Development/deliver-customers-rhel/data_bags/passwords/db_admin_password.json
{
  "id": "db_admin_password",
  "password": "database_password"
}
```

```ruby
# ~/Development/deliver-customers-rhel/data_bags/passwords/sql_server_root_password.json
{
  "id": "sql_server_root_password",
  "password": "learnchef_mysql"
}
```

Next, perform [step 1](/manage-a-web-app/rhel/create-a-password-store#step1) from this previous tutorial lesson to create an encryption key.

Then perform [step 8](/manage-a-web-app/rhel/create-a-password-store#step8) from that same lesson to encrypt the data bag items locally.

You don't have to perform the other steps because you'll write code that uploads your encrypted data bag items to the Chef server in a later step.

### Upload the encrypted data bag items

The `delivery-truck` cookbook's `publish` recipe takes care of uploading the `awesome_customers` cookbook to Chef server for us. We need to now set up the build cookbook's `publish` recipe to upload the data bag items.

The build node runs the build cookbook in local mode, which means that the cookbook runs on a temporary, in-memory Chef server (we introduced running `chef-client` in local mode [in the first tutorial](/learn-the-basics/rhel/make-your-recipe-more-manageable#step4)). In order to upload the encrypted data bag to the Chef server, we need to change the behavior of `chef-client` to work with our Chef server.

To do that, you call the `with_server_config` helper method. This helper method sets the Chef server configuration, calls the provided block, and then restores the previous configuration.

To upload the encrypted data bag items, we'll use the built-in `execute` resource to run the `knife` command. We need to both create the data bag and then upload our two data bag items.

Write out your build cookbook's `publish` recipe like this.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/publish.rb
include_recipe 'delivery-truck::publish'

with_server_config do
  execute 'create passwords data bag' do
    cwd node['delivery']['workspace']['repo']
    command "knife data bag create passwords --config #{delivery_knife_rb}"
    not_if "knife data bag list --config #{delivery_knife_rb} | grep '^passwords$'"
  end
  %w(db_admin_password sql_server_root_password).each do |data_bag_item|
    execute "create #{data_bag_item} data bag item" do
      cwd node['delivery']['workspace']['repo']
      command "knife data bag from file passwords #{data_bag_item}.json --config #{delivery_knife_rb}"
    end
  end
end
```

The first `execute` resource uses a `not_if` guard to ensure that the data bag is created only if it doesn't exist. The second `execute` resource uploads the data bag items each time they go through the pipeline in case they ever change.

### Increment the awesome_customers cookbook's version

Recall that the `delivery-truck` cookbook acts only on cookbooks that have changed to enable the pipeline to move more quickly.

Let's make a basic change to `awesome_customers` to trigger the unit, lint, syntax, and publish phases to run. You'll increment the `awesome_customers` cookbook's version from 0.3.0 to 1.0.0, which, according to [Semantic Versioning](http://semver.org), marks the cookbook as ready for production.

In your `awesome_customers` cookbook's metadata file, <code class="file-path">metadata.rb</code>, update the `version` field from 0.3.0 to 1.0.0, like this.

```ruby
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers/metadata.rb
name 'awesome_customers'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
description 'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version '1.0.0'

depends 'httpd', '~> 0.2.18'
depends 'selinux', '~> 0.9.0'
depends 'iptables', '~> 1.0.0'
depends 'mysql2_chef_gem', '~> 1.0.1'
depends 'mysql', '~> 6.0.17'
depends 'database', '~> 4.0.3'
```

Run these commands to commit your changes.

```bash
# ~/Development/deliver-customers-rhel
$ git status
On branch publish-customers-app
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   .delivery/build-cookbook/recipes/publish.rb
	modified:   cookbooks/awesome_customers/metadata.rb

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.delivery/build-cookbook/attributes/

no changes added to commit (use "git add" and/or "git commit -a")
$ git add .
$ git commit -m "publish version 1.0.0 to Chef server"
[publish-customers-app 148aac2] publish version 1.0.0 to Chef server
 3 files changed, 16 insertions(+), 1 deletion(-)
 create mode 100644 .delivery/build-cookbook/attributes/default.rb
```

Now run `delivery review` to submit your changes to the pipeline.

```bash
# ~/Development/deliver-customers-rhel
$ delivery review
Chef Delivery
Loading configuration from /home/thomaspetchel/Development/deliver-customers-rhel
Review for change publish-customers-app targeted for pipeline master
Created new patchset
https://10.194.11.99/e/test/#/organizations/learn-chef/projects/deliver-customers-rhel/changes/ac585f79-2d35-4e4d-ae57-c83d1b4922ba
```

Because we changed the `awesome_customers` cookbook, you'll see the unit, lint and syntax phases test the `awesome_customers` cookbook. For example, the lint phase now runs Foodcritic and RuboCop.

![](delivery/delivery-lint.png)

Trace the change's progress through the pipeline to the Acceptance stage, as you did when you validated the pipeline.

1. Review the changes in the web interface. Click **Approve** when all tests pass.
1. Watch the change progress through the Build and Acceptance stages.

After Acceptance succeeds, don't press the **Deliver** button. We'll queue up additional changes and deliver them to Union as a single unit.

### Verify that the awesome_customers cookbook and the data bag are on your Chef server

The publish phase uploads your cookbooks and any dependencies that are listed in your <code class="file-path">Berksfile</code>.

Let's verify that your cookbook is on the Chef server. There are two ways to do this &ndash; from the command line or from the Chef management console.

#### Verify from the command line

The `delivery-cluster` cookbook sets up a `knife` configuration file, <code class="file-path">knife.rb</code>, and server certificates to enable you to administer your Chef server from your workstation or provisioning node.

To verify the status of the `awesome_customers` cookbook from the command line, first, move to the <code class="file-path">~/Development/delivery-cluster</code> directory.

```bash
# ~/Development/deliver-customers-rhel
$ cd ~/Development/delivery-cluster
```

You'll see your <code class="file-path">knife.rb</code> file and the <code class="file-path">trusted_certs</code> directory, which contains the Chef server's SSL certificates.

```bash
# ~/Development/delivery-cluster
$ ls .chef
delivery-cluster-data       knife.rb          syntaxcache
delivery-cluster-data-test  local-mode-cache  trusted_certs
```

Run the `knife cookbook list` command to list all cookbooks and then search the result for the `awesome_customers` cookbook.

```bash
# ~/Development/delivery-cluster
$ knife cookbook list | grep awesome_customers
awesome_customers     1.0.0
```

As expected, version 1.0.0 is on the Chef server.

Now run `knife data bag show passwords` to list the contents of the passwords data bag.

```bash
# ~/Development/delivery-cluster
$ knife data bag show passwords
db_admin_password
sql_server_root_password
```

As expected, the data bag exists and contains the database administrator and root passwords.

#### Verify from the Chef management console

When you use the `delivery-cluster` cookbook to set up your Chef server, the cookbook installs the Chef management console.

To access the management console, you'll need the Chef server URL and the administrator password. To get the Chef server URL, first move to the <code class="file-path">~/Development/delivery-cluster</code> directory.

```bash
# ~/Development/delivery-cluster
$ cd ~/Development/delivery-cluster
```

Now run the `rake info:list_core_services` command to see information about your Chef Delivery cluster.

```bash
# ~/Development/delivery-cluster
$ rake info:list_core_services
2 items found

delivery-server-test:
  ipaddress: 10.194.11.99

build-node-test-1:
  ipaddress: 10.194.13.122

chef_server_url      'https://10.194.12.65/organizations/test'
```

Navigate to your `chef_server_url` and login with username `delivery` and password `delivery`.

From the **Policy** tab, you'll see that the `awesome_customers` cookbook's version is listed as 1.0.0.

![](delivery/management-console-customers-cookbook.png)

Choose **Data Bags** from the menu on the left, then select **passwords**. You'll see the items for the database administrator and root passwords.

![](delivery/management-console-passwords-data-bag.png)

[WARN] Use caution when downloading the Starter Kit from Chef server. Downloading the Starter Kit resets its keys, which would need to be redeployed across your Delivery cluster.<br><br>We recommend that you administer your Chef server from the workstation or provisioning node that you installed Chef Delivery from.<br><br>You should only download the Starter Kit in the case of a security breach, for instance, in the case of leaked or otherwise comprised keys.

### Integrate the change locally

As we did previously, we need to pull Delivery's `master` branch locally. Here's a reminder how.

First, move to your <code class="file-path">~/Development/deliver-customers-rhel</code> directory.

```bash
# ~/Development/delivery-cluster
$ cd ~/Development/deliver-customers-rhel
```

Now run these commands.

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
   bd8a8b2..a100d45  master     -> delivery/master
$ git pull delivery master
From ssh://test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel
 * branch            master     -> FETCH_HEAD
Updating bd8a8b2..a100d45
Fast-forward
 .delivery/build-cookbook/attributes/default.rb |  1 +
 .delivery/build-cookbook/recipes/publish.rb    | 14 ++++++++++++++
 cookbooks/awesome_customers/metadata.rb        |  2 +-
 3 files changed, 16 insertions(+), 1 deletion(-)
 create mode 100644 .delivery/build-cookbook/attributes/default.rb
```

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/deliver-customers-rhel/tree/publish-customers-app-v1.0.0) (tag `publish-customers-app-v1.0.0`.)
