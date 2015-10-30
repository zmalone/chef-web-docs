## 2. Add a feature: visualize customer data on an interactive control

The second change adds an interactive control that displays where our customers are on a globe. This feature uses [D3](http://d3js.org), a JavaScript library for producing interactive data visualizations.

### Get the branch

The code for this feature is already in GitHub. Run these commands to fetch and merge the branch to your local repo.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout -b visualize_data origin/visualize_data
Branch visualize_data set up to track remote branch visualize_data from origin.
Switched to a new branch 'visualize_data'
thomaspetchel@ubuntu:~/Development/deliver-customers-rhel$ git merge master
Merge made by the 'recursive' strategy.
 .delivery/build-cookbook/.kitchen.yml              |  21 +++
 .delivery/build-cookbook/Berksfile                 |  12 ++
 .delivery/build-cookbook/LICENSE                   |   3 +
[...]
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

Run `git status` to see the committed changes.

```bash
# ~/Development/deliver-customers-rhel/cookbooks
$ git status
On branch visualize_data
Your branch is ahead of 'origin/visualize_data' by 51 commits.
  (use "git push" to publish your local commits)
nothing to commit, working directory clean
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
1. After the Acceptance completes, press the **Deliver** button.
1. Watch the change progress through the Acceptance, Union, Rehearsal, and Delivered stages.

![](delivery/customers-visualize-data-delivered-pipeline.png)

### Verify the change was successfully delivered

Let's verify that the Customers web application successfully deployed to your Delivered stage's infrastructure environment.

Follow the [same steps](/build-a-delivery-pipeline/rhel/write-the-build-cookbook#verifythechangewassuccessfullydelivered) as you did previously to obtain the web server's IP address and then navigate to your home page.

Here's what you'll see.

![](delivery/customers-visualize-data-delivered.png)

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/deliver-customers-rhel/tree/visualize_data_delivery-v1.0.0) (tag `visualize_data_delivery-v1.0.0`.)
