---
title: 'Get the Chef Automate demo environment'
layout: lesson-overview
platform: Get the Chef Automate demo environment
logo: demo-environment.svg
order: 1
---
Chef Automate gives your operations and development teams a common platform for developing, building, testing, and deploying cookbooks, applications, and more. It enables multiple teams to work together on systems made up of multiple components and services, and promotes the DevOps principles of cross-team collaboration, cooperation, and transparency.

[PRODNOTE] Update diagram.

![](automate/Chef-Automate.png)

Chef Automate provides a workflow for managing changes as they flow through its pipeline, beginning with a local workstation, through sets of automated tests, and out into production. If you have many different teams, each delivering software in its own way, you can use Chef Automate to bring a standard, proven approach to all of your organization's deployments.

With Chef Automate, you can, for example:

* upload new and updated cookbooks to the Chef server that manages your infrastructure and applications.
* publish new and updated cookbooks to a Chef Supermarket installation.
* release source code or build artifacts (for example, a Java or PHP application) to a repository such as GitHub or Artifactory.
* run automated tests to identify potential defects or bugs in your code.
* detect cases where a different team's code causes an incompatibility with yours.
* push build artifacts to production servers in real time.

Chef uses Chef Automate to deploy its own software. With it, we have:

* increased the number of features per release by 50%.
* reduced the number of defects per release by 70%.
* went from 1 release every two days to 12 releases per day.

We are shipping code faster, with less effort, and with higher quality. In this tutorial, you'll take Chef Automate for a spin and see what sorts of benefits you can deliver for your organization.

To help get started with Chef Automate more quickly, you begin by using automation to build infrastructure that runs in Amazon Web Services (AWS). All you need is an AWS account and a Chef Automate license key (you sign up for a trial key on the next page).

The automation brings up a fully-functional Chef Automate system in an isolated AWS environment that won't affect anything else you're running. After you complete the tutorial, you can experiment further and then simply tear down the environment when you're done.

[PRODNOTE] Update www.chef.io/delivery link.

[COMMENT] Learn more about how to bring the full power of Chef Automate to accomplish your business goals. Go to [www.chef.io/delivery](https://www.chef.io/delivery) to read the whitepaper.
