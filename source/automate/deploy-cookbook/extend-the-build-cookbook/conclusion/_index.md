[PRODNOTE] Maybe show the original image and point folks to the things not discussed here (Compliacne, InSpec, Habitat)

In this tutorial you installed Chef Automate in an AWS environment and created a build cookbook that deploys a Chef cookbook. You used the `delivery-truck` cookbook to automatically publish your cookbook to the Chef server and run `chef-client` on your node. You also implemented the smoke phase to help verify that your web site is up and running.

Along the way, you learned about Chef Automate's pipeline stages and phases. You configured them to run automated tests and to publish your changes. As a bonus, you got to practice your Git skills.

Now's a great time to experiment further with your Chef Automate installation and practice the skills you just learned. Because Chef Automate is all about collaboration, a great next step is to add a second user to your organization and set up the Windows workstation for that user (you can create a working directory for the user on the same level as <code class="file-path">C:\Users\Administrator\cookbooks</code>.) Then add a new feature to the Customers web application and watch it move down the pipeline. Even a small change to the CSS or the addition of a new unit test is enough to practice the workflow.
Submit a change and use your established review process to approve and deliver new features.

To help you explore and experiment, the Windows workstation comes preconfigured to communicate with the Chef server. You can find the <code class="file-path">knife.rb</code> and validation key in the <code class="file-path">C:\Users\Administrator\\\.chef</code> directory, which enables you to run `knife` commands from any directory.

[PRODNOTE] See the appendix for URLs blah blah...

[PRODNOTE] ?? V

From the web interface, you see your Chef Automate server, build nodes, and the node for your Acceptance environment.

![](delivery/chef_server_webui.png)

If you need a break, you can [temporarily stop your AWS instances](/delivery/get-started/managing-your-aws-instances#stoppingandrestartingyourawsinstances) and resume them later. When you're completely finished with the evaluation or wish to start over, be sure to [tear down your installation](/delivery/get-started/managing-your-aws-instances#tearingdownyourdeliveryinstallation).

Learn more about how to bring the full power of Chef Automate to accomplish your business goals. Go to [www.chef.io/automate](https://www.chef.io/automate) to read the whitepaper. Then click **Get Demo** to talk to us about how Chef Automate can help transform your workflow.

Have questions or suggestions on how Chef Automate can better fit your workflow? Join us on [Discourse](https://discourse.chef.io/c/delivery).
