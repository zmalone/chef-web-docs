## 1. Create the settings cookbook

From the home directory on your workstation, run the following command to create a cookbook named `settings`.

```bash
# ~
$ chef generate cookbook settings
Compiling Cookbooks...
Recipe: code_generator::cookbook
  * directory[/home/user/settings] action create
    - create new directory /home/user/settings
[...]
  * cookbook_file[/home/user/settings/.gitignore] action create
    - create new file /home/user/settings/.gitignore
    - update content in file /home/user/settings/.gitignore from none to dd37b2
    (diff output suppressed by config)
```

We don't have you create the `settings` cookbook in a Chef repo because we won't use the functionality that a Chef repo provides.

### Create the settings template

We'll use a template to dynamically add information about the virtual machine to the settings file, <code class="file-path">C:\temp\server-info.txt</code>. Run the following command to generate a template in your `settings` cookbook named <code class="file-path">server-info.txt</code>.

```bash
# ~
$ chef generate template settings server-info.txt
Compiling Cookbooks...
Recipe: code_generator::template
  * directory[./settings/templates/default] action create
    - create new directory ./settings/templates/default
  * template[./settings/templates/default/server-info.txt.erb] action create
    - create new file ./settings/templates/default/server-info.txt.erb
    - update content in file ./settings/templates/default/server-info.txt.erb from none to e3b0c4
    (diff output suppressed by config)
```

Now add this to <code class="file-path">server-info.txt.erb</code>.

```conf
# ~/settings/templates/default/server-info.txt.erb

fqdn:      <%= node['fqdn'] %>
hostname:  <%= node['hostname'] %>
platform:  <%= node['platform'] %> - <%= node['platform_version'] %>
cpu count: <%= node['cpu']['total'] %>
```

This settings file lists the server's FQDN, hostname, operating system platform and version, and its total number of CPUs. When Chef runs, it uses node attributes to replace these placeholders with their values.

### Write the default recipe

The default recipe, <code class="file-path">default.rb</code>, fills in the template parameters and writes the resulting file to <code class="file-path">C:\temp\server-info.txt</code>.

Write out the default recipe like this.

```ruby
# ~/settings/recipes/default.rb
directory 'C:/temp'

template 'C:/temp/server-info.txt' do
  source 'server-info.txt.erb'
end
```
