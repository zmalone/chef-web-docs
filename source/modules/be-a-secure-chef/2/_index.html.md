##Suggestions for controlling the Chef workflow

The DevOps workflow is an orderly process with safeguards against disrupting production and other environments. DevOps uses testing, quality gates and code review to control changes as they move from the development environment to the production environment. The DevOps focus is on safely enabling change with open communication and transparency rather than on restricting access for individuals.

A safe, high-velocity workflow is possible because all changes are tracked by version control. For example, the DevOps approach to change management involves approval of GitHub pull requests instead of manual handoffs or service tickets. The revision control system, such as Git or GitHub, becomes the central location for collaboration and communication across the entire team, regardless of their technical specialties.

Chef is built for DevOps. As a result, the Chef workflow includes creating and changing Chef cookbooks, and safely moving them through a series of stages so that, once they reach production, there are no disruptions. Each stage of the pipeline can be thought of as a quality gate that further ensures the correctness of the proposed change.  Risk decreases as you progress through each stage.
A well-managed workflow should use either Chef environments or policy files to distinguish each stage of the pipeline.

###Environments
Chef environments group together servers that perform related functions. Environments often map to stages in the workflow. Chef environments are often established for development, testing, staging, and production.

For example, suppose you have an environment called _testing_ and another called _production_. Because you don't want any code that is still being tested on your production machines, each machine can only be in one environment. You can then have one configuration for machines in your testing environment, and a completely different configuration for computers in production. For example, you could specify that, in the testing environment, the web and database server roles are on a single machine. In the production environment, each of these roles is handled by individual servers. For more information about roles, see <https://docs.chef.io/roles.html>.


Environments also can have attributes associated with them. These attributes are usually common to every node within that environment and override the node's default settings.  An environment gives you a single place to control the configuration of all the servers in the environment. The configuration settings for NTP servers, DNS servers, subdomain naming, and package repositories are examples of settings that are often controlled by environment attributes.  For more information about environments in Chef, see: <https://docs.chef.io/environments.html>.

####Cookbook pinning
You can associate (or pin) specific cookbook versions to specific environments. Pinning prevents newer versions of cookbooks from being prematurely promoted to more stable environments. For example, you could constrain the production environment to only use a known, thoroughly tested version of a cookbook.

Each environment should be associated with specific cookbook versions. In general, the earlier in the workflow, the less constrained the use of cookbooks will be. In development, you might want to work with many versions of a cookbook. As you progress through the pipeline, the acceptable versions become fewer until, in production, you might only allow a single version. Here is an example of pinning a cookbook version to a production environment.

```ruby
# production.rb
name "production"
description "Production Servers"
cookbook "tomcat", "=0.7.0"
```

All nodes in the production environment with _tomcat_ in their run list must use the 0.7.0 version of the tomcat cookbook. If the cookbook is updated on the Chef server, these nodes will not use it until the environment definition is updated. Servers that do not have _tomcat_ in their run list are unaffected.

####Policy files

Policy files are an alternative to using Chef roles and environments. They are available with Chef server 12.1 and above. Like environments, you can specify a run list, include attributes and constrain cookbook versions. You can also list sources for cookbooks. Unlike environments, policy files can be versioned using your revision control system.
Here is an example of a policy file.

```ruby
# Policyfile.rb
name "jenkins-master"
run_list "java", "jenkins::master", "recipe[policyfile_demo]"
default_source :community
cookbook "policyfile_demo", path: "cookbooks/policyfile_demo"
cookbook "jenkins", "~> 2.1"
cookbook "mysql", github: "opscode-cookbooks/mysql", branch: "master"
```

The name of the policy is _jenkins-master_. There is a run list, sources for the cookbooks and a constraint to use version 2.1 of the Jenkins cookbook. For more information about policy files, see: <https://docs.chef.io/config_rb_policyfile.html> and <https://github.com/chef/chef-dk/blob/master/POLICYFILE_README.md>.

Be aware that policy files override any run list entries set on the node.
