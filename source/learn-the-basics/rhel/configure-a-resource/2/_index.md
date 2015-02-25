## 2: Create the MOTD file

First, you need to create the file and set the initial MOTD. To keep things basic, let's configure the file in the working directory.

From your <code class="file-path">~/chef-repo</code> directory, create a file named <code class="file-path">hello.rb</code>, add these contents, and then save the file.

```ruby
# ~/chef-repo/hello.rb
file 'motd' do
  content 'hello world'
end
```

From your terminal window, run the following `chef-apply` command to apply what you've written.

```bash
# ~/chef-repo
$ chef-apply hello.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * file[motd] action create
    - create new file motd
    - update content in file motd from none to b94d27
    --- motd	2015-02-25 13:38:16.047114670 -0800
    +++ ./.motd20150225-13770-mlbv6s	2015-02-25 13:38:16.047114670 -0800
    @@ -1 +1,2 @@
    +hello world
    - restore selinux security context
```

The output tells us that a new file, <code class="file-path">motd</code>, was created.

Now verify that the file was written. Run the `more` command, which prints to the console the file you give it.

```bash
# ~/chef-repo
$ more motd
hello world
```

## Run the command a second time

Now, let's see now what happens when you run the same `chef-apply` command again.

```bash
# ~/chef-repo
$ chef-apply hello.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * file[motd] action create (up to date)
```

This time you get a different response. This is because Chef does work only when it needs to.

Chef looks at the current configuration state and applies the action only if the current state doesn't match the desired state. Here, Chef doesn't create or modify <code class="file-path">motd</code> because it already exists and its contents didn't change.
