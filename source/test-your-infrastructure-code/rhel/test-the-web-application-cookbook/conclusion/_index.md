This tutorial proposed these questions:

* Did our cookbook place the system in the desired state?
* Are our resources properly defined?
* Does the code adhere to our style guide?

In this tutorial, you used Serverspec, ChefSpec, and the lint tools RuboCop and Foodcritic to help answer these questions. Each of these tools plays an important role to helping ensure that your cookbooks behave like you intend, are well-defined, adhere to accepted standards, and avoid common potential defects.

[TIP] Learn more about writing great tests and see practical examples at [betterspecs.org](http://betterspecs.org).

As with any kind of software testing, there's a time tradeoff. It can take some time to write your initial tests and incorporate them into your workflow &ndash; arguably, it can take more time to set up your test process than it would take to test your initial configuration manually. It can also take time to get buy-in from others that automated testing is the right thing to do.

But once you have automated testing in place, verifying changes becomes significantly faster. What once took days or weeks to manually verify can now take hours or even minutes. And because automated testing enables you to more quickly and easily build confidence in your changes, you'll be better able to tackle those small but important changes that you were once hesitant to commit to.

[GITHUB] Get the final version of the code for this tutorial on [GitHub](https://github.com/learn-chef/test-your-infrastructure-code-rhel).

[TRAINING] Ready to dig deeper? Join us in-person or online at an upcoming instructor-led training event. [Learn more about our course offerings](https://www.chef.io/training/) or [check out our upcoming classes](https://www.chef.io/blog/events/category/training-events/). Use discount code **LEARN-CHEF** to save 10%.

We're working on the next tutorial, where you'll learn how to write Chef code that scales across multiple nodes. Stay tuned!
