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

Now run `chef-client` in local mode to apply the recipe.

```ps
# ~\chef-repo
$ chef-client --local-mode webserver.rb
[2016-01-07T13:43:55-08:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T13:43:55-08:00] WARN: No cookbooks directory found at or above current directory.  Assuming C:/Users/Adminis
trator/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T13:44:32-08:00] WARN: Node WIN-8MV74EBIT8G has an empty run list.
Converging 1 resources
Recipe: @recipe_files::C:/Users/Administrator/chef-repo/webserver.rb
  * powershell_script[Install IIS] action run
    - execute "C:\Windows\system32\WindowsPowerShell\v1.0\powershell.exe" -NoLogo -NonInteractive -NoProfile -ExecutionP
olicy Bypass -InputFormat None -File "C:/Users/ADMINI~1/AppData/Local/Temp/chef-script20160107-2128-mwavgl.ps1"

Running handlers:
Running handlers complete
Chef Client finished, 1/1 resources updated in 57 seconds
```

Run the recipe a second time.

```ps
# ~\chef-repo
$ chef-client --local-mode webserver.rb
[2016-01-07T13:46:38-08:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T13:46:38-08:00] WARN: No cookbooks directory found at or above current directory.  Assuming C:/Users/Adminis
trator/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T13:47:14-08:00] WARN: Node WIN-8MV74EBIT8G has an empty run list.
Converging 1 resources
Recipe: @recipe_files::C:/Users/Administrator/chef-repo/webserver.rb
  * powershell_script[Install IIS] action run (skipped due to not_if)

Running handlers:
Running handlers complete
Chef Client finished, 0/1 resources updated in 36 seconds
```

This time, Chef does not reinstall IIS. That's because the `not_if` attribute skips the resource when the condition is true. In this case, we use the `Get-WindowsFeature` PowerShell cmdlet to check whether the `Web-Server` feature is installed.
