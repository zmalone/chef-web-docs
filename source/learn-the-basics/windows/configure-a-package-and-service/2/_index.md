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
$ chef-apply webserver.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * powershell_script[Install IIS] action run (skipped due to not_if)
  * service[w3svc] action enable (up to date)
  * service[w3svc] action start (up to date)
```

IIS is already installed, so again there's nothing to do. Similarly, the W3SVC service is already started and enabled. The command would install IIS if it got uninstalled and enable the W3SVC service if it was stopped or disabled.
