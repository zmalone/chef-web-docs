## 7. Resolve the audit failure

Now let's resolve the audit failure. We'll start by writing code to configure the firewall on the node. Then we'll verify the fix locally. Finally, we'll upload our updated `webserver` to the Chef server and run `chef-client` on our node and verify that the audit passes.

To illustrate the state of the firewall, you would see from the **Windows Firewall with Advanced Security** Microsoft Management Console (MMC) snap-in that by default a firewall rule exists that allows inbound ICMPv4 traffic.

![Allowing inbound ICMPv4 traffic](chef-analytics/windows-firewall-allow-ping.png)

For now, our goal is to ensure that this rule remains enabled, but blocks public Echo Request messages. A complete solution might also create a new firewall rule if the existing rule was deleted.

### Update the webserver cookbook

To ensure that the firewall rules are enabled and running, we'll use the same `powershell_script` resource that we used to configure IIS.

Recall that the control that checks the state of the firewall looks like this.

```ruby
# ~/chef-repo/cookbooks/audit/recipes/default.rb
control_group 'Validate network configuration and firewalls' do
  control 'Ensure the firewall blocks public ICMPv4 Echo Request messages' do
    it 'has at least one rule that blocks access' do
      expect(command(<<-EOH
        (Get-NetFirewallPortFilter -Protocol ICMPv4 |
        Where-Object { $_.IcmpType -eq 8 } |
        Get-NetFirewallRule |
        Where-Object {
          ($_.Profile -eq "Public") -and
          ($_.Direction -eq "Inbound") -and
          ($_.Enabled -eq "True") -and
          ($_.Action -eq "Block") } |
        Measure-Object).Count -gt 0
        EOH
      ).stdout).to match(/True/)
    end
  end
end
```

We can use the logic for the control as a guide for writing the infrastructure code that's required to configure the firewall.

#### Apply the firewall rules

In practice, you might add your firewall configuration code to a separate cookbook or recipe. But for this lesson, let's add the code to the `webserver` cookbook's default recipe.

Add the following code to the beginning of your `webserver` cookbook's default recipe.

```ruby
# ~/chef-repo/cookbooks/webserver/recipes/default.rb
# Block ICMPv4 Echo Request messages in the public profile.
powershell_script 'Block ICMPv4 Echo Request messages' do
  code <<-EOH
    Get-NetFirewallPortFilter -Protocol ICMPv4 |
    Get-NetFirewallRule |
    Where-Object {
      ($_.Profile -eq "Public") -and
      ($_.Direction -eq "Inbound") -and
      ($_.Action -eq "Allow") } |
    Set-NetFirewallRule -Action Block -IcmpType 8 -Enabled True
  EOH
  guard_interpreter :powershell_script
  not_if <<-EOH
    (Get-NetFirewallPortFilter -Protocol ICMPv4 |
    Where-Object { $_.IcmpType -eq 8 } |
    Get-NetFirewallRule |
    Where-Object {
      ($_.Profile -eq "Public") -and
      ($_.Direction -eq "Inbound") -and
      ($_.Enabled -eq "True") -and
      ($_.Action -eq "Block") } |
    Measure-Object).Count -gt 0
  EOH
end
```

The `code` part of the resource defines the PowerShell command to run to place the firewall in the desired state. The command finds all firewall rules that allow public inbound ICMPv4 traffic and sets them to block Echo Request messages.

The `not_if` part ensures that the `powershell_script` resource is applied only when it needs to be. It uses the same code as the audit control to check whether any firewall rules that need to be changed exist.

The entire recipe looks like this.

```ruby
# ~/chef-repo/cookbooks/webserver/recipes/default.rb
# Block ICMPv4 Echo Request messages in the public profile.
powershell_script 'Block ICMPv4 Echo Request messages' do
  code <<-EOH
    Get-NetFirewallPortFilter -Protocol ICMPv4 |
    Get-NetFirewallRule |
    Where-Object {
      ($_.Profile -eq "Public") -and
      ($_.Direction -eq "Inbound") -and
      ($_.Action -eq "Allow") } |
    Set-NetFirewallRule -Action Block -IcmpType 8 -Enabled True
  EOH
  guard_interpreter :powershell_script
  not_if <<-EOH
    (Get-NetFirewallPortFilter -Protocol ICMPv4 |
    Where-Object { $_.IcmpType -eq 8 } |
    Get-NetFirewallRule |
    Where-Object {
      ($_.Profile -eq "Public") -and
      ($_.Direction -eq "Inbound") -and
      ($_.Enabled -eq "True") -and
      ($_.Action -eq "Block") } |
    Measure-Object).Count -gt 0
  EOH
end

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

#### Increment the webserver cookbook's version

Increment the `webserver` cookbook's version, similar to what you did for the `audit` cookbook.

Modify your `webserver` cookbook's <code class="file-path">metadata.rb</code> file like this.

```ruby
# ~/chef-repo/cookbooks/webserver/metadata.rb
name 'webserver'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
description 'Installs/Configures webserver'
long_description 'Installs/Configures webserver'
version '0.2.0'
```

### Verify the fix locally

Before we upload the revised `webserver` cookbook to the Chef server, let's follow the recommended practice of verifying that the changes succeed locally on a Test Kitchen instance.

From your workstation, run `kitchen converge` to apply your `webserver` cookbook.

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Creating <default-windows-2012r2>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'windows-2012r2'...
[...]
       Starting audit phase

       Validate web services
         Ensure no web files are owned by the Administrators group
           c:/inetpub/wwwroot/Default.htm must not be owned by Administrators
           c:/inetpub/wwwroot/pages/Page1.htm must not be owned by Administrators
           c:/inetpub/wwwroot/pages/Page2.htm must not be owned by Administrators

       Validate network configuration and firewalls
         Ensure the firewall blocks public ICMPv4 Echo Request messages
           has at least one rule that blocks access

       Finished in 1.81 seconds (files took 0.59373 seconds to load)
       4 examples, 0 failures
       Auditing complete

       Running handlers:
       Running handlers complete
       Chef Client finished, 0/7 resources updated in 35.656199 seconds
         4/4 controls succeeded
       Finished converging <default-windows-2012r2> (8m10.00s).
-----> Kitchen is finished. (9m50.22s)
```

You'll see from the output that all controls &ndash; the one that verifies that no web content is owned by the `Administrators` group and the one that verifies that the firewall is configured correctly &ndash; now pass. This gives us confidence that the change will work on our node.

From the Microsoft Management Console, you would see that the firewall rule now blocks inbound ICMPv4 traffic.

![Blocking inbound ICMPv4 traffic](chef-analytics/windows-firewall-block-ping.png)

Now that you've verified the fix locally, you can destroy your Test Kitchen instance.

```bash
# ~/chef-repo/cookbooks/webserver
-----> Starting Kitchen (v1.4.0)
-----> Destroying <default-windows-2012r2>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-windows-2012r2> destroyed.
       Finished destroying <default-windows-2012r2> (0m4.65s).
-----> Kitchen is finished. (0m6.86s)
```

[COMMENT] When developing a configuration change, whether it's with Chef or something else, it can be difficult to get it right the first time. For example, you might unintentionally configure the system to disable all inbound traffic completely. That's where Test Kitchen really helps &ndash; if you place the system in an unrepairable state, you simply destroy the instance and try something else. Only after you're confident that your change works as you expect do you move your configuration code to the next step in the pipeline.

### Upload the webserver cookbook to the Chef server

```bash
# ~/chef-repo/cookbooks/webserver
$ knife cookbook upload webserver
Uploading webserver      [0.2.0]
Uploaded 1 cookbook.
```

### Run chef-client on your node

From your workstation, run `chef-client` with audit mode enabled so that both the `webserver` and `audit` cookbooks are run.

Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo
$ knife winrm {address} 'chef-client --audit-mode enabled' --manual-list --winrm-user {user} --winrm-password '{password}'
```

As with your Test Kitchen instance, you'll see that the `webserver` cookbook updates your configuration and that all audit tests pass.

```bash
# ~/chef-repo
[...]
54.68.228.148 [2015-08-04T19:46:44+00:00] INFO: Starting audit phase
54.68.228.148 [2015-08-04T19:46:45+00:00] INFO:
54.68.228.148 [2015-08-04T19:46:45+00:00] INFO: Validate web services
54.68.228.148 [2015-08-04T19:46:45+00:00] INFO:   Ensure no web files are owned by the Administrators group
54.68.228.148 [2015-08-04T19:46:45+00:00] INFO:     c:/inetpub/wwwroot/Default.htm must not be owned by Administrators
54.68.228.148 [2015-08-04T19:46:46+00:00] INFO:     c:/inetpub/wwwroot/pages/Page1.htm must not be owned by Administrators
54.68.228.148 [2015-08-04T19:46:46+00:00] INFO:     c:/inetpub/wwwroot/pages/Page2.htm must not be owned by Administrators
54.68.228.148 [2015-08-04T19:46:46+00:00] INFO:
54.68.228.148 [2015-08-04T19:46:46+00:00] INFO: Validate network configuration and firewalls
54.68.228.148 [2015-08-04T19:46:46+00:00] INFO:   Ensure the firewall blocks public ICMPv4 Echo Request messages
54.68.228.148 [2015-08-04T19:46:47+00:00] INFO:     has at least one rule that blocks access
54.68.228.148 [2015-08-04T19:46:47+00:00] INFO: Successfully executed all `control_group` blocks and contained examples
54.68.228.148 [2015-08-04T19:46:47+00:00] INFO:
54.68.228.148 Finished in 2.06 seconds (files took 0.73435 seconds to load)
54.68.228.148 4 examples, 0 failures
54.68.228.148
54.68.228.148 [2015-08-04T19:46:47+00:00] INFO: Chef Run complete in 7.921703 seconds
54.68.228.148 [2015-08-04T19:46:47+00:00] INFO: Running report handlers
54.68.228.148 [2015-08-04T19:46:47+00:00] INFO: Report handlers complete
54.68.228.148 [2015-08-04T19:46:47+00:00] INFO: Sending resource update report (run-id: 2053b0f9-c82c-47bc-bf20-90de5beac11c)
```

### Verify that the audit passed from Chef Analytics

From the Chef Analytics web interface, verify that no new alerts appear on the **Alerts** tab.

![No new alert appears on the Alerts tab](chef-analytics/compliance-alert-success.png)

Now navigate to the **Nodes** tab. You'll see that the node's status is now green &ndash; which tells us that the previous `chef-client` run succeeded and passed the audit.

![The Nodes tab shows that the audit run succeeded](chef-analytics/compliance-node-success.png)

Congratulations! Your infrastructure now meets your compliance requirements. In addition, you can now consistently and easily test for compliance as often as you need to because the tests are automated.
