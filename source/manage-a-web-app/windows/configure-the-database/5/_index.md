## 5. Increment the cookbook's version

We've added new functionality to our `awesome_customers` cookbook since we last uploaded it to Chef server. The version on Chef server configures only IIS and ASP.NET &ndash; now it also configures SQL Server and manages a database instance.

Let's follow the recommended practice of updating our cookbook's version. Doing so pairs a specific set of functionality with a version number, and serves as a form of documentation as to what you can expect when you run a cookbook with a given version.

Most Chef cookbooks follow the [Semantic Versioning](http://semver.org) scheme. Your cookbook is compatible with the previous version &ndash; we simply added functionality &ndash; so we'll bump the middle number.

Your cookbook's version is stored in its metadata file. Modify the `version` field in <code class="file-path">metadata.rb</code> from '0.1.0' to '0.2.0', like this.

```bash
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
