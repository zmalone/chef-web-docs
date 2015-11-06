## 3. Gather information for your team

If you're setting up Chef Delivery for your team, prepare the following information for each user. If you're going through all tutorial steps as an individual, it's still a good idea to note these items for later.

* The Chef server URL, for example, https://10.194.13.167/organizations/test, and logon information.
* The Chef Delivery web interface URL, for example, https://10.194.9.174/e/test/.
* Each user's name and initial password.

Users will write automation code to provision the infrastructure environments for the Acceptance, Union, Rehearsal and Delivered stages. Users will need the following information about your AWS environment:

* AWS credentials (access key and secret key).
* An SSH private key that can be used to connect to the stage environments. Private keys are typically in .pem format.
* The region that the credentials are configured to use, for example, us-west-2.
* The AMI ID in your region for Red Hat Enterprise Linux 6.5 or CentOS 6.5, for example, ami-b6bdde86.
* The security group ID that permits inbound network access on ports 22 (SSH), 80 (HTTP), and 443 (HTTPS). An example security group ID is sg-cbacf8ae.
* The subnet ID that you used to create the Delivery cluster. An example subnet ID is subnet-19ac017c.

Also ensure that each user can access the VPN.
