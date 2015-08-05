## 3. Apply the recipe to a Test Kitchen instance

Now let's apply the audit control to a Windows Server virtual machine. First, modify your `audit` cookbook's <code class="file-path">.kitchen.yml</code> file to look like this.

```ruby
# ~/chef-repo/cookbooks/audit/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero
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

The `audit_mode: :audit_only` part tells `chef-client` to run only your audit controls, and not apply any other resources that appear in the run-list. We specify `:audit_only` because this cookbook's role is only to verify your compliance policy. You can specify `:enabled` to apply both your configuration code and your audit controls or `:disabled` to run only your configuration code.

Run `kitchen list` to verify that the instance has not yet been created.

```bash
# ~/chef-repo/cookbooks/audit
$ kitchen list
Instance                Driver   Provisioner  Verifier  Transport  Last Action
default-windows-2012r2  Vagrant  ChefZero     Busser    Winrm      <Not Created>
```

Now run `kitchen converge` to create the instance and apply your audit control.

[COMMENT] A VirtualBox window that contains your Windows Server instance appears when you run `kitchen converge`. For now, you don't need to interact with that window.

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
