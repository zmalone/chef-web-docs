```conf
# ~/learn-chef/settings/templates/default/server-info.txt.erb

fqdn:      <%= node['fqdn'] %>
hostname:  <%= node['hostname'] %>
platform:  <%= node['platform'] %> - <%= node['platform_version'] %>
cpu count: <%= node['cpu']['total'] %>
```