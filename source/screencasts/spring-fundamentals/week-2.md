---
title: Chef Fundamentals Webinar Series - Part 2
description: Second in a series of webinars covering the fundamentals of Chef.  In this webinar we setup a node and write our first cookbook.
keywords: training, videos, screencasts
---

# Node setup, resources, and recipes

After viewing this webinar you will be able to:

* Install Chef nodes using `knife bootstrap`
* Explain how `knife bootstrap` configures a node to use the Organization created in the previous section
* Explain the basic configuration needed to run `chef-client`
* Describe in detail what a cookbook is
* Create a new cookbook
* Explain what a recipe is
* Describe how to use the `package`, `service`, and `template` resources
* Upload a cookbook to the Chef Server
* Explain what a run list is, and how to set it for a node via knife
* Explain the output of a `chef-client` run

During this webinar we will use the [Chef Training Lab][chef-lab] to launch a virtual machine that will be managed by Chef.  You may [launch your lab environment][chef-lab] shortly before the webinar begins or as part of the webinar.

##### Video

<iframe width="560" height="315" src="//www.youtube.com/embed/KQEj9rZwLb8" frameborder="0" allowfullscreen></iframe>

<p>&nbsp;</p>

##### Slides

<iframe src="//www.slideshare.net/slideshow/embed_code/35176302" width="476" height="400" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>

<p>&nbsp;</p>

### Pre-work

Before joining this webinar you should [watch the first episode:  Overview of Chef][spring-fund-week-1].

##### Workstation Requirements

The following operating systems have been tested as workstation systems with the hands on exercises:

- Windows 7+
- Mac OS X 10.7.3+
- Ubuntu 10.04+

Other platforms and platform versions may work without modification.

##### Software Requirements:

Participants should install non-Chef required software before the workshop starts.

An application that will allow participants to create an SSH connection to a remote server and SCP files to a remote server.  Recommended applications:

- Windows - [puTTY][puTTY]
- Mac OS X - the built-in Terminal application or [iTerm2][iTerm2]
- Ubuntu - the built in Terminal application

A programmer's text editor that allows the participants to have multiple files open at one time and includes syntax highlighting.  Recommended applications, **pick one**:

- [Sublime Text 2][sublime-text-2] **best choice for everyone**
- [vim][vim]
- [emacs][emacs]

The [chef-client][omnibus-installer] application which includes the `knife` command line utility

### Homework

Before participating in [Chef Fundamentals Module 3][spring-fund-week-3], you may want to get a little more information on exactly what happens when you run the `chef-client` application.  Checkout this video for a detailed explanation of the `chef-client` run.  After viewing this video, you will be able to:

* List all the steps taken by a `chef-client` during a run
* Explain the basic security model of Chef
* Explain the concepts of the resource collection

<iframe width="560" height="315" src="//www.youtube.com/embed/grvlVNvCU9w" frameborder="0" allowfullscreen></iframe>

### What's Next?

* Please join the [discussion forum][discussion-forum] to ask questions of your own and particpate in the conversation.
* [Chef Fundamentals Module 3][spring-fund-week-3]

#### Send Us Your Feedback!

Thank you for participating in our Chef Fundamentals Webinar series.  What did you think?  How can we improve?  Please [complete this short survey][survey] and let us know!

[Sign up for this webinar now!](http://pages.getchef.com/cheffundamentalsseries.html)



[spring-fund-week-1]: /screencasts/spring-fundamentals/week-1
[spring-fund-week-2]: /screencasts/spring-fundamentals/week-2
[spring-fund-week-3]: /screencasts/spring-fundamentals/week-3
[spring-fund-week-4]: /screencasts/spring-fundamentals/week-4
[spring-fund-week-5]: /screencasts/spring-fundamentals/week-5
[spring-fund-week-6]: /screencasts/spring-fundamentals/week-6
[week-2-time]: http://www.timeanddate.com/worldclock/fixedtime.html?msg=Chef+Fundamentals+Webinar+-+Part+2&iso=20140527T10&p1=234&ah=1
[week-3-time]: http://www.timeanddate.com/worldclock/fixedtime.html?msg=Chef+Fundamentals+Webinar+-+Part+3&iso=20140603T10&p1=234&ah=1
[week-4-time]: http://www.timeanddate.com/worldclock/fixedtime.html?msg=Chef+Fundamentals+Webinar+-+Part+4&iso=20140610T10&p1=234&ah=1
[week-5-time]: http://www.timeanddate.com/worldclock/fixedtime.html?msg=Chef+Fundamentals+Webinar+-+Part+5&iso=20140617T10&p1=234&ah=1
[week-6-time]: http://www.timeanddate.com/worldclock/fixedtime.html?msg=Chef+Fundamentals+Webinar+-+Part+6&iso=20140624T10&p1=234&ah=1
[chef-lab]: /screencasts/spring-fundamentals/chef-lab
[discussion-forum]: https://groups.google.com/d/forum/learnchef-fundamentals-webinar
[survey]: http://evocalize.com/consumer/survey/chef/springwebinar-2
[puTTY]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
[iTerm2]: http://www.iterm2.com/#/section/home
[sublime-text-2]: http://www.sublimetext.com/
[vim]: http://www.vim.org/
[emacs]: http://www.gnu.org/software/emacs/
[omnibus-installer]: http://www.getchef.com/chef/install/