## 2. Add a feature: add more sample rows to the database

In this step, you'll add more rows of data to the database and you'll also add each customer's latitude and longitude.

### Get the branch

The code for this feature is already in GitHub. Run these commands to fetch and merge the branch to your local repo.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout -b add_sample_data origin/add_sample_data
Branch add_sample_data set up to track remote branch add_sample_data from origin.
Switched to a new branch 'add_sample_data'
$ git merge master
Auto-merging cookbooks/awesome_customers/metadata.rb
CONFLICT (content): Merge conflict in cookbooks/awesome_customers/metadata.rb
Automatic merge failed; fix conflicts and then commit the result.
```

You'll notice there was a merge conflict. That's because your history has diverged from the GitHub repo, and Git doesn't know which version to accept.

```ruby
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers/metadata.rb
name 'awesome_customers'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
description 'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
<<<<<<< HEAD
version '1.1.0'
=======
version '1.0.0'
>>>>>>> master

depends 'httpd', '~> 0.2.18'
depends 'selinux', '~> 0.9.0'
depends 'iptables', '~> 1.0.0'
depends 'mysql2_chef_gem', '~> 1.0.1'
depends 'mysql', '~> 6.0.17'
depends 'database', '~> 4.0.3'
```

Take the `HEAD` version (the one from the `add_sample_data` branch) by modifying <code class="file-path">metadata.rb</code> like this.

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

Now run `git add` to resolve the merge conflict.

```bash
# ~/Development/deliver-customers-rhel
$ git add cookbooks/awesome_customers/metadata.rb
```

[COMMENT] We resolve the conflict this way for simplicity, but you can use Git's more advanced features to fit your workflow. For example, to avoid the merge conflict, you could [squash the branch](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Squashing-Commits) into a single commit and [cherry pick](https://git-scm.com/docs/git-cherry-pick) the changes you want.

### Run lint, syntax, and unit tests

Let's run the same lint, syntax, and unit tests that our build cookbook performs. That will help ensure that your change moves through the pipeline smoothly.

First, move to the `awesome_customers` cookbook directory, <code class="file-path">~/Development/deliver-customers-rhel/cookbooks/awesome_customers</code>.

```bash
# ~/Development/deliver-customers-rhel
$ cd cookbooks/awesome_customers/
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
Your branch is up-to-date with 'origin/add_sample_data'.
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:

	new file:   .delivery/build-cookbook/.kitchen.yml
	new file:   .delivery/build-cookbook/Berksfile
	new file:   .delivery/build-cookbook/LICENSE
	new file:   .delivery/build-cookbook/README.md
	new file:   .delivery/build-cookbook/attributes/default.rb
	new file:   .delivery/build-cookbook/chefignore
	new file:   .delivery/build-cookbook/data_bags/keys/delivery_builder_keys.json
	new file:   .delivery/build-cookbook/metadata.rb
	new file:   .delivery/build-cookbook/recipes/_aws_creds.rb
	new file:   .delivery/build-cookbook/recipes/default.rb
	new file:   .delivery/build-cookbook/recipes/deploy.rb
	new file:   .delivery/build-cookbook/recipes/functional.rb
	new file:   .delivery/build-cookbook/recipes/lint.rb
	new file:   .delivery/build-cookbook/recipes/provision.rb
	new file:   .delivery/build-cookbook/recipes/publish.rb
	new file:   .delivery/build-cookbook/recipes/quality.rb
	new file:   .delivery/build-cookbook/recipes/security.rb
	new file:   .delivery/build-cookbook/recipes/smoke.rb
	new file:   .delivery/build-cookbook/recipes/syntax.rb
	new file:   .delivery/build-cookbook/recipes/unit.rb
	new file:   .delivery/build-cookbook/secrets/fakey-mcfakerton
	new file:   .delivery/build-cookbook/spec/spec_helper.rb
	new file:   .delivery/build-cookbook/spec/unit/recipes/_aws_creds.rb_spec.rb
	new file:   .delivery/build-cookbook/spec/unit/recipes/_aws_creds_spec.rb
	new file:   .delivery/build-cookbook/test/fixtures/cookbooks/test/metadata.rb
	new file:   .delivery/build-cookbook/test/fixtures/cookbooks/test/recipes/default.rb
	new file:   .delivery/config.json
```

In practice, you would verify that each file should be staged for commit.

Run `git commit` to commit the changes to your local `add_sample_data` branch.

```bash
# ~/Development/deliver-customers-rhel/cookbooks
$ git commit -m "add sample data"
[add_sample_data 6236ee8] add sample data
```

Now run `delivery review` to submit your changes to the pipeline.

```bash
# ~/Development/deliver-customers-rhel/cookbooks
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

Follow the [same steps](/build-a-delivery-pipeline/rhel/write-the-build-cookbook#verifythechangeinacceptance) as you did previously to obtain the web server's IP address and then navigate to your home page.

Here's what you'll see.

![](delivery/customers-sample-data-acceptance.png)

### Integrate the change

Like before, switch to your `master` branch, then fetch and pull the remote `master` branch.

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
   e46f7b2..4fd27ce  master     -> delivery/master
$ git pull delivery master
From ssh://test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel
 * branch            master     -> FETCH_HEAD
Updating e46f7b2..4fd27ce
Fast-forward
 cookbooks/awesome_customers/attributes/default.rb  |  2 ++
 .../files/default/add-sample-data.sql              | 25 +++++++++++++++++
 .../files/default/create-tables.sql                |  7 ++---
 .../files/default/drop-tables.sql                  |  1 +
 cookbooks/awesome_customers/metadata.rb            |  2 +-
 cookbooks/awesome_customers/recipes/database.rb    | 32 +++++++++++++++++++++-
 .../spec/unit/recipes/database_spec.rb             |  2 ++
 7 files changed, 65 insertions(+), 6 deletions(-)
 create mode 100644 cookbooks/awesome_customers/files/default/add-sample-data.sql
 create mode 100644 cookbooks/awesome_customers/files/default/drop-tables.sql
```

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/deliver-customers-rhel/tree/ref-add_sample_data_delivery-v1.0.0) (tag `ref-add_sample_data_delivery-v1.0.0`.)
