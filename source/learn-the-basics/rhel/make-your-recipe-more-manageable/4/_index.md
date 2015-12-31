## 4. Run the cookbook

Now run the cookbook. To do so, we use the `chef-client` command and specify what's called the _run-list_.

```bash
# ~/chef-repo
$ sudo chef-client --local-mode --runlist 'recipe[learn_chef_httpd]'
[2015-12-30T16:20:22+00:00] WARN: No config file found or specified on command line, using command line options.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: ["learn_chef_httpd"]
Synchronizing Cookbooks:
  - learn_chef_httpd (0.1.0)
Compiling Cookbooks...
Converging 3 resources
Recipe: learn_chef_httpd::default
  * yum_package[httpd] action install (up to date)
  * service[httpd] action enable (up to date)
  * service[httpd] action start (up to date)
  * template[/var/www/html/index.html] action create (up to date)

Running handlers:
Running handlers complete
Chef Client finished, 0/4 resources updated in 02 seconds
```

[COMMENT] You ran `chef-apply` to run a single recipe from the command line. `chef-client` is what you use to run a cookbook. Specifically, the run-list you supply to `chef-client` contains the individual recipes from your cookbook that you want to apply.<br><br>In this example, `recipe[learn_chef_httpd]` is the same as specifying `recipe[learn_chef_httpd::default]`, meaning we want to run the `learn_chef_httpd` cookbook's default recipe, <code class="file-path">default.rb</code>.

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
