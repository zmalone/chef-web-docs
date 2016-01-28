## 4. Run the cookbook

Now run the cookbook. To do so, we use the `chef-client` command and specify what's called the _run-list_.

```bash
# ~/chef-repo
$ sudo chef-client --local-mode --runlist 'recipe[learn_chef_apache2]'
[2015-12-30T17:21:10+00:00] WARN: No config file found or specified on command line, using command line options.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: ["learn_chef_apache2"]
Synchronizing Cookbooks:
  - learn_chef_apache2 (0.1.0)
Compiling Cookbooks...
Converging 3 resources
Recipe: learn_chef_apache2::default
  * apt_package[apache2] action install (up to date)
  * service[apache2] action enable (up to date)
  * service[apache2] action start (up to date)
    * template[/var/www/html/index.html] action create
    - update content in file /var/www/html/index.html from 2914aa to ef4ffd
    (no diff)

Running handlers:
Running handlers complete
Chef Client finished, 1/4 resources updated in 02 seconds
```

Previously, you ran `chef-client` to run a single recipe from the command line. A run-list specifies each of the individual recipes from your cookbook that you want to apply. Here, you applied just one recipe, but the run-list can contain multiple recipes from multiple cookbooks.<br><br>In this example, `recipe[learn_chef_apache2]` is the same as specifying `recipe[learn_chef_apache2::default]`, meaning we want to run the `learn_chef_apache2` cookbook's default recipe, <code class="file-path">default.rb</code>.

Run `curl` again or refresh your web browser to confirm that your web page is still available.

```bash
# ~/chef-repo
$ curl localhost
<html>
  <body>
    <h1>hello world</h1>
  </body>
</html>
```

The result is the same as before, but with a cookbook things are now easier to manage.
