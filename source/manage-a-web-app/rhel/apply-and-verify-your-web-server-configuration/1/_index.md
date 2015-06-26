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

depends 'httpd', '~> 0.2.14'
depends 'selinux', '~> 0.9.0'
depends 'iptables', '~> 1.0.0'
```

These cookbooks need to exist on the Chef server so that the node can access them when it runs `chef-client`.

You could download each cookbook from Chef Supermarket and then upload it the Chef server, but there's one minor complication &ndash; each cookbook you depend on might depend on one or more other cookbooks. And those cookbooks in turn might depend on others.

For example, if you [look at the mysql cookbook](https://github.com/chef-cookbooks/mysql/blob/master/metadata.rb), which you'll use later in this tutorial, you'll see in its <code class="file-path">metadata.rb</code> file that it depends on the `yum-mysql-community` and `smf` cookbooks.

```ruby
# metadata.rb
# [...]

depends 'yum-mysql-community'
depends 'smf'
```

To help unravel this dependency web &ndash; and remove the need for you to manually resolve cookbook dependencies &ndash; we're going to use [Berkshelf](http://berkshelf.com). Berkshelf uploads your cookbooks to the Chef server and retrieves the cookbooks that your cookbook depends on.

Berkshelf comes with the ChefDK, so you don't have to install anything.

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
esolving cookbook dependencies...
Fetching 'awesome_customers' from source at .
Fetching cookbook index from https://supermarket.chef.io...
Using awesome_customers (0.1.0) from source at .
Installing iptables (1.0.0)
Installing httpd (0.2.14)
Installing selinux (0.9.0)
```

Berkshelf installs dependent cookbooks to the <code class="file-path">~/.berkshelf/cookbooks</code> directory so that they can be shared among all of your cookbooks.

```bash
$ ls ~/.berkshelf/cookbooks/
httpd-0.2.14    iptables-1.0.0 selinux-0.9.0
```

### Use Berkshelf to upload the cookbooks to the Chef server

Now we can upload your cookbooks to the Chef server.

Run `berks upload`.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ berks upload
Uploaded awesome_customers (0.1.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded httpd (0.2.14) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded iptables (1.0.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
Uploaded selinux (0.9.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

### Verify that the upload process succeeded

To prove that the cookbooks uploaded successfully, run `knife cookbook list`.

```bash
# ~/chef-repo/cookbooks/awesome_customers
$ knife cookbook list
awesome_customers   0.1.0
httpd               0.2.14
iptables            1.0.0
selinux             0.9.0
```

Congratulations. Chef server now contains everything you need to run `chef-client` on your node.
