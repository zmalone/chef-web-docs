---
id: joy-of-automating-episode-10
title: 'Helper methods - NTP cookbook'
short_title: 'Helper methods'
description: 'Learn how to refactor a recipe to define helper methods.'
keywords: helper methods, ntp, pry, attributes
time_to_complete: 60 minutes
quiz_path: quizzes/joy-of-automating-episode-10.yml
headings: [
  { label: 'Resources', href: '#resources' }
]
tags: [video]
---
This video comes from [The Joy of Automating](https://www.youtube.com/playlist?list=PL11cZfNdwNyORJfIYA8t07PRMchyDXIjq) series, hosted by Franklin Webber.

In this episode we focus on refactoring a community cookbook for readability. [Eric Maxwell](https://twitter.com/iamericmaxwell) and I review the community cookbook NTP for clarity. We refactor some of the recipe using `include_recipe` and then proceed to define helper methods to clean up the logic in the recipe. We write some tests and stumble into a few key moments where we learn about attribute precedence levels, Ruby's modules, and employing Pry to understand what is happening at execution.

In this episode we work with the community cookbook [ntp](https://supermarket.chef.io/cookbooks/ntp).

<iframe width="877" height="493" src="https://www.youtube.com/embed/EttIaEybNX8" frameborder="0" allowfullscreen></iframe>

## Resources

* [NTP](http://www.ntp.org/)
* [Supermarket](https://supermarket.chef.io/): [ntp](https://supermarket.chef.io/cookbooks/ntp)
* [ntp cookbook](https://github.com/chef-cookbooks/ntp): [default recipe](https://github.com/chef-cookbooks/ntp/blob/master/recipes/default.rb)
* [Chef Resources](https://docs.chef.io/resources.html): [include_recipe]();
* [ChefSpec](https://github.com/sethvargo/chefspec): [rspec (executable)](https://docs.chef.io/chefspec.html#run-chef-spec); [it](https://relishapp.com/rspec/rspec-core/v/3-4/docs/example-groups/basic-structure-describe-it); [context](https://relishapp.com/rspec/rspec-core/v/3-4/docs/example-groups/basic-structure-describe-it); [include](https://relishapp.com/rspec/rspec-expectations/v/3-4/docs/built-in-matchers)
* [Ruby](http://www.rubydoc.info/stdlib):   [Array](http://www.rubydoc.info/stdlib/core/Array); [include](http://www.rubydoc.info/stdlib/core/Module#include-instance_method); [:: or double-colon](http://stackoverflow.com/questions/3009477/what-is-rubys-double-colon); [defining methods](http://rubylearning.com/satishtalim/writing_own_ruby_methods.html);
* [Pry](http://pryrepl.org/); [ls](https://github.com/pry/pry/wiki/State-navigation#Ls); [exit](https://github.com/pry/pry/wiki/FAQ); [exit!](https://github.com/pry/pry/wiki/State-navigation#Exit_program)
