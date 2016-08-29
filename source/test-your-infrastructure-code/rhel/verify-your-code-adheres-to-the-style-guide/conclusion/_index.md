This tutorial proposed these questions:

* Did our cookbook place the system in the desired state?
* Are our resources properly defined?
* Does the code adhere to our style guide?

In this tutorial, you used InSpec, ChefSpec, and the lint tools RuboCop and Foodcritic to help answer these questions. Each of these tools plays an important role in helping ensure that your cookbooks behave like you intend, are well-defined, adhere to accepted standards, and avoid common defects.

An increasingly popular way to write cookbooks is to write your tests before you write your Chef code. This _test-driven_ approach helps document your requirements and goals, and the scope of your project. Once all your tests pass, you've satisfied the requirements for your project and can move it to the next phase.

If you're new to Ruby programming or testing with InSpec or ChefSpec, the best way to get started is to adapt other examples that you see. The [InSpec documentation](https://docs.chef.io/inspec_reference.html) provides the full list of available resource types, and has many good examples. The ChefSpec project also contains many good [example tests](https://github.com/sethvargo/chefspec/tree/master/examples). Learn more about writing great tests and see practical examples at [betterspecs.org](http://betterspecs.org).

As with any kind of software testing, there's a time trade-off. It can take some time to write your initial tests and incorporate them into your workflow &ndash; arguably, it can take more time to set up your test process than it would take to test your initial configuration manually. Writing test code is also new to many people, and it can take time to ramp up your skills.

But once you have automated testing in place and the skills to start writing tests, verifying changes becomes significantly faster. What once took days or weeks to manually verify can now take hours or even minutes. And because automated testing enables you to more quickly and easily build confidence in your changes, you'll be better able to tackle those small but important changes that you were once hesitant to commit to.

Learn more about how to test and debug your Chef code in our [Joy of Automating](/skills/) video series, hosted by Franklin Webber.

If you're involved in your company's compliance and audit process, you may be interested in the [Chef compliance scanner](/compliance-assess/rhel/), which uses InSpec as its auditing and testing framework.

You may also be interested in [Chef Automate](https://www.chef.io/automate/), which gives your operations and development teams a common platform for developing, building, testing, and deploying cookbooks, applications, and more. Chef Automate reinforces the Chef workflow, where you begin by developing and testing your configuration from your local workstation. Then, you submit your change to Chef Automate's pipeline, where your change goes through sets of automated tests before going out into production. If you have many different teams, each delivering software in its own way, you can use Chef Automate to bring a standard, proven approach to all of your organization's deployments.

[TRAINING] Ready to dig deeper? Join us in-person or online at an upcoming instructor-led training event. [Learn more about our course offerings](https://www.chef.io/training/) or [check out our upcoming classes](https://www.chef.io/blog/events/category/training-events/). Use discount code **LEARN-CHEF** to save 10%. Use what you've learned to [gain official Chef certification](https://training.chef.io/certification).
