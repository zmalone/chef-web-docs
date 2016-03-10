---
title: 'Get started with Chef Delivery on AWS'
layout: lesson-overview
platform: Get started with Chef Delivery on AWS
logo: delivery.svg
order: 1
meta_tags: [{name: "ROBOTS", content: "NOINDEX, NOFOLLOW"}]
---
Chef Delivery (Delivery) gives your operations and development teams a common platform for developing, building, testing, and deploying cookbooks, applications, and more. It enables multiple teams to work together on systems made up of multiple components and services, and promotes the DevOps principles of cross-team collaboration, cooperation, and transparency.

Delivery provides a workflow for managing changes as they flow through its pipeline, beginning with a local workstation, through sets of automated tests, and out into production. If you have many different teams, each delivering software in its own way, you can use Delivery to bring a standard, proven approach to all of your organization's deployments.

With Delivery, you can, for example:

* upload new and updated cookbooks to the Chef server that manages your infrastructure and applications.
* publish new and updated cookbooks to a Chef Supermarket installation.
* release source code or build artifacts (for example, a Java or PHP application) to a repository such as GitHub or Artifactory.
* run automated tests to identify potential defects or bugs in your code. 
* detect cases where a different team's code causes an incompatibility with yours.
* push build artifacts to production servers in real time.

Chef uses Delivery to deploy its own software. With it, we have:

* increased the number of features per release by 50%.
* reduced the number of defects per release by 70%.
* went from 1 release every two days to 12 releases per day.

We are shipping code faster, with less effort, and with higher quality. In this tutorial, you'll take Delivery for a spin and see what sorts of benefits you can deliver for your organization.

[COMMENT] Chef Delivery relies on Git and uses its feature branches for handling changes before they merge, as well as Git's ability to perform merges automatically. You're going to see Git terminology throughout this tutorial. We'll provide all the Git commands that you'll need, but you can also [check out the documentation](https://git-scm.com/doc) to learn more.

[START_BOX]

## Pipelines

A _pipeline_ is a series of automated and manual quality gates that take software changes from development to delivery. Pipelines in Chef Delivery have six stages: Verify, Build, Acceptance, Union, Rehearsal, and Delivered.

<img src="/assets/images/delivery/delivery_partial_workflow.svg" style="width: 100%; box-shadow: none;" alt="Chef Delivery's six stages" />

Changes progress from one stage to another by passing a suite of automated tests. To advance past the Verify and Acceptance stages, explicit approval by a designated person is required (in addition to completion of the associated tests.)

[Learn more about pipeline stages](https://docs.chef.io/release/delivery/delivery_overview.html#pipeline-stages)

[END_BOX]

[START_BOX]

## Phases

The tests within each stage are organized into phases.

Here are the phases for each stage.

<img src="/assets/images/delivery/delivery_full_workflow.svg" style="width: 100%; box-shadow: none;" />

You determine what happens in each phase with a _build cookbook_. Each phase is configured with a recipe in that cookbook. Build cookbooks also control other aspects of the pipeline, such as the types of artifacts you build and where you store them.

[Learn more about build cookbooks](https://docs.chef.io/delivery_cookbooks.html)

[END_BOX]

[START_BOX]

## What you'll do

This tutorial comes in multiple parts. In the first three parts, you bring up a Chef Delivery installation and configure a workstation to communicate with it. In the last three parts, you  use Delivery to deliver a cookbook to Chef server and to verify the cookbook's behavior in a production-like environment.

### Part 1: Install Chef Delivery on AWS

Chef Delivery runs on your hardware or in the cloud.

To help you get started with Chef Delivery more quickly, you begin by using automation to build infrastructure that runs in Amazon Web Services (AWS). All you need is an AWS account and a Chef Delivery license key (you sign up for a trial key on the next page).

The automation brings up a fully-functional Chef Delivery system in an isolated AWS environment that won't affect anything else you're running. After you complete the tutorial, you can experiment further and then simply tear down the environment when you're done.

### Part 2: Create the organization and add a user

Here, you configure Chef Delivery for your users.

You log in to the Delivery web interface and create an organization and a user account. Organizations group related projects. User accounts enable end users to access Delivery through its web interface or from the command line.

### Part 3: Set up your workstation

Next, you configure a workstation to communicate with Chef Delivery.

The automation sets up a virtual Windows workstation. You install the Chef Delivery commmand-line interface (CLI) tools and set up a user account so you can access Delivery.

### Part 4: Create the project

You can use Chef Delivery to build and deploy almost any kind of software system. For example, you can publish changes to a  Chef cookbook to Chef server, Chef Supermarket, or GitHub. Alternatively, you might deploy a service to an application server.

In this tutorial, the project is a Chef cookbook named `awesome_customers_delivery`. This cookbook configures a web application named Customers, which displays customer data to the user. If you've gone through the [Learn to manage a basic web application](/manage-a-web-app/ubuntu/) tutorial, you'll be familiar with this cookbook (this tutorial is not a prerequisite.)

The project's build cookbook publishes the web application cookbook to a Chef server and then runs the web application cookbook on a node that's bootstrapped to the Chef server. Both the Chef server and the node are included in the automated setup.

By the end of this part, your web application looks like this:

<img style="max-width:100%;" src="/assets/images/delivery/acceptance-customers-verify.png"/>

### Part 5: Add a feature to the web application

In this part, you integrate a change to the web application cookbook that alters the way that the Customers web application displays data. You follow the change through each pipeline stage, from your workstation all the way out to your node. By the end of this part, your web application looks like this:

![](delivery/customers-visualize-data-delivered.png)

### Part 6: Extend the build cookbook

In this tutorial, you learn about the `delivery-truck` cookbook, which helps perform many common tasks that are needed to deliver Chef cookbooks. However, this cookbook can't do everything.

In this part, you extend your build cookbook to include a smoke test. Smoke testing helps you quickly validate whether your application or service is running and functional.

[END_BOX]

[START_BOX]

## How to approach this tutorial

This tutorial walks you through setting up and using Chef Delivery as an individual. But because Chef Delivery is team oriented, you can approach the tutorial as a team as well.

If you are most interested in using Chef Delivery to deploy projects, you might want to get a system administrator to help by [running the AWS automation](/delivery/get-started/install-chef-delivery/) and [creating the organization and a user account](/delivery/get-started/create-the-organization-and-add-a-user). If you're a project leader, you might find that the lesson that [sets up a project](/delivery/get-started/create-the-project/) is a good place to start. If your interest is primarily day-to-day use of Delivery, then the part of the tutorial that [walks through delivering a change](/delivery/get-started/add-a-feature-to-the-web-application/) and [extends the build cookbook](/delivery/get-started/extend-the-build-cookbook/) might be of the most interest.

In other words, it's possible to go through this tutorial with your team, with different team members doing the parts of the tutorial that most closely map to their jobs. Of course, you can also go through the entire tutorial yourself.

After completing this tutorial, you should be able to:

* describe each of the stages and phases that make up a Chef Delivery pipeline.
* verify the correctness of new features and submit changes to the pipeline.
* approve code changes made by others.
* verify new features and deliver them to your users.

[GITHUB] After you complete this tutorial, you can [refer to the final version of the code](https://github.com/learn-chef/awesome_customers_delivery) on GitHub.

[END_BOX]
