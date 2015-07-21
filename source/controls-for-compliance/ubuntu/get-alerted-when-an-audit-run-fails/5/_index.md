## 5. Add a new audit rule

Now let's add a new audit rule that verifies that Ubuntu's default firewall, [UFW](https://help.ubuntu.com/community/UFW), or Uncomplicated Firewall, is enabled on every node.

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

Now run this `knife cookbook upload` command to upload the `audit` cookbook to your Chef server.

```bash
# ~/chef-client
$ knife cookbook upload audit
Uploading audit          [0.1.0]
Uploaded 1 cookbook.
```

### Add the Chef Analytics rule

Now we need to add the corresponding rule to Chef Analytics to monitor for this audit rule.

[COPY STEPS]

(Fix other so that Rules Name is group name and rules name is control name)

Name it "Validate network configuration and firewalls".

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
