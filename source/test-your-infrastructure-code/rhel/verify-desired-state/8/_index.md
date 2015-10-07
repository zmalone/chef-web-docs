## 8. Test your configuration one final time

As you experiment and correct mistakes, it's a good practice to apply your configuration and run your tests one final time on a new instance to ensure that the process is repeatable.

So far, you ran commands such as `kitchen converge`, `kitchen verify`, and `kitchen destroy` to manage your instances.

You can also run the `kitchen test` command to create, converge, verify, and destroy your instance all in one step. Running this command is equivalent to running these commands.

```bash
$ kitchen destroy
$ kitchen create
$ kitchen converge
$ kitchen verify
$ kitchen destroy
```

Run `kitchen test` to apply and test your configuration one final time.

```bash
# ~/webserver
$ kitchen test
-----> Starting Kitchen (v1.4.2)
-----> Cleaning up any prior instances of <default-centos-66>
-----> Destroying <default-centos-66>...
       Finished destroying <default-centos-66> (0m0.00s).
-----> Testing <default-centos-66>
-----> Creating <default-centos-66>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'opscode-centos-6.6'...
[...]
       Synchronizing Cookbooks:
         - webserver
       Compiling Cookbooks...
       Converging 3 resources
       Recipe: webserver::default

           - install version 2.2.15-47.el6.centos of package httpd



           - start service service[httpd]


           - update content in file /var/www/html/index.html from none to 2914aa
           --- /var/www/html/index.html	2015-09-17 17:19:50.382184641 +0000
           +++ /var/www/html/.index.html20150917-1865-gk92cm	2015-09-17 17:19:50.381184641 +0000
           @@ -1 +1,6 @@
           +<html>
           +  <body>
           +    <h1>hello world</h1>


           - restore selinux security context

       Running handlers:
       Running handlers complete
       Chef Client finished, 4/4 resources updated in 8.09604643 seconds
       Finished converging <default-centos-66> (0m22.24s).
[...]
       apache
         is installed
         is running
         is listening to port 80
         displays a custom home page

       Finished in 0.1436 seconds (files took 0.29668 seconds to load)
       4 examples, 0 failures

       Finished verifying <default-centos-66> (0m15.07s).
-----> Destroying <default-centos-66>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <default-centos-66> destroyed.
       Finished destroying <default-centos-66> (0m3.42s).
       Finished testing <default-centos-66> (3m22.16s).
-----> Kitchen is finished. (3m22.66s)
```

You've verified that your web server configuration is repeatable. Run `kitchen list` to verify that the instance is destroyed.

```bash
# ~/webserver
$ kitchen list
Instance           Driver   Provisioner  Verifier  Transport  Last Action
default-centos-66  Vagrant  ChefZero     Busser    Ssh        <Not Created>
```

[COMMENT] The `kitchen test` command is also commonly used in automated pipelines because it ensures that the instance is destroyed immediately after `chef-client` completes and all tests are run. When you use a [cloud driver](https://docs.chef.io/kitchen.html#drivers) with Test Kitchen, `kitchen test` can help minimize cost.
