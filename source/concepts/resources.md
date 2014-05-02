---
title: 'Resources'
order: 1
layout: concept
video: '//www.youtube.com/embed/05Jv7Wai8i8'
image: 'resources.png'
description: 'An overview of the concept of resources in Chef.'
keywords: 'chef, resource'
---

A _resource_ is the fundamental building block of Chef configuration and represents one part of the system and its desired state. Examples include:
  
  * a package that should be installed
  * a service that should be running
  * a file that should be generated

Resources are gathered into recipes. The Chef client applies resource requirements to nodes. For more information, see [About Resources and Providers](http://docs.opscode.com/resource.html). 