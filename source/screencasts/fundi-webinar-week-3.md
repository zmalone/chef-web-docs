---
title: 'Chef Fundamentals Module 3'
video: 'https://www.youtube.com/embed/71Cq4bCxgDk'
layout: 'screencast'
description: 'Set Up a Node & Write a Cookbook'
keywords: 'opscode, chef, chef-repo, fundamentals, overview, webinar'
---

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

A source code version control system.  The exercises will demonstrate using [git][git] which is the recommended version control system.

[Install the Chef Client][omnibus-installer] on your local workstation.

### Training Lab Requirements:

You will need a server or virtual machine in order to complete the training lab exercises.  There are four different options that you may use.

To participate in the labs for module 3, you will need the following

- Hostname or IP Address of your training lab server
- SSH Username 
- SSH Password
- SSH Port (default is 22)

Watch the [Chef Fundamentals Webinar - Training Lab Setup video][youtube-training-lab] for more information on setting up your training lab.

##### Bring your own Node

Use your own Virtual Machine (VM) or Server.  It must meet the following criteria:

- Ubuntu 10.04+
- 512 MB RAM
- 15 GB Disk
- sudo or root level permissions

##### Use the Vagrant Instance from the Starter Kit

The Starter Kit provided by Hosted Enterprise Chef includes a Vagrantfile which can be used to launch a [Vagrant][vagrantup] instance.

##### Launch an instance of a public AMI on EC2

Opscode publishes a public AMI on EC2 that may be used for the training lab.

- Search for 'oc-training-public' (ami-641c8e0d) in the US East (N. Virginia) Region
- m1.small should be sufficient
- Open ports 22, 80-90 in security group

##### Use the BETA Chef Training Lab

Opscode is working with CloudShare to beta test a [Chef training lab][chef-lab].  This lab is intended for use with the Chef Fundamentals Webinar series.  Would you like to help us test this solution?  [Launch your own training lab now][chef-lab].

## View the Slides

<iframe src="http://www.slideshare.net/slideshow/embed_code/27791349" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="https://www.slideshare.net/opscode/week-3-setup-node-and-write-cookbook" title="Chef Fundamentals Training Series Module 3: Setting up Nodes and Cookbook Authoring" target="_blank">Chef Fundamentals Training Series Module 3: Setting up Nodes and Cookbook Authoring</a> </strong> from <strong><a href="http://www.slideshare.net/opscode" target="_blank">Opscode, Inc.</a></strong> </div>

## Q & A From Set Up a Node & Write a Cookbook

[Browse the questions and answers][fundi-week-3-qa] that came up during Set Up a Node & Write a Cookbook

## Continue the Series

[Chef Fundamentals Module 4][fundi-week-4]

Questions? Please email us at [training@opscode.com][trainging-at-opscode-com].

[fundi-week-1]: /screencasts/fundi-webinar-week-1
[fundi-week-2]: /screencasts/fundi-webinar-week-2
[fundi-week-3]: /screencasts/fundi-webinar-week-3
[fundi-week-4]: /screencasts/fundi-webinar-week-4
[fundi-week-5]: /screencasts/fundi-webinar-week-5
[puTTY]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
[iTerm2]: http://www.iterm2.com/#/section/home
[sublime-text-2]: http://www.sublimetext.com/
[vim]: http://www.vim.org/
[emacs]: http://www.gnu.org/software/emacs/
[git]: http://git-scm.com/
[trainging-at-opscode-com]: mailto:training@opscode.com
[omnibus-installer]: http://www.opscode.com/chef/install/
[chef-lab]: http://opscode-cheflab.herokuapp.com/attend
[vagrantup]:  http://vagrantup.com
[youtube-training-lab]: http://youtu.be/4RrzK1ozitE
[week-4-signup]: http://pages.opscode.com/20131107-chef-fundamentals-module-4.html
[fundi-week-3-qa]: http://pages.opscode.com/rs/opscode/images/chef-fundamentals-module-3-qa.pdf
