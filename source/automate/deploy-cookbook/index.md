---
title: 'Deploy a cookbook with Chef Automate'
layout: lesson-overview
platform: Deploy a cookbook with Chef Automate
logo: workflow-cookbook.svg
order: 3
meta_tags: [{name: "ROBOTS", content: "NOINDEX, NOFOLLOW"}]
---
In the previous tutorials, you [brought up a preconfigured Chef Automate environment](/automate/install/) and [bootstrapped infrastructure nodes](/automate/visibility/) to run a basic web application cookbook. Along the way, you learned how to use push jobs to run `chef-client` on your nodes. You also used Chef Automate's ability to report the status of your nodes to resolve a failed `chef-client` run.

However, the workflow you used was largely manual &ndash; you uploaded changes directly to the Chef server and ran `chef-client` on your nodes from your workstation. To successfully ship code faster, with less effort, and with higher quality, you need a more centralized approach that promotes the DevOps principles of cross-team collaboration, cooperation, and transparency.

In this tutorial, you'll use Chef Automate's _workflow_ capabilities to deliver changes to the web application cookbook to the Chef server and to verify the cookbook's behavior in a production-like environment. Chef Automate enables multiple teams to work together on systems made up of multiple components and services, and promotes DevOps principles.

![](automate/automate-architecture-workflow.svg)

Two important parts of Chef Automate are _pipelines_ and _phases_.

[START_BOX]

## Pipelines

A _pipeline_ is a series of automated and manual quality gates that take software changes from development to delivery. Pipelines in Chef Automate have six stages: Verify, Build, Acceptance, Union, Rehearsal, and Delivered.

<img src="/assets/images/delivery/delivery_partial_workflow.svg" style="width: 100%; box-shadow: none;" alt="Chef Automate's six stages" />

Changes progress from one stage to another by passing a suite of automated tests. To advance past the Verify and Acceptance stages, explicit approval by a designated person is required (in addition to completion of the associated tests.)

[Learn more about pipeline stages](https://docs.chef.io/workflow.html#pipeline-stages)

[END_BOX]

[START_BOX]

## Phases

The work within each stage is organized into phases.

Here are the phases for each stage.

<img src="/assets/images/delivery/delivery_full_workflow.svg" style="width: 100%; box-shadow: none;" />

You determine what happens in each phase with a _build cookbook_. Each phase is configured with a recipe in that cookbook. Build cookbooks also control other aspects of the pipeline, such as the types of artifacts you build and where you store them.

[Learn more about build cookbooks](https://docs.chef.io/delivery_build_cookbook.html)

[END_BOX]

[START_BOX]

## What you'll do

This tutorial comes in multiple parts. In the first part, you set up a Chef Automate user and configure the Windows workstation for that user. In the last three parts, you use Chef Automate to deliver the web application cookbook to Chef server and to verify the cookbook's behavior in a production-like environment.

### Part 1: Create the organization and add a user

Here you set up the user that will perform the last three parts of this tutorial.

User accounts enable end users to access Chef Automate through its web interface or from the command line.

You log in to the Chef Automate web interface and create a user account. You also set up the virtual Windows workstation so you can access Chef Automate through that user account.

### Part 2: Create the project

You can use Chef Automate to build and deploy almost any kind of software system. For example, you can publish changes to a Chef cookbook to Chef server, Chef Supermarket, or GitHub. Alternatively, you might deploy a service to an application server.

In this tutorial, the project is the `awesome_customers_delivery` cookbook that you worked with in the previous tutorial. Recall that this cookbook configures a web application named Customers, which displays customer data to the user.

<img style="max-width:100%;" src="/assets/images/automate/acceptance-customers-verify.png"/>

The project's build cookbook publishes the web application cookbook to a Chef server and then runs the web application cookbook on the nodes that you previously bootstrapped to the Chef server.

### Part 3: Add a feature to the web application

In this part, you integrate a change to the web application cookbook that alters the way that the Customers web application displays data. You follow the change through each pipeline stage, from your workstation all the way out to your nodes. By the end of this part, your web application looks like this:

<img style="max-width:100%;" src="/assets/images/automate/acceptance-visualize_data.png"/>

### Part 4: Extend the build cookbook

In this tutorial, you learn about the `delivery-truck` cookbook, which helps perform many common tasks that are needed to deliver Chef cookbooks. However, this cookbook can't do everything.

In this part, you extend your build cookbook to include a smoke test. Smoke testing helps you quickly validate whether your application or service is running and functional.

[END_BOX]

[START_BOX]

## What you'll learn

After completing this tutorial, you should be able to:

* describe each of the stages and phases that make up a Chef Automate pipeline.
* verify the correctness of new features and submit changes to the pipeline.
* approve code changes made by others.
* verify new features and deliver them to your users.

[COMMENT] Chef Automate relies on Git and uses its feature branches for handling changes before they merge, as well as Git's ability to perform merges automatically. You're going to see Git terminology throughout this tutorial. We'll provide all the Git commands that you'll need, but you can also [check out the documentation](https://git-scm.com/doc) to learn more.

[GITHUB] After you complete this tutorial, you can [refer to the final version of the code](https://github.com/learn-chef/awesome_customers_delivery) on GitHub.

[END_BOX]

[START_BOX]

## Before you begin

This tutorial relies on the preconfigured Chef Automate environment and nodes that are bootstrapped to run the `awesome_customers_delivery` cookbook. Be sure to complete these tutorials if you haven't already.

* [Get started with a Chef Automate environment](/automate/install/)
* [Gain visibility into your infrastructure with Chef Automate](/automate/visibility/)

[END_BOX]
