## 1. Add template code to your HTML

On the local workstation copy of your `learn_chef_iis` cookbook, change <code class="file-path">index.html.erb</code> to look like this.

```html
<!-- ~\learn-chef\cookbooks\learn_chef_iis\templates\default\index.html.erb -->
<html>
  <body>
    <h1>hello from <%= node['fqdn'] %></h1>
  </body>
</html>
```
