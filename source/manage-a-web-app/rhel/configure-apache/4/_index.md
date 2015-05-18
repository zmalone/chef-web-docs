## 4. Create the configuration file

In your recipe you referenced your Apache site's configuration file. Now we need to create this file. We'll do that by creating a Chef template so we can provide placeholders that are filled in with custom node attributes when the recipe runs.

First, run this command to create your template file, <code class="file-path">customers.conf.erb</code>.

```bash
# ~/chef-repo
$ chef generate template cookbooks/awesome_customers customers.conf
Compiling Cookbooks...
Recipe: code_generator::template
  * directory[cookbooks/awesome_customers/templates/default] action create
    - create new directory cookbooks/awesome_customers/templates/default
  * template[cookbooks/awesome_customers/templates/default/customers.conf.erb] action create
    - create new file cookbooks/awesome_customers/templates/default/customers.conf.erb
    - update content in file cookbooks/awesome_customers/templates/default/customers.conf.erb from none to e3b0c4
    (diff output suppressed by config)
```

This command added the template file <code class="file-path">customers.conf.erb</code> to the <code class="file-path">~/chef-repo/cookbooks/awesome_customers/templates/default</code> directory. Remember, the <code class="file-path">.erb</code> extension means that the file can hold placeholders that are filled in when the recipe runs. That's what makes the file a template.

Add this to <code class="file-path">customers.conf.erb</code>.

```conf
# ~/chef-repo/cookbooks/awesome_customers/templates/default/customers.conf.erb

# Managed by Chef for <%= node['hostname'] %>
<VirtualHost *:80>
  ServerAdmin <%= node['apache']['contact'] %>

  DocumentRoot <%= node['apache']['docroot_dir'] %>
  <Directory />
          Options FollowSymLinks
          AllowOverride None
  </Directory>
  <Directory <%= node['apache']['docroot_dir'] %>>
          Options Indexes FollowSymLinks MultiViews
          AllowOverride None
          Order allow,deny
          allow from all
  </Directory>

  ErrorLog <%= node['apache']['log_dir'] %>/error.log

  LogLevel warn

  CustomLog <%= node['apache']['log_dir'] %>/access.log combined
  ServerSignature Off
</VirtualHost>
```

The configuration file uses these node attributes:

| Attribute                                                            | Source    | Description | Value |
|---------------------------------------------------------------------:|-----------|-------------|---------------|
| <code style="white-space:nowrap">node['hostname']</code>             | built-in  | the node's host name. | N/A |
| <code style="white-space:nowrap">node['apache']['contact']</code>    | `apache2` | value for the `ServerAdmin` directive. | ops@example.com |
| <code style="white-space:nowrap">node['apache']['docroot\_dir']</code> | `apache2` | the site's document root | <code class="file-path">/srv/apache/customers</code> |
| <code style="white-space:nowrap">node['apache']['log_dir']</code>    | `apache2` | location for Apache logs | <code class="file-path">/var/log/httpd</code> |

The configuration file uses the built-in or default values for each of these except for `node['apache']['docroot_dir']`. We override the default value of <code class="file-path">/var/www/html</code> with <code class="file-path">/srv/apache/customers</code> in your attributes file.
