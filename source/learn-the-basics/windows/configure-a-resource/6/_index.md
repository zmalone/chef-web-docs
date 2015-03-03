## 6. Delete the INI file

OK, you're done experimenting with the INI file, so let's clean up. From your <code class="file-path">~\chef-repo</code> directory, create a new file named <code class="file-path">goodbye.rb</code> and save this content to it.

```ruby-Win32
# goodbye.rb
file 'C:\Users\Administrator\chef-repo\settings.ini' do
  action :delete
end
```

Now apply <code class="file-path">goodbye.rb</code> to delete the file.

```ps
# ~\chef-repo
$ chef-apply goodbye.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * file[C:\Users\Administrator\chef-repo\settings.ini] action delete
    - delete file C:\Users\Administrator\chef-repo\settings.ini
```

The output shows that <code class="file-path">settings.ini</code> is now gone, but let's prove it.

```ps
# ~\chef-repo
$ Test-Path settings.ini
False
```
