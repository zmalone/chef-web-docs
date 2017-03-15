---
id: joy-of-automating-episode-6
title: 'Episode 6: Refactoring - Custom Resource - Redis'
description: 'Learn ways build a custom resource in a test-driven approach.'
order: 6
keywords: training, videos, screencasts
category: 'joy-of-automating'
sections: []
icon: video.png
---

<iframe width="877" height="493" src="https://www.youtube.com/embed/I2JVMm2KNbo?list=PL11cZfNdwNyORJfIYA8t07PRMchyDXIjq" frameborder="0" allowfullscreen></iframe>

## Description

In this episode we focus on refactoring a cookbook to use a custom resource. We start with completing the test suite to ensure we have the proper test coverage. Then move into defining our custom resource usage and work our way from the usage to the implementation.

## Activity

In this episode we focus on the test suite defined for an earlier version of the [Redis cookbook](https://github.com/chef-training/redis-with-test_suite).

## Resources

* [chef (executable)](https://docs.chef.io/ctl_chef.html): [exec](https://docs.chef.io/ctl_chef.html#chef-exec); [lwrp](https://docs.chef.io/ctl_chef.html#chef-generate-lwrp)
* [Atom commands](http://flight-manual.atom.io/): [Select next matching word](http://flight-manual.atom.io/using-atom/sections/editing-and-deleting-text/)
* [Chef Resources](https://docs.chef.io/resources.html): [common functionality](https://docs.chef.io/resource_common.html); [package](https://docs.chef.io/resource_package.html); [execute](https://docs.chef.io/resource_execute.html); and [service](https://docs.chef.io/resource_service.html)
* [ChefSpec](https://github.com/sethvargo/chefspec): [notify](https://github.com/sethvargo/chefspec#notify); [custom resource matchers](https://github.com/sethvargo/chefspec#packaging-custom-matchers); [testing custom resources](https://github.com/sethvargo/chefspec#testing-lwrps)
* [Rspec](https://relishapp.com/rspec/): [let](https://relishapp.com/rspec/rspec-core/v/3-4/docs/helper-methods/let-and-let)
* [guard](https://github.com/guard) : [guard-rspec](https://github.com/guard/guard-rspec)
* [Ruby](http://ruby-doc.org/core-2.2.0/) : [Regexp](http://ruby-doc.org/core-2.2.0/Regexp.html)
* [Bundler](http://bundler.io/) : [Gemfile](http://bundler.io/gemfile.html) and [bundle install](http://bundler.io/bundle_install.html)
* [Custom Resource](https://docs.chef.io/custom_resources.html) : [defining actions](https://docs.chef.io/custom_resources.html#define-actions); [defining properties](https://docs.chef.io/custom_resources.html#define-properties); [default_action](https://docs.chef.io/custom_resources.html#default-action)
* [Pry](http://pryrepl.org/)
