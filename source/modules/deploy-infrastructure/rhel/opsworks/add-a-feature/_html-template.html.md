```html
<!-- ~/learn-chef/cookbooks/learn_chef_httpd/templates/index.html.erb -->
<html>
  <body>
    <h1>hello from <%= node['fqdn'] %></h1>
    <p>This system is running <%= node['hostnamectl']['operating_system'] %> and has
      <%= node['cpu']['cores'] %> CPU cores and
      <%= node['memory']['total'] %> total memory.
  </body>
</html>
```
