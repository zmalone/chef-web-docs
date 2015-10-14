## 4. Run the ChefSpec tests a second time

Now let's verify whether our updated cookbook passes our ChefSpec tests. We want to see whether the tests for Ubuntu now pass and also verify that the tests for CentOS continue to pass.

```bash
# ~/webserver
$ chef exec rspec --color spec/unit/recipes/default_spec.rb
........

Finished in 1.83 seconds (files took 13.04 seconds to load)
8 examples, 0 failures
```

Great! All tests pass. In this example, the entire run took less than 15 seconds to complete. This process is much faster than applying the configuration on real CentOS and Ubuntu instances, and is a great way to quickly validate that the resources are properly defined.

[COMMENT] We introduced Serverspec testing first because many people find this kind of testing to be the easiest way to understand the concept and the value of testing. In practice, you might actually create your ChefSpec tests first because ChefSpec tests typically run more quickly, and can help identify potential issues earlier in the process.
