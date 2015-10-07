## 3. Write code to configure Apache for multiple platforms

Let's revise the `webserver` cookbook to run on both CentOS and Ubuntu. To do so, we'll define variables that hold the name of the package and service to manage. We'll use the built-in `node['platform']` node attribute to set these variables to their appropriate values.

Modify your `webserver` cookbook's default recipe like this.

```ruby
# ~/webserver/recipes/default.rb
package_name = service_name = case node['platform']
when 'centos' then 'httpd'
when 'ubuntu' then 'apache2'
end

package package_name

service service_name do
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

This code uses a [case](http://ruby-doc.org/docs/keywords/1.9/Object.html#method-i-case) statement to match the platform name to the name of the package and the service. The `package_name` and `service_name` variables are later used in the `package` and `service` resources.

[COMMENT] For learning purposes, we're building a basic multi-platform cookbook from scratch. A more robust solution might use the [httpd](https://supermarket.chef.io/cookbooks/httpd) cookbook from Chef Supermarket, which already supports multiple platforms.
