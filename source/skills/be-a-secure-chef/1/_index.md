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
