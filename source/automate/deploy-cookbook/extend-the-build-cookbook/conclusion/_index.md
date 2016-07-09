In this tutorial you created a build cookbook that deploys a Chef cookbook. You used the `delivery-truck` cookbook to automatically publish your cookbook to the Chef server and run `chef-client` on your node. You added a feature to the web application and also implemented the smoke phase to help verify that your web site is up and running.

Along the way, you learned about Chef Automate's pipeline stages and phases. You configured them to run automated tests and to publish your changes. As a bonus, you got to practice your Git skills.

Now's a great time to experiment further with your Chef Automate installation and practice the skills you just learned. Because Chef Automate is all about collaboration, a great next step is to add a second user to your organization and set up the Windows workstation for that user. Then add a new feature to the Customers web application and watch it move down the pipeline. Even a small change to the CSS or the addition of a new unit test is enough to practice the workflow.

Submit a change and use your established review process to approve and deliver new features. If you pair up with a coworker, you can perform the tasks that most closely map to your job roles.

The [appendix](/automate/install/managing-your-aws-instances) explains how to connect to the other systems and services that come with the Chef Automate environment.

If you need a break, you can [temporarily stop your AWS instances](/automate/install/managing-your-aws-instances#stoppingandrestartingyourawsinstances) and restart them later when you're ready. When you're completely finished with the evaluation or wish to start over, be sure to [tear down your installation](/automate/install/managing-your-aws-instances#tearingdownyourchefautomateinstallation).

### Learn more

Be sure to [explore the Chef documentation](https://docs.chef.io/chef_automate.html) to learn more about Chef Automate's features.

This tutorial and the previous one focused on Chef Automate's workflow and visibility features. Chef Automate also includes [Chef Compliance](https://www.chef.io/compliance/), which enables you to assess your infrastructure's adherence to compliance requirements and to monitor that infrastructure on an ongoing basis.

![](automate/automate-architecture.svg)

[See the Learn Chef tutorial](/tutorials/#compliance-assess) to get started with Chef Compliance.

You may also be interested in Chef's other open-source projects &ndash; [Habitat](https://www.habitat.sh) and [InSpec](https://www.chef.io/inspec/).

### Talk to us

Learn more about how to bring the full power of Chef Automate to accomplish your business goals. Go to [www.chef.io/automate](https://www.chef.io/automate) to read the whitepaper. Then click the **Contact Us** button to talk to us about how Chef Automate can help transform your workflow.

Have questions or suggestions on how Chef Automate can better fit your workflow? Join us on [Discourse](https://discourse.chef.io/c/delivery).
