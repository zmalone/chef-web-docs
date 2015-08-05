## 6. Update your web server configuration to meet compliance

In the previous step, we saw that three files failed the audit.

* <code class="file-path">c:/inetpub/wwwroot/Default.htm</code>
* <code class="file-path">c:/inetpub/wwwroot/pages/Page1.htm</code>
* <code class="file-path">c:/inetpub/wwwroot/pages/Page2.htm</code>

In practice, you would work with your team and the audit team to determine the best course of action. Here, we'll resolve these failures by assigning the built-in `IIS_IUSRS` group as the owner of the web files.

Modify the part of your `webserver` cookbook's default recipe that manages the files to assign the owner to the `IIS_IUSRS` group, like this.

```ruby
# ~/chef-repo/cookbooks/webserver/recipes/default.rb
# Add files to the site.
%w(Default.htm pages/Page1.htm pages/Page2.htm).each do |web_file|
  file File.join('c:/inetpub/wwwroot', web_file) do
    content "<html>This is #{web_file}.</html>"
    owner 'IIS_IUSRS'
  end
end
```

The entire recipe now looks like this.

```ruby
# ~/chef-repo/cookbooks/webserver/recipes/default.rb
# Install IIS.
powershell_script 'Install IIS' do
  code 'Add-WindowsFeature Web-Server'
  guard_interpreter :powershell_script
  not_if '(Get-WindowsFeature -Name Web-Server).Installed'
end

# Enable and start W3SVC.
service 'w3svc' do
  action [:enable, :start]
end

# Remove the default IIS start page.
file 'c:/inetpub/wwwroot/iisstart.htm' do
  action :delete
end

# Create the pages directory under the  Web application root directory.
directory 'c:/inetpub/wwwroot/pages'

# Add files to the site.
%w(Default.htm pages/Page1.htm pages/Page2.htm).each do |web_file|
  file File.join('c:/inetpub/wwwroot', web_file) do
    content "<html>This is #{web_file}.</html>"
    owner 'IIS_IUSRS'
  end
end
```

Now run `kitchen converge` to apply the changes and run your audit tests.

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Converging <default-windows-2012r2>...
       Preparing files for transfer
[...]
         * file[c:/inetpub/wwwroot/pages/Page1.htm] action create
           - change owner
[...]
       Starting audit phase

       Validate web services
         Ensure no web files are owned by the Administrators group
           c:/inetpub/wwwroot/Default.htm must not be owned by Administrators
           c:/inetpub/wwwroot/pages/Page1.htm must not be owned by Administrators
           c:/inetpub/wwwroot/pages/Page2.htm must not be owned by Administrators

       Finished in 1.42 seconds (files took 1.11 seconds to load)
       3 examples, 0 failures
       Auditing complete

       Running handlers:
       Running handlers complete
       Chef Client finished, 3/7 resources updated in 40.483174 seconds
         3/3 controls succeeded
       Finished converging <default-windows-2012r2> (0m48.19s).
-----> Kitchen is finished. (0m50.18s)
```

[COMMENT] As your infrastructure code grows in complexity, you can temporarily set `audit_mode` in your <code class="file-path">.kitchen.yml</code> to `:disabled` to disable audit tests so that you can first verify that your configuration code works. Then you can enable audit mode to ensure that the working configuration also passes audit.

Congratulations. The ownership of your web content changed from `Administrators` to `IIS_IUSRS` and your audit tests now pass!
