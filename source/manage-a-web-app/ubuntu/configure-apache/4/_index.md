## 4. Create the configuration file

In your recipe you used the `httpd_config` resource to reference your Apache site's configuration file. Now we need to create this file. We'll do that by creating a Chef template so we can provide placeholders that are filled in with custom node attributes when the recipe runs.

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

```ruby
# ~/chef-repo/cookbooks/awesome_customers/templates/default/customers.conf.erb
<VirtualHost *:80>
  ServerName <%= node['hostname'] %>
  ServerAdmin 'ops@example.com'

  DocumentRoot <%= node['awesome_customers']['document_root'] %>
  <Directory />
          Options FollowSymLinks
          AllowOverride None
  </Directory>
  <Directory <%= node['awesome_customers']['document_root'] %> >
          Options Indexes FollowSymLinks MultiViews
          AllowOverride None
          Order allow,deny
          allow from all
  </Directory>

  ErrorLog /var/log/apache2/error.log

  LogLevel warn

  CustomLog /var/log/apache2/access.log combined
  ServerSignature Off

  AddType application/x-httpd-php .php
  AddType application/x-httpd-php-source .phps
  DirectoryIndex index.php index.html
</VirtualHost>
```

The configuration file uses two node attributes &ndash; `node['hostname']` and `node['awesome_customers']['document_root']`.

`node['hostname']` is a built-in node attribute that defines the node's host name. This node attribute gets set during the initial bootstrap process. `node['awesome_customers']['document_root']` defines the site's document root, and is the node attribute that you used in the previous step to set up the home page.
