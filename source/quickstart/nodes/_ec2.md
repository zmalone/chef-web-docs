We publish public AMIs on EC2 that may be used for these tutorials. Here's how to get one set up:

Pick an AMI:

* Public CentOS AMI ([ami-6283a827](https://console.aws.amazon.com/ec2/v2/home?region=us-west-1#Images:filter=all-images;platform=all-platforms;visibility=public-images;search=ami-6283a827)) in the US West 1a (N. California) Region
* Public Ubuntu AMI ([ami-997356dc](https://console.aws.amazon.com/ec2/v2/home?region=us-west-1#Images:filter=all-images;platform=all-platforms;visibility=public-images;search=ami-997356dc)) in the US West 1a (N. California) Region
* Public Windows Server 2012 AMI ([ami-5eccf31b](https://console.aws.amazon.com/ec2/v2/home?region=us-west-1#Images:filter=all-images;platform=all-platforms;visibility=public-images;search=ami-5eccf31b)) in the US West 1a (N. California) Region

An *m1.small* class EC2 instance should be sufficient. Create the instance in
the EC2 web console or using your preferred tool. Get the public hostname of the
instance. Make sure this instance is in a security group that has ports 22 and
80-90 open.
