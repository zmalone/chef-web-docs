## 2. Run the ChefSpec tests

In the previous lesson, you ran your Serverspec tests through Test Kitchen. To run ChefSpec tests, you run a program called [rspec](https://relishapp.com/rspec/rspec-core/docs/command-line).

Run the following command run your tests. The [chef exec](https://docs.chef.io/ctl_chef.html#chef-exec) part ensures that `rpsec` is run using Chef's Ruby. The `--color` part is optional, but can help you visually distinguish passing from failing tests.

```bash
# ~/webserver
$ chef exec rspec --color spec/unit/recipes/default_spec.rb
.....FFF

Failures:

  1) webserver::default on Ubuntu installs apache2
     Failure/Error: expect(chef_run).to install_package 'apache2'
       expected "package[apache2]" with action :install to be in Chef run. Other package resources:

         apt_package[httpd]

     # ./spec/unit/recipes/default_spec.rb:44:in `block (3 levels) in <top (required)>'

  2) webserver::default on Ubuntu enables the apache2 service
     Failure/Error: expect(chef_run).to enable_service 'apache2'
       expected "service[apache2]" with action :enable to be in Chef run. Other service resources:

         service[httpd]

     # ./spec/unit/recipes/default_spec.rb:48:in `block (3 levels) in <top (required)>'

  3) webserver::default on Ubuntu starts the apache2 service
     Failure/Error: expect(chef_run).to start_service 'apache2'
       expected "service[apache2]" with action :start to be in Chef run. Other service resources:

         service[httpd]

     # ./spec/unit/recipes/default_spec.rb:52:in `block (3 levels) in <top (required)>'

Finished in 1.94 seconds (files took 13.16 seconds to load)
8 examples, 3 failures

Failed examples:

rspec ./spec/unit/recipes/default_spec.rb:43 # webserver::default on Ubuntu installs apache2
rspec ./spec/unit/recipes/default_spec.rb:47 # webserver::default on Ubuntu enables the apache2 service
rspec ./spec/unit/recipes/default_spec.rb:51 # webserver::default on Ubuntu starts the apache2 service
```

[COMMENT] To run all tests, you could run `chef exec rspec --color spec/unit/recipes/*.rb`.

As you might expect, the CentOS tests pass, but the Ubuntu tests fail. As with our Serverspec tests, having failing tests shows what functionality is missing and gives us clear goals to work towards.
