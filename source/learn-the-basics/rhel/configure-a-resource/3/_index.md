## 3. Update the MOTD file's contents

Now you're going to change the MOTD.

Modify <code class="file-path">hello.rb</code> like this ('hello world' becomes 'hello chef'.)

```ruby
# ~/chef-repo/hello.rb
file 'motd' do
  content 'hello chef'
end
```

Run `chef-apply`.

```bash
# ~/chef-repo
$ chef-apply hello.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * file[motd] action create
    - update content in file motd from b94d27 to c38c60
    --- motd	2015-02-25 13:38:16.047114670 -0800
    +++ ./.motd20150225-14129-uig0oi	2015-02-25 13:39:31.566787086 -0800
    @@ -1,2 +1,2 @@
    -hello world
    +hello chef
    - restore selinux security context
```

This time Chef does work because we've changed the desired state of the file and need to update the installed version to match it.
