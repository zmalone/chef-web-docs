---
title: 'Build a continuous delivery pipeline with Chef Delivery on AWS'
layout: lesson-overview
platform: Get started with Chef Delivery on AWS
logo: delivery.svg
order: 1
meta_tags: [{name: "ROBOTS", content: "NOINDEX, NOFOLLOW"}]
redirect: /delivery_tutorial_offline/
---
Chef Delivery manages changes to both infrastructure and application code, giving your operations and development teams a common platform for developing, building, testing, and deploying cookbooks, applications, and more.

It provides a proven, reproducible workflow for managing changes as they flow through its pipeline, beginning with a local workstation, through sets of automated tests, and out into production.

Chef Delivery handles many types of software systems. You can use it to:

* upload new and updated cookbooks to the Chef server that manages your infrastructure and applications.
* publish new and updated cookbooks to a Chef Supermarket installation.
* release source code or build artifacts to a repository such as GitHub.
* push build artifacts to production servers in real time.

[COMMENT] Chef Delivery relies on Git and uses its feature branches for handling changes before they merge, as well as Git's ability to perform merges automatically. You're going to see Git terminology throughout this tutorial. If you're unfamiliar with Git, you might want to [check out the documentation](https://git-scm.com/doc).

[START_BOX]

## Pipelines

A _pipeline_ is series of automated and manual quality gates that take software changes from development to delivery. Pipelines in Chef Delivery have six stages: Verify, Build, Acceptance, Union, Rehearsal, and Delivered. Changes progress from one stage to another by passing a suite of automated tests. To advance from the Verify and Acceptance stages, explicit approval by a designated person is required (in addition to completion of the associated tests.)

[END_BOX]

[START_BOX]

## Phases

The tests within each stage are organized into phases.

Here are the phases for each stage.

| Verify   | Build      | Acceptance | Union      | Rehearsal  | Delivered  |
|----------|------------|------------|------------|------------|------------|
| Unit     | Unit       | Provision  | Provision  | Provision  | Provision  |
| Lint     | Lint       | Deploy     | Deploy     | Deploy     | Deploy     |
| Syntax   | Syntax     | Smoke      | Smoke      | Smoke      | Smoke      |
|          | Quality    | Functional | Functional | Functional | Functional |
|          | Security   |            |            |            |            |
|          | Publish    |            |            |            |            |

You determine what happens in each phase with a _build cookbook_. Each phase is configured with a recipe in that cookbook. Build cookbooks also control other aspects of the pipeline, such as the types of artifacts you build and where you store them.

For a complete description of Chef Delivery, see the [Chef documentation](https://docs.chef.io/release/delivery_1-0/).

[END_BOX]

[START_BOX]

## The scenario

This tutorial builds on [Learn to manage a basic Red Hat Enterprise Linux web application](/manage-a-web-app/rhel) and the tutorials that follow. There, you wrote a cookbook called `awesome_customers` that built a web application named Customers.

The Customers application that you've built so far looks like this:

![](delivery/acceptance-customers-verify.png)

You don't have to work through the previous tutorials &ndash; we provide all the code you'll need. We'll provide pointers back to the previous tutorials to help you understand how the pieces work.

In this tutorial, you'll install Chef Delivery and, to validate the installation, move the `awesome_customers` cookbook through each stage of the pipeline. You'll learn how to write a build cookbook to configure the pipeline and to run different types of tests. You'll also learn how to use Chef provisioning to provision the pipeline stages. Finally, you'll add two features to the web application. One adds additional sample data and the other displays the data on an interactive map control. You'll run the updated cookbook through the Delivery pipeline again.

By the end, your web application will look like this:

![](delivery/customers-visualize-data-delivered.png)

[END_BOX]

[START_BOX]

## How to approach this tutorial

Chef Delivery is team oriented, and so is this tutorial. As a result, there are several ways to go through this tutorial.

If you are most interested in using Chef Delivery in a project, you might want to get a system administrator in your company to help with the [installation and network configuration](/build-a-delivery-pipeline/aws/install-chef-delivery) that are the first part of the tutorial. If you're a project leader, you might find that the lesson that [sets up a new project](/build-a-delivery-pipeline/aws/create-the-project) is a good place to start. If your interest is primarily day-to-day use of Delivery, then the part of the tutorial that [walks through delivering changes](/build-a-delivery-pipeline/aws/write-the-build-cookbook) might be of the most interest. In other words, it's possible to go through this tutorial as a team, with different members of the team doing parts of the tutorial that most closely map to their job roles. Of course, you can go through all tutorial steps as an individual.

After completing this tutorial, you'll:

* have a working Chef Delivery installation and users who are set up to use it.
* understand each of the stages and phases that make up a Chef Delivery pipeline.
* know how to write a build cookbook that configures the pipeline.
* understand how to develop and test new features on your workstation before you submit them.

[GITHUB] After you complete this tutorial, you can refer back to the final version of the code on [GitHub](https://github.com/learn-chef/deliver-customers-rhel).

[END_BOX]
