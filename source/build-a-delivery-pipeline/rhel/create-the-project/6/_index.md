## How to delete your project

If you ever need to start over, or you complete the tutorial and want to delete this project, login to your Chef Delivery server and run the `delivery-ctl delete-project` command.

This command takes your enterprise, organization, and project names as arguments, like this.

```bash
$ delivery-ctl delete-project ENTERPRISE ORGANIZATION PROJECT
```

For example, for an enterprise named `chef` and an organization named `learn-chef`, you would run this command to delete the `deliver-customers-rhel` project.

```bash
$ sudo delivery-ctl delete-project chef learn-chef deliver-customers-rhel
Successfully deleted project: 'chef/learn-chef/deliver-customers-rhel'
```

You can get the IP address for your Chef Delivery server by running `rake info:list_core_services` from your <code class="file-path">~/Development/delivery-cluster</code> directory.

```bash
# ~
$ cd ~/Development/delivery-cluster
$ rake info:list_core_services
2 items found

delivery-server-test:
  ipaddress: 10.194.11.99

build-node-test-1:
  ipaddress: 10.194.13.122

chef_server_url      'https://10.194.12.65/organizations/test'
```

From there, you can connect to the server over SSH. For example, if you created your Delivery cluster on AWS, you can connect like this.

```bash
# ~/Development/delivery-cluster
$ ssh -i ~/.ssh/learn_chef.pem ubuntu@10.194.11.99
```
