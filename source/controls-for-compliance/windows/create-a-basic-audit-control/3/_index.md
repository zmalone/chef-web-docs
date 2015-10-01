## 3. Apply the recipe to a Test Kitchen instance

Now let's apply the audit control to a Windows Server virtual machine. First, modify your `audit` cookbook's <code class="file-path">.kitchen.yml</code> file to look like one of the following, depending on which Test Kitchen driver you're using.

[START_TABS config EC2, Hyper-V, Vagrant]

[START_TAB configEC2 active]

Replace the values for `aws_ssh_key_id`, `region`, `availability_zone`, `subnet_id`, `image_id`, `security_group_ids`, and `ssh_key` with your values.

```ruby
# ~/chef-repo/cookbooks/audit/.kitchen.yml
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
  client_rb:
    audit_mode: :audit_only

transport:
  ssh_key: /Users/learnchef/.ssh/learnchef.pem

platforms:
  - name: windows-2012r2

suites:
  - name: default
    run_list:
      - recipe[audit::default]
    attributes:
```

This configuration uses the `m1.small` [instance type](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html), which is the default. While an `m1.small` or larger instance type can provide better performance, you can use the `t2.micro` instance type if your AWS account provides [free-tier](http://aws.amazon.com/free/) access.

[END_TAB]

[START_TAB configHyperV]

This configuration specifies the location of the parent virtual hard drive (VHD) folder, the name of the virtual switch to use for network access, and allocates 2GB of memory to the instance.

Replace the value for `password` with the `Administrator` password on your base virtual machine.

```ruby
# ~/chef-repo/cookbooks/audit/.kitchen.yml
---
driver:
  name: hyperv
  parent_vhd_folder: C:\Hyper-V
  parent_vhd_name: WindowsServer2012R2.vhdx
  vm_switch: ExternalSwitch
  memory_startup_bytes: 2GB

provisioner:
  name: chef_zero_scheduled_task
  client_rb:
    audit_mode: :audit_only

transport:
  password: H24?6;H.QaV8JP2&

platforms:
  - name: windows-2012r2

suites:
  - name: default
    run_list:
      - recipe[audit::default]
    attributes:
```

[END_TAB]

[START_TAB configVagrant]

```ruby
# ~/chef-repo/cookbooks/audit/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero_scheduled_task
  client_rb:
    audit_mode: :audit_only

platforms:
  - name: windows-2012r2

suites:
  - name: default
    run_list:
      - recipe[audit::default]
    attributes:
```

[END_TAB]

[END_TABS]

The `audit_mode: :audit_only` part tells `chef-client` to run only your audit controls, and not apply any other resources that appear in the run-list. We specify `:audit_only` because this cookbook's role is only to verify your compliance policy. You can specify `:enabled` to apply both your configuration code and your audit controls or `:disabled` to run only your configuration code.

Run `kitchen list` to verify that the instance has not yet been created.

```bash
# ~/chef-repo/cookbooks/audit
$ kitchen list
Instance                Driver  Provisioner            Verifier  Transport  Last Action
default-windows-2012r2  Ec2     ChefZeroScheduledTask  Busser    Winrm      <Not Created>
```

If you're using a driver other than the EC2 driver, you would see that driver listed in the **Driver** column.

Now run `kitchen converge` to create the instance and apply your audit control.

```bash
# ~/chef-repo/cookbooks/audit
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Creating <default-windows-2012r2>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'windows-2012r2'...
[...]
       Synchronizing Cookbooks:
         - audit
       Compiling Cookbooks...
       Starting audit phase

       Finished in 0 seconds (files took 1.3 seconds to load)
       0 examples, 0 failures
       Auditing complete

       Running handlers:
       Running handlers complete
       Chef Client finished, 0/0 resources updated in 53.890839 seconds
       Finished converging <default-windows-2012r2> (3m24.00s).
-----> Kitchen is finished. (5m32.32s)
```

We haven't yet configured IIS or added any web files, so there are no files to test. But this is a good first step to verifying that the control is correctly set up.

[TIP] We'll show you how to later, but if at any point you need to destroy your instance, run `kitchen destroy`. You can run `kitchen converge` again at a later time to pick up where you left off. This is especially important when using the EC2 driver for Test Kitchen, as you are billed hourly for any machine resources that you use.
