## 2. Install the kitchen-hyperv driver

Although Chef DK comes with Test Kitchen, you need to install the [kitchen-hyperv](https://github.com/test-kitchen/kitchen-hyperv) driver to enable it to communicate with Hyper-V.

Run this command to install it.

```ps
# ~
$ chef gem install kitchen-hyperv
Fetching: kitchen-hyperv-0.1.7.gem (100%)
Successfully installed kitchen-hyperv-0.1.7
Parsing documentation for kitchen-hyperv-0.1.7
Installing ri documentation for kitchen-hyperv-0.1.7
Done installing documentation for kitchen-hyperv after 0 seconds
1 gem installed
```

The [chef gem](https://docs.chef.io/ctl_chef.html#chef-gem) command ensures that the Ruby gem is installed into the Chef DK environment.
