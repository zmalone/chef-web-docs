## 2. Start the World Wide Web Publishing Service

Now let's enable the IIS World Wide Web Publishing Service (W3SVC) service when the server boots and then start it. Modify <code class="file-path">webserver.rb</code> to look like this.

```ruby-Win32
# ~\chef-repo\webserver.rb
powershell_script 'Install IIS' do
  code 'Add-WindowsFeature Web-Server'
  guard_interpreter :powershell_script
  not_if "(Get-WindowsFeature -Name Web-Server).Installed"
end

service 'w3svc' do
  action [:enable, :start]
end
```

This code declares multiple actions.

Now apply it.

```ps
# ~\chef-repo
$ chef-client --local-mode webserver.rb
[2016-01-07T13:48:27-08:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T13:48:27-08:00] WARN: No cookbooks directory found at or above current directory.  Assuming C:/Users/Adminis
trator/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T13:49:04-08:00] WARN: Node WIN-8MV74EBIT8G has an empty run list.
Converging 2 resources
Recipe: @recipe_files::C:/Users/Administrator/chef-repo/webserver.rb
  * powershell_script[Install IIS] action run (skipped due to not_if)
  * windows_service[w3svc] action enable (up to date)
  * windows_service[w3svc] action start (up to date)

Running handlers:
Running handlers complete
Chef Client finished, 0/3 resources updated in 37 seconds
```

IIS is already installed, so again there's nothing to do. Similarly, the W3SVC service is already started and enabled. The command would install IIS if it got uninstalled and enable the W3SVC service if it was stopped or disabled.
