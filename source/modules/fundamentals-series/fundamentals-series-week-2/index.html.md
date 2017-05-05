---
id: fundamentals-series-week-2
title: 'Chef fundamentals series part 2: Node setup, resources, and recipes'
short_title: '2: Node setup, resources, and recipes'
order: 2
description: "In this part you'll set up a node and write your first cookbook."
keywords: training, videos, screencasts
time_to_complete: 45 minutes
headings: [
  { label: 'Video', href: '#video' },
  { label: 'Slides', href: '#slides' },
  { label: 'Homework', href: '#homework' }
]
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

## Video

<iframe width="560" height="315" src="//www.youtube.com/embed/KQEj9rZwLb8" frameborder="0" allowfullscreen></iframe>

## Slides

<iframe style="border: 1px solid black;" src="//www.slideshare.net/slideshow/embed_code/35176302" width="476" height="400" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>

## Homework

Before moving on to the next part, you may want to get a little more information on exactly what happens when you run the `chef-client` application. Checkout this video for a detailed explanation of the `chef-client` run. After viewing this video, you will be able to:

* list all the steps taken by a `chef-client` during a run.
* explain the basic security model of Chef.
* explain the concepts of the resource collection.

<iframe width="560" height="315" src="//www.youtube.com/embed/grvlVNvCU9w" frameborder="0" allowfullscreen></iframe>
