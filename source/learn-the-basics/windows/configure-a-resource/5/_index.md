## 5. Ensure the INI file's contents are not changed by anyone else

You need to make sure that no other process can change the INI file.

Imagine that a co-worker manually changes <code class="file-path">settings.ini</code> by replacing 'hello chef' with 'hello robots'. Go ahead and change your copy through your text editor. Or you can change the file from the command line like this.

```ps
# ~\chef-repo
$ Set-Content settings.ini 'greeting=hello robots'
```

Now run `chef-apply`.

```ps
# ~\chef-repo
$ chef-apply hello.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * file[C:\Users\Administrator\chef-repo\settings.ini] action create
    - update content in file C:\Users\Administrator\chef-repo\settings.ini from 95e229 to cfde92
    --- C:\Users\Administrator\chef-repo\settings.ini	2015-12-31 04:00:51.000000000 +0000
    +++ C:\Users\Administrator\chef-repo/settings.ini20151231-3172-13zg2tg	2015-12-31 04:00:57.000000000 +0000
    @@ -1,2 +1,2 @@
    -greeting=hello robots
    +greeting=hello chef
```

Chef restored the original configuration. This is actually a really good thing because Chef ensures that the actual state of your resource matches what you specify, even if it is altered by some outside process. Chef enables you to both apply a new configuration state as well as ensure that the current state stays how you want it.
