## 5. Verify your Chef Analytics configuration

Finally, verify your Chef Analytics configuration.

```bash
# ~
$ opscode-analytics-ctl test
Running with options:

{:config_file=>"/opt/opscode-analytics/embedded/service/analytics-test/config.rb", :smoke_tests_only=>true}

Running tests from the following directory:
/opt/opscode-analytics/embedded/service/analytics-test/spec/integration

Randomized with seed 48629


basic server state check
  is running

Finished in 0.05267 seconds
1 example, 0 failures

Randomized with seed 48629

```
