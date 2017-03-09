---
id: test-driven-development
title: 'Overview of test driven infrastructure with Chef'
description: 'Learn about some of the more popular Chef testing tools and how they fit in a continuous integration pipeline.'
order: 2
category: 'planning-and-practices'
layout: skills-topic
sections: [1, 2, 3, 4, 5, exercises]
icon: magnify.png
byline: Joshua Timberman
---
This post is all about test driven infrastructure with Chef: an overview in testing Chef cookbooks for the current landscape. This post is focused on tools included in the [Chef DK](https://downloads.chef.io/chef-dk/). Some other tools and projects are mentioned for completeness or historical purposes.

This post serves as general overview of the various components and tools that are currently used, or have been used in the past to do test driven infrastructure with Chef. For a full book on the topic, see Test Driven Infrastructure with Chef, by Stephen Nelson-Smith. For training materials, see [this GitHub repository](https://github.com/chef-training/introduction_to_testing).

In this post, I want to discuss **what** and **why** for each section, but not **how**. This is not because the how is unimportant, it’s because I don’t want to get bogged down in implementation details for each tool. This post is light on examples for that reason. Before we talk about the individual tools, let’s cover what the various phases of Chef development are, and what the types of testing are.
