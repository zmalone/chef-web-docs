## 1. Install the Apache package

Let's install the Apache package, `apache2`. From your <code class="file-path">~/chef-repo</code> directory, add this recipe to a file named <code class="file-path">webserver.rb</code>.

```ruby
# ~/chef-repo/webserver.rb
package 'apache2'
```

We don't need to specify an action because `:install` is the default.

Now run `chef-client` to apply the recipe.

```bash
# ~/chef-repo
$ sudo chef-client --local-mode webserver.rb
[2016-01-07T18:16:03+00:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T18:16:03+00:00] WARN: No cookbooks directory found at or above current directory.  Assuming /root/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T18:16:04+00:00] WARN: Node default-ubuntu-1404 has an empty run list.
Converging 1 resources
Recipe: @recipe_files::/root/chef-repo/webserver.rb
  * apt_package[apache2] action install
    - install version 2.4.7-1ubuntu4.8 of package apache2

Running handlers:
Running handlers complete
Chef Client finished, 1/1 resources updated in 08 seconds
```

[COMMENT] `sudo` is required because this command installs a package and therefore must be run with root privileges. If you're running as root on your own machine, you can omit `sudo` from the command.

Run the recipe a second time.

```bash
# ~/chef-repo
$ sudo chef-client --local-mode webserver.rb
[2016-01-07T18:16:46+00:00] WARN: No config file found or specified on command line, using command line options.
[2016-01-07T18:16:46+00:00] WARN: No cookbooks directory found at or above current directory.  Assuming /root/chef-repo.
Starting Chef Client, version 12.6.0
resolving cookbooks for run list: []
Synchronizing Cookbooks:
Compiling Cookbooks...
[2016-01-07T18:16:48+00:00] WARN: Node default-ubuntu-1404 has an empty run list.
Converging 1 resources
Recipe: @recipe_files::/root/chef-repo/webserver.rb
  * apt_package[apache2] action install (up to date)

Running handlers:
Running handlers complete
Chef Client finished, 0/1 resources updated in 01 seconds
```

You see that Chef does no work because there's nothing to do &ndash; the package is already installed.
