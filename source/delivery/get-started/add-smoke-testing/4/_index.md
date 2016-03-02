## 4. Deploy to the Acceptance stage

[CALLOUT networks/team-members-workstation.svg] Perform this part from a team member's workstation.

Now that we know that the Acceptance stage is provisioned, we can deploy to it. In this step, we write the recipe for the deploy phase.

### Create a branch

First, verify that you're on the `master` branch.

```bash
# ~/Development/deliver-customers-rhel
$ git branch
  add-delivery-config
  add-delivery-truck
* master
  provision-environments
  publish-customers-app
```

Run these commands to create the `deploy-customers-app` branch and verify that you're on that branch.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout -b deploy-customers-app
Switched to a new branch 'deploy-customers-app'
$ git branch
  add-delivery-config
  add-delivery-truck
* deploy-customers-app
  master
  provision-environments
  publish-customers-app
```

### Write the recipe

In the provision phase, we set the `chef_environment` attribute to associate the machine with an [environment](https://docs.chef.io/environments.html).

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/provision.rb
# [...]
machine "#{stage}-#{project}" do
  action [:setup]
  chef_environment delivery_environment
  converge false
  files '/etc/chef/encrypted_data_bag_secret' => File.join(database_passwords_key_path, 'database_passwords_key')
  run_list node[project]['run_list']
  add_machine_options bootstrap_options: {
    key_name: ssh_key['name'],
    key_path: ssh_private_key_path,
  }
  add_machine_options node[project][stage]['aws']['config']['machine_options']
end
```

The provision and deploy phases run the Acceptance, Union, Rehearsal, and Delivered stages. When the recipe runs in each stage, Chef provisioning assigns the machine to the current Chef environment.

In the deploy phase, we can use [search](https://docs.chef.io/chef_search.html) to find the names of every node in the current Chef environment (see lines 39 through 45, below.) This technique is useful when you associate multiple infrastructure nodes with a stage, such as in a multi-tier application.

Write out your `deploy` recipe like this.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/deploy.rb
include_recipe 'delivery-truck::deploy'
include_recipe 'chef-sugar'

load_delivery_chef_config

# Decrypt the SSH private key Chef provisioning uses to connect to the machine and save the key to disk.
ssh_key = encrypted_data_bag_item_for_environment('provisioning-data', 'ssh_key')
ssh_private_key_path = File.join(node['delivery']['workspace']['cache'], '.ssh')
directory ssh_private_key_path
file File.join(ssh_private_key_path, "#{ssh_key['name']}.pem")  do
  sensitive true
  content ssh_key['private_key']
  owner node['delivery_builder']['build_user']
  group node['delivery_builder']['build_user']
  mode '0600'
end

# Read common configuration options from node attributes.
project = node['delivery']['change']['project'] # for example, 'deliver-customers-rhel'
stage = node['delivery']['change']['stage'] # for example, 'acceptance' or 'union'

# Load AWS credentials.
include_recipe "#{cookbook_name}::_aws_creds"

# Load the AWS driver.
require 'chef/provisioning/aws_driver'
# Set the AWS driver as the current one.
with_driver 'aws'

# Specify information about our Chef server.
# Chef provisioning uses this information to bootstrap the machine.
with_chef_server Chef::Config[:chef_server_url],
  client_name: Chef::Config[:node_name],
  signing_key_filename: Chef::Config[:client_key],
  ssl_verify_mode: :verify_none,
  verify_api_cert: false

# Create a search query that matches the current environment.
search_query = "chef_environment:#{delivery_environment}"

# Run the query.
nodes = delivery_chef_server_search(:node, search_query)

# Replace each result with just the node's name.
nodes.map!(&:name)

# Run chef-client on each machine in the current environment.
nodes.each do |name|
  machine name do
    action [:converge_only]
    chef_environment delivery_environment
    converge true
    run_list node[project]['run_list']
    add_machine_options bootstrap_options: {
      key_name: ssh_key['name'],
      key_path: ssh_private_key_path,
    }
    add_machine_options node[project][stage]['aws']['config']['machine_options']
  end
end
```

The `machine` resource resembles the one you used in your provision phase, except that it uses the `:converge_only` action to run `chef-client` on the node. The node pulls the latest cookbooks from Chef server and applies them.

You'll notice that this recipe repeats many of the steps that the `provision` recipe performs. One reason for this is to accommodate multiple build nodes.

As an example, assume you have two build nodes and each build node runs a different phase. The first build node runs the provision phase and the second build node runs the deploy phase. The second build node requires the SSH private key to connect to the node and run `chef-client`. To get the key, it loads it from the encrypted data bag and writes the key file to disk. These are the same steps that occur during provisioning.

In practice, you can write helper recipes and use node attributes to share data between the helper and the main recipe, or you can write a [library](https://docs.chef.io/libraries.html) that abstracts common functionality.

### Review and approve the change

Let's try out our recipe. Follow the same steps as before to submit your change and trigger the pipeline.

```bash
# ~/Development/deliver-customers-rhel
$ git status
On branch deploy-customers-app
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   .delivery/build-cookbook/recipes/deploy.rb

no changes added to commit (use "git add" and/or "git commit -a")
$ git add .
$ git commit -m "deploy to the environments"
[deploy-customers-app d85bd04] deploy to the environments
 1 file changed, 92 insertions(+)
$ delivery review
Chef Delivery
Loading configuration from /home/thomaspetchel/Development/deliver-customers-rhel
Review for change deploy-customers-app targeted for pipeline master
```

Trace the change's progress through the pipeline to the Acceptance stage, as you did previously.

1. Review the changes in the web interface. Click **Approve** when all tests pass.
1. Watch the change progress through the Build and Acceptance stages.

After Acceptance succeeds, don't press the **Deliver** button. We'll queue up additional changes and deliver them to Union as a single unit.

### Verify the deployment to the Acceptance stage

Let's verify that the `awesome_customers` cookbook successfully deployed to your Acceptance stage. To do that, you'll need the IP address of your server. You can get its IP address from its node attributes.

From the administrator's workstation or provisioning node, move to the <% fp '~/delivery-cluster' %> directory.

```bash
# ~
$ cd ~/delivery-cluster
```

Now run `knife node show`, providing the name of the node for your Acceptance stage, and then search for the node's IP address.

```bash
# ~/delivery-cluster
$ knife node show acceptance-deliver-customers-rhel | grep IP:
IP:          10.194.12.61
```

From a web browser, navigate to your node's IP address.

![](delivery/acceptance-customers-verify.png)

Congratulations! You've successfully deployed the Customers web application to Acceptance!

### Integrate the change locally

As we did previously, let's update the `master` branch locally. Here's a reminder how.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'delivery/master'.
$ git pull --prune
From ssh://test@10.194.13.148:8989/test/learn-chef/deliver-customers-rhel
 x [deleted]         (none)     -> delivery/_for/master/deploy-customers-app
remote: Counting objects: 1, done.
remote: Total 1 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (1/1), done.
   c206d49..7c3b1f1  master     -> delivery/master
Updating c206d49..7c3b1f1
Fast-forward
 .delivery/build-cookbook/recipes/deploy.rb | 59 ++++++++++++++++++++++++++++++
 1 file changed, 59 insertions(+)
```

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/customers-web-app-delivery/tree/ref-deploy-customers-app-v1.0.0) (tag `ref-deploy-customers-app-v1.0.0`.)
