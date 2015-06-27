## 5. Generate your knife configuration file

Now you need to generate the configuration file, <code class="file-path">knife.rb</code>, that enables `knife` to authenticate commands with the Chef server. For this step, you'll generate the configuration file on the Chef server and then copy it to your workstation in the next step.

From your Chef server, run this command to generate <code class="file-path">knife.rb</code>.

```bash
$ echo -e "\
current_dir = File.dirname(__FILE__) \n\
log_level                :info \n\
log_location             STDOUT \n\
node_name                '$CHEF_SERVER_ADMIN' \n\
client_key               \"#{current_dir}/$CHEF_SERVER_ADMIN.pem\" \n\
chef_server_url          'https://$CHEF_SERVER_FQDN/organizations/$CHEF_SERVER_SHORT_ORG_NAME' \n\
cache_type               'BasicFile' \n\
cache_options( :path => \"#{ENV['HOME']}/.chef/checksums\" ) \n\
cookbook_path            [\"#{current_dir}/../cookbooks\"]" > knife.rb
```

Now confirm that <code class="file-path">knife.rb</code> was written and includes the environment variables as we expect.

```bash
$ more knife.rb
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
