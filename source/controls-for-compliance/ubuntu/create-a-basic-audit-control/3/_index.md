## 3. Apply the recipe to a Test Kitchen instance

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
```

```bash
# ~/chef-repo/cookbooks/basic_audit
$ kitchen list
Instance                      Driver   Provisioner  Verifier  Transport  Last Action
successful-audit-ubuntu-1404  Vagrant  ChefZero     Busser    Ssh        <Not Created>
```

```bash
# ~/chef-repo/cookbooks/basic_audit
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Creating <successful-audit-ubuntu-1404>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'opscode-ubuntu-14.04'...
[...]
       Converging 0 resources
       Starting audit phase

       Validate services
         Ensure FTP access is not permitted
           is not running the vsftpd service
           is not listening on port 21

       Finished in 0.12293 seconds (files took 0.32648 seconds to load)
       2 examples, 0 failures
       Auditing complete

       Running handlers:
       Running handlers complete
       Chef Client finished, 0/0 resources updated in 6.556604473 seconds
         2/2 controls succeeded
       Finished converging <successful-audit-ubuntu-1404> (0m8.99s).
-----> Kitchen is finished. (0m9.43s)
```
