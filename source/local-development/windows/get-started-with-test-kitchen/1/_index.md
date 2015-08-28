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

hostname:  <%= node['hostname'] %>
fqdn:      <%= node['fqdn'] %>
memory:    <%= node['memory']['total'] %>
cpu count: <%= node['cpu']['total'] %>
```

### Write the default recipe

The default recipe, <code class="file-path">default.rb</code>, fills in the template parameters and writes the resulting file to <code class="file-path">/etc/motd</code>.

Write out the default recipe like this.

```ruby
# ~/motd/recipes/default.rb
template '/etc/motd' do
  source 'server-info.erb'
  mode '0644'
end
```

[START_TABS panel EC2, Vagrant]

[START_TAB panel1 active]

```bash
$ IVE GOT CODE!!!
```

```ruby
Meh too!
```

[END_TAB]

[START_TAB panel2]

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed interdum purus, vel aliquet est. Nunc sapien dui, facilisis dictum ultrices quis, eleifend at est. Sed eu tincidunt felis. Aliquam erat volutpat. Mauris mattis varius leo condimentum pharetra. Phasellus consectetur dolor ac magna porttitor lacinia. Praesent bibendum eros tellus, vitae tincidunt lorem mattis in. Nam eu congue tellus. Sed interdum est quis magna efficitur maximus. Praesent vehicula ligula elit, sit amet hendrerit tellus sodales placerat. Morbi molestie, elit iaculis interdum dictum, urna nulla ultricies sapien, a volutpat enim sem ut odio. Vivamus quis eleifend purus, eu ullamcorper est.

Proin molestie est turpis, ut finibus nisi aliquam commodo. Aenean ut pulvinar velit, sit amet facilisis elit. Fusce et cursus leo, non euismod arcu. Etiam sollicitudin nulla sit amet tortor tempus gravida. Quisque efficitur, nisl at fringilla elementum, dolor mauris finibus sapien, sit amet bibendum ipsum purus lacinia augue. In hac habitasse platea dictumst. Aenean turpis tellus, malesuada id posuere non, suscipit vel tortor. Quisque fringilla quis lorem ac porttitor. Ut non faucibus turpis. In posuere lacus elit, non accumsan orci porttitor non. Fusce ex eros, pharetra non dolor vitae, porta aliquam nunc. Donec et leo turpis. Sed odio metus, efficitur ut lectus malesuada, blandit eleifend lorem.

```bash
$ MORE HERE
```

```ruby
MOAR HERE MOAR HERE MOAR HERE MOAR HERE MOAR HERE MOAR HERE MOAR HERE MOAR HERE MOAR HERE MOAR HERE MOAR HERE MOAR HERE MOAR HERE
```

[END_TAB]

[END_TABS]
