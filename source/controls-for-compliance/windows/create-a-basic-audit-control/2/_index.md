## 2. Add an audit control

Let's say that your organization's internal audit policy states that no web file can be owned by the `Administrator` user. Let's add an audit control that tests for this.

There are multiple ways to organize your audit code. You can create one recipe for each platform that you manage, as is done in the [audit-cis](https://supermarket.chef.io/cookbooks/audit-cis) cookbook on Chef Supermarket. Alternatively, you might create one recipe for each category you need to verify &ndash; security, services, network configuration, and so on. For now, you'll add the audit code to the default recipe.

Add the following code to your default recipe, <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/audit/recipes/default.rb
control_group 'Validate web services' do
  control 'Ensure no web files are owned by the Administrators group' do
    Dir.glob('c:/inetpub/wwwroot/**/*.htm') {|web_file|
      it "#{web_file} must not be owned by Administrators" do
        expect(command("(Get-ChildItem #{web_file} | Get-Acl).Owner").stdout).to_not match(/Administrators$/)
      end
    }
  end
end
```

A [control_group](https://docs.chef.io/dsl_recipe.html#control-group) organizes related audit concerns. Here, you create a control group that validates the state of your web services. A [control](https://docs.chef.io/dsl_recipe.html#control) defines a policy to test. Here, we validate that no web file is owned by the `root` user.

Every `control` block breaks down into `it` blocks. An `it` block validates one part of the system by defining one or more `expect` statements. An `expect` statement verifies that a resource, such as a file or service, meets the desired state. As with many test frameworks, the code you write to implement an audit control resembles natural language.

[RUBY] The `Dir` class's [glob](http://ruby-doc.org/core-2.2.0/Dir.html#method-c-glob) method returns all files that match a given pattern. In this example, the `/var/www/html/` part specifies the start of the path to match. The `**` part matches all subdirectories, and `*` matches all files. You can think of this like the equivalent `ls` command, `ls /var/www/html/**/*`, which lists all files under <code class="file-path">/var/www/html</code> and its subdirectories.

Chef audit controls are based on [Serverspec](http://serverspec.org), which is based on [RSpec](http://rspec.info). The [Serverspec documentation](http://serverspec.org/resource_types.html) describes the resource types you can use in your audit controls.
