## 4. Run the cookbook

Now run the cookbook. To do so, we use the `chef-client` command and specify what's called the _run-list_.

```bash
# ~/chef-repo
$ sudo chef-client --local-mode --runlist 'recipe[learn_chef_apache2]'
[2014-07-28T20:05:38+00:00] WARN: No config file found or specified on command line, using command line options.
Starting Chef Client, version 11.16.0
resolving cookbooks for run list: ["learn_chef_apache2"]
Synchronizing Cookbooks:
  - learn_chef_apache2
Compiling Cookbooks...
Converging 3 resources
Recipe: learn_chef_apache2::default
  * package[apache2] action install (up to date)
  * service[apache2] action enable (up to date)
  * service[apache2] action start (up to date)
  * template[/var/www/html/index.html] action create
    - update content in file /var/www/html/index.html from 2914aa to ef4ffd
    (no diff)

Running handlers:
Running handlers complete
Chef Client finished, 1/4 resources updated in 5.902863207 seconds
```

[COMMENT] You ran `chef-apply` to run a single recipe from the command line. `chef-client` is what you use to run a cookbook. Specifically, the run-list you supply to `chef-client` contains the individual recipes from your cookbook that you want to apply.<br><br>In this example, `recipe[learn_chef_apache2]` is the same as specifying `recipe[learn_chef_apache2::default]`, meaning we want to run the `learn_chef_apache2` cookbook's default recipe, <code class="file-path">default.rb</code>.

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
