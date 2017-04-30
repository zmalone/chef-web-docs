---
id: joy-of-automating-episode-4
title: 'Using community cookbooks - Jenkins'
description: 'Learn to use community cookbooks to convert a configuration script to a recipe, using Jenkins as an example.'
keywords: community cookbooks, supermarket, scripts, recipes, jenkins
quiz_path: quizzes/joy-of-automating-episode-4.yml
time_to_complete: 60 minutes
headings: [
  { label: 'Reference', href: '#reference' },
  { label: 'Further activities', href: '#furtheractivities' }
]
---
This video comes from [The Joy of Automating](https://www.youtube.com/playlist?list=PL11cZfNdwNyORJfIYA8t07PRMchyDXIjq) series, hosted by Franklin Webber.

In this episode we focus on working with converting a script to a recipe using Chef community cookbooks. Community cookbooks are powerful. Learning how to leverage them will help increase the speed at which you work. We will create a cookbook that deploys Jenkins.

In this episode we focus on taking the manual installation instructions found in [this tutorial](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Ubuntu) and create a recipe that does the work for us.

<iframe width="877" height="493" src="https://www.youtube.com/embed/B9zhtyIazzM?list=PL11cZfNdwNyORJfIYA8t07PRMchyDXIjq" frameborder="0" allowfullscreen></iframe>

## Reference

* [chef (executable)](https://docs.chef.io/ctl_chef.html): [generate cookbook](https://docs.chef.io/ctl_chef.html#chef-generate-cookbook)
* [Atom commands](http://flight-manual.atom.io/): [Fuzzy Find](http://flight-manual.atom.io/getting-started/sections/atom-basics/); [Toggle Tree View](http://flight-manual.atom.io/getting-started/sections/atom-basics/); and [Panes / Split Window](http://flight-manual.atom.io/using-atom/sections/panes/)
* [kitchen (executable)](https://docs.chef.io/ctl_kitchen.html): [list](https://docs.chef.io/ctl_kitchen.html#kitchen-list); [create](https://docs.chef.io/ctl_kitchen.html#kitchen-create); [converge](https://docs.chef.io/ctl_kitchen.html#kitchen-converge); [verify](https://docs.chef.io/ctl_kitchen.html#kitchen-verify); [login](https://docs.chef.io/ctl_kitchen.html#kitchen-login); and [destroy](https://docs.chef.io/ctl_kitchen.html#kitchen-destroy)
* [git](https://git-scm.com): [status](https://git-scm.com/docs/git-status); [add](https://git-scm.com/docs/git-add); [commit](https://git-scm.com/docs/git-commit); [checkout](https://git-scm.com/docs/git-checkout); [clean](https://git-scm.com/docs/git-clean); [reset](https://git-scm.com/docs/git-reset); [branch](https://git-scm.com/docs/git-branch); [merge](https://git-scm.com/docs/git-merge); [diff](https://git-scm.com/docs/git-diff); and [push](https://git-scm.com/docs/git-push)
* [Inspec](http://inspec.io/docs/reference/resources/): [command](http://inspec.io/docs/reference/resources/command)
* [Linux commands](http://www.mediacollege.com/linux/command/linux-command.html): [cd](http://www.rapidtables.com/code/linux/cd.htm); [&&](http://stackoverflow.com/questions/4510640/command-line-what-is-the-purpose-of); [cd](http://www.rapidtables.com/code/linux/cd.htm); and [wget](https://www.gnu.org/software/wget/manual/wget.html)
* [Chef Resources](https://docs.chef.io/resources.html): [notifies](https://docs.chef.io/resource_common.html#resource-common-notifications); [remote_file](https://docs.chef.io/resource_remote_file.html); [execute](https://docs.chef.io/resource_execute.html); [template](https://docs.chef.io/resource_template.html)
* [Chef Templates](https://docs.chef.io/templates.html): [variables](https://docs.chef.io/resource_template.html#variables) and [inline_methods](https://docs.chef.io/resource_template.html#helpers)
* [Jenkins](https://jenkins.io/): [Install on Ubuntu](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Ubuntu); [Issues](https://issues.jenkins-ci.org/secure/Dashboard.jspa) and [Issue JENKINS-31814](https://issues.jenkins-ci.org/browse/JENKINS-31814)
* [Supermarket](https://supermarket.chef.io/): [jenkins](https://supermarket.chef.io/cookbooks/jenkins) and [apt](https://supermarket.chef.io/cookbooks/apt);
* [Cookbook Metadata](https://docs.chef.io/config_rb_metadata.html)
* [Berkshelf and berks (executable)](http://berkshelf.com/)
* [Pry](http://pryrepl.org/)

## Further activities

When you are done with the initial implementation, we encourage you to challenge by implementing a Jenkins cookbook configuration file.

We started to explore the Jenkins implementation in the community cookbook. We copied the implementation except for the remaining [template](https://docs.chef.io/resource_template.html) resource that allows us to configure Jenkins.

Find that original file on the test instance or use the template provided in the community cookbook and bring it into the cookbook you developed. Start with the hard-coded values and then slowly start to replace them template variables.
