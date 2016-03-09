In this tutorial you installed Chef Delivery in an AWS environment and created a build cookbook that deploys a Chef cookbook. You used the `delivery-truck` cookbook to automatically publish your cookbook to the Chef server and run `chef-client` on your node. You also implemented the smoke phase to help verify that your web site is up and running.

Along the way, you learned about Delivery's pipeline stages and phases. You configured them to run automated tests and to publish your changes. As a bonus, you got to practice your Git skills.

Now's a great time to experiment further with your Chef Delivery installation and practice the skills you just learned. Because Chef Delivery is all about collaboration, a great next step is to add a second user to your organization and set up the Windows workstation for that user (you can create a working directory for the user on the same level as <code class="file-path">~\delivery-demo</code>.) Then add a new feature to the Customers web application and watch it move down the pipeline. Even a small change to the CSS or the addition of a new unit test is enough to practice the workflow. 
Submit a change and use your established review process to approve and deliver new features.

When you're done, you can [temporarily stop your AWS instances](/delivery/get-started/install-chef-delivery#howtotemporarilystopandrestartyourawsinstances) and resume them later. When you're completely finished with the evaulation or wish to start over, be sure to [tear down your installation](/delivery/get-started/install-chef-delivery#howtoteardownyourdeliveryinstallation).

Learn more about how to bring the full power of Chef Delivery to accomplish your business goals. Go to [www.chef.io/delivery](https://www.chef.io/delivery) to read the whitepaper. Then click **Get Demo** to talk to us about how Chef Delivery can help transform your workflow.

Have questions or suggestions on how Chef Delivery can better fit your workflow? Join us on [Discourse](https://discourse.chef.io/c/delivery).