---
title: 'Run-lists'
order: 8
layout: concept
video: '//www.youtube.com/embed/z74DW4m6_Tw'
image: 'run-lists.png'
description: 'An overview of the concept of run-lists in Chef.'
keywords: 'chef, run list'
---

A _run-list_ is an ordered list of policies that the Chef client runs. A run-list can contain any combination of roles and recipes and are run in the same order every time. The Chef client downloads its run-list from the Chef server and ensures that the node complies with the policies described in the run-list. For more information, see [About Run-lists](http://docs.opscode.com/essentials_node_object_run_lists.html).