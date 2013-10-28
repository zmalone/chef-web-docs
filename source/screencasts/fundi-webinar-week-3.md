---
title: 'Chef Fundamentals Module 3'
video: 
layout: 
description: 'Bootstrap a Node and Write a Cookbook'
keywords: 'opscode, chef, chef-repo, fundamentals, overview, webinar'
---

# Chef Fundamentals Module 3

The third installment of the Chef Fundamentals Webinar Series will be held Thursday, October 31, 2013 at 10:00AM Pacific Time.  Please [register for this webinar][week-3-signup] and complete the pre-work listed below.

After completing this webinar, you will be able to:

- Install Chef on nodes using `knife bootstrap`
- Explain how knife bootstrap configures a node to use the Organization created in the [previous section][fundi-week-2]
- Explain the basic configuration needed to run chef-client
- Describe what a cookbook is
- Create a new cookbook
- Explain what a recipe is
- Describe how to use the package, service, and cookbook_file resources
- Upload a cookbook to the Chef Server
- Explain what a run list is, and how to set it for a node via knife
- Read the output of a chef-client run 


Please be sure to complete the pre-work if you intend to follow along with the webinar recording:

## Pre-work:

Before watching this webinar recording you should watch the first two webinars in the series and install some software, see below for details.

- Module 1 - [Overview of Chef][fundi-week-1]
- Module 2 - [Install Chef & Setup Your Organization][fundi-week-2]

**Workstation Requirements**: The following operating systems have been tested as workstation systems with the hands on exercises:

- Windows 7
- Mac OS X 10.7.3+
- Ubuntu 10.04, 12.04

Other platforms and platform versions may work without modification.

### Software Requirements:

Viewers should install non-Chef required software before the workshop starts.
An application that will allow participants to create an SSH connection to a remote server and SCP files to a remote server.  Recommended applications:

- Windows - [puTTY][puTTY]
- Mac OS X - the built-in Terminal application or [iTerm2][iTerm2]
- Ubuntu - the built in Terminal application

A Programmer's text editor that allows the participants to have multiple files open at one time and includes syntax highlighting.  Recommended applications, pick one:

- [Sublime Text 2][sublime-text-2]
- [vim][vim]
- [emacs][emacs]

A source code version control system.  The exercises will demonstarte using [git][git] which is the recommended version control system.

[Install the Chef Client][omnibus-installer] on your local workstation.

### Training Lab Requirements:

You will need a server or virtual machine in order to complete the training lab exercises.  There are three different options that you may use:

##### Bring your own Node

Use your own Virtual Machine (VM) or Server.  It must meet the following criteria:

- Ubuntu 10.04+
- 512 MB RAM
- 15 GB Disk
- sudo or root level permissions

##### Launch an instance of a public AMI on EC2

Opscode publishes a public AMI on EC2 that may be used for the training lab.

- Search for ‘oc-training-public’
- m1.small should be sufficient
- Open ports 22, 80-90 in security group

##### Use the BETA Chef Training Lab

Opscode is working with cloudshare to beta test a [Chef training lab][chef-lab].  This lab is intended for use with the Chef Fundamentals Webinar series.

Questions? Please email us at [training@opscode.com][trainging-at-opscode-com].

[fundi-week-1]: /screencasts/fundi-webinar-week-1
[fundi-week-2]: /screencasts/fundi-webinar-week-2
[week-3-signup]: http://pages.opscode.com/20131031-chef-fundamentals-module-3.html
[puTTY]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
[iTerm2]: http://www.iterm2.com/#/section/home
[sublime-text-2]: http://www.sublimetext.com/
[vim]: http://www.vim.org/
[emacs]: http://www.gnu.org/software/emacs/
[git]: http://git-scm.com/
[trainging-at-opscode-com]: mailto:training@opscode.com
[omnibus-installer]: http://www.opscode.com/chef/install/
[chef-lab]: http://opscode-cheflab.herokuapp.com/attend