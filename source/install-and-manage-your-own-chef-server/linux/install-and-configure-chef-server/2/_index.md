## 2. Configure your Chef server

Now that you've installed the Chef server package, you need to configure your Chef server. Here you'll:

* create and customize the initial Chef server configuration.
* create the administrator account and an initial organization.
* prepare your workstation with the files you need to bootstrap and manage nodes.

The steps listed in this lesson can help you quickly configure your Chef server. [The Chef documentation](https://docs.chef.io/install_server.html#standalone) contains additional details and troubleshooting steps.

### (Optional) Write the Chef server configuration file

During the installation process, Chef server gathers all the networking and other details that it needs to configure itself. But there are cases where you'll need to provide additional configuration info.

One common example occurs in [network address translation (NAT)](https://en.wikipedia.org/wiki/Network_address_translation), where the firewall routes traffic between the internal network and the public Internet. In computing environments such as Amazon EC2, the public IP address or hostname is not available to the host, so we have to specify this information in the Chef server configuration file, <code class="file-path">/etc/opscode/chef-server.rb</code>.

If your system running Chef server does not have access to its public address that can be accessed by your workstation and your nodes, modify <code class="file-path">/etc/opscode/chef-server.rb</code> to include this information. Replace `{chef-server-fqdn}` with the FQDN of your server that's accessible from your nodes and your workstation.

```ruby
# /etc/opscode/chef-server.rb
server_name = '{chef-server-fqdn}'
api_fqdn = server_name
bookshelf['vip'] = server_name
nginx['url'] = "https://#{server_name}"
nginx['server_name'] = server_name
nginx['ssl_certificate'] = "/var/opt/opscode/nginx/ca/#{server_name}.crt"
nginx['ssl_certificate_key'] = "/var/opt/opscode/nginx/ca/#{server_name}.key"
lb['fqdn'] = server_name
```

[COMMENT] [The Chef documentation](https://docs.chef.io/config_rb_server.html) lists all of the recommended and optional settings that can go in your <code class="file-path">chef-server.rb</code> file.

### Create the initial configuration and start the server

Whether or not you modified your <code class="file-path">chef-server.rb</code>, you now need to run a command to create your Chef server's initial configuration and start the server.

From your Chef server, run the following.

```bash
$ sudo chef-server-ctl reconfigure
Starting Chef Client, version 12.4.0.rc.2
resolving cookbooks for run list: ["private-chef::default"]
Synchronizing Cookbooks:
  - enterprise
  - private-chef
  - apt
  - yum
  - runit
  - packagecloud
Compiling Cookbooks...
[...]
Running handlers:
Running handlers complete
Chef Client finished, 412/431 resources updated in 318.868487796 seconds
opscode Reconfigured!
```

### Create the administrator account and an organization

Now you need to create an administrator account and an organization, similar to what you did when you signed up for hosted Chef.

From your Chef server, run the following command to create the administrator account. Replace `{user-name}`, `{first-name}`, `{last-name}`, `{email}`, and `{password}` with your values.

```bash
$ sudo chef-server-ctl user-create {user-name} {first-name} {last-name} {email} {password} --filename {user-name}.pem
```

The Chef server uses role-based access control (RBAC) to restrict access to objects such as users, nodes, data bags, cookbooks, and so on. An _organization_ groups related objects to ensure authorized access to those objects.

Run this command to create your initial organization.

```bash
$ sudo chef-server-ctl org-create {short-org-name} {"full-org-name"} --association {user-name} --filename {short-org-name}-validator.pem
```

[TIP] If you don't have a preference, you can set `{user-name}` to `admin`, `{short-org-name}` to `learnchef`, and `{"full-org-name"}` to `"Learn Chef"`. You'll see those values in the example output.

Note the values you provide for `{user-name}` and `{short-org-name}`, as you'll need them again in the following steps.

These steps generate RSA private keys (<code class="file-path">.pem</code> files) for you. `{user-name}.pem` enables you to run `knife` commands against the Chef server as an authenticated user. `{short-org-name}-validator.pem` enables nodes to authenticate themselves when they communicate with the Chef server for the first time.

From your Chef server, verify that your private keys were written to the current directory.

```bash
$ ls *.pem
admin.pem  learnchef-validator.pem
```

[COMMENT] You always create the initial administrator account and organization directly from the Chef server on the command line. Later, you can add additional users [on the command line](https://docs.chef.io/server_orgs.html) or through the Chef management console.

### Copy the RSA keys to your workstation

Now you need to copy the RSA keys that you just created from your Chef server to your workstation.  

First, from your workstation, create a <code class="file-path">.chef</code> directory in your <code class="file-path">~/chef-repo</code> directory.

```bash
# ~/chef-repo
$ mkdir .chef
```

Now copy your keys from your Chef server to your workstation. On Mac OS and Linux, you can use the built-in `scp` command to securely copy the files. Here's an example that uses key-based authentication.

```bash
# ~/chef-repo
$ scp -i ~/.ssh/my.pem ubuntu@52.25.239.111:/home/ubuntu/admin.pem .chef/admin.pem
admin.pem                                     100% 1674     1.6KB/s   00:00
$ scp -i ~/.ssh/my.pem ubuntu@52.25.239.111:/home/ubuntu/learnchef-validator.pem .chef/learnchef-validator.pem
learnchef-validator.pem                       100% 1678     1.6KB/s   00:00
```

[WINDOWS] If you're on a Windows workstation, you need to install a program to securely copy files from Linux to Windows. [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/) and [WinSCP](http://winscp.net) are popular options.<br><br>The [PuTTY User Manual](http://the.earth.li/~sgtatham/putty/0.60/htmldoc/Chapter5.html) shows how to use PuTTY's PSCP utility to securely copy a file from Windows to Linux.<br>If you're using Amazon EC2 to host your node, the [AWS documentation](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html) can help get you started.

Now verify that the <code class="file-path">~/chef-repo/.chef</code> directory on your workstation contains your RSA keys.

```bash
# ~/chef-repo
$ ls .chef
admin.pem   learnchef-validator.pem
```

[TIP] Once you verify that a copy of your RSA keys exist on your workstation, you can safely delete them from your Chef server if you don't want other users to access them.

### Generate your knife configuration file

Now you need to generate the configuration file on your workstation that enables `knife` to authenticate commands with the Chef server. On your workstation, add the following to <code class="file-path">~/chef-repo/.chef/knife.rb</code>, replacing `{user-name}`, `{short-org-name}`, and `{chef-server-fqdn}` with your values (don't modify `{current_dir}`.) Ensure that `{chef-server-fqdn}` is the fully-qualified hostname that you can access from your workstation and from your nodes.

```ruby
# ~/chef-repo/.chef/knife.rb
current_dir = File.dirname(__FILE__)
log_level                :info
log_location             STDOUT
node_name                "{user-name}"
client_key               "#{current_dir}/{user-name}.pem"
validation_client_name   "{short-org-name}-validator"
validation_key           "#{current_dir}/{short-org-name}-validator.pem"
chef_server_url          "https://{chef-server-fqdn}/organizations/{short-org-name}"
cache_type               'BasicFile'
cache_options( :path => "#{ENV['HOME']}/.chef/checksums" )
cookbook_path            ["#{current_dir}/../cookbooks"]
```

[COMMENT] When you set up a hosted Chef account, we had you download the Starter Kit and extract it to your <code class="file-path">~/chef-repo/.chef</code> directory. When you created the <code class="file-path">~/chef-repo/.chef</code> directory and added to it your two RSA keys and your <code class="file-path">knife.rb</code> configuration file, you essentially recreated this process by hand!

### Test the connection to Chef server

From your workstation, run `knife client list` to verify that you can authenticate commands to the Chef server.

```bash
# ~/chef-repo
$ knife client list
learnchef-validator
```

<a class="help-button radius" href="#" data-reveal-id="chef-server-connect-help-modal">I got an error!</a>

<div id="chef-server-connect-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">If you get an error, verify that:</h3>
  <ul>
    <li>you can access https://{chef-server-fqdn}:443 from a web browser.</li>
    <li>you are running <code>knife</code> from the <code class="file-path">~/chef-repo</code> directory or a sub-directory.</li>
    <li>your <code class="file-path">~/chef-repo/.chef</code> directory contains two <code class="file-path">.pem</code> files and a <code class="file-path">knife.rb</code> file.</li>
    <li>your <code class="file-path">.pem</code> files are user-readable only.</li>
    <li>your Chef server meets the <a href="https://docs.chef.io/install_server_pre.html">prerequisites</a>.</li>
  </ul>
  <p>If you're unable to resolve the error, let us know in the forum at the bottom of this page or sign up for weekly <a href="https://www.chef.io/contact/office-hours-registration/">office hours</a>.
  </p>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

### Download the certificate

Nodes communicate with the Chef server through a web service that's hosted on your Chef server. Communication occurs over an SSL connection (port 443), and Chef server uses a [X.509 digital certificate](https://en.wikipedia.org/wiki/X.509) to verify its authenticity.

During the bootstrap process, `knife` copies the certificate from your workstation to the node. In order to do that, you must first retrieve a copy of the certificate on your workstation.

Run the `knife ssl fetch` command from your workstation to retrieve a copy of the certificate.

```bash
# ~/chef-repo
$ knife ssl fetch
WARNING: Certificates from ec2-52-25-239-111.us-west-2.compute.amazonaws.com will be fetched and placed in your trusted_cert
directory (/home/user/chef-repo/.chef/trusted_certs).

Knife has no means to verify these are the correct certificates. You should
verify the authenticity of these certificates after downloading.

Adding certificate for ec2-52-25-239-111.us-west-2.compute.amazonaws.com in /home/user/chef-repo/.chef/trusted_certs/ec2-52-25-239-111_us-west-2_compute_amazonaws_com.crt
```

Now run `knife ssl check` to verify that the certificate was properly retrieved and can be used to authenticate calls to the Chef server.

```bash
# ~/chef-repo
$ knife ssl check
Connecting to host ec2-52-27-41-27.us-west-2.compute.amazonaws.com:443
Successfully verified certificates from `ec2-52-27-41-27.us-west-2.compute.amazonaws.com'
```

[COMMENT] By default, Chef Server uses a self-signed certificate, which is fine for getting started or for creating test servers. In production, we recommend that you use a [certificate signed by a root Certificate Authority (CA)](https://osxdominion.wordpress.com/2015/02/25/configuring-chef-server-12-to-use-trusted-ssl-certs/).
