##### Recap
Our workstation is now set up. We now have:

- Credentials setup and verified
- Our `chef-repo` repository setup
- The following recipes to use on a new node:

  1. `recipe[apt]` - via community
  1. `recipe[apache2]` - via community
  1. `recipe[magic_shell]` - via community
  1. `recipe[aliases]` - created ourselves

The next step is adding these recipes to the `run_list` of a new node in Part 3.
