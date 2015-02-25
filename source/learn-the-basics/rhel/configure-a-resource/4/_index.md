## 4. Ensure the MOTD file's contents are not changed by anyone else

You need to make sure that no other process can change the MOTD.

Imagine that a co-worker manually changes <code class="file-path">motd</code> by replacing 'hello chef' with 'hello robots'. Go ahead and change your copy through your text editor. Or you can change the file from the command line like this.

```bash
# ~/chef-repo
$ echo 'hello robots' > motd
```

Now run `chef-apply`.

```bash
# ~/chef-repo
$ chef-apply hello.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * file[motd] action create
    - update content in file motd from 548078 to c38c60
    --- motd	2015-02-25 13:40:01.398787053 -0800
    +++ ./.motd20150225-14278-1ulmqhz	2015-02-25 13:40:06.753787047 -0800
    @@ -1,2 +1,2 @@
    -hello robots
    +hello chef
    - restore selinux security context
```

Chef restored the original configuration. This is actually a really good thing because Chef ensures that the actual state of your resource matches what you specify, even if it is altered by some outside process. Chef enables you to both apply a new configuration state as well as ensure that the current state stays how you want it.
