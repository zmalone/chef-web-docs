## 6. Delete the INI file

OK, you're done experimenting with the INI file, so let's clean up. From your <code class="file-path">~\chef-repo</code> directory, create a new file named <code class="file-path">goodbye.rb</code> and save this content to it.

```ruby-Win32
# ~/chef-repo/goodbye.rb
file 'C:\Users\Administrator\chef-repo\settings.ini' do
  action :delete
end
```

Now apply <code class="file-path">goodbye.rb</code> to delete the file.

```ps
# ~\chef-repo
$ chef-client --local-mode goodbye.rb
[2016-01-07T13:29:50-08:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T13:29:50-08:00] WARN: No cookbooks directory found at or above current directory.  Assuming C:/Users/Adminis
trator/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T13:30:26-08:00] WARN: Node WIN-8MV74EBIT8G has an empty run list.
Converging 1 resources
Recipe: @recipe_files::C:/Users/Administrator/chef-repo/goodbye.rb
  * file[C:\Users\Administrator\chef-repo\settings.ini] action delete
    - delete file C:\Users\Administrator\chef-repo\settings.ini

Running handlers:
Running handlers complete
Chef Client finished, 1/1 resources updated in 18 seconds
```

The output shows that <code class="file-path">settings.ini</code> is now gone, but let's prove it.

```ps
# ~\chef-repo
$ Test-Path settings.ini
False
```
