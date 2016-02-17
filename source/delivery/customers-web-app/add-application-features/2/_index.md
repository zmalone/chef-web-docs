## 2. Add a feature: add more sample rows to the database

In this step, you'll add more rows of data to the database and you'll also add each customer's latitude and longitude.

### Get the branch

The code for this feature is already in GitHub in a branch named `add_sample_data`. Run these commands to fetch that and merge it with your `master` branch.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout -b add_sample_data origin/add_sample_data
Branch add_sample_data set up to track remote branch add_sample_data from origin.
Switched to a new branch 'add_sample_data'
$ git merge master
Updating 7ce3398..9fabbe3
Fast-forward
 .delivery/build-cookbook/.kitchen.yml              |  21 +++
 .delivery/build-cookbook/Berksfile                 |  12 ++
 .delivery/build-cookbook/LICENSE                   |   3 +
 .delivery/build-cookbook/README.md                 | 146 +++++++++++++++++++++
 .delivery/build-cookbook/attributes/default.rb     |  19 +++
 .delivery/build-cookbook/chefignore                |  97 ++++++++++++++
 .../data_bags/keys/delivery_builder_keys.json      |   1 +
 .delivery/build-cookbook/metadata.rb               |   8 ++
 .delivery/build-cookbook/recipes/_aws_creds.rb     |  34 +++++
 .delivery/build-cookbook/recipes/default.rb        |   6 +
 .delivery/build-cookbook/recipes/deploy.rb         |  65 +++++++++
 .delivery/build-cookbook/recipes/functional.rb     |   6 +
 .delivery/build-cookbook/recipes/lint.rb           |   6 +
 .delivery/build-cookbook/recipes/provision.rb      |  67 ++++++++++
 .delivery/build-cookbook/recipes/publish.rb        |  20 +++
 .delivery/build-cookbook/recipes/quality.rb        |   6 +
 .delivery/build-cookbook/recipes/security.rb       |   6 +
 .delivery/build-cookbook/recipes/smoke.rb          |   6 +
 .delivery/build-cookbook/recipes/syntax.rb         |   6 +
 .delivery/build-cookbook/recipes/unit.rb           |   6 +
 .delivery/build-cookbook/secrets/fakey-mcfakerton  |   0
 .delivery/build-cookbook/spec/spec_helper.rb       |   2 +
 .../spec/unit/recipes/_aws_creds_spec.rb           |  20 +++
 .../test/fixtures/cookbooks/test/metadata.rb       |   2 +
 .../fixtures/cookbooks/test/recipes/default.rb     |   7 +
 .delivery/config.json                              |  15 +++
 cookbooks/awesome_customers/metadata.rb            |   2 +-
 27 files changed, 588 insertions(+), 1 deletion(-)
 create mode 100644 .delivery/build-cookbook/.kitchen.yml
 create mode 100644 .delivery/build-cookbook/Berksfile
 create mode 100644 .delivery/build-cookbook/LICENSE
 create mode 100644 .delivery/build-cookbook/README.md
 create mode 100644 .delivery/build-cookbook/attributes/default.rb
 create mode 100644 .delivery/build-cookbook/chefignore
 create mode 100644 .delivery/build-cookbook/data_bags/keys/delivery_builder_keys.json
 create mode 100644 .delivery/build-cookbook/metadata.rb
 create mode 100644 .delivery/build-cookbook/recipes/_aws_creds.rb
 create mode 100644 .delivery/build-cookbook/recipes/default.rb
 create mode 100644 .delivery/build-cookbook/recipes/deploy.rb
 create mode 100644 .delivery/build-cookbook/recipes/functional.rb
 create mode 100644 .delivery/build-cookbook/recipes/lint.rb
 create mode 100644 .delivery/build-cookbook/recipes/provision.rb
 create mode 100644 .delivery/build-cookbook/recipes/publish.rb
 create mode 100644 .delivery/build-cookbook/recipes/quality.rb
 create mode 100644 .delivery/build-cookbook/recipes/security.rb
 create mode 100644 .delivery/build-cookbook/recipes/smoke.rb
 create mode 100644 .delivery/build-cookbook/recipes/syntax.rb
 create mode 100644 .delivery/build-cookbook/recipes/unit.rb
 create mode 100644 .delivery/build-cookbook/secrets/fakey-mcfakerton
 create mode 100644 .delivery/build-cookbook/spec/spec_helper.rb
 create mode 100644 .delivery/build-cookbook/spec/unit/recipes/_aws_creds_spec.rb
 create mode 100644 .delivery/build-cookbook/test/fixtures/cookbooks/test/metadata.rb
 create mode 100644 .delivery/build-cookbook/test/fixtures/cookbooks/test/recipes/default.rb
 create mode 100644 .delivery/config.json
```

Your `add_sample_data` now contains the new feature as well as your build cookbook.

It's recommended to always update your cookbook's version metadata to ensure that each version is tied to a specific set of functionality. In <code class="file-path">metadata.rb</code>, update the `awesome_customers` cookbook's version from 1.0.0 to 1.1.0, like this.

```ruby
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers/metadata.rb
name 'awesome_customers'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
description 'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version '1.1.0'

depends 'httpd', '~> 0.2.18'
depends 'selinux', '~> 0.9.0'
depends 'iptables', '~> 1.0.0'
depends 'mysql2_chef_gem', '~> 1.0.1'
depends 'mysql', '~> 6.0.17'
depends 'database', '~> 4.0.3'
```

### Run lint, syntax, and unit tests

Let's run the same lint, syntax, and unit tests that our build cookbook performs. That will help ensure that your change moves through the pipeline smoothly.

First, move to the `awesome_customers` cookbook directory, <code class="file-path">~/Development/deliver-customers-rhel/cookbooks/awesome_customers</code>.

```bash
# ~/Development/deliver-customers-rhel
$ cd cookbooks/awesome_customers
```

Run Foodcritic.

```bash
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers
$ foodcritic .

```

Foodcritic finds no issues.

Now run RuboCop.

```bash
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers
$ rubocop .
Inspecting 16 files
................

16 files inspected, no offenses detected
```

Like Foodcritic, RuboCop reports no issues.

The `awesome_customers` cookbook comes [complete with unit tests](/test-your-infrastructure-code/rhel/test-the-web-application-cookbook/#step2) in the form of ChefSpec specs.

Run RSpec to match what's performed by the unit phase.

```bash
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers
$ rspec --format documentation --color
[...]
Finished in 47.66 seconds (files took 8.35 seconds to load)
11 examples, 0 failures

```

All tests pass! You're now ready to try your new feature on a local virtual machine instance that resembles your infrastructure environments for the Acceptance, Union, Rehearsal, and Delivered stages.

### Run the cookbook on a Test Kitchen instance

In [this earlier tutorial](/local-development/rhel/apply-the-web-application-cookbook-locally/), you used Test Kitchen to apply the `awesome_customers` cookbook on a Test Kitchen instance. The idea is run your infrastructure code in a temporary, isolated environment that resembles your production environment. When you develop locally, you're able to get feedback more quickly.

The `awesome_customers` cookbook comes with a Test Kitchen configuration file, <code class="file-path">.kitchen.yml</code> which runs the cookbook on a CentOS 6.6 instance. One feature of the configuration file is that it assigns the instance the IP address 192.168.33.33, which is in the private address space, so that we can access the web application from the host machine.

First run `kitchen list` to verify that the instance does not yet exist.

```bash
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers
$ kitchen list
Instance           Driver   Provisioner  Verifier  Transport  Last Action
default-centos-66  Vagrant  ChefZero     Busser    Ssh        <Not Created>
```

Now run `kitchen converge` to bring up the virtual machine, install `chef-client`, and apply your cookbook.

```bash
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers
$ kitchen converge
-----> Starting Kitchen (v1.4.2)
-----> Creating <default-centos-66>...
       Bringing machine 'default' up with 'virtualbox' provider...==> default: Box 'opscode-centos-6.6' could not be found. Attempting to find and install...
           default: Box Provider: virtualbox
           default: Box Version: >= 0
[...]
       Recipe: awesome_customers::webserver
         * httpd_service[customers] action restart

             - restart service service[customers delete httpd-customers]


       Running handlers:
       Running handlers complete

       Chef Client finished, 114/175 resources updated in 03 minutes 35 seconds
       Finished converging <default-centos-66> (4m5.04s).
-----> Kitchen is finished. (4m47.99s)
```

After the run completes, open a web browser and navigate to http://192.168.33.33/. You'll see this.

![](delivery/customers-sample-data.png)

Great! You now see additional rows in the table, along with each customer's location. The feature appears to be working.

### Run Serverspec tests on your instance

Serverspec provides a kind of integration testing, where you verify that multiple components function correctly together. Although we don't run Serverspec tests from our Chef Delivery pipeline, running them now will help quickly validate that the change will succeed in the pipeline.

Let's do one more verification check and confirm that all Serverspec tests pass. You wrote a few basic tests [in a previous tutorial](/test-your-infrastructure-code/rhel/test-the-web-application-cookbook/#step1).

Run `kitchen verify` to run the Serverspec tests on your instance.

```bash
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers
$ kitchen verify
-----> Starting Kitchen (v1.4.2)
-----> Setting up <default-centos-66>...
       Finished setting up <default-centos-66> (0m0.00s).
-----> Verifying <default-centos-66>...
       Preparing files for transfer
-----> Installing Busser (busser)
[...]
       the customers web application
         is up and running

       the web_admin user
         has home directory /home/web_admin
         has login shell /bin/bash

       the default home page
         is owned by web_admin

       the httpd-customers service
         is enabled
         is running

       the default home page
         exists
         is a file
         has mode 644

       Finished in 0.20252 seconds (files took 0.27624 seconds to load)
       9 examples, 0 failures

       Finished verifying <default-centos-66> (5m19.45s).
-----> Kitchen is finished. (5m19.95s)
```

All tests pass. You're now ready to submit your change to the pipeline.

### Submit your change to the pipeline

Run `git status` to see the staged changes.

```bash
# ~/Development/deliver-customers-rhel/cookbooks
$ git status
On branch add_sample_data
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   metadata.rb

no changes added to commit (use "git add" and/or "git commit -a")
```

Run `git add` and then `git commit` to commit the change to your local `add_sample_data` branch.

```bash
# ~/Development/deliver-customers-rhel/cookbooks
$ git add .
$ git commit -m "add sample data"
[add_sample_data 6236ee8] add sample data
 1 file changed, 1 insertion(+), 1 deletion(-)
```

Now run `delivery review` to submit your changes to the pipeline.

```bash
# ~/Development/deliver-customers-rhel/cookbooks
$ cd ~/Development/deliver-customers-rhel
$ delivery review
Chef Delivery
Loading configuration from /home/thomaspetchel/Development/deliver-customers-rhel
Review for change add_sample_data targeted for pipeline master
Created new patchset
https://10.194.11.99/e/test/#/organizations/learn-chef/projects/deliver-customers-rhel/changes/d1156bd3-c06f-4337-b0df-de6e187dff05
```

After the Delivery UI appears, trace the change's progress through the pipeline to the Acceptance stage, as you did previously.

1. Review the changes in the web interface. Click **Approve** when all tests pass.
1. Watch the change progress through the Build and Acceptance stages.

After Acceptance succeeds, don't press the **Deliver** button. We'll queue up our second feature and deliver them both to Union as a single unit.

### Verify the deployment to the Acceptance stage

Let's verify that the Customers web application successfully deployed to your Acceptance stage.

Follow the [same steps](/delivery/customers-web-app/write-the-build-cookbook#verifythedeploymenttotheacceptancestage) as you did previously to obtain the web server's IP address and then navigate to your home page.

Here's what you'll see.

![](delivery/customers-sample-data-acceptance.png)

### Integrate the change

Like before, switch to your `master` branch, then pull Delivery's `master` branch.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'delivery/master'.
$ git pull --prune
From ssh://test@10.194.13.148:8989/test/learn-chef/deliver-customers-rhel
 x [deleted]         (none)     -> delivery/_for/master/add_sample_data_delivery
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 1), reused 0 (delta 0)
Unpacking objects: 100% (3/3), done.
   7c3b1f1..225f1e0  master     -> delivery/master
Updating 7c3b1f1..225f1e0
Fast-forward
 cookbooks/awesome_customers/attributes/default.rb  |  2 ++
 .../files/default/add-sample-data.sql              | 25 +++++++++++++++++
 .../files/default/create-tables.sql                |  7 ++---
 .../files/default/drop-tables.sql                  |  1 +
 cookbooks/awesome_customers/metadata.rb            |  2 +-
 cookbooks/awesome_customers/recipes/database.rb    | 32 +++++++++++++++++++++-
 .../spec/unit/recipes/database_spec.rb             |  2 ++
 8 files changed, 65 insertions(+), 6 deletions(-)
 create mode 100644 cookbooks/awesome_customers/files/default/add-sample-data.sql
 create mode 100644 cookbooks/awesome_customers/files/default/drop-tables.sql
```

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/deliver-customers-rhel/tree/ref-add_sample_data_delivery-v1.0.0) (tag `ref-add_sample_data_delivery-v1.0.0`.)
