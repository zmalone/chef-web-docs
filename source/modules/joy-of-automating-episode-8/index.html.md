---
id: joy-of-automating-episode-8
title: 'Episode 8: Managing Configuration - ssh_config on Linux'
description: 'Learn how to use Chef to manage a configuration file'
order: 8
keywords: training, videos, screencasts
category: 'joy-of-automating'
sections: []
icon: video.png
---

<iframe width="877" height="493" src="https://www.youtube.com/embed/WxODJo67nfQ" frameborder="0" allowfullscreen></iframe>

## Description

In this episode we focus managing the configuration of the ssh config file. Matt Stratton and I first implement a solution with a file resource, refactor it to use a template, then use template variables, and then finally start an implementation that uses a custom resource.

## Activity

In this episode we create a cookbook that takes a simple [ssh ](https://github.com/chef-training/ssh-joy_of_automating-ep8) configuration writing cookbook and make it more powerful.

## Resources

* [ssh_config](http://man.openbsd.org/OpenBSD-current/man5/ssh_config.5)
* [chef (executable)](https://docs.chef.io/ctl_chef.html): [generate cookbook](https://docs.chef.io/ctl_chef.html#chef-generate-cookbook); [generate template](https://docs.chef.io/ctl_chef.html#chef-generate-template); and [generate lwrp](https://docs.chef.io/ctl_chef.html#chef-generate-lwrp)
* [Chef Resources](https://docs.chef.io/resources.html): [directory](https://docs.chef.io/resources.html#directory); [file](https://docs.chef.io/resources.html#file); [template](https://docs.chef.io/resources.html#template); [cookbook_file](https://docs.chef.io/resources.html#cookbook_file); [include_recipe](https://docs.chef.io/dsl_recipe.html#include-recipes); and [ruby_block](https://docs.chef.io/resource_ruby_block.html)
* [Test Kitchen](https://docs.chef.io/ctl_kitchen.html): [configuration](https://docs.chef.io/config_yml_kitchen.html); [create](https://docs.chef.io/ctl_kitchen.html#kitchen-create); [converge](https://docs.chef.io/ctl_kitchen.html#kitchen-converge); [login](https://docs.chef.io/ctl_kitchen.html#kitchen-login); and [verify](https://docs.chef.io/ctl_kitchen.html#kitchen-verify)
* [ServerSpec](http://serverspec.org/): [file](http://serverspec.org/resource_types.html#file); and [command](http://serverspec.org/resource_types.html#command)
* [Ruby](http://www.rubydoc.info/stdlib): [ERB](http://www.rubydoc.info/stdlib/erb/ERB); [Array](http://www.rubydoc.info/stdlib/core/Array); [Hash](http://www.rubydoc.info/stdlib/core/Hash); [Array#each](http://www.rubydoc.info/stdlib/core/Array#each-instance_method); [File](http://www.rubydoc.info/stdlib/core/File); [File.read](http://www.rubydoc.info/stdlib/core/IO#read-class_method); [File.write](http://www.rubydoc.info/stdlib/core/IO#write-class_method); [:: OR double colon](http://stackoverflow.com/questions/3009477/what-is-rubys-double-colon); and [String#strip](http://www.rubydoc.info/stdlib/core/String#strip-instance_method)
* [Custom Resource](https://docs.chef.io/custom_resources.html): [action](https://docs.chef.io/custom_resources.html#define-actions); [default_action](https://docs.chef.io/custom_resources.html#default-action); [property](https://docs.chef.io/custom_resources.html#property); [name_property](https://docs.chef.io/custom_resources.html#define-properties); and [new_resource](https://docs.chef.io/custom_resources.html#new-resource-property)
