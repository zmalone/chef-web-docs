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

depends 'apt', '~> 2.6.1'
depends 'httpd', '~> 0.2.14'
depends 'firewall', '~> 1.5.0'
```

These cookbooks need to exist on the Chef server so that the node can access them when it runs `chef-client`.

You could download each cookbook from Chef Supermarket and then upload it the Chef server, but there's one minor complication &ndash; each cookbook you depend on might depend on one or more other cookbooks. And those cookbooks in turn might depend on others.

For example, if you [look at the firewall cookbook](https://github.com/opscode-cookbooks/firewall/blob/master/metadata.rb), you'll see in its <code class="file-path">metadata.rb</code> file that it depends on the `poise` cookbook.

```ruby
# metadata.rb
# [...]
supports 'ubuntu'
supports 'redhat'
supports 'centos'

depends 'poise', '~> 2.0'
```

To help unravel this dependency web &ndash; and remove the need for you to manually resolve cookbook dependencies &ndash; we're going to use [Berkshelf](http://berkshelf.com). Berkshelf uploads your cookbooks to the Chef server and retrieves the cookbooks that your cookbook depends on.

Berkshelf comes with the Chef DK, so you don't have to install anything.

When you created your cookbook, the `chef generate cookbook` command created a file named <code class="file-path">Berksfile</code> in the cookbook's root directory.

For this project, you won't need to work directly with <code class="file-path">Berksfile</code>. But you'll notice that <code class="file-path">Berksfile</code> comes pre-configured to pull cookbooks from Chef Supermarket.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ more Berksfile
source "https://supermarket.chef.io"

metadata
```

The `metadata` line tells Berkshelf to pull additional dependencies from the <code class="file-path">metadata.rb</code> file.

### Use Berkshelf to install your dependencies

The next step is to have Berkshelf resolve your dependencies by downloading all dependent cookbooks from Chef Supermarket.

Run `berks install`.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks install
Resolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Installing apt (2.6.1)
Installing firewall (1.5.0)
Installing httpd (0.2.14)
Using awesome_customers (0.1.0) from source at .
```

Berkshelf installs dependent cookbooks to the <code class="file-path">~/.berkshelf/cookbooks</code> directory so that they can be shared among all of your cookbooks.

```bash
$ ls ~/.berkshelf/cookbooks/
apt-2.6.1       firewall-1.5.0 httpd-0.2.14
```

### Use Berkshelf to upload the cookbooks to the Chef server

Now we can upload your cookbooks to the Chef server.

Run `berks upload`.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks upload
Uploaded apt (2.6.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded awesome_customers (0.1.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded firewall (1.5.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded httpd (0.2.14) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

[COMMENT] Berkshelf requires a trusted SSL certificate in order to upload coookbooks. If you're using your own Chef server, and not hosted Chef, you'll need to configure Chef server [to use a trusted SSL certificate](https://osxdominion.wordpress.com/2015/02/25/configuring-chef-server-12-to-use-trusted-ssl-certs/). The [Chef documentation](http://docs.chef.io/server_security.html#ssl-protocols) describes how Chef server works with SSL certificates.<br/><br/>Alternatively, for testing purposes you can run `berks upload --no-ssl-verify` to disable SSL verification. We're working to make Berkshelf's default behavior easier to use and more secure.

### Verify that the upload process succeeded

To prove that the cookbooks uploaded successfully, run `knife cookbook list`.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ knife cookbook list
apt                 2.6.1
awesome_customers   0.1.0
firewall            1.5.0
httpd               0.2.14
```

Congratulations. Chef server now contains everything you need to run `chef-client` on your node.
