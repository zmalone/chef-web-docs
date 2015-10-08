## 2. Use Foodcritic to identify better usage patterns

[Foodcritic](https://acrmp.github.io/foodcritic/) is another popular linting tool that comes with the Chef DK.

RuboCop can be run on any Ruby program, and isn't specific to Chef. Foodcritic identifies usage patterns that are specific to Chef code. Many Chef users run both tools as part of their lint testing.

In this part you'll see how Foodcritic can identify usage patterns that improve the quality of your code. You'll also extend Foodcritic by writing a custom rule.

### Identify use of unnecessary string interpolation

In previous tutorials, you used _string interpolation_ to replace placeholders within a string with the values they represent. Here's an example from the `awesome_customers` cookbook's `webserver` recipe.

```ruby
# webserver.rb
# Write the home page.
file "#{node['awesome_customers']['document_root']}/index.php" do
  content '<html>This is a placeholder</html>'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
end
```

In this example, the `file` resource uses string interpolation to combine the document root, stored as a node attribute, with the name of the index file to create a full path to the home page.

It's common to accidentally use string interpolation when it's not necessary. To show this, let's start by looking at the default recipe for the `webserver` cookbook you wrote to run on CentOS and Ubuntu. Recall that it looks like this.

```ruby
# ~/webserver/recipes/default.rb
#
# Cookbook Name:: webserver
# Recipe:: default
#
# Copyright (c) 2015 The Authors, All Rights Reserved.
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

To demonstrate the use of unnecessary string interpolation, modify your default recipe to look like this.

```ruby
# ~/webserver/recipes/default.rb
#
# Cookbook Name:: webserver
# Recipe:: default
#
# Copyright (c) 2015 The Authors, All Rights Reserved.
package_name = service_name = case node['platform']
when 'centos' then 'httpd'
when 'ubuntu' then 'apache2'
end

package "#{package_name}"

service "#{service_name}" do
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

Although this program is valid and behaves as you would expect, it's intention might not be clear to others. It can appear that the code intends to use string interpolation but the string is missing additional information.

From your <code class="file-path">~/webserver/recipes</code> directory, run `foodcritic default.rb` to run the Foodcritic rules against the default recipe.

```bash
# ~/webserver/recipes
$ foodcritic default.rb
FC002: Avoid string interpolation where not required: default.rb:11
FC002: Avoid string interpolation where not required: default.rb:13
```

[COMMENT] To test all recipes, you can run Foodcritic from a directory above your cookbook and specify the cookbook name. For example, you can run `foodcritic webserver` from your <code class="file-path">~</code> directory.

Foodcritic reports [FC002](http://acrmp.github.io/foodcritic/#FC002): "Avoid string interpolation where not required".

Now remove the string interpolation to fix the violation. Your recipe should look like the one you created in the previous lesson.

```ruby
# ~/webserver/recipes/default.rb
#
# Cookbook Name:: webserver
# Recipe:: default
#
# Copyright (c) 2015 The Authors, All Rights Reserved.
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

Run `foodcritic default.rb` a second time to verify that the violation is fixed.

```bash
# ~/webserver/recipes
$ foodcritic default.rb

```

When `foodcritic` does not produce any output, it indicates that Foodcritic found no violations.

### Use Foodcritic to identify where to better manage services

Say you didn't know about the [service](https://docs.chef.io/resource_service.html) resource, and that you instead use the [execute](https://docs.chef.io/resource_execute.html) resource to manage the Apache service in your `webserver` cookbook.

Modify your default recipe like this.

```ruby
# ~/webserver/recipes/default.rb
#
# Cookbook Name:: webserver
# Recipe:: default
#
# Copyright (c) 2015 The Authors, All Rights Reserved.
case node['platform']
when 'centos' then
  package 'httpd'
  execute 'enable the httpd service' do
    command 'chkconfig httpd on --level 3'
    not_if 'chkconfig --list httpd | grep 3:on'
  end
  execute 'start the httpd service' do
    command 'service httpd start'
    not_if "service --status-all | grep -e 'httpd (pid\s*[0-9]*) is running'"
  end
when 'ubuntu' then
  package 'apache2'
  execute 'enable the apache2 service' do
    command 'update-rc.d apache2 defaults'
    not_if 'ls /etc/rc?.d/*apache2'
  end
  execute 'start the apache2 service' do
    command 'service apache2 start'
    not_if "service apache2 status | grep 'apache2 is running'"
  end
end

file '/var/www/html/index.html' do
  content '<html>
  <body>
    <h1>hello world</h1>
  </body>
</html>'
end
```

Although this recipe might work as you expect, it's unnecessarily complex. The `execute` resource requires additional code to ensure that the service is enabled and started only when needed. This code would require additional testing to ensure that it accounts for differences among each version of CentOS and Ubuntu that you support.

Run `foodcritic default.rb` to apply Foodcritic's rules to your recipe.

```bash
# ~/webserver/recipes
$ foodcritic default.rb
FC004: Use a service resource to start and stop services: default.rb:13
FC004: Use a service resource to start and stop services: default.rb:23
```

Foodcritic reports [FC004](http://acrmp.github.io/foodcritic/#FC004): "Use a service resource to start and stop services".

The `service` resource takes care of all of the details required to enable and start the service. Modify your recipe to look like the original version, like this.

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

Run `foodcritic default.rb` a to verify that the violation is fixed.

```bash
# ~/webserver/recipes
$ foodcritic default.rb

```

By fixing the violations, you've created a recipe that's easier to read, maintain, and verify.

[TIP] We don't show it in this tutorial, but the [Foodcritic documention](http://acrmp.github.io/foodcritic/#faq) explains how to exclude specific warnings from a `foodcritic` run.

### Create a custom Foodcritic rule

Let's define a custom Foodcritic rule that validates the way that strings are defined.

A common Ruby coding convention is to surround strings with single quotes `'` by default and use double-quotes `"` only when:

* string interpolation is required, for example, `"#{document_root}\index.html"`.
* the string contains `'` characters, for example, `"cat default.rb | grep 'web'"`.

The [CustomInk Foodcritic rules](https://github.com/customink-webops/foodcritic-rules) already define this custom rule for us, so let's adapt it for our custom rule.

Create the <code class="file-path">~/webserver/foodcritic</code> directory and add this code to  <code class="file-path">~/webserver/foodcritic/rules.rb</code>

```ruby
# ~/webserver/foodcritic/rules.rb
# Adapted from https://github.com/customink-webops/foodcritic-rules.

rule 'CINK002', 'Prefer single-quoted strings' do
  tags %w{style strings cink}
  cookbook do |path|
    recipes  = Dir["#{path}/{#{standard_cookbook_subdirs.join(',')}}/**/*.rb"]
    recipes += Dir["#{path}/*.rb"]
    recipes.collect do |recipe|
      lines = File.readlines(recipe)

      lines.collect.with_index do |line, index|
        # Don't flag if there is a #{} or ' in the line
        if line.match('"(.*)"') &&
          !line.match('\A\s*#') &&
          !line.match('\'(.*)"(.*)"(.*)\'') &&
          !line.match('\`(.*)"(.*)"(.*)\`') &&
          !line.match('"(.*)(#{.+}|\'|\\\a|\\\b|\\\r|\\\n|\\\s|\\\t)(.*)"')
          {
            :filename => recipe,
            :matched => recipe,
            :line => index + 1,
            :column => 0
          }
        end
      end.compact
    end.flatten
  end
end
```

[COMMENT] As with RuboCop, you can add this file to a directory higher in the tree so that multiple projects can access it.

To test your rule, modify your default recipe like this.

```ruby
# ~/webserver/recipes/default.rb
#
# Cookbook Name:: webserver
# Recipe:: default
#
# Copyright (c) 2015 The Authors, All Rights Reserved.
package "httpd"

service "httpd" do
  action [:enable, :start]
end

file "/var/www/html/index.html" do
  content '<html>
  <body>
    <h1>hello world</h1>
  </body>
</html>'
end
```

Now run `foodcritic`, adding the `-I` argument to specify the path to our custom rule.

```bash
# ~/webserver/recipes
$ foodcritic -I ~/webserver/foodcritic default.rb
CINK002: Prefer single-quoted strings: ../recipes/default.rb:6
CINK002: Prefer single-quoted strings: ../recipes/default.rb:8
CINK002: Prefer single-quoted strings: ../recipes/default.rb:12
```

Foodcritic reports CINK002: "Prefer single-quoted strings". To resolve the error, you would replace the double quote characters with single quotes, and run Foodcritic to verify that the violation is fixed.
