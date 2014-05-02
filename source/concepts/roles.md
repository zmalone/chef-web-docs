---
title: 'Roles'
order: 6
layout: concept
video: '//www.youtube.com/embed/wFcD09AJIPw'
image: 'roles.png'
description: 'An overview of the concept of roles in Chef.'
keywords: 'chef, role'
---

A _role_ represents a type of server in your infrastructure. Load balancers, application servers, and databases are a few examples. A role may contain a list of Chef configuration policies that should be applied, called the _run-list_. A role can also include the data attributes necessary to build out your infrastructure, for example, the port an application server listens on or a list of applications that should be deployed. For more information, see [About Roles](http://docs.opscode.com/essentials_roles.html).