## 2. Set up the Test Kitchen configuration file

Now we need to tell Test Kitchen a bit about the environment where our cookbook will run.

When you use the `chef generate cookbook` command to create a cookbook, Chef creates a file named <code class="file-path">.kitchen.yml</code> in the root directory of your cookbook. <code class="file-path">.kitchen.yml</code> defines what's needed to run Test Kitchen, including which virtualization provider to use, how to run Chef, and what platforms to run your code on.

The default <code class="file-path">.kitchen.yml</code> file looks like this.

```ruby
# ~/settings/.kitchen.yml
---
driver:
  name: vagrant

## The forwarded_port port feature lets you connect to ports on the VM guest via
## localhost on the host.
## see also: https://docs.vagrantup.com/v2/networking/forwarded_ports.html

#  network:
#    - ["forwarded_port", {guest: 80, host: 8080}]

provisioner:
  name: policyfile_zero

## require_chef_omnibus specifies a specific chef version to install. You can
## also set this to `true` to always use the latest version.
## see also: https://docs.chef.io/config_yml_kitchen.html

#  require_chef_omnibus: 12.5.0

platforms:
  - name: ubuntu-14.04
  - name: centos-7.1

suites:
  - name: default
    attributes:
```

[COMMENT] On Linux and Mac OS, <code class="file-path">.kitchen.yml</code> is a hidden file. Run `ls -a` if you want to see it from your terminal window.

Test Kitchen can manage more than one instance at a time. The default configuration creates both an Ubuntu and a CentOS virtual machine. Since we want Windows Server, modify <code class="file-path">~/settings/.kitchen.yml</code> according to the Test Kitchen driver that you're using.

[START_TABS config EC2, Hyper-V, Vagrant]

[START_TAB configEC2 active]

Replace the values for `aws_ssh_key_id`, `region`, `availability_zone`, `subnet_id`, `image_id`, `security_group_ids`, and `ssh_key` with your values.

```ruby
# ~/settings/.kitchen.yml
---
driver:
  name: ec2
  aws_ssh_key_id: learnchef
  region: us-west-2
  availability_zone: a
  subnet_id: subnet-eacb348f
  instance_type: m1.small
  image_id: ami-c3b3b1f3
  security_group_ids: ['sg-2d3b3b48']
  retryable_tries: 120

provisioner:
  name: chef_zero_scheduled_task

transport:
  ssh_key: C:\Users\LearnChef\.ssh\learnchef.pem

platforms:
  - name: windows-2012r2

suites:
  - name: default
    run_list:
      - recipe[settings::default]
    attributes:
```

This configuration uses the `m1.small` [instance type](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html), which is the default. While an `m1.small` or larger instance type can provide better performance, you can use the `t2.micro` instance type if your AWS account provides [free-tier](http://aws.amazon.com/free/) access.

[END_TAB]

[START_TAB configHyperV]

This configuration specifies the location of the parent virtual hard drive (VHD) folder, the name of the virtual switch to use for network access, and allocates 2 GB of memory to the instance.

Replace the value for `password` with the `Administrator` password on your base virtual machine.

```ruby
# ~/settings/.kitchen.yml
---
driver:
  name: hyperv
  parent_vhd_folder: C:\Hyper-V
  parent_vhd_name: WindowsServer2012R2.vhdx
  vm_switch: ExternalSwitch
  memory_startup_bytes: 2GB

provisioner:
  name: chef_zero_scheduled_task

transport:
  password: H24?6;H.QaV8JP2&

platforms:
  - name: windows-2012r2

suites:
  - name: default
    run_list:
      - recipe[settings::default]
    attributes:
```

[END_TAB]

[START_TAB configVagrant]

```ruby
# ~/settings/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero_scheduled_task

platforms:
  - name: windows-2012r2

suites:
  - name: default
    run_list:
      - recipe[settings::default]
    attributes:
```

[END_TAB]

[END_TABS]

Here's how the file breaks down.

* **driver** specifies the software that manages the machine. It's the Test Kitchen driver that you set up in the previous lesson.
* **provisioner** specifies how to run Chef. When working with Linux instances, `chef_zero` is a common choice because it enables you to mimic a Chef server environment on your local machine. For working with Windows Server, we use the `chef_zero_scheduled_task` plugin that you installed in the previous lesson. `chef_zero_scheduled_task` works like `chef_zero`, but also creates a scheduled task that runs `chef-client` immediately and connects to that task so that Test Kitchen can receive the output of the `chef-client` run.
* **transport** specifies the protocol, port, and other network settings that allow Test Kitchen to communicate with the instance.
* **platforms** specifies the target operating systems. We're targeting just one &ndash; Windows Server 2012 R2.
* **suites** specifies what we want to apply to the virtual environment. You can have more than one suite. We define just one, named `default`. This is where we provide the run-list, which defines which recipes to run and in the order to run them. Our run-list contains one recipe &ndash; our `settings` cookbook's default recipe.

[DOCS] The [Chef documentation](http://docs.chef.io/config_yml_kitchen.html) explains the structure of the <code class="file-path">.kitchen.yml</code> file in greater detail, and also explains more about the available settings.

[START_MODAL source-control Learn about .kitchen.yml and source control]

### .kitchen.yml and source control

Most Chef users store the <code class="file-path">.kitchen.yml</code> file in source control along with their cookbooks so that other users can also use it to verify their own work.

But you might notice two problems with this approach.

1. Not all users use the same Test Kitchen driver. For example, one user might be using the EC2 driver and another user might be using Hyper-V.
1. The <code class="file-path">.kitchen.yml</code> file can contain sensitive information such as passwords and access credentials.

A common solution is to maintain a version of <code class="file-path">.kitchen.yml</code> that works with the Vagrant driver because the Vagrant driver uses free software and doesn't require passwords or other sensitive information to run.

It's also common to use [dynamic configuration](http://kitchen.ci/docs/getting-started/dynamic-configuration). For example, you can create a file named <code class="file-path">.kitchen.local.yml</code>, which you do not check into source control, that overrides the default configuration with your specific details. Or your configuration file can use environment variables to hide passwords and other personal details.

Another common option is to provide the Vagrant configuration in <code class="file-path">.kitchen.yml</code> and a configuration that runs in the cloud in a file named <code class="file-path">.kitchen.cloud.yml</code>. This enables you to provide a standard configuration that runs on Vagrant and an option to test your configuration on one or more cloud providers ([the mysql community cookbook is a good example](https://github.com/chef-cookbooks/mysql/blob/master/.kitchen.cloud.yml)). To run the cloud configuration, set the `KITCHEN_YAML=.kitchen.cloud.yml` environment variable. This tells Test Kitchen to read from that file.

[END_MODAL]
