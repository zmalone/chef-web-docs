## 6. Generate the knife configuration file on your workstation

Now you need to generate the configuration file, <code class="file-path">knife.rb</code>, that enables `knife` to authenticate commands with the Chef server.

From your workstation, create <code class="file-path">~/.chef-repo/.chef/knife.rb</code> like this, replacing `{admin-username}`, `{chef-server-fqdn}`, and `{short-org-name}` with your values. Do not modify `{current_dir}`.

```ruby
# ~/.chef-repo/.chef/knife.rb
current_dir = File.dirname(__FILE__)
log_level                :info
log_location             STDOUT
node_name                '{admin-username}'
client_key               "#{current_dir}/{admin-username}.pem"
chef_server_url          'https://{chef-server-fqdn}/organizations/{short-org-name}'
cache_type               'BasicFile'
cache_options( :path => "#{ENV['HOME']}/.chef/checksums" )
cookbook_path            ["#{current_dir}/../cookbooks"]"
```

Here's an example of what your completed <code class="file-path">knife.rb</code> file will look like.

```ruby
# ~/.chef-repo/.chef/knife.rb
current_dir = File.dirname(__FILE__)
log_level                :info
log_location             STDOUT
node_name                'admin'
client_key               "#{current_dir}/admin.pem"
chef_server_url          'https://ec2-52-25-201-190.us-west-2.compute.amazonaws.com/organizations/learnchef'
cache_type               'BasicFile'
cache_options( :path => "#{ENV['HOME']}/.chef/checksums" )
cookbook_path            ["#{current_dir}/../cookbooks"]
```
