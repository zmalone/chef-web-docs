DUMPING THIS HERE:

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


## The systems you'll use

Your setup will include these systems:

* A _Delivery cluster_, which are the machines that make up a Chef Delivery setup. At a minimum, a Delivery cluster includes Chef Delivery, Chef server, one build node, and environments to run your Acceptance, Union, Rehearsal, and Delivered stages. Your Chef Delivery, Chef server, and build node each runs on its own server.
* A machine from which you install and manage your Delivery cluster. This can be your workstation or what's called a _provisioning node_.
* Your workstation, from which you'll create the project, write the build cookbook, and add new features to the Customers web application.

You have flexibility in choosing the platform that runs many of these systems. They do not all need to match.

Chef Delivery, Chef server, and your build node can run on Red Hat Enterprise Linux or Ubuntu. The installation procedure explains the system requirements in greater detail.

The machine you install and manage your Delivery cluster from &ndash; your workstation or a provisioning node &ndash; can be any operating system that the Chef Development Kit (ChefDK) supports &ndash; including Windows, Mac OS, and several flavors of Linux. The installation procedure explains the system requirements in greater detail.

Chef Delivery deploys build artifacts to your Acceptance, Union, Rehearsal, and Delivered stages. For example, you might deploy SQL Server to a Windows Server environment. Or you might deploy web content and other media to an Amazon S3 bucket. In this tutorial, the Acceptance, Union, Rehearsal and Delivered stages host the Customers web application, which runs on Red Hat Enterprise Linux or CentOS.
