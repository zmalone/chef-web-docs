## 3. Install the management console

Although the management console is an optional component, installing it shows you how to add additional features to your Chef server. Plus, the management console is required by Chef Analytics and other features.

You use the following format to install Chef server features.

```bash
# ~
$ chef-server-ctl install <feature-name> (options)
```

Run the following to install the Chef management console.

```bash
# ~
$ sudo chef-server-ctl install opscode-manage
Starting Chef Client, version 12.4.0.rc.2
resolving cookbooks for run list: ["private-chef::add_ons_wrapper"]
Synchronizing Cookbooks:
  - enterprise
  - yum
  - packagecloud
  - private-chef
  - runit
  - apt
Compiling Cookbooks...
Converging 14 resources
[...]
Running handlers:
-- Installed Add-On Package: opscode-manage
  - #<Class:0x00000003d075e8>::AddonInstallHandler
Running handlers complete
Chef Client finished, 12/15 resources updated in 51.529171977 seconds
```

After you install a feature, you must reconfigure the Chef server. Run the following to apply the configuration changes.

```bash
$ sudo chef-server-ctl reconfigure
Starting Chef Client, version 12.4.0.rc.2
resolving cookbooks for run list: ["private-chef::default"]
Synchronizing Cookbooks:
  - enterprise
  - packagecloud
  - private-chef
  - yum
  - apt
  - runit
Compiling Cookbooks...
[...]
Running handlers:
Running handlers complete
Chef Client finished, 19/350 resources updated in 33.839620088 seconds
opscode Reconfigured!
```

Now run `opscode-manage-ctl reconfigure` to reconfigure the management console.

```bash
# ~
$ sudo opscode-manage-ctl reconfigure
Starting Chef Client, version 12.0.3
resolving cookbooks for run list: ["opscode-manage::default"]
Synchronizing Cookbooks:
  - opscode-manage
  - enterprise
  - private_chef_addon
  - runit
  - unicorn
  - packagecloud
Compiling Cookbooks...
[...]
Recipe: opscode-manage::nginx
  * service[nginx] action restart
    - restart service service[nginx]

Running handlers:
Running handlers complete
Chef Client finished, 74/81 resources updated in 55.616616854 seconds
opscode-manage Reconfigured!
```

From a web browser, navigate to the IP address or FQDN of your Chef server. You'll see a sign-in page that resembles the one you used when you signed up for hosted Chef.

Enter your administrator name and password and click **Sign In**.

![The Chef Manage sign-in page](chef-server/sign-in.png)

Once you're signed in, you'll be able to administer your Chef server from your browser.

![The Chef management console](chef-server/manage-learnchef.png)
