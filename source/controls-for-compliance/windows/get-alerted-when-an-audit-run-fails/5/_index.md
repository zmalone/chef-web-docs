## 5. Add a new control

Now let's add a new control that verifies the state of the firewall. Specifically, we want to verify that:

* the `iptables` service is enabled.
* the `iptables` service is running.
* the firewall permits incoming SSH connections over port 22.
* the firewall permits incoming HTTP connections over port 80.
* the firewall rejects all other connections.

### Add the control to the audit cookbook

From your workstation, add a second `control_group` to your `audit` cookbook's default recipe that verifies the state of the firewall, making the entire recipe look like this.

```ruby
# ~/chef-repo/cookbooks/audit/recipes/default.rb
control_group 'Validate web services' do
  control 'Ensure no web files are owned by the Administrators group' do
    Dir.glob('c:/inetpub/wwwroot/**/*.htm') {|web_file|
      it "#{web_file} must not be owned by Administrators" do
        expect(command("(Get-ChildItem #{web_file} | Get-Acl).Owner").stdout).to_not match(/Administrators$/)
      end
    }
  end
end

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

It's a recommended practice to update your cookbook's version to ensure that a given set of functionality is tied to a given version.

Update the `version` field of your `audit` cookbook's <code class="file-path">metadata.rb</code> file to `0.2.0`, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/audit/metadata.rb
name 'audit'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
description 'Installs/Configures audit'
long_description 'Installs/Configures audit'
version '0.2.0'
```

Now run this `knife cookbook upload` command to upload the revised `audit` cookbook to your Chef server.

```bash
# ~/chef-repo
$ knife cookbook upload audit
Uploading audit          [0.2.0]
Uploaded 1 cookbook.
```

### Add the Chef Analytics rules

Now we need to add a corresponding rule to Chef Analytics that will trigger when this control fails. The process is similar to how you added the first rule.

First navigate to the Chef Analytics interface from your web browser. From the **Rules** tab, click **+** to create a new rule. From the rule editor, click `New Rule Group 1` and rename it to `Validate network configuration and firewalls`.

Now add the following code to define your rule.

```ruby
rules 'Ensure the firewall blocks public Echo Request messages'
  rule on run_control
  when
    name = 'has at least one rule that blocks access' and status != 'success'
  then
    alert:error('Run control group "{{ message.name }}" failed on {{ message.run.node_name }}.')
  end
end
```

Click **Save**.
