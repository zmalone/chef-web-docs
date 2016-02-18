## 3. Add a feature: visualize customer data on an interactive control

The second change adds an interactive control that displays where our customers are on a globe. This feature uses [D3](http://d3js.org), a JavaScript library for producing interactive data visualizations.

### Get the branch

The code for this feature is already in GitHub. Run these commands to fetch and merge the branch to your local repo.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout -b visualize_data origin/visualize_data
Branch visualize_data set up to track remote branch visualize_data from origin.
Switched to a new branch 'visualize_data'
$ git merge master
Merge made by the 'recursive' strategy.
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
 .delivery/build-cookbook/recipes/smoke.rb          |  20 +++
 .delivery/build-cookbook/recipes/syntax.rb         |   6 +
 .delivery/build-cookbook/recipes/unit.rb           |   6 +
 .delivery/build-cookbook/secrets/fakey-mcfakerton  |   0
 .delivery/build-cookbook/spec/spec_helper.rb       |   2 +
 .../spec/unit/recipes/_aws_creds_spec.rb           |  20 +++
 .../test/fixtures/cookbooks/test/metadata.rb       |   2 +
 .../fixtures/cookbooks/test/recipes/default.rb     |   7 +
 .delivery/config.json                              |  15 +++
 26 files changed, 601 insertions(+)
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

As you did previously, update the version number to indicate the added functionality. The version number is now 1.2.0.

```ruby
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers/metadata.rb
name 'awesome_customers'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
description 'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version '1.2.0'

depends 'httpd', '~> 0.2.18'
depends 'selinux', '~> 0.9.0'
depends 'iptables', '~> 1.0.0'
depends 'mysql2_chef_gem', '~> 1.0.1'
depends 'mysql', '~> 6.0.17'
depends 'database', '~> 4.0.3'
```

### Run lint, syntax, and unit tests

As before, let's run the same lint, syntax, and unit tests that our build cookbook performs.

Move to the `awesome_customers` cookbook directory

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

Finally, run the ChefSpec specs.

```bash
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers
$ rspec --format documentation --color
[...]
Finished in 48.2 seconds (files took 3.87 seconds to load)
11 examples, 0 failures

```

### Run the cookbook on a Test Kitchen instance

Your Test Kitchen instance is still running, so let's run `kitchen converge` to apply our updated cookbook to the instance.

```bash
# ~/Development/deliver-customers-rhel/cookbooks/awesome_customers
$ kitchen converge
-----> Starting Kitchen (v1.4.2)
-----> Converging <default-centos-66>...
       Preparing files for transfer
[...]
         * cookbook_file[/tmp/create-tables.sql] action create (up to date)
        (skipped due to not_if)
         * cookbook_file[/tmp/add-sample-data.sql] action create (up to date)
        (skipped due to not_if)

       Running handlers:
       Running handlers complete

       Chef Client finished, 4/173 resources updated in 07 seconds
       Finished converging <default-centos-66> (0m24.38s).
-----> Kitchen is finished. (0m24.91s)
```

From a web browser, navigate to http://192.168.33.33/. You'll see this.

![](delivery/customers-visualize-data-test-kitchen.png)

### Run Serverspec tests on your instance

Like before, run `kitchen verify` to ensure that your Serverspec tests continue to pass.

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

       Finished in 0.18503 seconds (files took 0.2782 seconds to load)
       9 examples, 0 failures

       Finished verifying <default-centos-66> (0m17.66s).
-----> Kitchen is finished. (0m18.18s)
```

In practice, you might run `kitchen test`, which runs `chef-client` and your tests on a new instance, to ensure that the configuration comes up in a clean environment.

All tests pass. You're now ready to submit your change to the pipeline.

### Submit your change to the pipeline

Run `git status` to see the uncommitted changes.

```bash
# ~/Development/deliver-customers-rhel/cookbooks
$ git status
On branch visualize_data_delivery
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   cookbooks/awesome_customers/metadata.rb

no changes added to commit (use "git add" and/or "git commit -a")
```

Run `git add` and then `git commit` to commit the change to your local `add_sample_data` branch.

```bash
# ~/Development/deliver-customers-rhel
$ git add .
$ git commit -m "add data visualization"
[visualize_data 7c05d51] add data visualization
 1 file changed, 1 insertion(+), 1 deletion(-)
```

Now run `delivery review` to submit your changes to the pipeline.

```bash
# ~/Development/deliver-customers-rhel/cookbooks
$ delivery review
Chef Delivery
Loading configuration from /home/thomaspetchel/Development/deliver-customers-rhel
Review for change visualize_data targeted for pipeline master
Created new patchset
https://10.194.11.99/e/test/#/organizations/learn-chef/projects/deliver-customers-rhel/changes/9bf636e5-0dbd-47ff-84d4-cbf28f7762f1
```

When the Delivery UI appears, trace the change's progress through the pipeline.

1. Review the changes in the web interface. Click **Approve** when all tests pass.
1. Watch the change progress through the Build and Acceptance stages.
1. After the Acceptance stage completes, press the **Deliver** button.
1. Watch the change progress through the Acceptance, Union, Rehearsal, and Delivered stages.

![](delivery/customers-visualize-data-delivered-pipeline.png)

### Verify the change was successfully delivered

Let's verify that the Customers web application successfully deployed to your Delivered stage's infrastructure environment.

Follow the [same steps](/delivery/get-started/write-the-build-cookbook#verifythechangewassuccessfullydelivered) as you did previously to obtain the web server's IP address and then navigate to your home page.

Here's what you'll see.

![](delivery/customers-visualize-data-delivered.png)

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/deliver-customers-rhel/tree/ref-visualize_data_delivery-v1.0.0) (tag `ref-visualize_data_delivery-v1.0.0`.)
