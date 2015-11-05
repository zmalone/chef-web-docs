## 2. Plan the installation

This tutorial creates infrastructure in AWS and depends on at least one local workstation outside of AWS. Here's a diagram:

TODO: insert overview of final topology, including workstations, servers, VPN connections and VPC. Indicate on premises vs in the cloud. Also, below, add links to AWS documentation.

The diagram breaks down into these parts:

**Delivery cluster** &ndash; These are the machines that make up a Chef Delivery installation.

At a minimum, a Delivery cluster includes Chef Delivery, Chef server, one build node, and environments to run the Acceptance, Union, Rehearsal, and Delivered stages. A Delivery cluster can also include a Chef Supermarket or a Chef Analytics server, which are outside the scope of this tutorial.

By default, the automation you'll run installs Chef Delivery, Chef server, and your build nodes on 64-bit Ubuntu 14.04 instances.

**Acceptance, Union, Rehearsal, and Delivered environments** &ndash; Delivery deploys build artifacts, or the pipeline's final output, to these environments.

For example, you might deploy SQL Server to a Windows Server environment. Or you might deploy web content and other media to an Amazon S3 bucket. In this tutorial, Acceptance, Union, Rehearsal and Delivered are servers that host the Customers web application. The Customers application runs on Red Hat Enterprise Linux or CentOS.

**A workstation or provisioning node** &ndash; This is the machine from where an administrator installs and manages the Delivery cluster. This can be an administrator's workstation or a server on AWS with SSH access.

**User workstations** &ndash; Users accesses Delivery from their workstations. Common tasks include creating projects and writing build cookbooks, submitting new features to the pipeline, and reviewing and approving changes that others submit.

All of the servers and workstations will be in the same private network. The easiest way to achieve this is to use a VPN connection to an [AWS Virtual Private Cloud (VPC) subnet](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html#create-a-vpc). Many companies already have a VPN in place to AWS. It is not recommended that you use a public AWS subnet with this tutorial.

In addition to an AWS subnet ID that is reachable by a VPN connection from your workstation, you'll also need the following AWS information to perform the installation:

* Your AWS region
* AWS credentials (access key ID and secret access key)
* Private key-pair name and private key
* AWS AMIs and instance types
* An AWS security group

### AWS region

Your AWS Virtual Private Cloud exists in an [AWS region](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html), such as us-west-2.

### AWS credentials

You will need an AWS access key ID and an AWS secret access key to create the AWS infrastructure. These keys are typically obtained through [IAM roles](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/UsingIAM.html).

### Private key name

When you create the servers in the Chef Delivery cluster, you'll need to specify an [AWS private key name](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) for SSH access to these servers.

### AWS AMI and instance types

For this tutorial, your Chef Delivery cluster will include a Chef server, a Chef Delivery server, one or more build nodes, and the Acceptance, Union, Rehearsal, and Delivered environments to run your web application. We recommend these [instance types](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html):

| Instance               | Type      |
|------------------------|:---------:|
| Chef Delivery server   | c3.xlarge |
| Chef server            | c3.xlarge |
| build node             | c3.large  |
| web application server | t2.micro  |

During installation, you'll be asked to provide an [AMI ID](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instances-and-amis.html
) for the Chef server, Chef Delivery server and build nodes you will create. Although you can choose other OSes, this tutorial has been tested on 64-bit Ubuntu 14.04 servers. Here is a table of AMI IDs for the Ubuntu server for each AWS region.

| AWS region            | AMI          |
|-----------------------|--------------|
| ap-northeast-1        | ami-e74b60e6 |
| ap-southeast-1        | ami-d6e7c084 |
| ap-southeast-2        | ami-1711732d |
| eu-west-1             | ami-f0b11187 |
| sa-east-1             | ami-69d26774 |
| us-east-1             | ami-9eaa1cf6 |
| us-west-1             | ami-076e6542 |
| us-west-2             | ami-3d50120d |

[Source](http://cloud-images.ubuntu.com/releases/14.04/release-20140927/published-ec2-release.txt.orig)

If you want to use other server types, see the README file of the [delivery-cluster cookbook](https://github.com/chef-cookbooks/delivery-cluster) for options.

Later in this tutorial, you'll need one AMI ID to bring up your Acceptance, Union, Rehearsal, and Delivered environments. Here is a table of AMI IDs for CentOS 6.5 for each AWS region.

| AWS region            | AMI          |
|-----------------------|--------------|
| ap-northeast-1        | ami-81294380 |
| ap-southeast-1        | ami-a08fd9f2 |
| ap-southeast-2        | ami-e7138ddd |
| eu-west-1             | ami-42718735 |
| sa-east-1             | ami-7d02a260 |
| us-east-1             | ami-8997afe0 |
| us-west-1             | ami-1a013c5f |
| us-west-2             | ami-b6bdde86 |

You can use Red Hat Enterprise Linux 6.5 if you prefer.

### AWS security group

Before you install, you'll need to create an AWS security group with these settings. These settings will be applied to your Chef server, Chef Delivery server, and your build nodes.

| Ports       | Protocol | Source    |
|:-----------:|----------|-----------|
| 80          | tcp      | 0.0.0.0/0 |
| 10012-10013 |	tcp      | 0.0.0.0/0 |
| 6443        | tcp      | 0.0.0.0/0 |
| 4321        | tcp      | 0.0.0.0/0 |
| 5672        | tcp      | 0.0.0.0/0 |
| 9683        | tcp      | 0.0.0.0/0 |
| 8080-8099   | tcp      | 0.0.0.0/0 |
| 909         | tcp      | 0.0.0.0/0 |
| 808         | tcp      | 0.0.0.0/0 |
| 8989        | tcp      | 0.0.0.0/0 |
| 389         |	tcp      | 0.0.0.0/0 |
| 3389        | tcp      | 0.0.0.0/0 |
| 443         |	tcp      | 0.0.0.0/0 |
| -1          |	icmp     | 0.0.0.0/0 |
| 5985        | tcp      | 0.0.0.0/0 |
| 9000        | tcp      | 0.0.0.0/0 |
| 8000        | tcp      | 0.0.0.0/0 |
| 22          |	tcp      | 0.0.0.0/0 |
| 10000-10003 | tcp      | 0.0.0.0/0 |
| 8089        | tcp      | 0.0.0.0/0 |
| 7080        | tcp      | 0.0.0.0/0 |
| 5986        | tcp      | 0.0.0.0/0 |
| 3269        | tcp      | 0.0.0.0/0 |
| 1337        | tcp      | 0.0.0.0/0 |

[WARN] This security group does not use "least privilege." In other words, the automation you'll run applies the same security group to all systems. It is only appropriate for use within a private subnet of a VPC.

For your Acceptance, Union, Rehearsal, and Delivered environments, which you'll create later in this tutorial, you can use the security group that you just created, or create a new one that permits inbound network access on these ports:

| Ports       | Protocol | Source    |
|:-----------:|----------|-----------|
| 22          |	tcp      | 0.0.0.0/0 |
| 80          | tcp      | 0.0.0.0/0 |
| 443         |	tcp      | 0.0.0.0/0 |
