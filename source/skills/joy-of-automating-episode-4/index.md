---
title: 'Episode 4: Using Community Cookbooks - Jenkins on Ubuntu'
description: 'Converting the application installation and configuration instructions into tested recipes. In this episode we install Jenkins onto ubuntu.'
order: 4
keywords: training, videos, screencasts
category: 'joy-of-automating'
layout: skills-topic
sections: []
icon: video.png
---

<iframe width="877" height="493" src="https://www.youtube.com/embed/SEsd7x0spjo" frameborder="0" allowfullscreen></iframe>

In this episode we focus on working with converting a script to a recipe using Chef community cookbooks. Community cookbooks are powerful. Learning how to leverage them will help increase the speed at which you work. We will create a cookbook that deploys Jenkins.

## Activity

In this episode we focus on taking the manual installation instructions found in [this tutorial](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Ubuntu) and create a recipe that does the work for us.

## Resources

* [chef (executable)](https://docs.chef.io/ctl_chef.html): [generate cookbook](https://docs.chef.io/ctl_chef.html#chef-generate-cookbook)
* [Atom commands](http://flight-manual.atom.io/): [Fuzzy Find](http://flight-manual.atom.io/getting-started/sections/atom-basics/); [Toggle Tree View](http://flight-manual.atom.io/getting-started/sections/atom-basics/); and [Panes / Split Window](http://flight-manual.atom.io/using-atom/sections/panes/)
* [kitchen (executable)](https://docs.chef.io/ctl_kitchen.html): [list](https://docs.chef.io/ctl_kitchen.html#kitchen-list); [create](https://docs.chef.io/ctl_kitchen.html#kitchen-create); [converge](https://docs.chef.io/ctl_kitchen.html#kitchen-converge); [verify](https://docs.chef.io/ctl_kitchen.html#kitchen-verify); [login](https://docs.chef.io/ctl_kitchen.html#kitchen-login); and [destroy](https://docs.chef.io/ctl_kitchen.html#kitchen-destroy)
* [git](https://git-scm.com): [status](https://git-scm.com/docs/git-status); [add](https://git-scm.com/docs/git-add); [commit](https://git-scm.com/docs/git-commit); [checkout](https://git-scm.com/docs/git-checkout); [clean](https://git-scm.com/docs/git-clean); [reset](https://git-scm.com/docs/git-reset); [branch](https://git-scm.com/docs/git-branch); [merge](https://git-scm.com/docs/git-merge); [diff](https://git-scm.com/docs/git-diff); and [push](https://git-scm.com/docs/git-push)
* [Inspec](https://docs.chef.io/inspec_reference.html): [command](https://docs.chef.io/inspec_reference.html#command)
* [Linux commands](http://www.mediacollege.com/linux/command/linux-command.html): [cd](http://www.rapidtables.com/code/linux/cd.htm); [&&](http://stackoverflow.com/questions/4510640/command-line-what-is-the-purpose-of); [cd](http://www.rapidtables.com/code/linux/cd.htm); and [wget](https://www.gnu.org/software/wget/manual/wget.html)
* [Chef Resources](https://docs.chef.io/resources.html): [notifies](https://docs.chef.io/resource_common.html#resource-common-notifications); [remote_file](); [execute](https://docs.chef.io/resource_execute.html); [template](https://docs.chef.io/resource_template.html)
* [Chef Templates](https://docs.chef.io/templates.html): [variables](https://docs.chef.io/resource_template.html#variables) and [inline_methods](https://docs.chef.io/resource_template.html#helpers)
* [Jenkins](https://jenkins.io/): [Issues](https://issues.jenkins-ci.org/secure/Dashboard.jspa) and [Issue JENKINS-31814](https://issues.jenkins-ci.org/browse/JENKINS-31814)
* [Supermarket](https://supermarket.chef.io/): [jenkins](https://supermarket.chef.io/cookbooks/jenkins); [apt](https://supermarket.chef.io/cookbooks/apt);
* [Cookbook Metadata](https://docs.chef.io/config_rb_metadata.html)
* [berks (executable)](http://berkshelf.com/)

## Further activities

When you are done with the initial implementation we encourage you to challenge yourself by:

### Continue to make the template configurable

When you install Jenkins you can define a configuration file with values that influence how Jenkins runs. We started by copy this configuration, creating a template within our cookbook, and replacing a hard-coded value with one defined as variable being passed into the template.

Continue to define more template variables for more of the important values specified in that configuration file.
