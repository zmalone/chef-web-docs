## 5. Write a recipe that fixes the audit

```bash
# ~/chef-repo/cookbooks/basic_audit
$ chef generate recipe disable_ftp
Compiling Cookbooks...
Recipe: code_generator::recipe
  * directory[/home/user/chef-repo/cookbooks/basic_audit/spec/unit/recipes] action create (up to date)
  * cookbook_file[/home/user/chef-repo/cookbooks/basic_audit/spec/spec_helper.rb] action create_if_missing (up to date)
  * template[/home/user/chef-repo/cookbooks/basic_audit/spec/unit/recipes/disable_ftp_spec.rb] action create_if_missing
    - create new file /home/user/chef-repo/cookbooks/basic_audit/spec/unit/recipes/disable_ftp_spec.rb
    - update content in file /home/user/chef-repo/cookbooks/basic_audit/spec/unit/recipes/disable_ftp_spec.rb from none to 36ae09
    (diff output suppressed by config)
  * template[/home/user/chef-repo/cookbooks/basic_audit/recipes/disable_ftp.rb] action create
    - create new file /home/user/chef-repo/cookbooks/basic_audit/recipes/disable_ftp.rb
    - update content in file /home/user/chef-repo/cookbooks/basic_audit/recipes/disable_ftp.rb from none to ef7d04
    (diff output suppressed by config)
```

```ruby
# ~/chef-repo/cookbooks/basic_audit/recipes/disable_ftp.rb
service 'vsftpd' do
  action [:stop, :disable]
end

package 'vsftpd' do
  action :remove
end

# Close port 21 to incoming traffic.
firewall_rule 'close_ftp' do
  port 21
  protocol :tcp
  action :reject
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
      - recipe[firewall::default]
      - recipe[basic_audit::disable_ftp]
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
$ kitchen converge successful-audit-ubuntu-1404
-----> Starting Kitchen (v1.4.0)
-----> Creating <successful-audit-ubuntu-1404>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'opscode-ubuntu-14.04'...
[...]
       Recipe: basic_audit::disable_ftp
         * service[vsftpd] action stop (up to date)
         * service[vsftpd] action disable (up to date)
         * apt_package[vsftpd] action remove (up to date)

           - firewall_rule[close_ftp] in proto tcp to any port 21 from any
       Starting audit phase

       Validate services
         Ensure FTP access is not permitted
           is not running the vsftpd service
           is not listening on port 21

       Finished in 0.15042 seconds (files took 0.31122 seconds to load)
       2 examples, 0 failures
       Auditing complete

       Running handlers:
       Running handlers complete
       Chef Client finished, 4/10 resources updated in 9.54583463 seconds
         2/2 controls succeeded
       Finished converging <successful-audit-ubuntu-1404> (3m56.65s).
-----> Kitchen is finished. (5m59.32s)
```
