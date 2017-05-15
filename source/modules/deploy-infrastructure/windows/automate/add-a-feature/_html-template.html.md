```html
<!-- ~/learn-chef/cookbooks/learn_chef_iis/templates/Default.htm.erb -->
<html>
  <body>
    <h1>hello from <%= node['fqdn'] %></h1>
    <p>This system is running <%= node['kernel']['name'] %> and has
      <%= node['cpu']['cores'] %> CPU cores and
      <%= node['memory']['total'] %> total memory.
  </body>
</html>
```
