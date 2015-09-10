## 5. Add a new control

Now let's add a new control that verifies the state of the firewall. Specifically, we want to verify that the firewall blocks ping requests from outside the domain. [Ping](https://en.wikipedia.org/wiki/Ping_(networking_utility\)) operates by sending Internet Control Message Protocol (ICMP) echo request packets to the target host and waiting for an ICMP echo reply.

A complete audit check might verify that ping requests are blocked for both ICMPv4 and ICMPv6 protocols. We'll focus on just  ICMPv4 for now.

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
          ($_.Group -eq "File and Printer Sharing") -and
          ($_.Action -eq "Block") } |
        Measure-Object).Count -gt 0
        EOH
      ).stdout).to match(/True/)
    end
  end
end
```

In the first control that you wrote, you used a string to define the PowerShell command to run. This command is more complex, so we use a [here document](https://en.wikibooks.org/wiki/Ruby_Programming/Here_documents), or _heredoc_, to make the command easier to read and maintain. Heredocs enable you to express multiple lines of text &ndash; in this case our PowerShell code &ndash; more naturally. The `<<-EOH` part declares the start of the heredoc, and the `EOH` part ends, or terminates, it.

The PowerShell code checks whether there is at least one enabled rule that blocks public ICMPv4 Echo Request messages. [This blog post](http://blogs.technet.com/b/heyscriptingguy/archive/2012/11/13/use-powershell-to-create-new-windows-firewall-rules.aspx) is a good introduction to how PowerShell works with the Windows firewall.

It's important that we verify that only Echo Request messages are blocked. Echo request messages are type 8 [for the ICMPv4 protocol](http://www.faqs.org/rfcs/rfc792.html).

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
