## 1. Create a cookbook

First, from your <code class="file-path">~/chef-repo</code> directory, create a <code class="file-path">cookbooks</code> directory and `cd` there.

```bash
# ~/chef-repo
$ mkdir cookbooks
$ cd cookbooks
```

Now run the `chef` command to generate a cookbook named `learn_chef_httpd`.

```bash
# ~/chef-repo/cookbooks
$ chef generate cookbook learn_chef_httpd
Installing Cookbook Gems:
Compiling Cookbooks...
Recipe: code_generator::cookbook
  * directory[/root/chef-repo/cookbooks/learn_chef_httpd] action create
    - create new directory /root/chef-repo/cookbooks/learn_chef_httpd
[...]
    - update content in file /root/chef-repo/cookbooks/learn_chef_httpd/recipes/default.rb from none to 032289
    (diff output suppressed by config)
    - restore selinux security context
```

Here's the directory structure that the command created.

```bash
# ~/chef-repo/cookbooks
$ tree
.
└── learn_chef_httpd
    ├── Berksfile
    ├── chefignore
    ├── metadata.rb
    ├── README.md
    ├── recipes
    │   └── default.rb
    ├── spec
    │   ├── spec_helper.rb
    │   └── unit
    │       └── recipes
    │           └── default_spec.rb
    └── test
        └── integration
            ├── default
            │   └── serverspec
            │       └── default_spec.rb
            └── helpers
                └── serverspec
                    └── spec_helper.rb

11 directories, 9 files
```

Note the default recipe, named <code class="file-path">default.rb</code>. This is where we'll move our Apache recipe in a moment.
