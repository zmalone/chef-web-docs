---
id: joy-of-automating-episode-7
title: 'Episode 7: Custom Ohai Plugin - Apache'
description: 'Learn how to create a custom plugin for a cookbook.'
order: 7
keywords: training, videos, screencasts
category: 'joy-of-automating'
sections: []
icon: video.png
---

<iframe width="877" height="493" src="https://www.youtube.com/embed/d0YIz8glwpE" frameborder="0" allowfullscreen></iframe>

## Description

In this episode we focus on building a custom Ohai plugin that is tested. We explore the documentation and code to learn the implementation. I share some of the necessary pre-work required to load the plugin during a chef-client run.

## Activity

In this episode we start with an existing [apache cookbook](https://github.com/chef-training/httpd-joy_of_automating-ep7).

## Reference

* [Ohai](https://docs.chef.io/ohai.html)
  * [project](https://github.com/chef/ohai)
  * [custom plugin](https://docs.chef.io/ohai.html#custom-plugins)
  * [current plugins](https://github.com/chef/ohai/tree/master/lib/ohai/plugins)
  * [cookbook](https://github.com/chef-cookbooks/ohai)
  * [executable](https://docs.chef.io/ctl_ohai.html)
* [Ohai DSL](https://docs.chef.io/ohai.html#dsl-ohai-methods)
  * [shell_out](https://docs.chef.io/dsl_recipe.html#shell-out)
  * [collect_data](https://docs.chef.io/ohai.html#collect-data)
  * [Mash](https://docs.chef.io/ohai.html#use-a-mash)
* [Ruby gem](https://rubygems.org/)
  * [layout of a gem](http://guides.rubygems.org/make-your-own-gem/)
* [Test Kitchen](https://docs.chef.io/ctl_kitchen.html)
  * [configuration](https://docs.chef.io/config_yml_kitchen.html)
  * [create](https://docs.chef.io/ctl_kitchen.html#kitchen-create)
  * [converge](https://docs.chef.io/ctl_kitchen.html#kitchen-converge)
  * [login](https://docs.chef.io/ctl_kitchen.html#kitchen-login)
  * [verify](https://docs.chef.io/ctl_kitchen.html#kitchen-verify)
* [Apache](https://httpd.apache.org/)
  * [modules](http://superuser.com/questions/284898/how-to-check-which-apache-modules-are-enabled-installed)
* [chef (executable)](https://docs.chef.io/ctl_chef.html)
  * [exec](https://docs.chef.io/ctl_chef.html#chef-exec)
  * [generate recipe](https://docs.chef.io/ctl_chef.html#chef-generate-recipe)
  * [generate file](https://docs.chef.io/ctl_chef.html#chef-generate-file)
* [Chef Resources](https://docs.chef.io/resources.html)
  * [cookbook_file](https://docs.chef.io/resource_cookbook_file.html)
  * [ohai](https://docs.chef.io/resources.html#ohai)
  * [notifies](https://docs.chef.io/resources.html#notifications)
* [ServerSpec](http://serverspec.org/)
  * [file](http://serverspec.org/resource_types.html#file)
  * [command](http://serverspec.org/resource_types.html#command)
* [chef-client cookbook](https://supermarket.chef.io/cookbooks/chef-client)
  * [client recipe](https://github.com/chef-cookbooks/chef-client/blob/master/recipes/config.rb)
* [rackerlabs/ohai-plugins](https://github.com/rackerlabs/ohai-plugins)
* [Node Attributes](https://docs.chef.io/attributes.html)
