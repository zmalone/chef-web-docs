```conf
# ~/learn-chef/cookbooks/motd-rhel/templates/default/server-info.erb

hostname:  <%= node['hostname'] %>
fqdn:      <%= node['fqdn'] %>
memory:    <%= node['memory']['total'] %>
cpu count: <%= node['cpu']['total'] %>
```
