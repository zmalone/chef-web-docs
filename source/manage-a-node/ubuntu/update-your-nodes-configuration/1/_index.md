## 1. Add template code to your HTML

On the local workstation copy of your `learn_chef_apache2` cookbook, change <code class="file-path">index.html.erb</code> to look like this.

```html
<!-- ~/chef-repo/cookbooks/learn_chef_apache2/templates/default/index.html.erb -->
<html>
  <body>
    <h1>hello from <%%= node['fqdn'] %></h1>
  </body>
</html>
```
