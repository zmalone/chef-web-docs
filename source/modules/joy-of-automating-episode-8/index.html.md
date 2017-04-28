---
id: joy-of-automating-episode-8
title: 'Managing configuration - ssh_config on Linux'
short_title: 'Managing configuration'
description: 'Learn how to use Chef to manage the SSH configuration file.'
keywords: custom resource, refactoring, ssh
quiz_path: quizzes/joy-of-automating-episode-8.yml
time_to_complete: 90 minutes
headings: [
  { label: 'Reference', href: '#reference' }
]
---
This video comes from [The Joy of Automating](https://www.youtube.com/playlist?list=PL11cZfNdwNyORJfIYA8t07PRMchyDXIjq) series, hosted by Franklin Webber.

In this episode we focus managing the configuration of the SSH configuration file. [Matt Stratton](https://twitter.com/mattstratton) and I first implement a solution with a `file` resource, refactor it to use a `template` resource, then use template variables, and then finally start an implementation that uses a custom resource.

In this episode we create a cookbook that takes a simple [ssh](https://github.com/chef-training/ssh-joy_of_automating-ep8) configuration and make it more powerful.

<iframe width="877" height="493" src="https://www.youtube.com/embed/WxODJo67nfQ" frameborder="0" allowfullscreen></iframe>

## Reference

* [ssh_config](http://man.openbsd.org/OpenBSD-current/man5/ssh_config.5)
* [chef (executable)](https://docs.chef.io/ctl_chef.html)
  * [generate cookbook](https://docs.chef.io/ctl_chef.html#chef-generate-cookbook)
  * [generate template](https://docs.chef.io/ctl_chef.html#chef-generate-template)
  * [generate lwrp](https://docs.chef.io/ctl_chef.html#chef-generate-lwrp)
* [Chef Resources](https://docs.chef.io/resources.html)
  * [directory](https://docs.chef.io/resources.html#directory)
  * [file](https://docs.chef.io/resources.html#file)
  * [template](https://docs.chef.io/resources.html#template)
  * [cookbook_file](https://docs.chef.io/resources.html#cookbook_file)
  * [include_recipe](https://docs.chef.io/dsl_recipe.html#include-recipes)
  * [ruby_block](https://docs.chef.io/resource_ruby_block.html)
* [Test Kitchen](https://docs.chef.io/ctl_kitchen.html)
  * [configuration](https://docs.chef.io/config_yml_kitchen.html)
  * [create](https://docs.chef.io/ctl_kitchen.html#kitchen-create)
  * [converge](https://docs.chef.io/ctl_kitchen.html#kitchen-converge)
  * [login](https://docs.chef.io/ctl_kitchen.html#kitchen-login)
  * [verify](https://docs.chef.io/ctl_kitchen.html#kitchen-verify)
* [ServerSpec](http://serverspec.org/)
  * [file](http://serverspec.org/resource_types.html#file)
  * [command](http://serverspec.org/resource_types.html#command)
* [Ruby](http://www.rubydoc.info/stdlib)
  * [ERB](http://www.rubydoc.info/stdlib/erb/ERB)
  * [Array](http://www.rubydoc.info/stdlib/core/Array)
  * [Hash](http://www.rubydoc.info/stdlib/core/Hash)
  * [Array#each](http://www.rubydoc.info/stdlib/core/Array#each-instance_method)
  * [File](http://www.rubydoc.info/stdlib/core/File)
  * [File.read](http://www.rubydoc.info/stdlib/core/IO#read-class_method)
  * [File.write](http://www.rubydoc.info/stdlib/core/IO#write-class_method)
  * [:: or double colon](http://stackoverflow.com/questions/3009477/what-is-rubys-double-colon)
  * [String#strip](http://www.rubydoc.info/stdlib/core/String#strip-instance_method)
* [Custom Resource](https://docs.chef.io/custom_resources.html)
  * [action](https://docs.chef.io/custom_resources.html#define-actions)
  * [default_action](https://docs.chef.io/custom_resources.html#default-action)
  * [property](https://docs.chef.io/custom_resources.html#property)
  * [name_property](https://docs.chef.io/custom_resources.html#define-properties)
  * [new_resource](https://docs.chef.io/custom_resources.html#new-resource-property)
