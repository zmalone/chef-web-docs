---
title: 'Roles'
order: 3
layout: concept
video: '//www.youtube.com/embed/wFcD09AJIPw'
image: 'roles.png'
description: 'An overview of the concept of roles in Chef.'
keywords: 'chef, role'
---

Roles represent the types of servers in your infrastructure. Examples of roles might be ‘load-balancer’, ‘app-server’, or ‘database’. Roles may contain a list of Chef configuration policies that should be applied (we call this Run-lists, more on that later). Roles may also include data attributes necessary to build out your infrastructure (e.g., the port an application server listens on, or a list of applications that should be deployed). For more information, see the [Chef Documentation](http://docs.opscode.com/essentials_roles.html).