```conf
# ~/learn-chef/cookbooks/motd_rhel/templates/default/server-info.erb

hostname:  <%= node['hostname'] %>
fqdn:      <%= node['fqdn'] %>
memory:    <%= node['memory']['total'] %>
cpu count: <%= node['cpu']['total'] %>
```
