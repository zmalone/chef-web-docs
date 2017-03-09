## Summary

You saw how to work with the package and service resources. You now know how to work with three types of resources: [file](http://docs.chef.io/resource_file.html), [package](http://docs.chef.io/resource_package.html), and [service](http://docs.chef.io/resource_service.html).

You also saw how to apply multiple actions. But how does Chef know what order to apply resources and actions?

### Chef works in the order you specify

Let's take another quick look at our web server recipe.

```ruby
# ~/chef-repo/webserver.rb
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

The resources are applied in the order they are specified in the recipe. So here the package is installed, then the service is configured, and finally the home page is set. If any resource is already in the desired state, Chef simply moves on to the next one.

The same idea applies to the action list `[:enable, :start]` for configuring the service. The service is enabled when the server boots before the service is started.

It's important to always think about how you order things. For example, the recipe wouldn't work if we tried to configure the Apache service before the package is even installed.

A recipe stops if any step fails (don't worry &ndash; Chef provides info about the error). That's why we ordered the service actions the way we did. If the service can't be enabled on boot then we don't want to start it.
