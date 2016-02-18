---
title: 'Build a continuous delivery pipeline with Chef Delivery on AWS'
layout: lesson-overview
platform: Get started with Chef Delivery on AWS
logo: delivery.svg
order: 1
meta_tags: [{name: "ROBOTS", content: "NOINDEX, NOFOLLOW"}]
---
Chef Delivery manages changes to both infrastructure and application code, giving your operations and development teams a common platform for developing, building, testing, and deploying cookbooks, applications, and more.

It provides a proven, reproducible workflow for managing changes as they flow through its pipeline, beginning with a local workstation, through sets of automated tests, and out into production.

Chef Delivery handles many types of software systems. You can use it to:

* upload new and updated cookbooks to the Chef server that manages your infrastructure and applications.
* publish new and updated cookbooks to a Chef Supermarket installation.
* release source code or build artifacts to a repository such as GitHub.
* push build artifacts to production servers in real time.

[COMMENT] Chef Delivery relies on Git and uses its feature branches for handling changes before they merge, as well as Git's ability to perform merges automatically. You're going to see Git terminology throughout this tutorial. We'll provide all the Git commands that you'll need, but you can also [check out the documentation](https://git-scm.com/doc) to learn more.

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

If you are most interested in using Chef Delivery in a project, you might want to get a system administrator in your company to help with the [installation and network configuration](/delivery/get-started/install-chef-delivery) that are the first part of the tutorial. If you're a project leader, you might find that the lesson that [sets up a new project](/delivery/get-started/create-the-project) is a good place to start. If your interest is primarily day-to-day use of Delivery, then the part of the tutorial that [walks through delivering changes](/delivery/get-started/write-the-build-cookbook) might be of the most interest. In other words, it's possible to go through this tutorial as a team, with different members of the team doing parts of the tutorial that most closely map to their job roles. Of course, you can go through all tutorial steps as an individual.

After completing this tutorial, you'll:

* have a working Chef Delivery installation and users who are set up to use it.
* understand each of the stages and phases that make up a Chef Delivery pipeline.
* know how to write a build cookbook that configures the pipeline.
* understand how to develop and test new features on your workstation before you submit them.

[GITHUB] After you complete this tutorial, you can refer back to the final version of the code on [GitHub](https://github.com/learn-chef/deliver-customers-rhel).

[END_BOX]

----

SCRATCH

```
$ sudo dpkg -i /home/thomaspetchel/Downloads/virtualbox-5.0_5.0.14-105127~Ubuntu~trusty_amd64.deb
Selecting previously unselected package virtualbox-5.0.
(Reading database ... 175050 files and directories currently installed.)
Preparing to unpack .../virtualbox-5.0_5.0.14-105127~Ubuntu~trusty_amd64.deb ...
Unpacking virtualbox-5.0 (5.0.14-105127~Ubuntu~trusty) ...
dpkg: dependency problems prevent configuration of virtualbox-5.0:
 virtualbox-5.0 depends on libsdl1.2debian (>= 1.2.11); however:
  Package libsdl1.2debian is not installed.

dpkg: error processing package virtualbox-5.0 (--install):
 dependency problems - leaving unconfigured
Processing triggers for ureadahead (0.100.0-19) ...
Processing triggers for systemd (219-7ubuntu3) ...
Processing triggers for hicolor-icon-theme (0.14-0ubuntu1) ...
Processing triggers for shared-mime-info (1.3-1) ...
Processing triggers for gnome-menus (3.10.1-0ubuntu5) ...
Processing triggers for desktop-file-utils (0.22-1ubuntu3) ...
Processing triggers for bamfdaemon (0.5.1+15.04.20150202-0ubuntu1) ...
Rebuilding /usr/share/applications/bamf-2.index...
Processing triggers for mime-support (3.58ubuntu1) ...
Errors were encountered while processing:
 virtualbox-5.0
```

```
$ sudo apt-get install -f
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Correcting dependencies... Done
The following extra packages will be installed:
  libsdl1.2debian
The following NEW packages will be installed:
  libsdl1.2debian
0 upgraded, 1 newly installed, 0 to remove and 324 not upgraded.
1 not fully installed or removed.
Need to get 162 kB of archives.
After this operation, 500 kB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 http://us.archive.ubuntu.com/ubuntu/ vivid/main libsdl1.2debian amd64 1.2.15-10ubuntu1 [162 kB]
Fetched 162 kB in 0s (226 kB/s)     
Selecting previously unselected package libsdl1.2debian:amd64.
(Reading database ... 175820 files and directories currently installed.)
Preparing to unpack .../libsdl1.2debian_1.2.15-10ubuntu1_amd64.deb ...
Unpacking libsdl1.2debian:amd64 (1.2.15-10ubuntu1) ...
Setting up libsdl1.2debian:amd64 (1.2.15-10ubuntu1) ...
Setting up virtualbox-5.0 (5.0.14-105127~Ubuntu~trusty) ...
Adding group `vboxusers' (GID 132) ...
Done.
Stopping VirtualBox kernel modules ...done.
Recompiling VirtualBox kernel modules ...done.
Starting VirtualBox kernel modules ...done.
Processing triggers for libc-bin (2.21-0ubuntu4) ...
```
