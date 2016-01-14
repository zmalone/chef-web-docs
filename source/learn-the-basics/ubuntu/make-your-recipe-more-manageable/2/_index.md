## 2. Create a template

Now we'll move the home page to an external file. First, run this command to generate the HTML file for our home page.

```bash
# ~/chef-repo/cookbooks
$ chef generate template learn_chef_apache2 index.html
```

The file <code class="file-path">index.html.erb</code> gets created under <code class="file-path">learn\_chef\_apache2/templates/default</code>.

```bash
# ~/chef-repo/cookbooks
$ tree
.
└── learn_chef_apache2
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
    ├── templates
    │   └── default
    │       └── index.html.erb
    └── test
        └── integration
            ├── default
            │   └── serverspec
            │       └── default_spec.rb
            └── helpers
                └── serverspec
                    └── spec_helper.rb

13 directories, 10 files
```

The .erb extension simply means that the file can have placeholders. More on that later.

Now copy the contents of the HTML file from your recipe to the new HTML file, <code class="file-path">index.html.erb</code>.

```html
<!-- ~/chef-repo/cookbooks/learn_chef_apache2/templates/default/index.html.erb -->
<html>
  <body>
    <h1>hello world</h1>
  </body>
</html>
```

[COMMENT] Here, you're adding the web site content directly to your cookbook for learning purposes. In practice, your web site content would more likely be some build artifact, for example a .zip file on your build server. With Chef, you could pull updated web content from your build server and deploy it to your web server.