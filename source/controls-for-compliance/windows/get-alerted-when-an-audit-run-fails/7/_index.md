## 7. Resolve the audit failure

Now let's resolve the audit failure. We'll start by writing code to configure the firewall on the node. Then we'll verify the fix locally. Finally, we'll upload our updated `webserver` to the Chef server and run `chef-client` on our node and verify that the audit passes.

### Update the webserver cookbook

To ensure that the firewall rules are is enabled and running, we'll use the same `powershell_script` resource that we used to configure IIS.

Recall that the control that XXX looks like this.

```ruby
# ~/chef-repo/cookbooks/audit/recipes/default.rb
control_group 'Validate network configuration and firewalls' do
  %w(ICMPv4 ICMPv6).each { |icmp_version|
    control "Ensure the firewall blocks public #{icmp_version} Echo Request messages" do
      it 'has at least one rule that blocks access' do
        expect(command("$(Get-NetFirewallRule | Where-Object {($_.DisplayName -eq \"File and Printer Sharing (Echo Request - #{icmp_version}-In)\") -and ($_.Group -eq \"File and Printer Sharing\") -and ($_.Profile -eq \"Public\") -and ($_.Enabled -eq \"True\") -and ($_.Action -eq \"Block\")}).Count -gt 0").stdout).to match(/True/)
      end
    end
  }
end
```

We can use the logic for the control as a guide for writing the infrastructure code that's required to configure the firewall.

#### Apply the firewall rules

In practice, you might add your firewall configuration code to a separate cookbook or recipe. But for this lesson, let's add the code to the `webserver` cookbook's default recipe.

Add the following code to the beginning of your `webserver` cookbook's default recipe.

```ruby
# ~/chef-repo/cookbooks/webserver/recipes/default.rb
# Block ICMPv4 and ICMPv6 Echo Request messages.
%w(ICMPv4 ICMPv6).each { |icmp_version|
  powershell_script "Block #{icmp_version} Echo Request messages" do
    code "New-NetFirewallRule -DisplayName \"File and Printer Sharing (Echo Request - #{icmp_version}-In)\" -Group \"File and Printer Sharing\" -Profile Public -Enabled True -Action Block"
    guard_interpreter :powershell_script
    not_if "$(Get-NetFirewallRule | Where-Object {($_.DisplayName -eq \"File and Printer Sharing (Echo Request - #{icmp_version}-In)\") -and ($_.Group -eq \"File and Printer Sharing\") -and ($_.Profile -eq \"Public\") -and ($_.Enabled -eq \"True\") -and ($_.Action -eq \"Block\")}).Count -gt 0"
  end
}
```

The entire file looks like this.

```ruby
# ~/chef-repo/cookbooks/webserver/recipes/default.rb
# Block ICMPv4 and ICMPv6 Echo Request messages.
%w(ICMPv4 ICMPv6).each { |icmp_version|
  powershell_script "Block #{icmp_version} Echo Request messages" do
    code "New-NetFirewallRule -DisplayName \"File and Printer Sharing (Echo Request - #{icmp_version}-In)\" -Group \"File and Printer Sharing\" -Profile Public -Enabled True -Action Block"
    guard_interpreter :powershell_script
    not_if "$(Get-NetFirewallRule | Where-Object {($_.DisplayName -eq \"File and Printer Sharing (Echo Request - #{icmp_version}-In)\") -and ($_.Group -eq \"File and Printer Sharing\") -and ($_.Profile -eq \"Public\") -and ($_.Enabled -eq \"True\") -and ($_.Action -eq \"Block\")}).Count -gt 0"
  end
}

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

Also increment the `webserver` cookbook's version, similar to what you did for the `audit` cookbook.

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
         Ensure the firewall blocks public ICMPv6 Echo Request messages
           has at least one rule that blocks access

       Finished in 4.83 seconds (files took 1.14 seconds to load)
       5 examples, 0 failures
       Auditing complete

       Running handlers:
       Running handlers complete
       Chef Client finished, 0/14 resources updated in 2.678261508 seconds
         10/10 controls succeeded
       Finished converging <default-centos-65> (8m10.00s).
-----> Kitchen is finished. (9m50.22s)
```

You'll see from the output that all controls &ndash; the one that verifies that no web content is owned by `root` and the one that verifies that the firewall is configured &ndash; now pass. This gives us confidence that the change will work on our node.

Now that you've verified the fix locally, you can destroy your Test Kitchen instance.

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen destroy
-----> Starting Kitchen (v1.4.0)
-----> Destroying <default-centos-65>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-centos-65> destroyed.
       Finished destroying <default-centos-65> (0m3.62s).
-----> Kitchen is finished. (0m4.41s)
```

[COMMENT] When developing a configuration change, whether it's with Chef or something else, it can be difficult to get it right the first time. For example, you might unintentionally configure the system to disable all inbound traffic, including over SSH, completely. That's where Test Kitchen really helps &ndash; if you place the system in an unrepairable state, you simply destroy the instance and try something else. Only after you're confident that your change works as you expect do you move your configuration code to the next step in the pipeline.

### Upload the webserver cookbook to the Chef server

Because the `webserver` cookbook has a dependency on the `iptables` cookbook from Chef Supermarket, let's use [Berkshelf](http://berkshelf.com) to automatically resolve and upload the dependent cookbooks, like you did in the [Learn to manage a basic web application](/manage-a-web-app/rhel/apply-and-verify-your-web-server-configuration/) tutorial.

First, run `berks install` to download all dependent cookbooks from Chef Supermarket to your workstation.

```bash
# ~/chef-repo/cookbooks/webserver
$ berks install
Resolving cookbook dependencies...
Fetching 'audit' from source at ../audit
Fetching 'webserver' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using audit (0.2.0) from source at ../audit
Installing iptables (1.0.0)
Using webserver (0.2.0) from source at .
```

Now run the following `berks upload` command to upload your cookbooks to the Chef server.

```bash
# ~/chef-repo/cookbooks/webserver
$ berks upload --no-ssl-verify
Uploaded audit (0.2.0) to: 'https://your-chef-server:443/organizations/your-org-name'
Uploaded iptables (1.0.0) to: 'https://your-chef-server:443/organizations/your-org-name'
Uploaded webserver (0.2.0) to: 'https://your-chef-server:443/organizations/your-org-name'
```

[COMMENT] The `--no-ssl-verify` flag bypasses SSL verification. You need this because on-premises Chef server by default uses a self-signed certificate. In production, you can configure Chef server [to use a trusted SSL certificate](https://osxdominion.wordpress.com/2015/02/25/configuring-chef-server-12-to-use-trusted-ssl-certs/). We're working to make Berkshelf's default behavior easier to use and more secure.

### Run chef-client on your node

From your workstation, run `chef-client` with audit mode enabled so that both the `webserver` and `audit` cookbooks are run.

Choose the option that matches how you connect to your Red Hat Enterprise Linux or CentOS node.

### Option 1: Use a user name and password

Replace `{address}` with your remote node's external address, `{user}` with your username, and `{password}` with your password.

```bash
# ~/chef-repo
$ knife ssh {address} 'sudo chef-client --audit-mode enabled' --manual-list --ssh-user {user} --ssh-password '{password}'
```

### Option 2: Use key-based authentication

Replace `{address}` with your remote node's external address, `{user}` with your username, and `{identity-file}` with your SSH identify file, for example <code class="file-path">~/.ssh/my.pem</code>.

```bash
# ~/chef-repo
$ knife ssh {address} 'sudo chef-client --audit-mode enabled' --manual-list --ssh-user {user} --identity-file {identity-file}
```

As with your Test Kitchen instance, you'll see that the `webserver` cookbook updates your configuration and that all audit tests pass.

```bash
# ~/chef-repo
[...]
52.27.18.148 Validate web services
52.27.18.148   Ensure no web files are owned by the root user
52.27.18.148     must not be owned by the root user
52.27.18.148     must not be owned by the root user
52.27.18.148     must not be owned by the root user
52.27.18.148     must not be owned by the root user
52.27.18.148
52.27.18.148 Validate network configuration and firewalls
52.27.18.148   Ensure the firewall is active
52.27.18.148     enables the iptables service
52.27.18.148     has iptables running
52.27.18.148     accepts SSH connections
52.27.18.148     accepts HTTP connections
52.27.18.148     rejects all other connections
52.27.18.148     permits all outbound traffic
52.27.18.148
52.27.18.148 Finished in 1.51 seconds (files took 0.57014 seconds to load)
52.27.18.148 10 examples, 0 failures
52.27.18.148 Auditing complete
52.27.18.148
52.27.18.148 Running handlers:
52.27.18.148 Running handlers complete
52.27.18.148 Chef Client finished, 5/15 resources updated in 11.06361729 seconds
52.27.18.148   10/10 controls succeeded
```

### Verify that the audit passed from Chef Analytics

From the Chef Analytics web interface, verify that no new alerts appear on the **Alerts** tab.

![No new alert appears on the Alerts tab](chef-analytics/compliance-alert-success.png)

Now navigate to the **Nodes** tab. You'll see that the node's status is now green &ndash; which tells us that the previous `chef-client` run succeeded and passed the audit.

![The Nodes tab shows that the audit run succeeded](chef-analytics/compliance-node-success.png)

Congratulations! Your infrastructure now meets your compliance requirements. In addition, you can now consistently and easily test for compliance as often as you need to because the tests are automated.
