```conf
# ~/learn-chef/cookbooks/motd-ubuntu/templates/default/server-info.erb

#!/bin/sh

printf "\nhostname:  <%= node['hostname'] %>"
printf "\nfqdn:      <%= node['fqdn'] %>"
printf "\nmemory:    <%= node['memory']['total'] %>"
printf "\ncpu count: <%= node['cpu']['total'] %>\n"
```
