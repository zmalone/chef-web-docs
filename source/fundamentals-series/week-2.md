---
title: 'Part 2: Node setup, resources, and recipes'
order: 2
description: Second in a series of videos covering the fundamentals of Chef.  In this video we setup a node and write our first cookbook.
keywords: training, videos, screencasts
---

# Node setup, resources, and recipes

After viewing this video you will be able to:

* Install Chef nodes using <codeinline>knife bootstrap</codeinline>
* Explain how <codeinline>knife bootstrap</codeinline> configures a node to use the organization created in the previous section
* Explain the basic configuration needed to run <codeinline>chef-client</codeinline>
* Describe in detail what a cookbook is
* Create a new cookbook
* Explain what a recipe is
* Describe how to use the <codeinline>package</codeinline>, <codeinline>service</codeinline>, and <codeinline>template</codeinline> resources
* Upload a cookbook to the Chef server
* Explain what a run-list is, and how to set it for a node via <codeinline>knife</codeinline>
* Explain the output of a <codeinline>chef-client</codeinline> run

During this video we will use the [Chef Training Lab][chef-lab] to launch a virtual machine that will be managed by Chef.  You may [launch your lab environment][chef-lab] as part of the video.

##### Video

<iframe width="560" height="315" src="//www.youtube.com/embed/KQEj9rZwLb8" frameborder="0" allowfullscreen></iframe>

<p>&nbsp;</p>

##### Slides

<iframe src="//www.slideshare.net/slideshow/embed_code/35176302" width="476" height="400" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>

<p>&nbsp;</p>

### Pre-work

Before viewing this video you should [watch the first episode:  Overview of Chef][spring-fund-week-1].

##### Workstation Requirements

The following operating systems have been tested as workstation systems with the hands on exercises:

- Windows 7+
- Mac OS X 10.7.3+
- Ubuntu 10.04+

Other platforms and platform versions may work without modification.

##### Software Requirements:

An application that will allow participants to create an SSH connection to a remote server and SCP files to a remote server.  Recommended applications:

- Windows - [puTTY][puTTY]
- Mac OS X - the built-in Terminal application or [iTerm2][iTerm2]
- Ubuntu - the built in Terminal application

A programmer's text editor that allows the participants to have multiple files open at one time and includes syntax highlighting.  Recommended applications, **pick one**:

- [Sublime Text 2][sublime-text-2] (recommended)
- [vim][vim]
- [emacs][emacs]

The [chef-client][omnibus-installer] application which includes the <codeinline>knife</codeinline> command line utility

### Homework

Before participating in [Part 3: Node object and Chef roles][spring-fund-week-3], you may want to get a little more information on exactly what happens when you run the <codeinline>chef-client</codeinline> application.  Checkout this video for a detailed explanation of the <codeinline>chef-client</codeinline> run.  After viewing this video, you will be able to:

* List all the steps taken by a <codeinline>chef-client</codeinline> during a run
* Explain the basic security model of Chef
* Explain the concepts of the resource collection

<iframe width="560" height="315" src="//www.youtube.com/embed/grvlVNvCU9w" frameborder="0" allowfullscreen></iframe>

### What's Next?

* [Part 3: Node object and Chef roles][spring-fund-week-3]
* Please join the [discussion forum][discussion-forum] to ask questions of your own and participate in the conversation.

#### Send Us Your Feedback!

Thank you for participating in our Chef Fundamentals series. What did you think? How can we improve? Please [complete this short survey][survey] and let us know!

[spring-fund-week-1]: /fundamentals-series/week-1
[spring-fund-week-2]: /fundamentals-series/week-2
[spring-fund-week-3]: /fundamentals-series/week-3
[spring-fund-week-4]: /fundamentals-series/week-4
[spring-fund-week-5]: /fundamentals-series/week-5
[spring-fund-week-6]: /fundamentals-series/week-6
[chef-lab]: /fundamentals-series/chef-lab
[discussion-forum]: https://groups.google.com/d/forum/learnchef-fundamentals-webinar
[survey]: http://evocalize.com/consumer/survey/chef/springwebinar-2
[puTTY]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
[iTerm2]: http://www.iterm2.com/#/section/home
[sublime-text-2]: http://www.sublimetext.com/
[vim]: http://www.vim.org/
[emacs]: http://www.gnu.org/software/emacs/
[omnibus-installer]: http://www.getchef.com/chef/install/
