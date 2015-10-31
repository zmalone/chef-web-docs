## Next steps

Now that you've worked with the basics, here's your chance to make Chef Delivery your own. Here are some ideas to get started.

* Add a new feature to the Customers web application and watch it move down the pipeline. Even a small change to the CSS or the addition of a new unit test is enough to experience Chef Delivery on your own. Remember to verify and test your changes locally before you submit new features into the pipeline.
* Invite others to your org. Submit a change and apply your established review process to approve and deliver new features.
* If you've gone through the [Get Started with Chef Analytics](/get-started-with-chef-analytics/linux/) and [Audit a node for compliance](/controls-for-compliance/rhel/) tutorials, take what you've learned and make your Delivery pipeline even more powerful.  Write some automated audit tests, and install the Chef Analytics server to see what's happening and to generate alerts.
* Configure your Delivery cluster to use multiple build nodes (we recommend 3 for a complete setup.) Your changes can move faster through the pipeline because many phases can run in parallel.
* If you use Chef Supermarket, integrate Chef Delivery with your Supermarket server. The `delivery-truck` cookbook makes it easy to publish your cookbooks not only to Chef server, but to Supermarket as well.
* Clone an existing project &ndash; this can be a cookbook, application, or service &ndash; into Chef Delivery's integrated Git server. Write a build cookbook that's tailored to how you test and verify new features, build and publish your artifacts, and deploy to your infrastructure environments. Once you have a solid pipeline in place, you can integrate Chef Delivery with your existing source control system.

Have questions or suggestions on how Chef Delivery can better fit your workflow? Join us on [Discourse](https://discourse.chef.io/c/delivery).
