## 1. Install the Apache package

Let's install the Apache package, `httpd`. From your <code class="file-path">~/chef-repo</code> directory, add this recipe to a file named <code class="file-path">webserver.rb</code>.

```ruby
# ~/chef-repo/webserver.rb
package 'httpd'
```

We don't need to specify an action because `:install` is the default.

Now run `chef-apply` to apply the recipe.

```bash
# ~/chef-repo
$ sudo chef-apply webserver.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * package[httpd] action install
    - install version 2.2.15-31.el6.centos of package httpd
```

[COMMENT] `sudo` is required because this command installs a package and therefore must be run with root privileges. If you're running as root on your own machine, you can omit `sudo` from the command.

Run the recipe a second time.

```bash
# ~/chef-repo
$ sudo chef-apply webserver.rb
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * package[httpd] action install (up to date)
  ```

You see that Chef does no work because there's nothing to do &ndash; the package is already installed.
