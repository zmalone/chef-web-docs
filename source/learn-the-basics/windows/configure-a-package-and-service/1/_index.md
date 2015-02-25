## 1. Install IIS

Let's install IIS. From your <code class="file-path">~\chef-repo</code> directory, add this recipe to a file named <code class="file-path">webserver.rb</code>.

```ruby-Win32
# ~\chef-repo\webserver.rb
powershell_script 'Install IIS' do
  code 'Add-WindowsFeature Web-Server'
  guard_interpreter :powershell_script
  not_if "(Get-WindowsFeature -Name Web-Server).Installed"
end
```

We don't need to specify an action because `:run` is the default.

Now run `chef-apply` to apply the recipe.

```ps
# ~\chef-repo
$ chef-apply webserver.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * powershell_script[Install IIS] action run
    - execute "powershell.exe" -NoLogo -NonInteractive -NoProfile -ExecutionPolicy RemoteSigned -InputFormat None -File
"C:/Users/ADMINI~1/AppData/Local/Temp/chef-script20140812-3480-xwa5in.ps1"
```

Run the recipe a second time.

```ps
# ~\chef-repo
$ chef-apply webserver.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * powershell_script[Install IIS] action run (skipped due to not_if)
```

This time, Chef does not reinstall IIS. That's because the `not_if` attribute skips the resource when the condition is true. In this case, we use the `Get-WindowsFeature` PowerShell cmdlet to check whether the `Web-Server` feature is installed.
