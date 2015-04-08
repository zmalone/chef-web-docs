## 4. Run the cookbook

Now run the cookbook. To do so, we use the `chef-client` command and specify what's called the _run-list_.

```ps
# ~\chef-repo
$ chef-client --local-mode --runlist 'recipe[learn_chef_iis]'
[2014-08-19T21:29:02+00:00] WARN: No config file found or specified on command line, using command line options.
Starting Chef Client, version 11.16.0
resolving cookbooks for run list: ["learn_chef_iis"]
Synchronizing Cookbooks:
  - learn_chef_iis
Compiling Cookbooks...
Converging 3 resources
Recipe: learn_chef_iis::default
  * powershell_script[Install IIS] action run (skipped due to not_if)
  * service[w3svc] action enable (up to date)
  * service[w3svc] action start (up to date)
  * template[c:\inetpub\wwwroot\Default.htm] action create
    - update content in file c:\inetpub\wwwroot\Default.htm from 2914aa to 100c2f
    (no diff)

Running handlers:
Running handlers complete
Chef Client finished, 1/3 resources updated in 20.482954 seconds
```

[COMMENT] You ran `chef-apply` to run a single recipe from the command line. `chef-client` is what you use to run a cookbook. Specifically, the run-list you supply to `chef-client` contains the individual recipes from your cookbook that you want to apply.<br><br>In this example, `recipe[learn_chef_iis]` is the same as specifying `recipe[learn_chef_iis::default]`, meaning we want to run the `learn_chef_iis` cookbook's default recipe, <code class="file-path">default.rb</code>.

Run `Invoke-WebRequest` or refresh your web browser to confirm that your web page is still available.

```ps
# ~\chef-repo
$ (Invoke-WebRequest localhost).Content
<html>
  <body>
    <h1>hello world</h1>
  </body>
</html>
```

The result is the same as before, but with a cookbook things are now easier to manage.
