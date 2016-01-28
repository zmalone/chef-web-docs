## 3. Configure the home page

Let's spruce things up and add a custom home page.

You already know how to configure a `file` resource; append one that configures the default home page, <code class="file-path">c:\inetpub\wwwroot\Default.htm</code>, to the end of <code class="file-path">webserver.rb</code>. The entire recipe now looks like this.

[TIP] Although we believe typing in the code and commands is a great way to learn, remember you can copy the text from the code and terminal boxes and paste them into your remote session. If you're using our free trial VM, use the **Clipboard** command in the menu bar to copy text to your session's clipboard.

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

file 'c:\inetpub\wwwroot\Default.htm' do
  content '<html>
  <body>
    <h1>hello world</h1>
  </body>
</html>'
end
```

Now apply it.

```ps
# ~\chef-repo
$ chef-client --local-mode webserver.rb
[2016-01-07T13:50:09-08:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T13:50:09-08:00] WARN: No cookbooks directory found at or above current directory.  Assuming C:/Users/Adminis
trator/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T13:50:45-08:00] WARN: Node WIN-8MV74EBIT8G has an empty run list.
Converging 3 resources
Recipe: @recipe_files::C:/Users/Administrator/chef-repo/webserver.rb
  * powershell_script[Install IIS] action run (skipped due to not_if)
  * windows_service[w3svc] action enable (up to date)
  * windows_service[w3svc] action start (up to date)
  * file[c:\inetpub\wwwroot\Default.htm] action create
    - create new file c:\inetpub\wwwroot\Default.htm
    - update content in file c:\inetpub\wwwroot\Default.htm from none to 2914aa
    --- c:\inetpub\wwwroot\Default.htm  2016-01-07 13:50:46.000000000 -0800
    +++ c:\inetpub\wwwroot/Default.htm20160107-1644-19jhr7h     2016-01-07 13:50:46.000000000 -0800
    @@ -1 +1,6 @@
    +<html>
    +  <body>
    +    <h1>hello world</h1>
    +  </body>
    +</html>

Running handlers:
Running handlers complete
Chef Client finished, 1/4 resources updated in 36 seconds
```

IIS and W3SVC are already in the desired state, but you'll see that the home page, <code class="file-path">c:\inetpub\wwwroot\Default.htm</code>, is created.