## 3. Provision your Acceptance, Union, Rehearsal, and Delivered stages

In this part, we'll provision the last four stages of your pipeline with the infrastructure they need to run the `awesome_customers` cookbook. Here you'll use automated provisioning with AWS to bring up these infrastructure pieces.

[AWS] Remember, if you prefer to use another cloud provider or want to run your infrastructure on-prem, feel free to adapt the code you see. If you have questions, join us on [Discourse](https://discourse.chef.io/c/delivery).

When you installed Chef Delivery, the installer created an encryption key for you, located at<br>  <code class="file-path">~/Development/delivery-cluster/.chef/delivery-cluster-data/encrypted\_data\_bag\_secret</code>. That encryption key gets copied to the build node each time it performs a job. That means you can use it to encrypt data on your workstation or provisioning node and decrypt it when the build-cookbook runs.

You'll use the key to encrypt these items in a data bag:

  * Your AWS credentials.
  * Your private key used for SSH authentication to EC2 instances.
  * Your secret file that's used to decrypt the database password used by the Customers web application.

[COMMENT] In this scenario, there are two files named <code class="file-path">encrypted\_data\_bag\_secret</code> &ndash; the one that Chef Delivery provides for you to encrypt additional data and the one that the `awesome_customers` cookbook uses to decrypt database passwords. Here, you're using the first encryption key to encrypt the second.

You'll create node attributes in your build cookbook that describe your Acceptance, Union, Rehearsal, and Delivered stages and reference those attributes in your recipe for the provision phase.

### Create a data bag to hold provisioning data

In this part, you'll create a data bag to hold your SSH private key. You'll also encrypt your AWS credentials in the data bag.

```bash
$ cd ~/Development/delivery-cluster
```

```bash
# ~/Development/delivery-cluster
$ knife data bag create provisioning-data
Created data_bag[provisioning-data]
```

### Encrypt and upload your SSH private key

In this part, you'll encrypt your SSH private key and add it to your data bag.

Create <code class="file-path">~/Development/delivery-cluster/.chef/delivery-cluster-data/ssh_key.json</code> and add this, replacing `YOUR_NAME` and `YOUR_PRIVATE_KEY` with your values (`YOUR_NAME` should not include .pem or any file extension.)

```ruby
# ~/Development/delivery-cluster/.chef/delivery-cluster-data/ssh_key.json
{
  "id": "ssh_key",
  "default": {
    "name": "YOUR_NAME",
    "private_key": "YOUR_PRIVATE_KEY"
  }
}
```

You'll need to replace each line break with `\n` in your file. For example:

```ruby
# ~/Development/delivery-cluster/.chef/delivery-cluster-data/ssh_key.json
{
  "id": "ssh_key",
  "default": {
    "name": "learn-chef",
    "private_key": "-----BEGIN RSA PRIVATE KEY-----\ngz5jKCX3TO...j8ErLWsr==\n-----END RSA PRIVATE KEY-----"
  }
}
```

The format of the data bag item matches what's required to use the [encrypted\_data\_bag\_item\_for\_environment](https://github.com/sethvargo/chef-sugar/blob/a9c3260bd1ead486465411f23812ccc4d03a69e7/lib/chef/sugar/data_bag.rb#L83) helper method, which we'll later use to decrypt the data bag.

Encrypt and upload the data bag item.

```bash
# ~/Development/delivery-cluster
$ knife data bag from file provisioning-data ./.chef/delivery-cluster-data/ssh_key.json --secret-file .chef/delivery-cluster-data/encrypted_data_bag_secret
Updated data_bag_item[provisioning-data::ssh_key]
```

Verify you can decrypt it back.

```bash
# ~/Development/delivery-cluster
$ knife data bag show provisioning-data ssh_key --secret-file .chef/delivery-cluster-data/encrypted_data_bag_secret
Encrypted data bag detected, decrypting with provided secret.
default:
  name:        learn-chef
  private_key: -----BEGIN RSA PRIVATE KEY-----
  gz5jKCX3TO...
  ...j8ErLWsr==
  -----END RSA PRIVATE KEY-----
id:      ssh_key
```

### Encrypt and upload your AWS credentials

Create <code class="file-path">~/Development/delivery-cluster/.chef/delivery-cluster-data/aws_creds.json</code> and add this, replacing `YOUR_ACCESS_KEY_ID` and `YOUR_SECRET_ACCESS_KEY` with your values.

```ruby
# ~/Development/delivery-cluster/.chef/delivery-cluster-data/aws_creds.json
{
  "default": {
    "profile": "PROFILE",
    "region": "REGION",
    "access_key_id": "YOUR_ACCESS_KEY_ID",
    "secret_access_key": "YOUR_SECRET_ACCESS_KEY"
  },
  "id": "aws_creds"
}
```

For example:

```ruby
# ~/Development/delivery-cluster/.chef/delivery-cluster-data/aws_creds.json
{
  "default": {
    "profile": "default",
    "region": "us-west-2",
    "access_key_id": "AKIAIOSFODNN7EXAMPLE",
    "secret_access_key": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
  },
  "id": "aws_creds"
}
```

Encrypt and upload the data bag item.

```bash
# ~/Development/delivery-cluster
$ knife data bag from file provisioning-data ./.chef/delivery-cluster-data/aws_creds.json --secret-file .chef/delivery-cluster-data/encrypted_data_bag_secret
Updated data_bag_item[provisioning-data::aws_creds]
```

Verify you can decrypt it back.

```bash
# ~/Development/delivery-cluster
$ knife data bag show provisioning-data aws_creds --secret-file .chef/delivery-cluster-data/encrypted_data_bag_secret
Encrypted data bag detected, decrypting with provided secret.
default:
  access_key_id:     AKIAIOSFODNN7EXAMPLE
  profile:           default
  region:            us-west-2
  secret_access_key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
id:      aws_creds
```

### Encrypt and upload the decryption key for the Customers web application

In this step, you'll encrypt and upload the decryption key for the Customers web application. You can either use the key you generated in [Learn to manage a basic Red Hat Enterprise Linux web application](/manage-a-web-app/rhel/), or the one you generated in the [Prepare your encryption key and encrypted data bag items](#prepareyourencryptionkeyandencrypteddatabagitems) portion of this tutorial.

Create <code class="file-path">~/Development/delivery-cluster/.chef/delivery-cluster-data/database\_passwords\_key.json</code> and add this:

```ruby
# ~/Development/delivery-cluster/.chef/delivery-cluster-data/database_passwords_key.json
{
  "default": {
    "content": "YOUR_DECRYPTION_KEY"
  },
  "id": "database_passwords_key"  
}
```

For example:

```ruby
# ~/Development/delivery-cluster/.chef/delivery-cluster-data/database_passwords_key.json
{
  "default": {
    "content": "u8eF924qkscvx+edZfynrpMi3JS0fLE1qHoJaN9Yzba0O79H5WQGUjRWaXTqUEaj/TqeEYL4F1j8R4jiwI5hJPmo91hukcWhpgxCrvvw0ajku1e3InKMWWDcOAv8frkHgTwoqLXjkbVJyYJ4A1o9Hc/jHTlweicK39pETi76emkaxVXQCRcq9pi+OxNVYMeRucGqZZrp8kgRChPLYrmzTOpkJ5uaFXq/OVRZSQUA7lAUAcBVwXSvnY5PiisZjsEwF/cOTlLfLjcRGz4820RpM0TyxgqG5o4JsJ/tfKbn8bz2DExaW5rIUhx/EAdaK8xOiihTsP8n67XV7fwAT1wHmeTg4n/aAr57OW3hZk2eAXP2l9hRKy3b8W42jJnUZ92rOKBTIfAz2B7lxBzDphdntrQYtuLO7PmaKjDwZX7U7OoEUNvKjnnp0nTZcyECc3dlF0JSj1w6yobK1uzlyQRoRUcD8TtAOWBazmol3pY9fhLu5ZVhOYoOuKmyDDCYgk8SLSL/rSSHbPKtHo77amqR68IDT9gCK3ZCM7XF97IJBefoK5UYDFwKIYKaX9GYhUoJf0EXZLvHn/GxzEDK8fanFeaIYFU68WBpmONng8IGndYhgBhu6yA3hyrlvQRkZHpf+1pDxjOh1neDv0+A12FusGbehZOKhCfn1I0Q5rQLO7V="
  },
  "id": "database_passwords_key"  
}
```

Encrypt and upload the data bag item.

```bash
# ~/Development/delivery-cluster
$ knife data bag from file provisioning-data ./.chef/delivery-cluster-data/database_passwords_key.json --secret-file .chef/delivery-cluster-data/encrypted_data_bag_secret
Updated data_bag_item[provisioning-data::database_passwords_key]
```

Verify you can decrypt it back.

```bash
# ~/Development/delivery-cluster
$ knife data bag show provisioning-data database_passwords_key --secret-file .chef/delivery-cluster-data/encrypted_data_bag_secret
Encrypted data bag detected, decrypting with provided secret.
default:
  content: u8eF924qkscvx+edZfynrpMi3JS0fLE1qHoJaN9Yzba0O79H5WQGUjRWaXTqUEaj/TqeEYL4F1j8R4jiwI5hJPmo91hukcWhpgxCrvvw0ajku1e3InKMWWDcOAv8frkHgTwoqLXjkbVJyYJ4A1o9Hc/jHTlweicK39pETi76emkaxVXQCRcq9pi+OxNVYMeRucGqZZrp8kgRChPLYrmzTOpkJ5uaFXq/OVRZSQUA7lAUAcBVwXSvnY5PiisZjsEwF/cOTlLfLjcRGz4820RpM0TyxgqG5o4JsJ/tfKbn8bz2DExaW5rIUhx/EAdaK8xOiihTsP8n67XV7fwAT1wHmeTg4n/aAr57OW3hZk2eAXP2l9hRKy3b8W42jJnUZ92rOKBTIfAz2B7lxBzDphdntrQYtuLO7PmaKjDwZX7U7OoEUNvKjnnp0nTZcyECc3dlF0JSj1w6yobK1uzlyQRoRUcD8TtAOWBazmol3pY9fhLu5ZVhOYoOuKmyDDCYgk8SLSL/rSSHbPKtHo77amqR68IDT9gCK3ZCM7XF97IJBefoK5UYDFwKIYKaX9GYhUoJf0EXZLvHn/GxzEDK8fanFeaIYFU68WBpmONng8IGndYhgBhu6yA3hyrlvQRkZHpf+1pDxjOh1neDv0+A12FusGbehZOKhCfn1I0Q5rQLO7V=
id:      database_passwords_key
```

### Create a branch

Now you'll create a branch for your changes to the `provision` recipe.

First, move to your <code class="file-path">~/Development/delivery-cluster</code> directory.

```bash
# ~/Development/delivery-cluster
$ cd ~/Development/deliver-customers-rhel
```

Verify that you're on the `master` branch.

```bash
# ~/Development/deliver-customers-rhel
$ git branch
  add-delivery-config
  add-delivery-truck
* master
  publish-customers-app
```

Run these commands to create the `provision-environments` branch and verify that you're on that branch.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout -b provision-environments
Switched to a new branch 'provision-environments'
$ git branch
  add-delivery-config
  add-delivery-truck
  master
* provision-environments
  publish-customers-app
```

### Create node attributes that describe your environments

You've already created a file to hold your default attributes.

Make your default node attributes file, <code class="file-path">default.rb</code>, look like this.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/attributes/default.rb
default['delivery']['config']['delivery-truck']['publish']['chef_server'] = true

default['deliver-customers-rhel']['run_list'] = ['recipe[awesome_customers::default]']

%w(acceptance union rehearsal delivered).each do |stage|
  default['deliver-customers-rhel'][stage]['aws']['config'] = {
    machine_options: {
      admin: nil,
      bootstrap_options: {
        instance_type: 't2.micro',
        security_group_ids: ['sg-cbacf8ae'],
        subnet_id: 'subnet-19ac017c',
        output_key_path: nil,
        output_key_format: nil
      },
      convergence_options: {
        ssl_verify_mode: :verify_none
      },
      image_id: 'ami-09f7d239',
      ssh_username: 'root',
      transport_address_location: :private_ip,
      validator: nil
    }
  }
end
```

Line 1 contains the node attribute you defined previously. It tells the `delivery-truck` cookbook's publish phase to publish your cookbooks to Chef server.

Line 3 specifies the run-list that configures the Customers web application. This node attribute makes the code you'll write later to provision your stage's infrastructure environment more reusable.

Lines 5-25 describe the configuration of the AWS driver. For simplicity, we define each stage the same way. And for many cases this makes sense because you'll typically want your verification stages to match your production environment. However, perhaps for a web application you'll need to allow access to your Acceptance stage's firewall on certain ports through your security groups for verification purposes. Your Delivered stage might use more constrained security group settings.

Replace the following with the values you [gathered earlier](/build-a-delivery-pipeline/rhel/get-set-up#step4).

* `instance_type`
* `security_group_ids`
* `subnet_id`
* `image_id`
* `ssh_username`

If you connect to your EC2 instances using their private IP addresses, specify `:private_ip` for `transport_address_location`. If you connect using their public addresses, specify `:public_ip`.

### Write the recipe for the provision phase

Now that our Chef server has the encrypted data bag items that we need to provision our Acceptance, Union, Rehearsal, and Delivered stages, we can write the recipe for the provision phase.

We need to:

* Decrypt the secret key that decrypts the database passwords. The Customers application uses these passwords to connect to the database in order to retrieve customer records. We perform this step in this recipe because Chef provisioning enables us to easily pass files to a machine when it's provisioned.
* Decrypt the private SSH key that's used to connect to the EC2 instance. Chef provisioning uses that key to connect to the machine so it can install and run chef-client.
* Bring up the machine and bootstrap it to our Chef server, using the options that we specified in the default attributes file.

#### Decrypt the encryption key that contains the database passwords

In [Learn to manage a basic Red Hat Enterprise Linux web application](/manage-a-web-app/rhel), we showed how to use `Chef::EncryptedDataBagItem` to load and decrypt the encrypted database passwords from a data bag. For this project, we'll use the [chef-sugar](https://supermarket.chef.io/cookbooks/chef-sugar) cookbook from Chef Supermarket to make the process easier. The `chef-sugar` cookbook provides the `encrypted_data_bag_item_for_environment` helper method to decrypt data bag items.

To load the `chef-sugar` cookbook, add the line `depends 'chef-sugar'` to your build cookbook's metadata file, <code class="file-path">metadata.rb</code>, making the entire file look like this.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/metadata.rb
name 'build-cookbook'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
version '0.1.0'

depends 'delivery-truck'
depends 'chef-sugar'
```

In your `provision` recipe, include the `chef-sugar` cookbook's default recipe.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/provision.rb
include_recipe 'delivery-truck::provision'
include_recipe 'chef-sugar::default'
```

Earlier, you used `with_server_config` to change the behavior of `chef-client` to work with your Chef server rather than with a temporary in-memory version.

We need to follow the same pattern here in order to access the encrypted data bags. But this time we need to call the `load_delivery_chef_config` helper method. This is because `with_server_config` takes a block, and when that block completes, `with_server_config` restores the previous Chef server configuration (the one for the in-memory version.) Chef provisioning requires your real Chef server context for longer because it performs additional processing in the background. The `load_delivery_chef_config` does not restore the previous Chef server configuration.

Add this to your `provision` recipe.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/provision.rb
include_recipe 'delivery-truck::provision'
include_recipe 'chef-sugar::default'

load_delivery_chef_config
```

Now append this to your `provision` recipe to decrypt the data bag that holds the database passwords.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/provision.rb
# Decrypt the encryption key that decrypts the database passwords and save that file to disk.
database_passwords_key = encrypted_data_bag_item_for_environment('provisioning-data', 'database_passwords_key')
database_passwords_key_path = File.join(node['delivery']['workspace']['cache'], node['delivery']['change']['project'])
directory database_passwords_key_path
file File.join(database_passwords_key_path, 'database_passwords_key') do
  sensitive true
  content database_passwords_key['content']
  owner node['delivery_builder']['build_user']
  group node['delivery_builder']['build_user']
  mode '0664'
end
```

#### Decrypt the SSH key

Append this to your `provision` recipe to decrypt the data bag that holds the SSH private key that you use to connect to your Acceptance, Union, Rehearsal, and Delivered infrastructure environments.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/provision.rb
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
```

#### Create variables to make the recipe more readable

Let's create two variables that we'll use throughout the recipe:

* the name of the project
* the current Chef Delivery stage

Append this to your `provision` recipe.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/provision.rb
# Read common configuration options from node attributes.
project = node['delivery']['change']['project'] # for example, 'deliver-customers-rhel'
stage = node['delivery']['change']['stage'] # for example, 'acceptance' or 'union'
```

#### Write your AWS credentials file to the build node

In this part, you'll write your AWS credentials file to disk on your build node. Chef provisioning uses this file to authenticate requests to create and manage EC2 instances.

First, let's write a recipe named `_aws_creds` that decrypts the AWS credentials from the data bag and writes them to file.

Run the following.

```bash
# ~/Development/deliver-customers-rhel
$ chef generate recipe .delivery/build-cookbook _aws_creds
Compiling Cookbooks...
Recipe: code_generator::recipe
  * directory[.delivery/build-cookbook/spec/unit/recipes] action create (up to date)
[...]
  * template[.delivery/build-cookbook/recipes/_aws_creds.rb] action create
    - create new file .delivery/build-cookbook/recipes/_aws_creds.rb
    - update content in file .delivery/build-cookbook/recipes/_aws_creds.rb from none to ea684f
    (diff output suppressed by config)
```

The underscore `_` notation in the file name is a convention that shows that the recipe supports other recipes, and doesn't implement one of the core Chef Delivery phases.

Add this to <code class="file-path">\_aws\_creds.rb</code>.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/_aws_creds.rb
with_server_config do
  # Decrypt the AWS credentials from the data bag.
  aws_creds = encrypted_data_bag_item_for_environment('provisioning-data', 'aws_creds')

  # Create a string to hold the contents of the credentials file.
  aws_config_contents = <<-EOF
  [#{aws_creds['profile']}]
  region = #{aws_creds['region']}
  aws_access_key_id = #{aws_creds['access_key_id']}
  aws_secret_access_key = #{aws_creds['secret_access_key']}
  EOF

  # Compute the path to the credentials file.
  aws_config_filename = File.join(node['delivery']['workspace']['cache'], node['delivery']['change']['project'], 'aws_config')

  # Ensure parent directory exists.
  directory File.join(node['delivery']['workspace']['cache'], node['delivery']['change']['project'])

  # Write the AWS credentials to disk.
  # Alternatively, you can use the template resource.
  file aws_config_filename do
    sensitive true
    content aws_config_contents
  end

  # Set the AWS_CONFIG_FILE environment variable.
  # Chef provisioning reads this environment variable to access the AWS credentials file.
  ENV['AWS_CONFIG_FILE'] = aws_config_filename
end
```

This code:

* calls `with_server_config` to switch `chef-client` to work with your Chef server rather than with a temporary in-memory version.
* decrypts the data bag item containing the AWS credentials.
* writes the credentials file to a workspace location on disk.
* sets the `AWS_CONFIG_FILE` environment variable. This environment variable tells Chef provisioning where the AWS credentials file is located.

Now run your <code class="file-path">\_aws\_creds</code> recipe from your `provision` recipe. Add the following.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/provision.rb
# Load AWS credentials.
include_recipe "#{cookbook_name}::_aws_creds"
```

#### Set up the Chef provisioning driver

Chef provisioning uses [drivers](https://docs.chef.io/provisioning.html#drivers) to connect to various cloud and virtualization providers. In this part, we need to initialize the AWS driver.

Add this to <code class="file-path">provision.rb</code>.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/provision.rb
# Load the AWS driver.
require 'chef/provisioning/aws_driver'
# Set the AWS driver as the current one.
with_driver 'aws'
```

#### Bring up the machine

To bring up the machine, you'll use the [machine](https://docs.chef.io/resource_machine.html) resource.

To bootstrap the machine to your Chef server, you first call the `with_chef_server` method. This method sets information about your Chef server configuration that Chef provisioning uses to bootstrap the machine.

Append this to your `provision` recipe.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/provision.rb
# Specify information about our Chef server.
# Chef provisioning uses this information to bootstrap the machine.
with_chef_server Chef::Config[:chef_server_url],
  client_name: Chef::Config[:node_name],
  signing_key_filename: Chef::Config[:client_key],
  ssl_verify_mode: :verify_none,
  verify_api_cert: false

# Ensure that the machine exists, is bootstrapped, has the correct run-list, and is ready to run chef-client.
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

The [:setup](https://docs.chef.io/resource_machine.html#actions) action gets the machine ready to use with Chef by bootstrapping it to your Chef server and installing `chef-client`. It does not apply the run-list.

The machine name can be anything you like. We follow a common convention, which is to concatenate the current stage name and the project name.

The `files` attribute copies the secret file that decrypts the database passwords to <code class="file-path">/etc/chef/encrypted\_data\_bag\_secret</code> on the machine.

The code uses `add_machine_options` to first specify details about the SSH private key that Chef provisioning will use to connect to the machine and then it specifies the options that you specified in your default attributes file (the AMI ID, subnet ID, and so on.)

The complete `provision` recipe looks like this.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/build-cookbook/recipes/provision.rb
include_recipe 'delivery-truck::provision'
include_recipe 'chef-sugar'

load_delivery_chef_config

# Decrypt the encryption key that decrypts the database passwords and save that file to disk.
database_passwords_key = encrypted_data_bag_item_for_environment('provisioning-data', 'database_passwords_key')
database_passwords_key_path = File.join(node['delivery']['workspace']['cache'], node['delivery']['change']['project'])
directory database_passwords_key_path
file File.join(database_passwords_key_path, 'database_passwords_key') do
  sensitive true
  content database_passwords_key['content']
  owner node['delivery_builder']['build_user']
  group node['delivery_builder']['build_user']
  mode '0664'
end

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

# Ensure that the machine exists, is bootstrapped, has the correct run-list, and is ready to run chef-client.
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

### Apply the provision phase

Follow the same process you used earlier to commit your changes and submit them to the Chef Delivery pipeline. The steps are shown here.

```bash
# ~/Development/deliver-customers-rhel
$ git status
On branch provision-environments
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   .delivery/build-cookbook/attributes/default.rb
	modified:   .delivery/build-cookbook/metadata.rb
	modified:   .delivery/build-cookbook/recipes/provision.rb

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.delivery/build-cookbook/recipes/_aws_creds.rb
	.delivery/build-cookbook/spec/

no changes added to commit (use "git add" and/or "git commit -a")
$ git add .
$ git commit -m "provision the environments"
[provision-environments f916771] provision the environments
 6 files changed, 147 insertions(+)
 create mode 100644 .delivery/build-cookbook/recipes/_aws_creds.rb
 create mode 100644 .delivery/build-cookbook/spec/spec_helper.rb
 create mode 100644 .delivery/build-cookbook/spec/unit/recipes/_aws_creds_spec.rb
$ delivery review
Chef Delivery
Loading configuration from /home/thomaspetchel/Development/deliver-customers-rhel
Review for change provision-environments targeted for pipeline master
Created new patchset
https://10.194.11.99/e/test/#/organizations/learn-chef/projects/deliver-customers-rhel/changes/78c5739c-5365-4f92-8b07-c70e7097a59b
```

#### Review and approve the change

Trace the change's progress through the pipeline to the Acceptance stage, as you did previously.

1. Review the changes in the web interface. Click **Approve** when all tests pass.
1. Watch the change progress through the Build and Acceptance stages.

After Acceptance succeeds, don't press the **Deliver** button. We'll queue up additional changes and deliver them to Union as a single unit.

#### Verify the creation of the Acceptance stage

Now let's verify that the infrastructure environment for the Acceptance stage was successfully created. We'll run the `awesome_customers` cookbook in that infrastructure environment when we write the recipe for the deploy phase in the next step.

One way to verify the Acceptance stage is to move to your <code class="file-path">~/Development/delivery-cluster/.chef</code> and run the `knife node list` command, similar to how you confirmed that the `awesome_customers` cookbook was successfully published to the Chef server. Remember, this directory holds your `knife` configuration file and enables you to administer your Chef server from your workstation or provisioning node.

First, move to the <code class="file-path">~/Development/delivery-cluster/.chef</code> directory.

```bash
# ~/Development/deliver-customers-rhel
$ cd ~/Development/delivery-cluster/.chef
```

The machine name is the same as the node name. Recall that for the Acceptance stage, the name will be either 'acceptance-deliver-customers-rhel-aws' or 'acceptance-deliver-customers-rhel-ssh', depending on which driver you're using.

Now run `knife node list` and search for your Acceptance stage.

```bash
# ~/Development/delivery-cluster/.chef
$ knife node list | grep acceptance-deliver-customers-rhel
acceptance-deliver-customers-rhel
```

As expected, the infrastructure environment for the Acceptance stage appears in the node list.

Now move back to your <code class="file-path">~/Development/deliver-customers-rhel</code> directory.

```bash
# ~/Development/delivery-cluster/.chef
$ cd ~/Development/deliver-customers-rhel
```

#### Merge the change locally

As before, we need to pull Delivery's `master` branch down to ours. Here's how.

```bash
# ~/Development/deliver-customers-rhel
$ git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'delivery/master'.
$ git fetch
remote: Counting objects: 21, done.
remote: Compressing objects: 100% (19/19), done.
remote: Total 21 (delta 7), reused 3 (delta 2)
Unpacking objects: 100% (21/21), done.
From ssh://test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel
   a100d45..dfc7a5d  master     -> delivery/master
$ git pull delivery master
From ssh://test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel
 * branch            master     -> FETCH_HEAD
Updating a100d45..dfc7a5d
Fast-forward
 .delivery/build-cookbook/attributes/default.rb     | 90 ++++++++++++++++++++
 .delivery/build-cookbook/metadata.rb               |  1 +
 .delivery/build-cookbook/recipes/_aws_creds.rb     | 38 +++++++++
 .delivery/build-cookbook/recipes/provision.rb      | 96 ++++++++++++++++++++++
 .delivery/build-cookbook/recipes/publish.rb        | 14 ++++
 .delivery/build-cookbook/spec/spec_helper.rb       |  2 +
 .../spec/unit/recipes/_aws_creds.rb_spec.rb        | 20 +++++
 .../spec/unit/recipes/_aws_creds_spec.rb           | 20 +++++
 8 files changed, 281 insertions(+)
 create mode 100644 .delivery/build-cookbook/recipes/_aws_creds.rb
 create mode 100644 .delivery/build-cookbook/spec/spec_helper.rb
 create mode 100644 .delivery/build-cookbook/spec/unit/recipes/_aws_creds.rb_spec.rb
 create mode 100644 .delivery/build-cookbook/spec/unit/recipes/_aws_creds_spec.rb
```

[GITHUB] The final code for this section is available on [GitHub](https://github.com/learn-chef/deliver-customers-rhel/tree/provision-environments-v1.0.0) (tag `provision-environments-v1.0.0`.)
