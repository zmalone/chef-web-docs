---
id: be-a-secure-chef
title: 'How to be a secure Chef'
description: 'Learn how a secure workflow can help you deliver your applications and services securely without losing speed.'
order: 1
category: 'planning-and-practices'
sections: [1, 2]
icon: security.png
tags: [chef, beginner]
---
This article has suggestions for securing the Chef server, the Chef client, and the workstation where you run Chef DK and `knife` commands. It includes best practices for you to follow and links to Chef documentation and to other sites where you can read about each topic in more detail.

The last part of the article discusses several ways to control the promotion of cookbooks within a Chef workflow.  It is common for people to say they want a _secure_ workflow, which generally means they want to limit access and safeguard the stages that take a cookbook from development to production. Techniques such as Chef organizations, RBAC and LDAP, which are discussed in this document, can help you to set up security boundaries.

However, security boundaries are only part of the story. DevOps advocates transparency and communication rather than opacity and silos and these qualities will make your workflow efficient and fast. Instead of focusing on restricting people's access to the workflow, there are also some techniques you can use to control how cookbooks move through a rapid deployment pipeline. These techniques include using environments, pinning specific cookbooks to specific environments, and using policy files. You can learn more about them in the section [Suggestions for controlling the Chef workflow](#suggestionsforcontrollingthechefworkflow).
