## 3. Gather information for your team

If you're setting up Chef Delivery for your team, prepare the following information for each user. If you're going through all tutorial steps as an individual, it's still a good idea to note these items for later.

TODO: When you walk through this, verify the steps and give examples as necessary.

* URL for Chef server.
* URL for Chef Delivery.
* Their user name and initial password. (TODO: Make sure we say later to set up ID_RSA and change password.)
* Users will write automation code to provision the infrastructure environments for the Acceptance, Union, Rehearsal and Delivered stages. Users will need the following information about your AWS environment:
  * AWS credentials (access key and secret key)
  * The region that the credentials are configured to use, for example, us-west-2.
  * The AMI ID in your region for Red Hat Enterprise Linux 6.5 or CentOS 6.5, for example, ami-b6bdde86.
  * The Security group ID that permits inbound network access on ports 22 (SSH), 80 (HTTP), and 443 (HTTPS). An example security group ID is sg-cbacf8ae.
  * The subnet ID that you used to create the Delivery cluster. An example subnet ID is subnet-19ac017c.
  * An SSH private key that can be used to connect to the stage environments. Private keys are typically in .pem format.
* Also ensure that each user can access the VPN.
