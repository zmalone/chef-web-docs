## 2. Create a template

Now we'll move the home page to an external file. First, run this command to generate the HTML file for our home page.

```ps
# ~\chef-repo\cookbooks
$ chef generate template learn_chef_iis Default.htm
Compiling Cookbooks...
Recipe: code_generator::template
  * directory[./learn_chef_iis/templates/default] action create
    - create new directory ./learn_chef_iis/templates/default
  * template[./learn_chef_iis/templates/default/Default.htm.erb] action create
    - create new file ./learn_chef_iis/templates/default/Default.htm.erb
    - update content in file ./learn_chef_iis/templates/default/Default.htm.erb from none to e3b0c4
    (diff output suppressed by config)
```

The file <code class="file-path">Default.htm.erb</code> gets created under <code class="file-path">learn\_chef\_iis\templates\default</code>.

```ps
# ~\chef-repo\cookbooks
$ tree /F
Folder PATH listing
Volume serial number is 00000032 1697:4767
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
    ├───templates
    │   └───default
    │           Default.htm.erb
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

The .erb extension simply means that the file can have placeholders. More on that later.

Now copy the contents of the HTML file from your recipe to the new HTML file, <code class="file-path">Default.htm.erb</code>.

```html-Win32
<!-- ~\chef-repo\cookbooks\learn_chef_iis\templates\default\Default.htm.erb -->
<html>
  <body>
    <h1>hello world</h1>
  </body>
</html>
```

[COMMENT] Here, you're adding the web site content directly to your cookbook for learning purposes. In practice, your web site content would more likely be some build artifact, for example a .zip file on your build server. With Chef, you could pull updated web content from your build server and deploy it to your web server.