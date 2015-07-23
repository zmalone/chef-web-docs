## 5. Add a new control

Now let's add a new control that verifies that Ubuntu's default firewall, [UFW](https://help.ubuntu.com/community/UFW), or Uncomplicated Firewall, is enabled on every node.

### Add the control to the audit cookbook

From your workstation, add a second `control_group` to your `audit` cookbook's default recipe that verfies that UFW is enabled, making the entire recipe look like this.

```ruby
# ~/chef-repo/cookbooks/audit/recipes/default.rb
control_group 'Validate web services' do
  control 'Ensure no web files are owned by the root user' do
    Dir.glob('/var/www/html/**/*') {|web_file|
      it 'is not owned by the root user' do
        expect(file(web_file)).to_not be_owned_by('root')
      end
    }
  end
end

control_group 'Validate network configuration and firewalls' do
  control 'Ensure the firewall is active' do
    it 'has the firewall active' do
      expect(service('ufw')).to be_enabled
      expect(service('ufw')).to be_running
      expect(command('ufw status').stdout).to match(/Status: active/)
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
# ~/chef-client
$ knife cookbook upload audit
Uploading audit          [0.2.0]
Uploaded 1 cookbook.
```

### Add the Chef Analytics rule

Now we need to add a corresponding rule to Chef Analytics that will trigger when this control fails. The process is similar to how you added the first rule.

First navigate to the Chef Analytics interface from your web browser. From the **Rules** tab, click **+** to create a new rule. From the rule editor, click `New Rule Group 1` and rename it to `Validate network configuration and firewalls`.

Now add the following code to define your rule.

```ruby
rules 'Ensure the firewall is active'
  rule on run_control
  when
    name = 'has the firewall active' and status != 'success'
  then
    alert:error('Run control group "{{ message.name }}" failed on {{ message.run.node_name }}.')
  end
end
```

Click **Save**.
