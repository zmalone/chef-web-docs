## 7. Resolve the audit failure

Now let's resolve the audit failure. We'll start by writing code to configure UFW on the node. Then we'll verify the fix locally. Finally, we'll upload our updated `webserver` to the Chef server and run `chef-client` on our node and verify that the audit passes.

### Update the webserver cookbook

To ensure that the firewall is enabled, running, and activated, we'll use the [firewall](https://supermarket.chef.io/cookbooks/firewall) cookbook from Chef Supermarket, similar to what we did in the [Learn to manage a basic web application](/manage-a-web-app/ubuntu/configure-apache#5enableinboundtraffictoyourwebsite) tutorial. To summarize the steps:

1. Reference the `firewall` cookbook in your `webserver` cookbook's metadata.
1. Set the node attribute to allow inbound SSH access (port 22.)
1. Run the `firewall` cookbook's default recipe and enable inbound HTTP access (port 80.)

#### Reference the firewall cookbook

In your `webserver` cookbook's <code class="file-path">metadata.rb</code> file, add a `depends` line to add a reference to the `firewall` cookbook.

```ruby
# ~/chef-repo/cookbooks/webserver/metadata.rb
name 'webserver'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
description 'Installs/Configures webserver'
long_description 'Installs/Configures webserver'
version '0.1.0'

depends 'firewall', '~> 1.5.0'
```

#### Set the node attribute to allow inbound SSH access

It's important to enable inbound SSH access so that you can run `chef-client` from the `knife ssh` command on your workstation. The `firewall` cookbook provides a node attribute that does this automatically for you.

First, run this command to generate an attributes file for the `webserver` cookbook.

```bash
# ~/chef-repo
$ chef generate attribute cookbooks/webserver default
Compiling Cookbooks...
Recipe: code_generator::attribute
  * directory[cookbooks/webserver/attributes] action create
    - create new directory cookbooks/webserver/attributes
  * template[cookbooks/webserver/attributes/default.rb] action create
    - create new file cookbooks/webserver/attributes/default.rb
    - update content in file cookbooks/webserver/attributes/default.rb from none to e3b0c4
    (diff output suppressed by config)
```

Now add this to your `webserver` cookbook's default attributes file, <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/webserver/attributes/default.rb
default['firewall']['allow_ssh'] = true
```

#### Run the firewall cookbook's default recipe and enable inbound HTTP access

Now let's run the `firewall` cookbook's default recipe to enable and activate UFW, enable SSH access, and also configure the firewall to allow inbound HTTP access.

Add the following `include_recipe` line and a `firewall_rule` resource to the beginning of your `webserver` cookbook's default recipe, making the entire file look like this.

```ruby
# ~/chef-repo/cookbooks/webserver/recipes/default.rb
include_recipe 'firewall::default'
# Open port 80 to incoming traffic.
firewall_rule 'http' do
  port 80
  protocol :tcp
  action :allow
end

# Install the Apache2 package.
package 'apache2'

# Enable and start the Apache2 service.
service 'apache2' do
  action [:enable, :start]
end

# Create the web_admin user and group.
group 'web_admin'

user 'web_admin' do
  group 'web_admin'
  system true
  shell '/bin/bash'
end

# Create the pages directory under the document root directory.
directory '/var/www/html/pages' do
  group 'web_admin'
  user 'web_admin'
end

# Add files to the site.
%w(index.html pages/page1.html pages/page2.html).each do |web_file|
  file File.join('/var/www/html', web_file) do
    content "<html>This is #{web_file}.</html>"
    group 'web_admin'
    user 'web_admin'
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

depends 'firewall', '~> 1.5.0'
```

### Verify the fix locally

Before we upload the revised `webserver` cookbook to the Chef server, let's follow the recommended practice of verifying that the changes succeed locally on a Test Kitchen instance.

From your workstation, run `kitchen converge` to apply your `webserver` cookbook.

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Creating <default-ubuntu-1404>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'opscode-ubuntu-14.04'...
[...]
       Validate web services
         Ensure no web files are owned by the root user
           is not owned by the root user
           is not owned by the root user
           is not owned by the root user
           is not owned by the root user

       Validate network configuration and firewalls
         Ensure the firewall is active
           has the firewall active

       Finished in 0.25212 seconds (files took 0.38234 seconds to load)
       5 examples, 0 failures
       Auditing complete

       Running handlers:
       Running handlers complete
       Chef Client finished, 11/16 resources updated in 24.76562148 seconds
         5/5 controls succeeded
       Finished converging <default-ubuntu-1404> (8m10.00s).
-----> Kitchen is finished. (9m50.22s)
```

You'll see from the output that all controls &ndash; the one that ensures that no web content is owned by `root` and the one that ensures that UFW is configured and activated &ndash; now pass. This gives us confidence that the change will work on our node.

### Upload the webserver cookbook to the Chef server

Because the `webserver` cookbook has a dependency on the `firewall` cookbook from Chef Supermarket, let's use [Berkshelf](http://berkshelf.com) to automatically resolve and upload the dependent cookbooks, like you did in the [Learn to manage a basic web application](/manage-a-web-app/ubuntu/apply-and-verify-your-web-server-configuration/) tutorial.

First, run `berks install` to download all dependent cookbooks from Chef Supermarket to your workstation.

```bash
# ~/chef-repo/cookbooks/webserver
$ berks install
Resolving cookbook dependencies...
Fetching 'audit' from source at ../audit
Fetching 'webserver' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using audit (0.2.0) from source at ../audit
Using firewall (1.5.2)
Using poise (2.2.3)
Using webserver (0.2.0) from source at .
```

Now run the following `berks upload` command to upload your cookbooks to the Chef server.

```bash
# ~/chef-repo/cookbooks/webserver
$ berks upload --no-ssl-verify
Skipping audit (0.2.0) (frozen)
Uploaded firewall (1.5.2) to: 'https://your-chef-server:443/organizations/your-org-name'
Uploaded poise (2.2.3) to: 'https://your-chef-server:443/organizations/your-org-name'
Uploaded webserver (0.2.0) to: 'https://your-chef-server:443/organizations/your-org-name'
```

[COMMENT] The `--no-ssl-verify` flag bypasses SSL verification. You need this because on-premises Chef server by default uses a self-signed certificate. In production, you can configure Chef server [to use a trusted SSL certificate](https://osxdominion.wordpress.com/2015/02/25/configuring-chef-server-12-to-use-trusted-ssl-certs/). We're working to make Berkshelf's default behavior easier to use and more secure.

### Run chef-client on your node

From your workstation, run `chef-client` with audit mode enabled so that both the `webserver` and `audit` cookbooks are run.

Choose the option that matches how you connect to your Ubuntu node.

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
52.27.87.170 Validate web services
52.27.87.170   Ensure no web files are owned by the root user
52.27.87.170     is not owned by the root user
52.27.87.170     is not owned by the root user
52.27.87.170     is not owned by the root user
52.27.87.170     is not owned by the root user
52.27.87.170
52.27.87.170 Validate network configuration and firewalls
52.27.87.170   Ensure the firewall is active
52.27.87.170     has the firewall active
52.27.87.170
52.27.87.170 Finished in 0.21516 seconds (files took 0.25117 seconds to load)
52.27.87.170 5 examples, 0 failures
52.27.87.170 Auditing complete
52.27.87.170
52.27.87.170 Running handlers:
52.27.87.170 Running handlers complete
52.27.87.170 Chef Client finished, 4/16 resources updated in 3.945835128 seconds
52.27.87.170   5/5 controls succeeded
```

### Verify that the audit passed from Chef Analytics

From the Chef Analytics web interface, verify that no new alerts appear on the **Alerts** tab.

![No new alert appears on the Alerts tab](chef-analytics/compliance-alert-success.png)

Now navigate to the **Nodes** tab. You'll see that the node's status is now green &ndash; which tells us that the previous `chef-client` run succeeded and passed the audit.

![The Nodes tab shows that the audit run succeeded](chef-analytics/compliance-node-success.png)

Congratulations! Your infrastructure now meets your compliance requirements. In addition, you can now consistently and easily test for compliance as often as you need to because the tests are automated.
