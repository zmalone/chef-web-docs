## 7. Resolve the audit failure

Now let's resolve the audit failure. We'll start by writing code to configure `iptables` on the node. Then we'll verify the fix locally. Finally, we'll upload our updated `webserver` to the Chef server and run `chef-client` on our node and verify that the audit passes.

### Update the webserver cookbook

To ensure that the firewall is enabled, running, and activated, we'll use the [iptables](https://supermarket.chef.io/cookbooks/iptables) cookbook from Chef Supermarket, similar to what we did in the [Learn to manage a basic web application](/manage-a-web-app/rhel/configure-the-firewall/) tutorial. To summarize the steps:

1. Reference the `iptables` cookbook in your `webserver` cookbook's metadata.
1. Create a template that defines the firewall rules.
1. From the `webserver` cookbook, apply the `iptables` cookbook's default recipe and the firewall rules.

#### Reference the iptables cookbook

In your `webserver` cookbook's <code class="file-path">metadata.rb</code> file, add a `depends` line to add a reference to the `iptables` cookbook.

```ruby
# ~/chef-repo/cookbooks/webserver/metadata.rb
name 'webserver'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
description 'Installs/Configures webserver'
long_description 'Installs/Configures webserver'
version '0.1.0'

depends 'iptables', '~> 1.0.0'
```

#### Create a template that defines the firewall rules

Given our new compliance requirements, we want the following firewall configuration.

* The `iptables` service must be enabled.
* The `iptables` service must be running.
* The firewall must permit new and established SSH connections over port 22.
* The firewall must permit new and established HTTP connections over port 80.
* The firewall must reject all other connections.

The compliance rules don't state a preference for how established connections should be handled, so we'll also allow established connections through the firewall.

The `iptables` cookbook's default recipe ensures that the service is enabled and running. To use the `iptables` cookbook to apply the firewall rules, you first create a template that defines the firewall rules. Then you use the `iptables_rule` resource, which the `iptables` cookbook provides, to apply those rules.

Let's start by defining the rules. From your workstation, run the following command to create a template that will hold our firewall rules.

```bash
# ~/chef-repo
$ chef generate template cookbooks/webserver firewall
Compiling Cookbooks...
Recipe: code_generator::template
  * directory[cookbooks/webserver/templates/default] action create
    - create new directory cookbooks/webserver/templates/default
  * template[cookbooks/webserver/templates/default/firewall.erb] action create
    - create new file cookbooks/webserver/templates/default/firewall.erb
    - update content in file cookbooks/webserver/templates/default/firewall.erb from none to e3b0c4
    (diff output suppressed by config)
```

[COMMENT] In practice, you might create a separate template for each concern, for example, one template might define the default rule chain policy, and another might define the policy for SSH connections. Doing so allows you to apply a different set of configurations to each of your nodes. In this lesson, we'll add all of the rules to the same template.

Now add the corresponding `iptables` rules to <code class="file-path">firewall.erb</code>.

```ruby
# ~/chef-repo/cookbooks/webserver/templates/default/firewall.erb
# Delete all chains.
-F

# Allow established connections.
-A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Set the default chain policy.
-P INPUT DROP
-P OUTPUT ACCEPT
-P FORWARD DROP

# Allow inbound traffic on port 22 for SSH.
-A INPUT -i eth0 -p tcp --dport 22 -m state --state NEW -j ACCEPT

# Allow inbound traffic on port 80 for HTTP.
-A INPUT -i eth0 -p tcp --dport 80 -m state --state NEW -j ACCEPT
```

#### Run the iptables cookbook's default recipe and apply the firewall rules

In practice, you might add your firewall configuration code to a separate cookbook or recipe. But for this lesson, let's add the code to the `webserver` cookbook's default recipe.

Add the following code to the beginning of your `webserver` cookbook's default recipe.

```ruby
# ~/chef-repo/cookbooks/webserver/recipes/default.rb
include_recipe 'iptables::default'

# Apply firewall rules.
iptables_rule 'firewall'
```

The entire file looks like this.

```ruby
# ~/chef-repo/cookbooks/webserver/recipes/default.rb
include_recipe 'iptables::default'

# Apply firewall rules.
iptables_rule 'firewall'

# Install the httpd package.
package 'httpd'

# Enable and start the httpd service.
service 'httpd' do
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

depends 'iptables', '~> 1.0.0'
```

### Verify the fix locally

Before we upload the revised `webserver` cookbook to the Chef server, let's follow the recommended practice of verifying that the changes succeed locally on a Test Kitchen instance.

From your workstation, run `kitchen converge` to apply your `webserver` cookbook.

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Creating <default-centos-65>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'opscode-centos-6.5'...
[...]
       Starting audit phase

       Validate web services
         Ensure no web files are owned by the root user
           /var/www/html/pages is not owned by the root user
           /var/www/html/pages/page2.html is not owned by the root user
           /var/www/html/pages/page1.html is not owned by the root user
           /var/www/html/index.html is not owned by the root user

       Validate network configuration and firewalls
         Ensure the firewall is active
           enables the iptables service
           has iptables running
           accepts SSH connections
           accepts HTTP connections
           rejects all other connections
           permits all outbound traffic

       Finished in 0.21124 seconds (files took 0.23629 seconds to load)
       10 examples, 0 failures
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
52.27.18.148     /var/www/html/pages is not owned by the root user
52.27.18.148     /var/www/html/pages/page2.html is not owned by the root user
52.27.18.148     /var/www/html/pages/page1.html is not owned by the root user
52.27.18.148     /var/www/html/index.html is not owned by the root user
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
