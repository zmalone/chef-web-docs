## 5. Ensure the INI file's contents are not changed by anyone else

You need to make sure that no other process can change the INI file.

Imagine that a co-worker manually changes <code class="file-path">settings.ini</code> by replacing 'hello chef' with 'hello robots'. Go ahead and change your copy of <code class="file-path">settings.ini</code> through your text editor. Or you can change the file from the command line like this.

```ps
# ~\chef-repo
$ Set-Content settings.ini 'greeting=hello robots'
```

Now run `chef-client`.

```ps
# ~\chef-repo
$ chef-client --local-mode hello.rb
[2016-01-07T13:28:06-08:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T13:28:06-08:00] WARN: No cookbooks directory found at or above current directory.  Assuming C:/Users/Adminis
trator/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T13:28:42-08:00] WARN: Node WIN-8MV74EBIT8G has an empty run list.
Converging 1 resources
Recipe: @recipe_files::C:/Users/Administrator/chef-repo/hello.rb
  * file[C:\Users\Administrator\chef-repo\settings.ini] action create
    - update content in file C:\Users\Administrator\chef-repo\settings.ini from 95e229 to cfde92
    --- C:\Users\Administrator\chef-repo\settings.ini   2016-01-07 13:27:57.000000000 -0800
    +++ C:\Users\Administrator\chef-repo/settings.ini20160107-2320-e0wtbc       2016-01-07 13:28:42.000000000 -0800
    @@ -1,2 +1,2 @@
    -greeting=hello robots
    +greeting=hello chef

Running handlers:
Running handlers complete
Chef Client finished, 1/1 resources updated in 12 seconds
```

Chef restored the original configuration. This is actually a really good thing because Chef ensures that the actual state of your resource matches what you specify, even if it is altered by some outside process. Chef enables you to both apply a new configuration state as well as ensure that the current state stays how you want it.

[COMMENT] In practice, it's common to configure `chef-client` to act as a scheduled task that runs periodically or in response to an event, such as a commit to source control. Running Chef through automation helps to ensure that your servers remain configured as you expect and also enables them to be reconfigured when you need them to be.
