---
title: 'Run-lists'
order: 4
layout: concept
video: '//www.youtube.com/embed/z74DW4m6_Tw'
image: 'run-lists.png'
description: 'An overview of the concept of run-lists in Chef.'
keywords: 'chef, run list, run-list'
---

A _run-list_ is an ordered list of policies that the Chef client runs. A run-list can contain any combination of roles and recipes and are run in the same order every time. The Chef client downloads its run-list from the Chef server and ensures that the node complies with the policies described in the run-list.

[WARN] The order in which you specify policies in a run-list is very important! If one recipe requires another recipe to run first (such as to install a tool or framework), you must specify them in the proper order. Remember, the items in a run-list are run in the same order every time.  

For more information, see [About Run-lists](<%= chef_docs_url %>/essentials_node_object_run_lists.html).