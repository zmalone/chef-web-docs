## 3. Create the INI file

First, you need to create the INI file and set its initial contents. To keep things basic, let's configure the file in the working directory.

In this step, you'll write what's called a _recipe_ to describe the desired state of the INI file. Then you'll run [chef-client](https://docs.chef.io/ctl_chef_client.html), the tool that applies your Chef code to place your system in the desired state. Typically, you use  `chef-client` to download and run the latest Chef code from the Chef server, but in this lesson, you'll run `chef-client` in what's called _local mode_ to apply Chef code that exists locally on your virtual machine.

From your <code class="file-path">~\chef-repo</code> directory, create a file named <code class="file-path">hello.rb</code>, add these contents, and then save the file.

```ruby-Win32
# ~\chef-repo\hello.rb
file 'C:\Users\Administrator\chef-repo\settings.ini' do
  content 'greeting=hello world'
end
```

From the command prompt, run the following `chef-client` command to apply what you've written.

```ps
# ~\chef-repo
$ chef-client --local-mode hello.rb
[2016-01-07T13:11:40-08:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T13:11:40-08:00] WARN: No cookbooks directory found at or above current directory.  Assuming C:/Users/Adminis
trator/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T13:12:00-08:00] WARN: Node WIN-8MV74EBIT8G has an empty run list.
Converging 1 resources
Recipe: @recipe_files::C:/Users/Administrator/chef-repo/hello.rb
  * file[C:\Users\Administrator\chef-repo\settings.ini] action create
    - create new file C:\Users\Administrator\chef-repo\settings.ini
    - update content in file C:\Users\Administrator\chef-repo\settings.ini from none to 6823fa
    --- C:\Users\Administrator\chef-repo\settings.ini   2016-01-07 13:12:00.000000000 -0800
    +++ C:\Users\Administrator\chef-repo/settings.ini20160107-2732-rwb912       2016-01-07 13:12:00.000000000 -0800
    @@ -1 +1,2 @@
    +greeting=hello world

Running handlers:
Running handlers complete
Chef Client finished, 1/1 resources updated in 18 seconds
```

The output tells us that a new file, <code class="file-path">settings.ini</code>, was created. (The warnings you see relate to concepts we haven't introduced yet, and can be safely ignored for now.)

Run the `Get-Content` PowerShell cmdlet to verify that the file was written.

```ps
# ~\chef-repo
$ Get-Content settings.ini
greeting=hello world
```

### Run the command a second time

Now, let's see now what happens when you run the same `chef-client` command again.

```ps
# ~\chef-repo
$ chef-client --local-mode hello.rb
[2016-01-07T13:16:54-08:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T13:16:54-08:00] WARN: No cookbooks directory found at or above current directory.  Assuming C:/Users/Adminis
trator/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T13:17:31-08:00] WARN: Node WIN-8MV74EBIT8G has an empty run list.
Converging 1 resources
Recipe: @recipe_files::C:/Users/Administrator/chef-repo/hello.rb
  * file[C:\Users\Administrator\chef-repo\settings.ini] action create (up to date)

Running handlers:
Running handlers complete
Chef Client finished, 0/1 resources updated in 11 seconds
```

This time you get a different response &ndash; the file is already up to date. This is because Chef does work only when it needs to.

Chef looks at the current configuration state and applies the action only if the current state doesn't match the desired state. Here, Chef doesn't create or modify <code class="file-path">settings.ini</code> because it already exists and its contents didn't change.
