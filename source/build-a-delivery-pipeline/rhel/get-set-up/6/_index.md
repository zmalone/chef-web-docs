## 6. Prepare your Acceptance, Union, Rehearsal, and Delivered stages

The Acceptance, Union, Rehearsal and Delivered stages are where you'll run the `awesome_customers` cookbook. In other words, these stages host the web application. In this scenario, the web application runs on Red Hat Enterprise Linux 6.5 or CentOS 6.5.

The `delivery-cluster` cookbook sets up your Chef Delivery server and Chef server &ndash; you'll set up the stages in your build cookbook. If you want to run your stages on AWS, you'll need to provide information about your AWS environment. If you prefer to bring up your stages manually, see the requirements listed [below](#ifyou39rebringingupyourstagesmanually).

### If you're using AWS to bring up your stages

Gather this information about your AWS environment.

* Your AWS credentials and the private key you use to connect to EC2 instances.

  Your AWS credentials file is often named <code class="file-path">credentials</code> and looks like this.

  ```ruby
# credentials
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMIqK7MDENGabPxRfiCYEXAMPLEKEY
```

  Your private key is typically in .pem format.

* A region that your credentials file is configured to use, for example, us-west-2.
* An AMI ID in your region for Red Hat Enterprise Linux 6.5 or CentOS 6.5, for example, ami-09f7d239.
* The public or private subnet ID that you use to address EC2 instances. Your subnet must be reachable from your Delivery cluster and your workstation. An example subnet ID is subnet-19ac017c. Also note whether you access EC2 instances by their private or public IP addresses.
* A security group ID (or multiple IDs) that permit inbound network access on ports 22 (SSH), 80 (HTTP), and 443 (HTTPS). An example security group ID is sg-cbacf8ae.

You can create a test Red Hat Enterprise Linux 6.5 or CentOS 6.5 instance to verify that your settings work together.

### If you're bringing up your stages manually

Bring up four Red Hat Enterprise Linux 6.5 or CentOS 6.5 servers, one each for the Acceptance, Union, Rehearsal, and Delivered stages. Ensure that:

* each server is accessible from both your Delivery cluster and your workstation.
* ports 22 (SSH), 80 (HTTP), and 443 (HTTPS) are open to the firewall.
* you have root or `sudo` access to each machine.
* each server is configured to use key-based authentication to connect over SSH. [Learn how to set up SSH keys](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2).
