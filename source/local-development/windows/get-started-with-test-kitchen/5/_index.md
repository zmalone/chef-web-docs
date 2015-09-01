## 5. Verify that your Test Kitchen instance contains the updated settings

Now let's log in to your virtual machine and verify that the settings was updated on your Windows Server virtual machine.

<img src="/assets/images/misc/local_dev_workflow3_4.png" style="box-shadow: none;" alt=""/>

[START_TABS initial EC2, Vagrant]

[START_TAB initial1 active]

Replace the values for `aws_ssh_key_id`, `region`, `availability_zone`, `subnet_id`, `image_id`, `security_group_ids`, and `ssh_key` with your values.

This configuration uses the `m1.small` [instance type](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html), which is the default. While an `m1.small` or larger instance type can provide better performance, you can use the `t2.micro` instance type if your AWS account provides [free-tier](http://aws.amazon.com/free/) access.

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
  client_rb:
    audit_mode: :enabled

platforms:
  - name: windows-2012r2

suites:
  - name: default
    run_list:
      - recipe[settings::default]
    attributes:
```

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

When Test Kitchen creates your instance, it also creates two files in the <code class="file-path">.kitchen</code> directory &ndash; a Remote Desktop (.rdp) file and a YAML (.yml) configuration file that lists details about the instance.

```bash
# ~/settings
$ ls .kitchen
default-windows-2012r2.rdp default-windows-2012r2.yml logs
```

First, get the username and password for the Windows account that Test Kitchen used to run `chef-client`.

```bash
# ~/settings
$ more .kitchen/default-windows-2012r2.yml
---
username: administrator
server_id: i-c6047d03
hostname: ec2-52-88-81-53.us-west-2.compute.amazonaws.com
password: A4rs&sCTBpP
last_action: converge
```

The way you log in to your instance depends on the driver.

If you're using the Vagrant driver, a VirtualBox window appears when you create the instance. Use your username and password to log in from that window.

If you're using the EC2 driver, run `kitchen login` to create an Remote Desktop connection to your instance. Enter the password that you retrieved in the previous step.

```bash
# ~/settings
$ kitchen login
```

From your connection, open Windows PowerShell and confirm that <code class="file-path">C:\temp\server-info.txt</code> exists and contains information about your server.

```ps
$ Get-Content C:\temp\server-info.txt
fqdn:      WIN-2CSE2JA9V7V
hostname:  WIN-2CSE2JA9V7V
platform:  windows - 6.3.9600
cpu count: 1
```

Success! You can now close the connection.
