## 2. Set up the Test Kitchen configuration file

Now we need to tell Test Kitchen a bit about the environment we want to run our cookbook in.

When you use the `chef generate cookbook` command to create a cookbook, Chef creates a file named <code class="file-path">.kitchen.yml</code> in the root directory of your cookbook. <code class="file-path">.kitchen.yml</code> defines what's needed to run Test Kitchen, including which virtualization provider to use, how to run Chef, and what platforms to run your code on.

The default <code class="file-path">.kitchen.yml</code> file looks like this.

```ruby
# ~/settings/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero

platforms:
  - name: ubuntu-14.04
  - name: centos-7.1

suites:
  - name: default
    run_list:
      - recipe[settings::default]
    attributes:
```

[COMMENT] On Linux and Mac OS, <code class="file-path">.kitchen.yml</code> is a hidden file. Run `ls -a` if you want to see it from your terminal window.

Test Kitchen can manage more than one instance at a time. The default configuration creates both an Ubuntu and a CentOS virtual machine. Since we want Windows Server, modify <code class="file-path">~/settings/.kitchen.yml</code> according to the Test Kitchen driver that you're using.

[START_TABS initial EC2, Vagrant]

[START_TAB initial1 active]

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

transport:
  ssh_key: /Users/learnchef/.ssh/learnchef.pem

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

This configuration uses the `m1.small` [instance type](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html), which is the default. While an `m1.small` or larger instance type can provide better performance, you can use the `t2.micro` instance type if your AWS account provides [free-tier](http://aws.amazon.com/free/) access.

[END_TAB]

[START_TAB initial2]

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

* **driver** specifies the software that creates the machine. We're using Vagrant.
* **provisioner** specifies how to run Chef. We use `chef_zero` because it enables you to mimic a Chef server environment on your local machine. This allows us to work with node attributes and data bags.
* **platforms** specifies the target operating systems. We're targeting just one &ndash; Windows Server 2012 R2.
* **suites** specifies what we want to apply to the virtual environment. You can have more than one suite. We define just one, named `default`. This is where we provide the run-list, which defines which recipes to run and in the order to run them. Our run-list contains one recipe &ndash; our `settings` cookbook's default recipe.

[DOCS] The [Chef documentation](http://docs.chef.io/config_yml_kitchen.html) explains the structure of the <code class="file-path">.kitchen.yml</code> file in greater detail, and also explains more about the available settings.
