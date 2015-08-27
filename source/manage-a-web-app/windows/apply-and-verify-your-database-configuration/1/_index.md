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
version          '0.2.0'

depends 'sql_server', '~> 2.4.0'
```

In addition to your `awesome_customers` cookbook, the `sql_server` cookbook needs to exist on the Chef server so that the node can access it when it runs `chef-client`.

You could download each cookbook from Chef Supermarket and then upload it to the Chef server, but there's one minor complication &ndash; each cookbook you depend on might depend on one or more other cookbooks. And those cookbooks in turn might depend on others.

For example, if you look at the [sql_server](https://github.com/opscode-cookbooks/sql_server/blob/master/metadata.rb) cookbook, you'll see in its <code class="file-path">metadata.rb</code> file that it depends on the `openssl` and `windows` cookbooks.

```ruby
# metadata.rb
name             "sql_server"
maintainer       "Chef Software, Inc."
maintainer_email "cookbooks@chef.io"
license          "Apache 2.0"
description      "Installs/Configures Microsoft SQL Server 2008 R2"
long_description IO.read(File.join(File.dirname(__FILE__), 'README.md'))
version          "2.4.0"
supports         "windows"
depends          "openssl"
depends          "windows", ">= 1.2.6"
```

To help unravel this dependency web &ndash; and remove the need for you to manually resolve cookbook dependencies &ndash; we're going to use [Berkshelf](http://berkshelf.com) instead of running the `knife cookbook upload` command. Berkshelf uploads your cookbooks to the Chef server and retrieves the cookbooks that your cookbook depends on.

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
Using awesome_customers (0.2.0) from source at .
Installing chef_handler (1.2.0)
Installing sql_server (2.4.0)
Installing chef-sugar (3.1.1)
Installing openssl (4.3.2)
Installing windows (1.38.1)
```

Berkshelf installs dependent cookbooks to the <code class="file-path">~/.berkshelf/cookbooks</code> directory so that they can be shared among all of your cookbooks.

```bash
$ ls ~/.berkshelf/cookbooks/
chef-sugar-3.1.1   openssl-4.3.2      windows-1.38.1
chef_handler-1.2.0 sql_server-2.4.0
```

### Use Berkshelf to upload the cookbooks to the Chef server

Now we can upload your cookbooks to the Chef server.

Run `berks upload`.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks upload
Uploaded awesome_customers (0.2.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded chef-sugar (3.1.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded chef_handler (1.2.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded openssl (4.3.2) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded sql_server (2.4.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded windows (1.38.1) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

[COMMENT] Berkshelf requires a trusted SSL certificate in order to upload cookbooks. If you're using your own Chef server, and not hosted Chef, you'll need to configure Chef server [to use a trusted SSL certificate](https://osxdominion.wordpress.com/2015/02/25/configuring-chef-server-12-to-use-trusted-ssl-certs/). The [Chef documentation](http://docs.chef.io/server_security.html#ssl-protocols) describes how Chef server works with SSL certificates.<br/><br/>Alternatively, for testing purposes you can run `berks upload --no-ssl-verify` to disable SSL verification. We're working to make Berkshelf's default behavior easier to use and more secure.

### Verify that the upload process succeeded

To prove that the cookbooks uploaded successfully, run `knife cookbook list`.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ knife cookbook list
awesome_customers   0.2.0
chef-sugar          3.1.1
chef_handler        1.2.0
openssl             4.3.2
sql_server          2.4.0
windows             1.38.1
```

Congratulations. Chef server now contains everything you need to run `chef-client` on your node.
