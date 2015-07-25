## 6. Update your web server configuration to meet compliance

In the previous step, we saw that three files and one directory failed the audit.

* <code class="file-path">/var/www/html/index.html</code>
* <code class="file-path">/var/www/html/pages</code>
* <code class="file-path">/var/www/html/pages/page1.html</code>
* <code class="file-path">/var/www/html/pages/page2.html</code>

In practice, you would work with your team and the audit team to determine the best course of action. Here, we'll resolve these failures by creating a user named `web_admin` and assign that user as the owner of the web files.

Modify your `webserver` cookbook's default recipe like this.

```ruby
# ~/chef-repo/cookbooks/webserver/recipes/default.rb
# Install the Apache2 package.
package 'httpd'

# Enable and start the Apache2 service.
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

This code creates the `web_admin` user and group and assigns the user as the owner of both the <code class="file-path">/var/www/html/pages</code> directory and the web files.

Now run `kitchen converge` to apply the changes and run your audit tests.

```bash
# ~/chef-repo/cookbooks/webserver
$ kitchen converge
-----> Starting Kitchen (v1.4.0)
-----> Converging <default-centos-65>...
       Preparing files for transfer
[...]
           - change owner from 'root' to 'web_admin'



           - change owner from 'root' to 'web_admin'



           - change owner from 'root' to 'web_admin'



           - change owner from 'root' to 'web_admin'

           - restore selinux security context
       Starting audit phase

       Validate web services
         Ensure no web files are owned by the root user
           is not owned by the root user
           is not owned by the root user
           is not owned by the root user
           is not owned by the root user

       Finished in 0.13817 seconds (files took 0.25295 seconds to load)
       4 examples, 0 failures
       Auditing complete

       Running handlers:
       Running handlers complete
       Chef Client finished, 6/9 resources updated in 2.952911996 seconds
         4/4 controls succeeded
       Finished converging <default-centos-65> (0m5.25s).
-----> Kitchen is finished. (0m5.95s)
```

[COMMENT] As your infrastructure code grows in complexity, you can temporarily set `audit_mode` in your <code class="file-path">.kitchen.yml</code> to `:disabled` to disable audit tests so that you can first verify that your configuration code works. Then you can enable audit mode to ensure that the working configuraiton also passes audit.

Congratulations. The ownership of your web content changed from `root` to `web_admin` and your audit tests now pass!
