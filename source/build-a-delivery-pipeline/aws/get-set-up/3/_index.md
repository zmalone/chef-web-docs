## 3. Install Chef Delivery

Follow the instructions in the installation procedure. To clarify:

* Either use a provisioning node or your workstation to install the Delivery cluster.
* Remember that installing Chef Supermarket is optional.
* Remember that installing Chef Analytics is optional.
* Remember that, for this tutorial, you only need one build node.
* Creating an internal user is fine.
* When you add a user, you can give all permissions.
* When you create an organization, you can enter a name that matches your org (for example, `dev`), or `learn-chef`.
* You don't need to validate the installation. We'll do that here.
* This tutorial uses <code class="file-path">~/Development</code> as its working directory, but you can choose a directory that best suits you. Just remember to change the paths that we show as necessary.

<a class='accent-button radius' href='https://docs.chef.io/release/delivery_1-0/install_delivery.html' target='_blank'>Install Chef Delivery&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

### Authenticate access to Chef Delivery's Git server

After the installation completes, you must authenticate access to your Chef Delivery's Git server, which by default runs on port 8989.

First, get your Delivery server's IP address. An easy way to do that is to run `rake info:list_core_services` from your <code class="file-path">~/Development/delivery-cluster</code> directory.

```bash
# ~/Development/delivery-cluster
$ rake info:list_core_services
2 items found

delivery-server-test:
  ipaddress: 10.194.11.99

build-node-test-1:
  ipaddress: 10.194.13.122

chef_server_url      'https://10.194.12.65/organizations/test'
```

Then run the `ssh` command like this.

```bash
# ~/Development/delivery-cluster
$ ssh -l USER@ENTERPRISE -p 8989 IP_ADDRESS
```

Here's an example for a user named `sally` and an enterprise named `chef`.

```bash
# ~/Development/delivery-cluster
$ ssh -l sally@chef -p 8989 10.194.11.99
The authenticity of host '[10.194.11.99]:8989 ([10.194.11.99]:8989)' can't be established.
RSA key fingerprint is ba:db:0c:97:f8:d4:6d:0f:0b:57:0d:0f:0e:a4:15:01.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '[10.194.11.99]:8989' (RSA) to the list of known hosts.
channel 0: protocol error: close rcvd twice
Hi sally@chef! You've successfully authenticated, but Chef Delivery does not provide shell access.
                      Connection to 10.194.11.99 closed.
```
