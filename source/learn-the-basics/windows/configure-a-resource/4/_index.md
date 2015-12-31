## 4. Update the INI file's contents

Now you're going to change the INI file.

Modify <code class="file-path">hello.rb</code> like this ('hello world' becomes 'hello chef'.)

```ruby-Win32
# ~\chef-repo\hello.rb
file 'C:\Users\Administrator\chef-repo\settings.ini' do
  content 'greeting=hello chef'
end
```

Run `chef-apply`.

```ps
# ~\chef-repo
$ chef-apply hello.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * file[C:\Users\Administrator\chef-repo\settings.ini] action create
    - update content in file C:\Users\Administrator\chef-repo\settings.ini from 6823fa to cfde92
    --- C:\Users\Administrator\chef-repo\settings.ini	2015-12-31 04:00:38.000000000 +0000
    +++ C:\Users\Administrator\chef-repo/settings.ini20151231-816-158kfgg	2015-12-31 04:00:50.000000000 +0000
    @@ -1,2 +1,2 @@
    -greeting=hello world
    +greeting=hello chef
```

This time Chef does work because we've changed the desired state of the file and need to update the installed version to match it.
