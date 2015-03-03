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
    --- C:\Users\Administrator\chef-repo\settings.ini    2014-08-12 21:27:13.000000000 +0000
    +++ C:/Users/ADMINI~1/AppData/Local/Temp/settings.ini20140812-3908-1ilgurd      2014-08-12 21:29:25.000000000 +0000
    @@ -1,2 +1,2 @@
    -greeting=hello world
    +greeting=hello chef
```

This time Chef does work because we've changed the desired state of the file and need to update the installed version to match it.
