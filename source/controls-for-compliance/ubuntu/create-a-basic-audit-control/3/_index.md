## 3. Apply the recipe to a Test Kitchen instance

Now let's apply the audit control to an Ubuntu virtual machine. First, modify your `audit` cookbook's <code class="file-path">.kitchen.yml</code> file to look like this.

```yaml
# ~/chef-repo/cookbooks/audit/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero
  client_rb:
    audit_mode: :audit_only

platforms:
  - name: ubuntu-14.04

suites:
  - name: default
    run_list:
      - recipe[audit::default]
    attributes:
```

The `audit_mode: :audit_only` part tells `chef-client` to run only your audit controls, and not apply any other resources that appear in the run-list. We specify `:audit_only` because this cookbook's role is only to verify your compliance policy. You can specify `:enabled` to apply both your configuration code and your audit controls or `:disabled` to run only your configuration code.

Run `kitchen list` to verify that the instance has not yet been created.

```bash
# ~/chef-repo/cookbooks/audit
$ kitchen list
Instance             Driver   Provisioner  Verifier  Transport  Last Action
default-ubuntu-1404  Vagrant  ChefZero     Busser    Ssh        <Not Created>
```

Now run `kitchen converge` to create the instance and apply your audit control.

```bash
# ~/chef-repo/cookbooks/audit
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Creating <default-ubuntu-1404>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'opscode-ubuntu-14.04'...
[...]
       Converging 0 resources
       Starting audit phase

       Finished in 0.00018 seconds (files took 0.24698 seconds to load)
       0 examples, 0 failures
       Auditing complete

       Running handlers:
       Running handlers complete
       Chef Client finished, 0/0 resources updated in 6.352620924 seconds
       Finished converging <default-ubuntu-1404> (0m46.27s).
-----> Kitchen is finished. (2m26.50s)
```

We haven't yet configured Apache or added any web files, so there are no files to test. But this is a good first step to verifying that the control is correctly set up.
