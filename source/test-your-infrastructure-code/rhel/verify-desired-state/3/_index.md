## 3. Run the test on a CentOS virtual machine

Before we write any Chef code to configure the web server, let's run the test through Test Kitchen on a CentOS virtual machine and watch it fail.

Modify <code class="file-path">.kitchen.yml</code> like this to specify CentOS 6.6 as the target platform.

```yaml
# ~/webserver/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero

platforms:
  - name: centos-6.6

suites:
  - name: default
    run_list:
      - recipe[webserver::default]
    attributes:
```

Run `kitchen list` to verify that the instance has not yet been created.

```bash
# ~/webserver
$ kitchen list
Instance           Driver   Provisioner  Verifier  Transport  Last Action
default-centos-66  Vagrant  ChefZero     Busser    Ssh        <Not Created>
```

Previously, you ran `kitchen converge` to bring up your virtual machine and apply your Chef code. This time, run `kitchen verify` to bring up the virtual machine and run just your tests.

```bash
# ~/webserver
$ kitchen verify
-----> Starting Kitchen (v1.4.2)
-----> Creating <default-centos-66>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'opscode-centos-6.6'...
[...]
       webserver::default
         displays a custom home page (FAILED - 1)

       Failures:

         1) webserver::default displays a custom home page
            Failure/Error: expect(command('curl localhost').stdout).to match /hello/
              expected "" to match /hello/
              Diff:
              @@ -1,2 +1,2 @@
              -/hello/
              +""

              /bin/sh -c curl\ localhost

            # /tmp/verifier/suites/serverspec/default_spec.rb:5:in `block (2 levels) in <top (required)>'

       Finished in 0.06486 seconds (files took 0.264 seconds to load)
       1 example, 1 failure

       Failed examples:

       rspec /tmp/verifier/suites/serverspec/default_spec.rb:4 # webserver::default displays a custom home page
[...]
```

As expected, the test fails because we have not yet written any code to configure the system. But having a failing test shows what functionality is missing and gives us a clear goal to work towards.
