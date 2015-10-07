## 4. Write just enough code to make the test pass

To make the test pass, we need:

* to install Apache. On Red Hat Enterprise Linux and CentOS, this is done through the `httpd` package.
* enable and start the `httpd` service.
* write a basic home page that contains the word "hello".

Write out the default recipe, <code class="file-path">default.rb</code>, like this.

```ruby
# ~/webserver/recipes/default.rb
package 'httpd'

service 'httpd' do
  action [:enable, :start]
end

file '/var/www/html/index.html' do
  content '<html>
  <body>
    <h1>hello world</h1>
  </body>
</html>'
end
```

[COMMENT] For learning purposes, we use the built-in `package`, `service`, and `file` resources to configure Apache. A more robust solution might use the [httpd](https://supermarket.chef.io/cookbooks/httpd) cookbook from Chef Supermarket.
