---
id: fundamentals-series-week-2
title: 'Chef fundamentals series part 2: Node setup, resources, and recipes'
nav_title: 'Part 2: Node setup, resources, and recipes'
order: 2
description: "In this lesson you'll set up a node and write your first cookbook."
keywords: training, videos, screencasts
category: 'fundamentals-series'
sections: [1, 2, 3, 4]
tags: [video]
---
After viewing this video you will be able to:

* install Chef nodes using `knife bootstrap`.
* explain how `knife bootstrap` configures a node to use the organization created in the previous section.
* explain the basic configuration needed to run `chef-client`.
* describe in detail what a cookbook is.
* create a new cookbook.
* explain what a recipe is.
* describe how to use the `package`, `service`, and `template` resources.
* upload a cookbook to the Chef server.
* explain what a run-list is, and how to set it for a node via `knife`.
* explain the output of a `chef-client` run.

[START_BOX]

## Before you begin

As part of this series, we provided a free online virtual machine to help you follow along with the training materials. We're in the process of migrating to a new platform for our online training environments.

This series still has a ton of great information that is fundamental to the way Chef works. So in the meantime, you’ll either need to provide your own virtual machine or simply skip the exercises and watch as we demonstrate them during the videos.

If you choose to bring up your own environment, launch a CentOS 6 virtual machine or server that has:

* 512 MB RAM.
* 8 GB disk space.
* a user account with `sudo` or root access.
* an IP address that you can access from another workstation computer.

Be sure to [watch the Chef blog for updates](http://blog.chef.io) on when the new training environment will be available.

[END_BOX]

[chef-lab]: /modules/fundamentals-series-chef-lab
