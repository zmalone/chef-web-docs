## 1. Create a cookbook

First, from your <code class="file-path">~\chef-repo</code> directory, create a <code class="file-path">cookbooks</code> directory.

```ps
# ~\chef-repo
$ mkdir cookbooks
```

Now run the `chef` command to generate a cookbook named `learn_chef_iis`.

```ps
# ~\chef-repo\cookbooks
$ chef generate cookbook learn_chef_iis
Compiling Cookbooks...
Recipe: code_generator::cookbook
  * directory[C:/Users/Administrator/chef-repo/cookbooks/learn_chef_iis] action create
    - create new directory C:/Users/Administrator/chef-repo/cookbooks/learn_chef_iis
  * template[C:/Users/Administrator/chef-repo/cookbooks/learn_chef_iis/metadata.rb] action create_if_missing
    - create new file C:/Users/Administrator/chef-repo/cookbooks/learn_chef_iis/metadata.rb
    - update content in file C:/Users/Administrator/chef-repo/cookbooks/learn_chef_iis/metadata.rb from none
    (diff output suppressed by config)
[...]
  * template[C:/Users/Administrator/chef-repo/cookbooks/learn_chef_iis/recipes/default.rb] action create_if_missing
    - create new file C:/Users/Administrator/chef-repo/cookbooks/learn_chef_iis/recipes/default.rb
    - update content in file C:/Users/Administrator/chef-repo/cookbooks/learn_chef_iis/recipes/default.rb from none to 0
8b977
    (diff output suppressed by config)
```

The <% fp 'cookbooks/learn_chef_iis' %> part tells Chef to create a cookbook named `learn_chef_iis` under the <% fp 'cookbooks' %> directory.

Here's the directory structure that the command created.

```ps
# ~\chef-repo\cookbooks
$ tree /F
Folder PATH listing
Volume serial number is 0000000F 1697:4767
C:.
└───learn_chef_iis
    │   .kitchen.yml
    │   Berksfile
    │   chefignore
    │   metadata.rb
    │   README.md
    │
    ├───recipes
    │       default.rb
    │
    ├───spec
    │   │   spec_helper.rb
    │   │
    │   └───unit
    │       └───recipes
    │               default_spec.rb
    │
    └───test
        └───integration
            ├───default
            │   └───serverspec
            │           default_spec.rb
            │
            └───helpers
                └───serverspec
                        spec_helper.rb
```

Note the default recipe, named <code class="file-path">default.rb</code>. This is where we'll move our IIS recipe in a moment.
