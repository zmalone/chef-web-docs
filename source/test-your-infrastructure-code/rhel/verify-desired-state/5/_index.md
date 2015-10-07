## 5. Apply the configuration

The `kitchen verify` command already brought up a CentOS instance. Now run `kitchen converge` to apply your web server cookbook to your instance.

```bash
# ~/webserver_test
$ kitchen converge
-----> Starting Kitchen (v1.4.2)
-----> Converging <default-centos-66>...
       Preparing files for transfer
       Preparing dna.json
       Resolving cookbook dependencies with Berkshelf 3.2.4...
       Removing non-cookbook files before transfer
       Preparing validation.pem
       Preparing client.rb
-----> Chef Omnibus installation detected (install only if missing)
       Transferring files to <default-centos-66>
       Starting Chef Client, version 12.4.1
[...]
       Recipe: webserver_test::default



           - enable service service[httpd]

           - start service service[httpd]


           - update content in file /var/www/html/index.html from none to 2914aa
           --- /var/www/html/index.html	2015-09-17 14:30:59.502280398 +0000
           +++ /var/www/html/.index.html20150917-2164-1mloyt0	2015-09-17 14:30:59.502280398 +0000
           @@ -1 +1,6 @@
           +<html>

           +    <h1>hello world</h1>
           +  </body>



       Running handlers:
       Running handlers complete
       Chef Client finished, 4/4 resources updated in 7.098627611 seconds
       Finished converging <default-centos-66> (0m8.78s).
-----> Kitchen is finished. (0m9.47s)
```

The output shows that the `chef-client` run completed without error. The next step is to verify that it placed the system in the desired state.
