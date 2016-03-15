```conf
# ~/learn-chef/cookbooks/settings-windows/templates/default/server-info.txt.erb

fqdn:      <%= node['fqdn'] %>
hostname:  <%= node['hostname'] %>
platform:  <%= node['platform'] %> - <%= node['platform_version'] %>
cpu count: <%= node['cpu']['total'] %>
```