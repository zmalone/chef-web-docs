## 4. Write a recipe that fails the audit test

```bash
# ~/chef-repo/cookbooks/basic_audit
$ chef generate recipe enable_ftp
Compiling Cookbooks...
Recipe: code_generator::recipe
  * directory[/home/user/chef-repo/cookbooks/basic_audit/spec/unit/recipes] action create (up to date)
  * cookbook_file[/home/user/chef-repo/cookbooks/basic_audit/spec/spec_helper.rb] action create_if_missing (up to date)
  * template[/home/user/chef-repo/cookbooks/basic_audit/spec/unit/recipes/enable_ftp_spec.rb] action create_if_missing
    - create new file /home/user/chef-repo/cookbooks/basic_audit/spec/unit/recipes/enable_ftp_spec.rb
    - update content in file /home/user/chef-repo/cookbooks/basic_audit/spec/unit/recipes/enable_ftp_spec.rb from none to 36ae09
    (diff output suppressed by config)
  * template[/home/user/chef-repo/cookbooks/basic_audit/recipes/enable_ftp.rb] action create
    - create new file /home/user/chef-repo/cookbooks/basic_audit/recipes/enable_ftp.rb
    - update content in file /home/user/chef-repo/cookbooks/basic_audit/recipes/enable_ftp.rb from none to ef7d04
    (diff output suppressed by config)
```

```ruby
# ~/chef-repo/cookbooks/basic_audit/metadata.rb
name 'basic_audit'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
description 'Installs/Configures basic_audit'
long_description 'Installs/Configures basic_audit'
version '0.1.0'

depends 'firewall', '~> 1.5.0'
```

```bash
# ~/chef-repo/cookbooks/basic_audit
$ chef generate attribute default
Compiling Cookbooks...
Recipe: code_generator::attribute
  * directory[/home/user/chef-repo/cookbooks/basic_audit/attributes] action create
    - create new directory /home/user/chef-repo/cookbooks/basic_audit/attributes
  * template[/home/user/chef-repo/cookbooks/basic_audit/attributes/default.rb] action create
    - create new file /home/user/chef-repo/cookbooks/basic_audit/attributes/default.rb
    - update content in file /home/user/chef-repo/cookbooks/basic_audit/attributes/default.rb from none to e3b0c4
    (diff output suppressed by config)
```

```ruby
# ~/chef-repo/cookbooks/basic_audit/attributes/default.rb
default['firewall']['allow_ssh'] = true
```

```ruby
# ~/chef-repo/cookbooks/basic_audit/recipes/enable_ftp.rb
package 'vsftpd' do
  action :install
end

# Enable and start the vsftpd service.
service 'vsftpd' do
  action [:enable, :start]
end

# Open port 21 to incoming traffic.
firewall_rule 'open_ftp' do
  port 21
  protocol :tcp
  action :allow
end
```

```ruby
# ~/chef-repo/cookbooks/basic_audit/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero
  client_rb:
    audit_mode: :enabled

platforms:
  - name: ubuntu-14.04

suites:
  - name: successful_audit
    run_list:
      - recipe[basic_audit::audit]
    attributes:
  - name: failed_audit
    run_list:
      - recipe[firewall::default]
      - recipe[basic_audit::enable_ftp]
      - recipe[basic_audit::audit]
    attributes:
```

```bash
# ~/chef-repo/cookbooks/basic_audit
$ kitchen list
Instance                      Driver   Provisioner  Verifier  Transport  Last Action
successful-audit-ubuntu-1404  Vagrant  ChefZero     Busser    Ssh        Converged
failed-audit-ubuntu-1404      Vagrant  ChefZero     Busser    Ssh        <Not Created>
```

```bash
# ~/chef-repo/cookbooks/basic_audit
$ kitchen converge failed-audit-ubuntu-1404
-----> Starting Kitchen (v1.4.0)
-----> Creating <failed-audit-ubuntu-1404>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'opscode-ubuntu-14.04'...
[...]
       Finished in 0.14046 seconds (files took 0.3286 seconds to load)
       2 examples, 2 failures

       Failed examples:

       rspec /tmp/kitchen/cache/cookbooks/basic_audit/recipes/audit.rb[1:1:1] # Validate services Ensure FTP access is not permitted is not running the vsftpd service
       rspec /tmp/kitchen/cache/cookbooks/basic_audit/recipes/audit.rb[1:1:2] # Validate services Ensure FTP access is not permitted is not listening on port 21

       Audit phase exception:
         Audit phase found failures - 2/2 controls failed

         Running handlers:
         Running handlers complete
         Chef Client finished, 4/9 resources updated in 16.708693355 seconds
           0/2 controls succeeded
       [2015-07-14T14:55:54+00:00] FATAL: Stacktrace dumped to /tmp/kitchen/cache/chef-stacktrace.out
       [2015-07-14T14:55:54+00:00] ERROR: Found 1 errors, they are stored in the backtrace
       [2015-07-14T14:55:55+00:00] FATAL: Chef::Exceptions::ChildConvergeError: Chef run process exited unsuccessfully (exit code 1)
[...]
```

You'll see this in the output...

```bash
 Starting audit phase

 Validate services
   Ensure FTP access is not permitted
     is not running the vsftpd service (FAILED - 1)
     is not listening on port 21 (FAILED - 2)

 Failures:

   1) Validate services Ensure FTP access is not permitted is not running the vsftpd service
      Failure/Error: expect(service('vsftpd')).to_not be_running
 expected Service "vsftpd" not to be running
      # /tmp/kitchen/cache/cookbooks/basic_audit/recipes/audit.rb:9:in `block (3 levels) in from_file'

   2) Validate services Ensure FTP access is not permitted is not listening on port 21
      Failure/Error: expect(port(21)).to_not be_listening
 expected Port "21" not to be listening
      # /tmp/kitchen/cache/cookbooks/basic_audit/recipes/audit.rb:14:in `block (3 levels) in from_file'
```
