## 4. Update the INI file's contents

Now you're going to change the INI file.

Modify <code class="file-path">hello.rb</code> like this ('hello world' becomes 'hello chef'.)

```ruby-Win32
# ~\chef-repo\hello.rb
file 'C:\Users\Administrator\chef-repo\settings.ini' do
  content 'greeting=hello chef'
end
```

Run `chef-client`.

```ps
# ~\chef-repo
$ chef-client --local-mode hello.rb
[2016-01-07T13:26:37-08:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T13:26:37-08:00] WARN: No cookbooks directory found at or above current directory.  Assuming C:/Users/Adminis
trator/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T13:27:13-08:00] WARN: Node WIN-8MV74EBIT8G has an empty run list.
Converging 1 resources
Recipe: @recipe_files::C:/Users/Administrator/chef-repo/hello.rb
  * file[C:\Users\Administrator\chef-repo\settings.ini] action create
    - update content in file C:\Users\Administrator\chef-repo\settings.ini from 6823fa to cfde92
    --- C:\Users\Administrator\chef-repo\settings.ini   2016-01-07 13:12:00.000000000 -0800
    +++ C:\Users\Administrator\chef-repo/settings.ini20160107-1116-lgioqv       2016-01-07 13:27:13.000000000 -0800
    @@ -1,2 +1,2 @@
    -greeting=hello world
    +greeting=hello chef

Running handlers:
Running handlers complete
Chef Client finished, 1/1 resources updated in 13 seconds
```

This time Chef applies the action because you've changed the desired state of the file.