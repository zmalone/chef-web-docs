In this tutorial, you used Chef's audit mode to apply audit controls to your infrastructure. You can run your  tests as often as you need and can resolve issues more quickly than through manual testing.

Chef Analytics gives you a view into what's happening in your infrastructure. You can write rules, alerts, and notifications to contact the right people and services when an audit failure occurs anywhere in your network.

By starting with Test Kitchen to verify your work locally, you have increased confidence that your changes will work in production.

In this tutorial, you worked with the Chef Analytics web interface to view the state of your Chef server and to create rules and notifications. You can also use the `knife` plugin [knife-analytics](https://github.com/chef/knife-analytics) to perform view alerts and perform other common tasks from the command line. To get started, run this command to install `knife-analytics` on your workstation.

```bash
# ~/chef-repo
$ chef gem install knife-analytics
Fetching: chef-analytics-0.1.0.gem (100%)
Successfully installed chef-analytics-0.1.0
Fetching: knife-analytics-0.2.1.gem (100%)
Successfully installed knife-analytics-0.2.1
2 gems installed
```

[GITHUB] Get the code for this tutorial [on GitHub](https://github.com/learn-chef/controls-for-compliance-ubuntu).

Learn more about building a high velocity, highly compliant organization at [complianceatvelocity.com](http://complianceatvelocity.com/).
