---
id: joy-of-automating-episode-3
title: 'Working with legacy code - Redis'
short_title: 'Working with legacy code'
description: 'Learn how to convert legacy code into tested recipes, using Redis as an example.'
keywords: legacy code, redis, refactoring
quiz_path: quizzes/joy-of-automating-episode-3.yml
time_to_complete: 60 minutes
headings: [
  { label: 'Reference', href: '#reference' },
  { label: 'Further activities', href: '#furtheractivities' }
]
tags: [video]
---
This video comes from [The Joy of Automating](https://www.youtube.com/playlist?list=PL11cZfNdwNyORJfIYA8t07PRMchyDXIjq) series, hosted by Franklin Webber.

In this episode we focus on working with legacy code. Legacy code is everywhere. Learning the steps to tackle this kind of work essential. This is a cookbook that deploys Redis on Ubuntu. We write an integration test that exposes some issues in the recipe. Then proceeded to write unit tests to capture the current state. The resources used a lot of notifications to generate a chain of events that are important to test. Near the end we refactor out the version into a node attribute and then start to refactor the resource names to make the specifications less brittle. We finish by starting to apply the same refactoring techniques to our test suite.

In this episode we focus on taking an [existing cookbook](https://github.com/chef-training/redis).

<iframe width="877" height="493" src="https://www.youtube.com/embed/Td1MMyvwaF8?list=PL11cZfNdwNyORJfIYA8t07PRMchyDXIjq" frameborder="0" allowfullscreen></iframe>

## Reference

* [chef (executable)](https://docs.chef.io/ctl_chef.html)
  * [generate cookbook](https://docs.chef.io/ctl_chef.html#chef-generate-cookbook)
  * [generate recipe](https://docs.chef.io/ctl_chef.html#chef-generate-recipe)
  * [exec](https://docs.chef.io/ctl_chef.html#chef-exec)
* [kitchen (executable)](https://docs.chef.io/ctl_kitchen.html)
  * [list](https://docs.chef.io/ctl_kitchen.html#kitchen-list)
  * [destroy](https://docs.chef.io/ctl_kitchen.html#kitchen-destroy)
  * [create](https://docs.chef.io/ctl_kitchen.html#kitchen-create)
  * [verify](https://docs.chef.io/ctl_kitchen.html#kitchen-verify)
* [Atom commands](http://flight-manual.atom.io/)
  * [Fuzzy Find](http://flight-manual.atom.io/getting-started/sections/atom-basics/)
  * [Toggle Tree View](http://flight-manual.atom.io/getting-started/sections/atom-basics/)
  * [Panes / Split Window](http://flight-manual.atom.io/using-atom/sections/panes/)
* [Test Kitchen Configuration File](https://docs.chef.io/config_yml_kitchen.html)
* [git](https://git-scm.com)
  * [status](https://git-scm.com/docs/git-status)
  * [add](https://git-scm.com/docs/git-add)
  * [commit](https://git-scm.com/docs/git-commit)
  * [checkout](https://git-scm.com/docs/git-checkout)
  * [clean](https://git-scm.com/docs/git-clean)
  * [reset](https://git-scm.com/docs/git-reset)
  * [branch](https://git-scm.com/docs/git-branch)
  * [merge](https://git-scm.com/docs/git-merge)
  * [diff](https://git-scm.com/docs/git-diff)
  * [push](https://git-scm.com/docs/git-push)
* [Chef Resources](https://docs.chef.io/resources.html)
  * [remote_file](https://docs.chef.io/resource_remote_file.html)
  * [execute](https://docs.chef.io/resource_execute.html)
* [Recipe DSL](https://docs.chef.io/dsl_recipe.html)
* [ChefSpec](https://github.com/sethvargo/chefspec)
  * [install_package](https://github.com/sethvargo/chefspec/tree/master/examples/package)
  * [run_execute](https://github.com/sethvargo/chefspec/tree/master/examples/execute)
* [RSpec](https://relishapp.com/rspec)
  * [it](https://relishapp.com/rspec/rspec-core/v/3-4/docs/example-groups/basic-structure-describe-it)
  * [pending examples](https://relishapp.com/rspec/rspec-core/v/3-4/docs/pending-and-skipped-examples/pending-examples)
  * [--init](https://relishapp.com/rspec/rspec-core/v/3-4/docs/command-line/init-option)
  * [let](https://relishapp.com/rspec/rspec-core/v/3-4/docs/helper-methods/let-and-let)
  * [--init](https://relishapp.com/rspec/rspec-core/v/3-4/docs/command-line/init-option)

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
