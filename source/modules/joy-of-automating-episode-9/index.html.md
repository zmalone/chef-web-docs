---
id: joy-of-automating-episode-9
title: 'Refactoring templates - chef-client cookbook'
short_title: 'Refactoring templates'
description: 'Learn how to work with community cookbooks and refactor a template with complicated logic to make it clearer.'
keywords: refactoring, templates, community cookbooks, chef supermarket, chef-client cookbook, helper methods
quiz_path: quizzes/joy-of-automating-episode-9.yml
time_to_complete: 70 minutes
headings: [
  { label: 'Resources', href: '#resources' }
]
---
This video comes from [The Joy of Automating](https://www.youtube.com/playlist?list=PL11cZfNdwNyORJfIYA8t07PRMchyDXIjq) series, hosted by Franklin Webber.

In this episode we focus on refactoring and submitting pull requests for a community cookbook. [Nathen Harvey](https://twitter.com/nathenharvey) and I fork the community cookbook, clone it, and then configure it for easiest management. Then we spend time understanding the template, making changes, committing the changes and opening a pull request. We continue to work further on cleaning up the logic that exists within the template, moving it back to the recipe, and then finally to a helper method.

In this episode we work with the community cookbook [chef-client](https://supermarket.chef.io/cookbooks/chef-client).

<iframe width="877" height="493" src="https://www.youtube.com/embed/4d6btJTVF-o" frameborder="0" allowfullscreen></iframe>

## Resources

* [Supermarket](https://supermarket.chef.io/): [tools & plugins](https://supermarket.chef.io/tools-directory); [chef-client](https://supermarket.chef.io/cookbooks/chef-client)
* [GitHub](https://help.github.com/): [pull requests](https://help.github.com/articles/using-pull-requests/)
* [git](https://git-scm.com): [clone](https://git-scm.com/docs/git-clone); [remote](https://git-scm.com/docs/git-remote); [status](https://git-scm.com/docs/git-status); [add](https://git-scm.com/docs/git-add); [commit](https://git-scm.com/docs/git-commit); [checkout](https://git-scm.com/docs/git-checkout); [clean](https://git-scm.com/docs/git-clean); [reset](https://git-scm.com/docs/git-reset); [branch](https://git-scm.com/docs/git-branch); [merge](https://git-scm.com/docs/git-merge); [diff](https://git-scm.com/docs/git-diff); and [push](https://git-scm.com/docs/git-push)
* [chef-client cookbook](https://github.com/chef-cookbooks/chef-client): [config recipe](https://github.com/chef-cookbooks/chef-client/blob/master/recipes/config.rb)
* [Ruby](http://www.rubydoc.info/stdlib): [Hash](http://www.rubydoc.info/stdlib/core/Hash); [Hash#keys](http://www.rubydoc.info/stdlib/core/Hash#keys-instance_method); [Array](http://www.rubydoc.info/stdlib/core/Array); [Array#each](http://www.rubydoc.info/stdlib/core/Array#each-instance_method); [Array#reject](http://www.rubydoc.info/stdlib/core/Array#reject-instance_method) [ERB](http://www.rubydoc.info/stdlib/erb/ERB); [include](http://www.rubydoc.info/stdlib/core/Module#include-instance_method); [:: or double-colon](http://stackoverflow.com/questions/3009477/what-is-rubys-double-colon); [defining methods](http://rubylearning.com/satishtalim/writing_own_ruby_methods.html); [String#gsub](http://www.rubydoc.info/stdlib/core/String#gsub-instance_method); and [String#to_sym](http://www.rubydoc.info/stdlib/core/String#to_sym-instance_method)
* [Chef Resources](https://docs.chef.io/resources.html): [template](https://docs.chef.io/resources.html#template);
* [Pry](http://pryrepl.org/); [ls](https://github.com/pry/pry/wiki/State-navigation#Ls); [exit](https://github.com/pry/pry/wiki/FAQ); [exit!](https://github.com/pry/pry/wiki/State-navigation#Exit_program)
* [hub](https://hub.github.com/): [create](https://hub.github.com/hub.1.html) and [browse](https://hub.github.com/hub.1.html).
