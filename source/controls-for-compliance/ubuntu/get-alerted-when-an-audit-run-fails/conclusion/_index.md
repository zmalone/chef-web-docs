In this tutorial, you installed and configured Chef Analytics and wrote your first rule. Although your rule is basic, it demonstrates the power of the rules language and notifications. You can learn more about [common tasks](https://docs.chef.io/analytics_webui_tasks.html) and find [additional examples](https://docs.chef.io/analytics_rules.html#examples) in the Chef documentation.

[FEEDBACK] There's more to come, including how to through verify your organization's compliance using Chef's [audit mode](https://docs.chef.io/analytics.html#audit-mode). In the meantime, tell us what you think so far, and what else you'd like to see in the future.


In this tutorial, you worked with the Chef Analytics web interface to view the state of your Chef server and to create rules and notifications. You can also use the `knife` plugin, [knife-analtyics](https://github.com/chef/knife-analytics), to perform common tasks from the command line. You can run this command to install `knife-analtyics`.

```bash
# ~/chef-repo
$ chef gem install knife-analytics
Fetching: chef-analytics-0.1.0.gem (100%)
Successfully installed chef-analytics-0.1.0
Fetching: knife-analytics-0.2.1.gem (100%)
Successfully installed knife-analytics-0.2.1
2 gems installed
```

http://complianceatvelocity.com/
