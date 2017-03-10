---
id: joy-of-automating-episode-5
title: 'Episode 5: Refactoring - Test Suite: ChefSpec and RSpec'
description: 'Learn ways to remove duplication from the test suite. In this episode we refactor ChefSpec and learn the powerful features of RSpec.'
order: 5
keywords: training, videos, screencasts
category: 'joy-of-automating'
sections: []
icon: video.png
---

<iframe width="877" height="493" src="https://www.youtube.com/embed/ucd4v9R-XNA?list=PL11cZfNdwNyORJfIYA8t07PRMchyDXIjq" frameborder="0" allowfullscreen></iframe>

## Description

In this episode we focus on refactoring the test suite defined for a cookbook. Using a little Ruby and a lot of RSpec's powerful features we are able to make a clearer and concise test suite.

## Activity

In this episode we focus on the test suite defined for an earlier version of the [Ark cookbook](https://github.com/chef-training/ark).

## Resources

* [chef (executable)](https://docs.chef.io/ctl_chef.html): [exec](https://docs.chef.io/ctl_chef.html#chef-exec)
* [Atom commands](http://flight-manual.atom.io/): [Select next matching word](http://flight-manual.atom.io/using-atom/sections/editing-and-deleting-text/)
* [Chef Resources](https://docs.chef.io/resources.html): [package](https://docs.chef.io/resource_package.html)
* [Node Attributes](https://docs.chef.io/attributes.html)
* [ChefSpec](https://github.com/sethvargo/chefspec): [install_package](https://github.com/sethvargo/chefspec/tree/master/examples/package)
* [Fauxhai](https://github.com/customink/fauxhai): [Available Platforms](https://github.com/customink/fauxhai/tree/master/lib/fauxhai/platforms)
* [Rspec](https://relishapp.com/rspec/): [let](https://relishapp.com/rspec/rspec-core/v/3-4/docs/helper-methods/let-and-let); [shared_examples](https://relishapp.com/rspec/rspec-core/v/3-4/docs/example-groups/shared-examples); [shared_context](https://relishapp.com/rspec/rspec-core/v/3-4/docs/example-groups/shared-context); and [aliasing](https://relishapp.com/rspec/rspec-core/v/3-4/docs/example-groups/aliasing)
* [Pry](http://pryrepl.org/)

## Further activities

We explored a number of refactoring concepts in this episode. Choose one and finish the implementation. When you are done, choose another.

### Using the `let` helper

To reduce the redundancy when asserting the presence of absence of packages we defined a list of packages first within the example (between the it's do and end). We used Array#each method to iterate over the collection of packages. Then we moved that array into a `let` helper. Continue to do that for the remaining platforms within the default recipe's specification file.

### Defining `shared_examples`

We found that a lot of the platforms for this cookbook were making similar assertions about the presence of packages. We moved the example we defined into a shared example block and then replaced that code with `include_examples`. Continue to do that for the remaining platforms.

Some of the remaining platforms also verify that a number of packages are not installed. Add to the shared example an additional example that makes that assertion for an array of packages. Again, using a `let(:not_installed_packages)`. You may at that time decide to renamed your initial `let(:packages)` to something like `let(:installed_packages)` so that there is parity.

### Extracting examples to platform specific specification files

A large test file with lots of expectations can cause fatigue for the reader and increase the amount of time it takes to debug issues when they do arise. Continue to refactor. Continue to refactor the default specification into specifications per platform.

### Defining a `shared_context`

Near the end we started to define a number of shared functionality between all of the example groups that we defined. Each platform had a `chef_run` that was configured with a number of node attributes that specified the platform. Continue to refactor out any shared functionality across all of the examples groups into a `shared_context`. Move that `shared_context` to the spec_helper file so that it is available for all specifications.

### Aliasing Example Groups to automatically include a shared_context

Using the [alias](https://relishapp.com/rspec/rspec-core/v/3-4/docs/example-groups/aliasing) of example group and shared context I was able to create a way to more clearly include a `shared_context`. Continue to refactor the `shared_context` you created above into something that is loaded automatically for a aliased example group that you define.
