---
title: 'Run-lists'
order: 8
layout: concept
video: '//www.youtube.com/embed/z74DW4m6_Tw'
image: 'run-lists.png'
description: 'An overview of the concept of run-lists in Chef.'
keywords: 'chef, run list'
---

A Run-list is an ordered list of policies (in the form of Roles and/or Recipes) that are run by the Chef-client in an exact order every single time. The Chef Client obtains its Run-list from the Chef Server and ensures that the Node complies with the policies described in the Run-list. For more information, see the [Chef Documentation for Run-lists](http://docs.opscode.com/essentials_node_object_run_lists.html).