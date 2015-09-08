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
* **3389** (RDP) (This setting is optional, but it's useful for creating Remote Desktop connections to your instances.)

If you're unable to allow outbound traffic on all ports, ensure that you have a security group that least allows outbound access on port **443** (HTTPS).

### Get the AMI ID for Windows Server 2012 R2 in your region

Get the AMI ID for Windows Server 2012 R2 for your region, for example, `ami-850adbee` for the US East (N. Virginia) region.

| Region                    | Code        | ID |
|--------------------------:|-------------|----|
| Asia Pacific (Tokyo)      | ap-northeast-1 | ami-be9520be |
| Asia Pacific (Singapore)  | ap-southeast-1 | ami-fa9093a8 |
| Asia Pacific (Sydney)     | ap-southeast-2 | ami-d52c6aef |
| EU (Frankfurt)            | eu-central-1 | ami-de4540c3 |
| EU (Ireland)              | eu-west-1 | ami-da357cad |
| South America (Sao Paulo) | sa-east-1 | ami-43f8775e |
| US East (N. Virginia)     | us-east-1 | ami-850adbee |
| US West (N. California)   | us-west-1 | ami-77ee1c33 |
| US West (Oregon)          | us-west-2 | ami-a5b3b195 |

You can also get the ID from the [AWS Marketplace](https://aws.amazon.com/marketplace/pp/B00KQOWEPO/ref=dtl_recsim_B00KQOWCAQ_B00KQOWEPO_1).

### Prepare your key pair file

You'll need an EC2 key pair file on your workstation so that Test Kitchen can retrieve the password for your Windows instance.

If you don't have your key pair file set up, [the AWS documentation](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-keypair.html) shows you how.
