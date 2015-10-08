## 1. Use RuboCop to make your code easier to read and maintain

Let's see how [RuboCop](http://batsov.com/rubocop/), a Ruby static code analyzer that's based on the community [Ruby style guide](https://github.com/bbatsov/ruby-style-guide#the-ruby-style-guide), can help identify inconsistent code formatting.

Start by modifying your `webserver` cookbook's default recipe like this. Be sure to copy the code exactly as it appears.

```ruby
# ~/webserver/recipes/default.rb
#
# Cookbook Name:: webserver
# Recipe:: default
#
# Copyright (c) 2015 The Authors, All Rights Reserved.
package 'httpd'

service 'httpd' do
    action [:enable,
       :start]
end

file '/var/www/html/index.html' do
    content '<html>
  <body>
    <h1>hello world</h1>
  </body>
</html>'
  end
```

Note how the code is formatted.

* It uses four spaces for indentation.
* The `action` attribute is broken into multiple lines.
* The `file` resource uses two spaces to indent the `end` keyword.

When you run the `rubocop` command with no arguments, RuboCop checks all Ruby source files in the current directory.

Run `rubocop` from your <code class="file-path">recipes</code> directory to run RuboCop's rules against your default recipe.

```bash
# ~/webserver/recipes
$ rubocop
Inspecting 1 file
W

Offenses:

default.rb:9:1: C: Use 2 (not 4) spaces for indentation.
    action [:enable,
^^^^
default.rb:10:8: C: Align the elements of an array literal if they span more than one line.
       :start]
       ^^^^^^
default.rb:19:3: W: end at 19, 2 is not aligned with file '/var/www/html/index.html' do at 13, 0.
  end
  ^^^

1 file inspected, 3 offenses detected
```

For each file, RuboCop prints to the console a character that indicates the status of that file.

Common statuses include:

* `.` &ndash; indicates that RuboCop found no potential issues.
* `C` (Convention) &ndash; indicates that RuboCop found code that potentially violates standard convention, for example, inconsistent use of indentation.
* `W` (Warning) &ndash; indicates that RuboCop found code that's valid, but potentially isn't what the programmer intended, such as comparing a variable to itself or defining [unreachable code](https://en.wikipedia.org/wiki/Unreachable_code).
* `E` (Error) &ndash; indicates that RuboCop found a potential error, such as using an invalid character in a variable name.

When RuboCop finds multiple potential issues, it reports the most severe as the file's status. In this example, RuboCop found both a convention violation and a warning, so our recipe's overall status is `W` (Warning).

### Fix the violations

Let's fix the reported violations. To summarize them:

* Line 9 uses 4 spaces for indentation.
* Line 10 does not properly align the array elements.
* Line 19 indents the `end` keyword.

Modify <code class="file-path">default.rb</code> like this to fix the violations.

```ruby
# ~/webserver/recipes/default.rb
#
# Cookbook Name:: webserver
# Recipe:: default
#
# Copyright (c) 2015 The Authors, All Rights Reserved.
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

Run `rubocop` a second time to check whether the violations are fixed.

```bash
# ~/webserver/recipes
$ rubocop
Inspecting 1 file
C

Offenses:

default.rb:13:1: C: Use 2 (not 4) spaces for indentation.
    content '<html>
^^^^

1 file inspected, 1 offense detected
```

This time a new violation is discovered. This violation was not reported originally because the use of indentation was consistent with the indented `end` keyword.

Correct the indentation, making your default recipe look like this.

```ruby
# ~/webserver/recipes/default.rb
#
# Cookbook Name:: webserver
# Recipe:: default
#
# Copyright (c) 2015 The Authors, All Rights Reserved.
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

Run `rubocop` to verify the correction.

```bash
# ~/webserver/recipes
$ rubocop
Inspecting 1 file
.

1 file inspected, no offenses detected
```

Congratulations. RuboCop reported no additional violations.

## Configure RuboCop to follow your preferred style

A RuboCop rule is also called a _cop_. You can modify the behavior of RuboCop's predefined cops or disable one or more cops altogether.

One reason you may want to customize RuboCop's predefined behavior is when your team or organization defines style guidelines that differ from the community standard.

Another reason might be when you have many RuboCop violations in your existing code, and you want to resolve them gradually.

For example, say your existing code uses 4 spaces for indentation and you want to temporarily configure RuboCop to accept this indentation so that you can focus on potentially more severe issues.

Start by modifying your default recipe to look like this.

```ruby
# ~/webserver/recipes/default.rb
#
# Cookbook Name:: webserver
# Recipe:: default
#
# Copyright (c) 2015 The Authors, All Rights Reserved.
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

Run `rubocop` to observe the violations.

```bash
# ~/webserver/recipes
$ rubocop
Inspecting 1 file
C

Offenses:

default.rb:9:1: C: Use 2 (not 4) spaces for indentation.
    action [:enable, :start]
^^^^
default.rb:13:1: C: Use 2 (not 4) spaces for indentation.
    content '<html>
^^^^

1 file inspected, 2 offenses detected
```

You customize RuboCop's behavior through a file named <code class="file-path">.rubocop.yml</code>. When RuboCop runs, it loads all predefined rules and then overrides any rules that you specify.

Add the following code to <code class="file-path">.rubocop.yml</code> in your cookbook directory, <code class="file-path">~/webserver</code>.

```ruby
# ~/webserver/.rubocop.yml
Style/IndentationWidth:
  # Number of spaces for each indentation level.
  Width: 4
```

RuboCop searches for a file named <code class="file-path">.rubocop.yml</code> by traversing up the directory tree. So in practice you could add your <code class="file-path">.rubocop.yml</code> file to a directory that's higher in the tree if you want your modified rules to apply to multiple projects.

[TIP] You can use RuboCop's [default rules](https://github.com/bbatsov/rubocop/blob/master/config/default.yml) as a guide. Just copy the rules that you want to modify or disable to your <code class="file-path">.rubocop.yml</code> file and modify its parameters. To disable a rule, add `Enabled: false` to the rule.

Now run `rubocop` from your <code class="file-path">~/webserver/recipes</code> directory to verify that your custom behavior is used.

```bash
# ~/webserver/recipes
$ rubocop
Inspecting 1 file
.

1 file inspected, no offenses detected
```

After you address any other violations, you can remove your custom rule from <code class="file-path">.rubocop.yml</code> and then focus on the indentation violations.

[TIP] If your code produces a large number of violations, you can run RuboCop to  [automatically generate a configuration file](https://github.com/bbatsov/rubocop#automatically-generated-configuration) that excludes the violations from a `rubocop` run. As you work through the violations, you can remove each entry from the generated configuration file.<br/>You can also [disable cops directly in your source code](https://github.com/bbatsov/rubocop#disabling-cops-within-source-code) if you have a special case that you want RuboCop to ignore.
