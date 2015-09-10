## 1. Install the kitchen-ec2 driver

Although Chef DK comes with Test Kitchen, you need to install the [kitchen-ec2](https://github.com/test-kitchen/kitchen-ec2) driver to enable it to communicate with Amazon EC2.

Run this command to install it.

```bash
# ~
$ chef gem install kitchen-ec2
Fetching: jmespath-1.0.2.gem (100%)
Successfully installed jmespath-1.0.2
Fetching: aws-sdk-core-2.1.12.gem (100%)
Successfully installed aws-sdk-core-2.1.12
Fetching: aws-sdk-resources-2.1.12.gem (100%)
Successfully installed aws-sdk-resources-2.1.12
Fetching: aws-sdk-2.1.12.gem (100%)
Successfully installed aws-sdk-2.1.12
Fetching: test-kitchen-1.4.2.gem (100%)
Successfully installed test-kitchen-1.4.2
Fetching: kitchen-ec2-0.10.0.gem (100%)
Successfully installed kitchen-ec2-0.10.0
6 gems installed
```

The [chef gem](https://docs.chef.io/ctl_chef.html#chef-gem) command ensures that the Ruby gem is installed into the Chef DK environment.
