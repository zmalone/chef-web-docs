---
title: 'Get started with a Chef Automate environment'
layout: lesson-overview
platform: Get started with a Chef Automate environment
logo: build.svg
order: 1
---
Chef Automate gives your operations and development teams a common platform for developing, building, testing, and deploying cookbooks, applications, and more. It enables multiple teams to work together on systems made up of multiple components and services, and promotes the DevOps principles of cross-team collaboration, cooperation, and transparency.

![](automate/automate-architecture.svg)

Chef Automate provides a workflow for managing changes as they flow through its pipeline, beginning with a local workstation, through sets of automated tests, and out into production. If you have many different teams, each delivering software in its own way, you can use Chef Automate to bring a standard, proven approach to all of your organization's deployments.

With Chef Automate, you can, for example:

* upload new and updated cookbooks to the Chef server that manages your infrastructure and applications.
* publish new and updated cookbooks to a Chef Supermarket installation.
* release source code or build artifacts (for example, a Java or PHP application) to a repository such as GitHub or Artifactory.
* run automated tests to identify potential defects or bugs in your code.
* detect cases where a different team's code is incompatible with yours.
* push build artifacts to production servers in real time.
* deploy [Habitat](https://www.habitat.sh) packages to a Habitat depot.

Chef uses Chef Automate to deploy its own software. With it, we have:

* increased the number of features per release by 50%.
* reduced the number of defects per release by 70%.
* went from 1 release every two days to 12 releases per day.

We are shipping code faster, with less effort, and with higher quality. In this tutorial and the ones that follow, you'll take Chef Automate for a spin and see what sorts of benefits you can deliver for your organization.

To help get started with Chef Automate more quickly, you begin by using automation to build infrastructure that runs in Amazon Web Services (AWS). All you need is an AWS account and a Chef Automate license key (you sign up for a trial key on the next page).

The automation brings up a fully-functional Chef Automate system in an isolated AWS environment that won't affect anything else you're running. After you complete the tutorials, you can experiment further and then simply tear down the environment when you're done.

[COMMENT] Learn more about how to use the full power of Chef Automate to accomplish your business goals. Go to [www.chef.io/automate](https://www.chef.io/automate) to read the white paper.
