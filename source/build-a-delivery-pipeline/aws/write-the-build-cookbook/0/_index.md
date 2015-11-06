## Gather information about your AWS environment

In this lesson, you'll write automation code to provision the infrastructure environments for the Acceptance, Union, Rehearsal and Delivered stages.

In [an earlier lesson](install-chef-delivery#step3), you or your administrator gathered information about your AWS environment. You'll need that information here. Specifically, you'll need:

* Your AWS credentials (access key and secret key).
* An SSH private key that can be used to connect to the stage environments. Private keys are typically in .pem format.
* The region that the credentials are configured to use, for example, us-west-2.
* The AMI ID in your region for Red Hat Enterprise Linux 6.5 or CentOS 6.5, for example, ami-b6bdde86.
* The security group ID that permits inbound network access on ports 22 (SSH), 80 (HTTP), and 443 (HTTPS). An example security group ID is sg-cbacf8ae.
* The subnet ID that you used to create the Delivery cluster. An example subnet ID is subnet-19ac017c.

You can get this information from your administrator if you did not perform the installation.

[COMMENT] Also note that in this part you'll encrypt data and upload that data to your Chef server. The encryption key exists on the administrator's workstation or provisioning node that was used to install Chef Delivery. If you did not perform the installation, you'll need to work with your administrator to encrypt and upload the data.
