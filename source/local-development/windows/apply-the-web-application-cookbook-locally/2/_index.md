## 2. Set up the Test Kitchen configuration file

Just as in the previous lesson, you need to tell Test Kitchen about the environment where your cookbook will run. Remember, when you create a cookbook using the `chef generate cookbook` command, Chef generates a Test Kitchen configuration file for you.

Edit your `awesome_customers` cookbook's <code class="file-path">.kitchen.yml</code> file to include your Test Kitchen driver.

[START_TABS config EC2, Hyper-V, Vagrant]

[START_TAB configEC2 active]

Replace the values for `aws_ssh_key_id`, `region`, `availability_zone`, `subnet_id`, `image_id`, `security_group_ids`, and `ssh_key` with your values.

```yaml
# ~/manage-a-web-app-windows/chef-repo/cookbooks/awesome_customers/.kitchen.yml
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
      - recipe[awesome_customers::default]
    attributes:
```

We recommend that you use an `m1.small` or larger instance type to ensure that the instance has enough memory to run SQL Server.

[END_TAB]

[START_TAB configHyperV]

This configuration resembles the one that you used when you ran the `settings` cookbook in the previous lesson. It allocates 2 GB of memory to the instance so that it can run SQL Server.

Replace the value for `password` with the `Administrator` password on your base virtual machine.

```yaml
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
      - recipe[awesome_customers::default]
    attributes:
```

[END_TAB]

[START_TAB configVagrant]

```yaml
# ~/manage-a-web-app-windows/chef-repo/cookbooks/awesome_customers/.kitchen.yml
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
      - recipe[awesome_customers::default]
    attributes:
      sql_server:
        sysadmins: ['vagrant']
```

This example shows how to override node attributes from your Test Kitchen configuration file.

The `sql_server` cookbook sets the [node attribute](https://github.com/opscode-cookbooks/sql_server/blob/master/attributes/server.rb) `node['sql_server']['sysadmins']`, which specifies which Windows accounts are SQL administrators, to `Administrator`. In [Learn to manage a basic Windows Server web application](/manage-a-web-app/windows), you ran `chef-client` on your node as  `Administrator`. This enabled `Administrator` to run the SQL script that creates the `learnchef` database and the `customers` table, and add sample data.

When you use the Vagrant driver, Test Kitchen, by default, runs `chef-client` as the `vagrant` user, and not as `Administrator`. Therefore, we need to override the `node['sql_server']['sysadmins']` node attribute to include `vagrant` as a SQL administrator.

We do that by setting `node['sql_server']['sysadmins']` to the `vagrant` user. Alternatively, we could set this value to `'Administrators'` to include all users in the Administrators group.

[END_TAB]

[END_TABS]
