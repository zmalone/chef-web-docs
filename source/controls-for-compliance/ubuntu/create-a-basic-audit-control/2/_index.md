## 2. Create the audit recipe

```bash
# ~/chef-repo
chef generate recipe cookbooks/basic_audit audit
Compiling Cookbooks...
Recipe: code_generator::recipe
  * directory[cookbooks/basic_audit/spec/unit/recipes] action create (up to date)
  * cookbook_file[cookbooks/basic_audit/spec/spec_helper.rb] action create_if_missing (up to date)
  * template[cookbooks/basic_audit/spec/unit/recipes/audit_spec.rb] action create_if_missing
    - create new file cookbooks/basic_audit/spec/unit/recipes/audit_spec.rb
    - update content in file cookbooks/basic_audit/spec/unit/recipes/audit_spec.rb from none to f252fc
    (diff output suppressed by config)
  * template[cookbooks/basic_audit/recipes/audit.rb] action create
    - create new file cookbooks/basic_audit/recipes/audit.rb
    - update content in file cookbooks/basic_audit/recipes/audit.rb from none to 46ad91
    (diff output suppressed by config)
```

```ruby
# ~/chef-repo/cookbooks/basic_audit/recipes/audit.rb
control_group 'Validate services' do
  control 'Ensure FTP access is not permitted' do
    it 'is not running the vsftpd service' do
      expect(service('vsftpd')).to_not be_running
      expect(service('vsftpd')).to_not be_enabled
    end

    it 'is not listening on port 21' do
      expect(port(21)).to_not be_listening
    end
  end
end
```
