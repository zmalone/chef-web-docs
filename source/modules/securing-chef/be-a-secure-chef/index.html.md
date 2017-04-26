---
id: be-a-secure-chef
title: 'How to be a secure Chef'
description: 'Learn how a secure workflow can help you deliver your applications and services securely without losing speed.'
order: 1
time_to_complete: 10 minutes
quiz_path: quizzes/securing-chef/be-a-secure-chef.yml
tags: [chef, beginner]
headings: [
  { label: 'Securing Chef', href: '#securingchef' },
  { label: 'Suggestions for controlling the Chef workflow', href: '#suggestionsforcontrollingthechefworkflow' }
]
---
This article has suggestions for securing the Chef server, the Chef client, and the workstation where you run Chef DK and `knife` commands. It includes best practices for you to follow and links to Chef documentation and to other sites where you can read about each topic in more detail.

The last part of the article discusses several ways to control the promotion of cookbooks within a Chef workflow.  It is common for people to say they want a _secure_ workflow, which generally means they want to limit access and safeguard the stages that take a cookbook from development to production. Techniques such as Chef organizations, RBAC and LDAP, which are discussed in this document, can help you to set up security boundaries.

However, security boundaries are only part of the story. DevOps advocates transparency and communication rather than opacity and silos and these qualities will make your workflow efficient and fast. Instead of focusing on restricting people's access to the workflow, there are also some techniques you can use to control how cookbooks move through a rapid deployment pipeline. These techniques include using environments, pinning specific cookbooks to specific environments, and using policy files. You can learn more about them in the section [Suggestions for controlling the Chef workflow](#suggestionsforcontrollingthechefworkflow).

##Securing Chef

This section describes how to secure the Chef server and the Chef client.

###Securing the Chef server

Chef uses SSL/TLS certificates for secure communication between the Chef server and clients. For an overview of Chef's use of SSL/TLS, see: <https://docs.chef.io/server_security.html>.

Here are some recommended practices for securing the Chef server.

####Use a strong password

When you first configure a Chef server you set up an admin account, which requires you to create a password. Make sure the password is strong. A strong password consists of at least 15 characters and is a combination of upper and lower case letters and numbers. Also, be sure to change the admin password periodically.

####Use a VPN for multi-tier installation of the Chef server

If the Chef server is distributed between front end (FE) and backend (BE) nodes, use a secure network or a VPN to connect them. Block all other access to the BE nodes. The reason for the recommendation to use a VPN is that some FE-BE communications are password protected but not encrypted.

####Log SSH connections to server

Whenever a connection is made to a Chef server through SSH, it should be logged.

####Use public key infrastructure (PKI)

Logging into the OS that runs the Chef server should require public key infrastructure (PKI) rather than password authorization. For example, in RHEL you would follow this procedure: <https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/s2-ssh-configuration-keypairs.html>.

In Ubuntu, you would follow this procedure: <https://help.ubuntu.com/community/SSH/OpenSSH/Keys>.

####Use firewalls

Make sure that firewalls are in place that lock down access to the Chef server by enabling access only to ports used by Chef. The list of ports that the Chef server uses and that need to be accessible can be found here: <https://docs.chef.io/server_firewalls_and_ports.html>.

####Protect port 443

Use an SSL certificate signed by a trusted certification authority (CA) on port 443 to protect the web UI and the API.  Using a CA prevents attacks based on spoofing or man-in-the-middle.

####Secure the management console

If you use the Chef management console, prevent denial of service (DoS) and other attacks by setting `disable_sign_up` to `true` in the <code class="file-path">manage.rb</code> file. This setting prevents signing up through the management console. See <http://docs.chef.io/config_rb_manage.html#settings>.

####Disable root login

For enhanced security, you can disable root login. In the <code class="file-path">/etc/ssh/sshd_config</code> file, set `PermitRootLogin` to `no`.

####Install security patches

Always install the latest security patches. Security patches for the Chef server are announced on the Chef blog: <https://www.chef.io/blog/>.

####Use corporate credentials

If you have the Chef management console installed, you can use your corporate credentials to log into the Chef server by using Active Directory or LDAP authentication. For more information, see: <https://docs.chef.io/server_ldap.html>.

####Use role-based access (RBAC)
Use role-based access control (RBAC) to assign proper access permissions to users. For more information about RBAC in Chef, see: <https://docs.chef.io/server_orgs.html> and <https://docs.chef.io/auth_authorization.html>. You can use the knife-acl plugin at <https://github.com/chef/knife-acl> to make managing RBAC permissions easier.

#####RBAC and search results
Until Chef server 12.0.7, RBAC was not applied to search results. Even if you didn't have access to a particular object, it would be returned by a search. For example, if you did a search on the role "web\_admin" (`:roles, 'name:web_admin'`) you could still get results, even if you couldn't access that role. As of Chef 12.0.7, you would get no results.  See <https://www.chef.io/blog/2015/03/27/chef-server-12-0-7-released/>. You must turn RBAC-based filtering on by setting `opscode_erchef['strict_search_result_acls']` to `true`. See <http://docs.chef.io/server_tuning.html#opscode-erchef>.

####Follow the principle of least privilege
When implementing RBAC, follow the principle of least privilege, which states that entities (people, processes, devices and so on) should only have enough privileges to accomplish their tasks and nothing more. For example, if you use a Jenkins server for continuous integration, you might create a role named "jenkins" and constrain it so that it could only upload cookbooks to certain organizations and couldn't modify  objects such as roles and environment files.

####Use Chef organizations
A Chef organization is the primary, top-level structure for role-based access
control. An organization uses RBAC to make sure that only authorized
users and groups have access to information such as cookbooks. For security, artifacts and access permissions are not shared between organizations.

By default, you define a single organization when you first set up the Chef server. You can, however, set up multiple organizations to create security boundaries. For example, you might have one set of users called consultants and another set called bankers with a requirement that neither group can access the other's resources. Placing each group in a separate organization accomplishes this. For more about organizations, see: <https://docs.chef.io/server_orgs.html>.

###Manage Secrets securely
There are a variety of ways to manage secrets using Chef. Here are some recommended patterns.

####Encrypt sensitive data
Review all existing recipes, templates and data bags for plaintext secrets such as passwords. Secrets and other sensitive information should never be left in plaintext. Instead, use encrypted data bags to store such information. Encrypted data bags separate the storage of information from access to that information. They are a building block of flexible, secure secret management in the Chef workflow. For more information about encrypted data bags, see: <https://docs.chef.io/data_bags.html#encrypt-a-data-bag-item>.


Encrypted data bags use a shared secret key and this may not meet the key-distribution requirements of some organizations. Also, there's a scaling problem, since managing the keys for multiple encrypted data bags across multiple environments is difficult and error prone.


To address these issues, you can use chef-vault to simplify credential management for encrypted data bags. Chef-vault is a RubyGem included in Chef DK that uses symmetric key encryption. Chef-vault generates data bags that are encrypted with the Chef client key of each destination host. Also, with chef-vault, you can specify exactly who (and what) can access individual encrypted data bag items. For more information about chef-vault, see: <http://docs.chef.io/devkit/chef_vault.html>.

###Securing the Chef client

For an overview of how to secure the Chef client, see: <https://docs.chef.io/chef_client_security.html>. Here are some recommended patterns.

####Install security patches

Always install the latest security patches. Security patches for the Chef client are announced on the Chef blog: <https://www.chef.io/blog/>.

####Use validatorless bootstrapping
By default, the Chef client bootstraps its initial connection to the Chef server with a "validator" certificate (.pem file). See <https://docs.chef.io/chef_private_keys.html>. However, there is an alternative, called validatorless bootstrapping that is more streamlined.


If possible, use validatorless bootstrapping. With it, you eliminate the organization.pem file and use the user.pem file instead.  Some advantages of validatorless bootstrapping are that you no longer need a validation key and you can eliminate shared access.

For more information about validatorless bootstrapping, see: <https://docs.chef.io/install_bootstrap.html#validatorless-bootstrap>. For a blog post on the subject, see: <https://www.chef.io/blog/2015/04/16/validatorless-bootstraps/>.


If you do use the validator certificate (preferably only with automated bootstrapping and not with manual bootstrapping), delete it after the Chef client registers with the Chef server by using the chef-client cookbook at: <https://supermarket.chef.io/cookbooks/chef-client/>.

###Securing the Chef workstation

The Chef workstation is where you develop Chef cookbooks and run `knife` commands. In general, you would use the same techniques you would use to secure any workstation, such as:

* Stay up to date with operating system patches.
* Use strong passwords, including for screensavers.
* Log off if you are going to leave the workstation unattended.
* Follow your company's security guidelines.

In addition:

* Place user keys should be placed in a location accessible only to the user.
* Do not store passwords as plain text (for example, do not store passwords in configuration files.)

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
