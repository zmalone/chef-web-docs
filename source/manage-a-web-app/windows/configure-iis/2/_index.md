## 2. Write the webserver recipe

Remember, our goals for configuring Apache are to:

* install the Apache package and start and enable its service.
* create and enable our custom site.
* create a default home page for our site.

We'll call our custom site `customers`, and we'll store it in the <code class="file-path">/srv/apache/customers/</code> directory.

The first step is to create the recipe file, <code class="file-path">webserver.rb</code>. Run the following command to generate it.

```bash
# ~/chef-repo
$ chef generate recipe cookbooks/web_application webserver
Compiling Cookbooks...
Recipe: code_generator::recipe
[...]
  * template[cookbooks/web_application/recipes/webserver.rb] action create
    - create new file cookbooks/web_application/recipes/webserver.rb
    - update content in file cookbooks/web_application/recipes/webserver.rb from none to bc6813
    (diff output suppressed by config)
```

Although we're not yet set up to run PHP code, we can create an initial home page named <code class="file-path">index.php</code> that contains plain HTML as a placeholder. Earlier, we set up a user, `web_admin`, who has access to the site's content. We'll configure the home page so that the `web_admin` user has read and write access, and everyone else has read-only access.

The `apache2` cookbook's default recipe takes care of installing the Apache package and configuring its service. To enable our custom site, we'll use the `web_app` resource, which is a custom resource type that's provided by the `apache2` cookbook. For the home page, we'll use the `file` resource that you're already familiar with.

Earlier, we discussed how it's a good practice to separate your logic from your data. But it's not a bad idea to start by combining logic and data to define the exact behavior that you want. Once everything's working, you can go back and refactor it to be more reusable. We'll follow this practice throughout this tutorial.
