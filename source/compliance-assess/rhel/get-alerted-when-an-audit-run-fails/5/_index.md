## 5. Add a new control

> In this part, you'll run commands from your workstation and then move to the Chef Analytics web interface.

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
  control 'Ensure no web files are owned by the root user' do
    Dir.glob('/var/www/html/**/*') {|web_file|
      it "#{web_file} is not owned by the root user" do
        expect(file(web_file)).to_not be_owned_by('root')
      end
    }
  end
end

control_group 'Validate network configuration and firewalls' do
  control 'Ensure the firewall is active' do
    it 'enables the iptables service' do
      expect(service('iptables')).to be_enabled
    end

    it 'has iptables running' do
      expect(service('iptables')).to be_running
    end

    it 'accepts SSH connections' do
      expect(iptables).to have_rule('-A INPUT -i eth0 -p tcp -m tcp --dport 22 -m state --state NEW -j ACCEPT')
    end

    it 'accepts HTTP connections' do
      expect(iptables).to have_rule('-A INPUT -i eth0 -p tcp -m tcp --dport 80 -m state --state NEW -j ACCEPT')
    end

    it 'rejects all other connections' do
      expect(iptables).to have_rule('-P INPUT DROP')
      expect(iptables).to have_rule('-P FORWARD DROP')
    end

    it 'permits all outbound traffic' do
      expect(iptables).to have_rule('-P OUTPUT ACCEPT')
    end
  end
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
rules 'Ensure the firewall is active'
  rule on run_control
  when
    (name = 'enables the iptables service' or name = 'has iptables running') and status != 'success'
  then
    alert:error('Run control group "{{ message.name }}" failed on {{ message.run.node_name }}.')
  end

  rule on run_control
  when
    name = 'accepts SSH connections' and status != 'success'
  then
    alert:error('iptables does not allow SSH connections on {{ message.run.node_name }}.')
  end

  rule on run_control
  when
    name = 'accepts HTTP connections' and status != 'success'
  then
    alert:error('iptables does not allow HTTP connections on {{ message.run.node_name }}.')
  end

  rule on run_control
  when
    name = 'rejects all other connections' and status != 'success'
  then
    alert:error('iptables does not reject all other connections on {{ message.run.node_name }}.')
  end

  rule on run_control
  when
    name = 'permits all outbound traffic' and status != 'success'
  then
    alert:error('iptables does not permit all outbound traffic on {{ message.run.node_name }}.')
  end
end
```

Click **Save**.
