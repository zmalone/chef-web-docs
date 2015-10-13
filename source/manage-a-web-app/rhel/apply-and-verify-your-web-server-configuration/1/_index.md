## 1. Upload your cookbook to the Chef server

Recall that <code class="file-path">metadata.rb</code> references the cookbooks your cookbook depends on.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/metadata.rb
name             'awesome_customers'
maintainer       'The Authors'
maintainer_email 'you@example.com'
license          'all_rights'
description      'Installs/Configures awesome_customers'
long_description 'Installs/Configures awesome_customers'
version          '0.1.0'

depends 'httpd', '~> 0.2.18'
depends 'selinux', '~> 0.9.0'
depends 'iptables', '~> 1.0.0'
```

These cookbooks need to exist on the Chef server so that the node can access them when it runs `chef-client`.

You could download each cookbook from Chef Supermarket and then upload it the Chef server, but there's one minor complication &ndash; each cookbook you depend on might depend on one or more other cookbooks. And those cookbooks in turn might depend on others.

For example, if you look at the [mysql](https://github.com/chef-cookbooks/mysql/blob/master/metadata.rb) cookbook, which you'll use later in this tutorial, you'll see in its <code class="file-path">metadata.rb</code> file that it depends on the `yum-mysql-community` and `smf` cookbooks.

```ruby
# metadata.rb
# [...]

depends 'yum-mysql-community'
depends 'smf'
```

To help unravel this dependency web &ndash; and remove the need for you to manually resolve cookbook dependencies &ndash; we're going to use [Berkshelf](http://berkshelf.com) instead of running the `knife cookbook upload` command. Berkshelf uploads your cookbooks to the Chef server and retrieves the cookbooks that your cookbook depends on.

Berkshelf comes with the Chef DK, so you don't have to install anything.

In Chef DK versions prior to 0.9.0, the `chef generate cookbook` command creates a file named <code class="file-path">Berksfile</code> in the cookbook's root directory.

If you're using Chef DK version 0.9.0 or later (you can run the `chef --version` command to verify your version), you'll need to create this file by hand. Create a file named <code class="file-path">Berksfile</code> in the <code class="file-path">~/chef-repo/cookbooks/awesome_customers</code> directory and add this.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/Berksfile
source "https://supermarket.chef.io"

metadata
```

The `source` lines configures Berkshelf to pull dependent cookbooks from Chef Supermarket. The `metadata` line tells Berkshelf to that your cookbook's dependencies are located in your cookbook's <code class="file-path">metadata.rb</code> file.

[COMMENT] In Chef DK 0.9.0 and later, the `chef generate cookbook` command creates what's called a [policy file](https://github.com/chef/chef-dk/blob/master/POLICYFILE_README.md) instead of a <code class="file-path">Berksfile</code>. Chef can use your policy file instead of the <code class="file-path">Berksfile</code> to resolve cookbook dependencies. Policy files are still an experimental feature, and we'll update this tutorial to use them when they're ready for use in production.

### Use Berkshelf to install your dependencies

The next step is to have Berkshelf resolve your dependencies by downloading all dependent cookbooks from Chef Supermarket.

Run `berks install`.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks install
esolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using awesome_customers (0.1.0) from source at .
Installing iptables (1.0.0)
Installing httpd (0.2.18)
Installing selinux (0.9.0)
```

Berkshelf installs dependent cookbooks to the <code class="file-path">~/.berkshelf/cookbooks</code> directory so that they can be shared among all of your cookbooks.

```bash
$ ls ~/.berkshelf/cookbooks/
httpd-0.2.18    iptables-1.0.0 selinux-0.9.0
```

### Use Berkshelf to upload the cookbooks to the Chef server

Now we can upload your cookbooks to the Chef server.

Run `berks upload`.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks upload
Uploaded awesome_customers (0.1.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded httpd (0.2.18) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded iptables (1.0.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded selinux (0.9.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

[COMMENT] Berkshelf requires a trusted SSL certificate in order to upload cookbooks. If you're using your own Chef server, and not hosted Chef, you'll need to configure Chef server [to use a trusted SSL certificate](https://osxdominion.wordpress.com/2015/02/25/configuring-chef-server-12-to-use-trusted-ssl-certs/). The [Chef documentation](http://docs.chef.io/server_security.html#ssl-protocols) describes how Chef server works with SSL certificates.<br/><br/>Alternatively, for testing purposes you can run `berks upload --no-ssl-verify` to disable SSL verification. We're working to make Berkshelf's default behavior easier to use and more secure.

### Verify that the upload process succeeded

To prove that the cookbooks uploaded successfully, run `knife cookbook list`.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ knife cookbook list
awesome_customers   0.1.0
httpd               0.2.18
iptables            1.0.0
selinux             0.9.0
```

Congratulations. Chef server now contains everything you need to run `chef-client` on your node.
