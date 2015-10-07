## 6. Run the tests a second time

Run `kitchen verify` to run your test against your new web server configuration.

```bash
# ~/webserver_test
$ kitchen verify
-----> Starting Kitchen (v1.4.2)
-----> Verifying <default-centos-66>...
       Preparing files for transfer
-----> Busser installation detected (busser)
       Installing Busser plugins: busser-serverspec
       Plugin serverspec already installed
       Removing /tmp/verifier/suites/serverspec
       Transferring files to <default-centos-66>
-----> Running serverspec test suite
       /opt/chef/embedded/bin/ruby -I/tmp/verifier/suites/serverspec -I/tmp/verifier/gems/gems/rspec-support-3.3.0/lib:/tmp/verifier/gems/gems/rspec-core-3.3.2/lib /opt/chef/embedded/bin/rspec --pattern /tmp/verifier/suites/serverspec/\*\*/\*_spec.rb --color --format documentation --default-path /tmp/verifier/suites/serverspec

       webserver_test::default
         displays a custom home page

       Finished in 0.05451 seconds (files took 0.27734 seconds to load)
       1 example, 0 failures

       Finished verifying <default-centos-66> (0m3.13s).
-----> Kitchen is finished. (0m3.62s)
```

Success! The test passes. If the test did not pass, you would go back to your web server code, fix the failure, and run your test again.

Run `kitchen list`. You'll see in the `Last Action` column that the instance's state is `Verified`, which means that Test Kitchen's most previous action was to run the tests.

```bash
# ~/webserver_test
$ kitchen list
Instance           Driver   Provisioner  Verifier  Transport  Last Action
default-centos-66  Vagrant  ChefZero     Busser    Ssh        Verified
```
