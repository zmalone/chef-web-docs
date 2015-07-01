## 1. Create the motd cookbook

From the home directory on your workstation, run the following command to create a cookbook named `motd`.

```bash
# ~
$ chef generate cookbook motd
Compiling Cookbooks...
Recipe: code_generator::cookbook
  * directory[/home/user/motd] action create
    - create new directory /home/user/motd
[...]
  * cookbook_file[/home/user/motd/.gitignore] action create
    - create new file /home/user/motd/.gitignore
    - update content in file /home/user/motd/.gitignore from none to dd37b2
    (diff output suppressed by config)
```

We don't have you create the `motd` cookbook in a Chef repo because we won't use the functionality that it provides.

[COMMENT] For learning purposes, we'll build a basic MOTD cookbook ourselves. The [motd](https://supermarket.chef.io/cookbooks/motd)  and cookbook on Chef Supermarket provides a more robust solution.

### Create the MOTD template

We'll use a template to dynamically add information about the virtual machine to the MOTD file, <code class="file-path">/etc/motd</code>. Run the following command to generate a template in your `motd` cookbook named <code class="file-path">chef</code>.

```bash
# ~
$ chef generate template motd server-info
Compiling Cookbooks...
Recipe: code_generator::template
  * directory[./motd/templates/default] action create
    - create new directory ./motd/templates/default
  * template[./motd/templates/default/server-info.erb] action create
    - create new file ./motd/templates/default/server-info.erb
    - update content in file ./motd/templates/default/server-info.erb from none to e3b0c4
    (diff output suppressed by config)
```

Now add this to <code class="file-path">server-info.erb</code>.

```conf
# ~/motd/templates/default/server-info.erb
#!/bin/sh

printf "\nhostname:  <%= node['hostname'] %>"
printf "\nfqdn:      <%= node['fqdn'] %>"
printf "\nmemory:    <%= node['memory']['total'] %>"
printf "\ncpu count: <%= node['cpu']['total'] %>\n"
```

### Write the default recipe

The default recipe, <code class="file-path">default.rb</code>, fills in the template parameters and writes the resulting file to <code class="file-path">/etc/update-motd.d/98-server-info</code>.

Write out the default recipe like this.

```ruby
# ~/motd/recipes/default.rb
template '/etc/update-motd.d/98-server-info' do
  source 'server-info.erb'
  mode '0755'
end
```
