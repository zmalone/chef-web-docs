We publish public AMIs on EC2 that may be used for these tutorials. Here's how to get one set up:

Pick an AMI:

* Public RHEL AMI (<a href="https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Images:filter=all-images;platform=all-platforms;visibility=public-images;search=ami-212c3c48" target="_blank">ami-212c3c48</a>) in the US East (N. Virginia) Region
* Public Ubuntu AMI (<a href="https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Images:filter=all-images;platform=all-platforms;visibility=public-images;search=ami-0521316c" target="_blank">ami-0521316c</a>) in the US East (N. Virginia) Region
* Public Windows Server 2012 AMI (<a href="https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Images:filter=all-images;platform=all-platforms;visibility=public-images;search=ami-b39989da" target="_blank">ami-b39989da</a>) in the US East (N. Virginia) Region

An *m1.small* class EC2 instance should be sufficient. Create the instance in
the EC2 web console or using your preferred tool. Get the public hostname of the
instance. Make sure this instance is in a security group that has ports 22 and
80-90 open.
