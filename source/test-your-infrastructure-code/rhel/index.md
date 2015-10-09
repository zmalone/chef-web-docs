---
title: 'Learn to test your Red Hat Enterprise Linux infrastructure code'
layout: lesson-overview
platform: Red Hat Enterprise Linux
logo: redhat.svg
order: 1
---
In [Learn to develop your Red Hat Enterprise Linux infrastructure code locally](/local-development/rhel/), you used [Test Kitchen](http://kitchen.ci) to configure and run a web application in an isolated environment that resembles your production environment.

Local development with Test Kitchen can greatly speed up the development process because it shortens the time it takes to bring up a machine and apply your Chef code. If you make a mistake or want to try something new, you can run your cookbook again or simply destroy the instance and create a new one.

<img src="/assets/images/networks/workstation-vm.png" style="width:40%; box-shadow: none;" alt="Your workstation, Test Kitchen, and a virtual machine" />

One advantage to developing locally is that it enables you to confirm that `chef-client` completes successfully in your target environment. However, you still need to verify that your instance was configured as you expect. As your project gets more complex, making a small change to one component can affect the behavior of another.

For example, say you have a cookbook that configures a web application. A recipe in that cookbook configures a database server to listen on port 3306. You confirm that your configuration behaves as you expect. Later, another member of your team adds a recipe that configures the firewall, and inadvertently closes access to port 3306. When you apply your configuration, your web application now displays a basic "access denied" error.

How would you diagnose the error? You might start by manually verifying that the database software is installed and running and that you can run basic queries. Or you might start by looking at other aspects of your configuration, such as user, group, and file permissions. It might take some time to discover that the firewall is blocking access to the required port. After you remedy the error, you may need to repeat the verification process to ensure that other functionality continues to work like you expect.

With Chef, you use _code_ to create cookbooks that express the desired state of your systems. You can also use code in a similar way to verify that the cookbooks you write do what you expect. The article [Overview of test driven infrastructure with Chef](/skills/test-driven-development/) outlines some of the more popular testing tools, and in this tutorial you'll use several of them.

Rather than focusing on the specific kinds of software testing, like unit and integration testing, in this tutorial we'll focus on these questions:

* Did our cookbook place the system in the desired state?
* Are our resources properly defined?
* Does the code adhere to our style guide?

After completing this tutorial, you'll:

* be able to use [Serverspec](http://serverspec.org) to verify that your cookbook configures the system as you expect.
* be able to use [ChefSpec](http://sethvargo.github.io/chefspec/) to verify that your resources are properly defined, even before you apply your cookbook.
* be able to use [RuboCop](https://github.com/bbatsov/rubocop) and [Foodcritic](http://acrmp.github.io/foodcritic/) to verify that your cookbook adheres to accepted coding standards and avoids common defects.
* have increased confidence that your `awesome_customers` cookbook that you've built in the previous tutorials will behave as you expect in production.

You'll get started by setting up the Chef Development Kit and familiarize yourself with Test Kitchen.

[GITHUB] After you complete this tutorial, you can get the final version of the code on [GitHub](https://github.com/learn-chef/test-your-infrastructure-code-rhel).
