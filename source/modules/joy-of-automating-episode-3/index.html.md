---
id: joy-of-automating-episode-3
title: 'Episode 3: Working with Legacy Code - Redis'
description: 'Starting with an existing cookbook we fix it, add tests, and then refactor.'
order: 3
keywords: training, videos, screencasts
category: 'joy-of-automating'
layout: skills-topic
sections: []
icon: video.png
---

<iframe width="877" height="493" src="https://www.youtube.com/embed/Td1MMyvwaF8?list=PL11cZfNdwNyORJfIYA8t07PRMchyDXIjq" frameborder="0" allowfullscreen></iframe>

## Description

In this episode we focused on working with legacy code. Legacy code is everywhere. Learning the steps to tackle this kind of work essential. This is a cookbook that deploys Redis on Ubuntu. We wrote an integration test that exposed some issues in the recipe. Then proceeded to write unit tests to capture the current state. The resources used a lot of notifications to generate a chain of events that were important to test. Near the end we refactored out the version into a node attribute and then started to refactor the resource names to make the specifications less brittle. We finished with starting to apply the same refactoring techniques to our test suite

## Activity

In this episode we focus on taking an [existing cookbook](https://github.com/chef-training/redis).

## Resources

* [chef (executable)](https://docs.chef.io/ctl_chef.html): [generate attribute](https://docs.chef.io/ctl_chef.html#chef-generate-attribute); and [exec](https://docs.chef.io/ctl_chef.html#chef-exec)
* [kitchen (executable)](https://docs.chef.io/ctl_kitchen.html): [list](https://docs.chef.io/ctl_kitchen.html#kitchen-list);  [create](https://docs.chef.io/ctl_kitchen.html#kitchen-create);
[converge](https://docs.chef.io/ctl_kitchen.html#kitchen-converge); and [verify](https://docs.chef.io/ctl_kitchen.html#kitchen-verify)
* [Atom commands](http://flight-manual.atom.io/): [Fuzzy Find](http://flight-manual.atom.io/getting-started/sections/atom-basics/); [Toggle Tree View](http://flight-manual.atom.io/getting-started/sections/atom-basics/); and [Panes / Split Window](http://flight-manual.atom.io/using-atom/sections/panes/)
* [Test Kitchen Configuration File](https://docs.chef.io/config_yml_kitchen.html)
* [git](https://git-scm.com): [status](https://git-scm.com/docs/git-status); [add](https://git-scm.com/docs/git-add); [commit](https://git-scm.com/docs/git-commit); [checkout](https://git-scm.com/docs/git-checkout); [branch](https://git-scm.com/docs/git-branch); [merge](https://git-scm.com/docs/git-merge); [diff](https://git-scm.com/docs/git-diff); and [push](https://git-scm.com/docs/git-push)
* [Chef Resources](https://docs.chef.io/resources.html): [remote_file](https://docs.chef.io/resource_remote_file.html); and [execute](https://docs.chef.io/resource_execute.html)
* [Recipe DSL](https://docs.chef.io/dsl_recipe.html): notifications
* [ServerSpec](http://serverspec.org/): [service](http://serverspec.org/resource_types.html#service).
* [ChefSpec](https://github.com/sethvargo/chefspec): [install_package](https://github.com/sethvargo/chefspec/tree/master/examples/package); [run_execute](https://github.com/sethvargo/chefspec/tree/master/examples/execute); [start_service](https://github.com/sethvargo/chefspec/tree/master/examples/service); and [notifications](https://github.com/sethvargo/chefspec/tree/master/examples/notifications).
* [RSpec](https://relishapp.com/rspec): [it](https://relishapp.com/rspec/rspec-core/v/3-4/docs/example-groups/basic-structure-describe-it); [pending examples](https://relishapp.com/rspec/rspec-core/v/3-4/docs/pending-and-skipped-examples/pending-examples); [let](https://relishapp.com/rspec/rspec-core/v/3-4/docs/helper-methods/let-and-let); and [--init](https://relishapp.com/rspec/rspec-core/v/3-4/docs/command-line/init-option)

## Further activities

When you are done with the initial implementation we encourage you to challenge yourself by:

### Clarity in Resource Names

The execute resources within the recipe have their commands specified in their names. This creates for very brittle tests if you were to change version numbers or the flags of the command. It would be better if the command were stored in their appropriate attribute.

A resource named `make && make install` could be named `redis_build_and_install`.

First update the specifications to more clearly state the intention of the command. Run the tests to see the failure. Update the recipe and see the tests pass.

### Continue to refactor the tests

The tests within the cookbook are code you maintain as well. As we refactored the version number into a node attribute it would also be good to extract that version number into a [let](https://relishapp.com/rspec/rspec-core/v/3-4/docs/helper-methods/let-and-let) helper method. This will reduce the number of times we repeat the version number in the specification.

Another important step after defining the version number in a `let` helper method would be look at specifying the version value in as a node attribute for the chef-client run. ChefSpec provides the ability to set attributes.

### Continue to extract more values into attributes

Providing more values as attributes allows for a more flexible cookbook.

* The location to retrieve where to retrieve the source
* The folder to unzip the source
* The name of the service
