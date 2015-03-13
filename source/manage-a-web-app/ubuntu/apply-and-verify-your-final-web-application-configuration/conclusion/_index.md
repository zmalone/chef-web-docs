Something about how you can reuse this (reference cookbook, replace attributes) - perhaps point to hierarchy of attribute precedence.

Credit: This tutorial was adapted from http://misheska.com/blog/2013/06/23/getting-started-writing-chef-cookbooks-the-berkshelf-way-part2/

Put the final cookbook on GitHub or Supermarket

Exercises:

Delete the seed file after using it (you don't have to guard this because ...)

What is the latest version of the `haproxy` community cookbook?

https://supermarket.chef.io/cookbooks/haproxy

Modify your cookbook so that the `apt` cache is updated every 48 hours, instead of the default of 24 hours.

Hint: In this tutorial, you relied a lot on node attributes. Is there a node attribute from the [apt cookbook](https://supermarket.chef.io/cookbooks/apt#attributes) that you can overwrite?

['apt']['periodic_update_min_delay'] - minimum delay (in seconds) beetween two actual executions of apt-get update by the execute[apt-get-update-periodic] resource, default is '86400' (24 hours)

Examine the Apache file's configuration to see how the placeholders get filled in as the recipe runs.
