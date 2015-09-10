## 4. Prepare your AWS account

You'll use Test Kitchen to create an EC2 instance later in this tutorial. For now, let's ensure you have everything you'll need to create and connect to your instance.

In this part, you'll:

* [Get your IAM user name](#getyouriamusername)
* [Create your credentials file](#createyourcredentialsfile)
* [Note your region and availability zone](#noteyourregionandavailabilityzone)
* [Add your VPC subnet](#addyourvpcsubnet)
* [Create a security group](#createasecuritygroup)
* [Get the AMI ID for Windows Server 2012 R2 in your region](#gettheamiidforwindowsserver2012r2inyourregion)
* [Prepare your key pair file](#prepareyourkeypairfile)

You can use this table as a checklist of the things you'll need.

| Item                                                         | Example |
|-------------------------------------------------------------:|-------------|
| <i class='fa fa-square-o'></i>&nbsp; IAM user name                 | jsmith |
| <i class='fa fa-square-o'></i>&nbsp; AWS credentials file          | See [example](#createyourcredentialsfile) |
| <i class='fa fa-square-o'></i>&nbsp; Region and availability zone  | us-east-1b |
| <i class='fa fa-square-o'></i>&nbsp; VPC subnet ID                 | subnet-eacb348e |
| <i class='fa fa-square-o'></i>&nbsp; Security group ID             | sg-2d3b3b48 |
| <i class='fa fa-square-o'></i>&nbsp; Windows Server 2012 R2 AMI ID  | ami-c3b3b1f3 |
| <i class='fa fa-square-o'></i>&nbsp; AWS key pair file              | See [example](#prepareyourkeypairfile) |

### Get your IAM user name

Note your [IAM](http://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html#intro-accessing) user name. If you're unsure what your user name is, the [AWS documentation](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html#cli-signup) explains how to get it.

### Create your credentials file

There are [a few ways](https://github.com/test-kitchen/kitchen-ec2#authenticating-with-aws) to authenticate with AWS from Test Kitchen. One way is to write your AWS secret access key to a <code class="file-path">credentials</code> file on your workstation.

If you're using Linux or Mac OS for your workstation, add the following to <code class="file-path">~/.aws/credentials</code>. If you're using Windows, add it to <code class="file-path">%USERPROFILE%\\.aws\\credentials</code>. Replace `ACCESS_KEY` and `SECRET_KEY` [with your values](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html#cli-signup).

```ruby
# ~/.aws/credentials
[default]
aws_access_key_id = ACCESS_KEY
aws_secret_access_key = SECRET_KEY
```

[This blog post](http://blogs.aws.amazon.com/security/post/Tx3D6U6WSFGOK2H/A-New-and-Standardized-Way-to-Manage-Credentials-in-the-AWS-SDKs) explains how central AWS credential storage works in more detail.

### Note your region and availability zone

Note the [region and availability zone](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) where you want your instances to exist, for example, `us-east-1b`.

### Add your VPC subnet

[Add a subnet to your VPC](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Subnets.html) if you don't have one and note its name, for example, `subnet-eacb348e`.

### Create a security group

When you launch an instance, you associate one or more [security groups](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html) with the instance.

Ensure that you have security groups available in your region that allow inbound access on these ports:

* **80** (HTTP)
* **5985** and **5986** (WinRM)
* **3389** (RDP)

### Get the AMI ID for Windows Server 2012 R2 in your region

Get the AMI ID for Windows Server 2012 R2 for your region from the [AWS Marketplace](https://aws.amazon.com/marketplace/ordering?productId=14155a75-ae7c-45a5-9f89-67d49e81471a&ref_=dtl_psb_continue).

From the **Manual Launch** tab, select the ID for your region.

![Windows Server 2012 R2 on AWS Marketplace](misc/AWS_Marketplace__Microsoft_Windows_Server.png)

[COMMENT] The ID changes when a new AMI is released with security updates, so be sure to get the latest ID from the AWS Marketplace.

### Prepare your key pair file

You'll need an EC2 key pair file on your workstation so that Test Kitchen can retrieve the password for your Windows instance.

If you don't have your key pair file set up, [the AWS documentation](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-keypair.html) shows you how.
