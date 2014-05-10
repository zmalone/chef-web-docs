---
title: 'Chef Training Lab'
description: 'Chef Training Lab'
keywords: 'opscode, chef, chef-repo, fundamentals, overview, webinar, template'
---

### Training Lab Requirements:

You will need a server or virtual machine in order to complete the training lab exercises.  There are four different options that you may use.

To participate in the labs for webinar modules [3][week3_webinar], [4][week4_webinar], [5][week5_webinar], and [6][week6_webinar] you will need the following

- Hostname or IP Address of your training lab server
- SSH Username
- SSH Password
- SSH Port (default is 22)

Watch the [Chef Fundamentals Webinar - Training Lab Setup video][youtube-training-lab] for more information on setting up your training lab.

##### Bring your own Node

Use your own Virtual Machine (VM) or Server.  It must meet the following criteria:

- Ubuntu 10.04+
- 512 MB RAM
- 15 GB Disk
- sudo or root level permissions

##### Use the Vagrant Instance from the Starter Kit

The Starter Kit provided by Hosted Enterprise Chef includes a Vagrantfile which can be used to launch a [Vagrant][vagrantup] instance.

##### Launch an instance of a public AMI on EC2

CHEF publishes a public AMI on EC2 that may be used for the training lab.

- Search for 'oc-training-public' (ami-641c8e0d) in the US East (N. Virginia) Region
- m1.small should be sufficient
- Open ports 22, 80-90 in security group

##### Use the BETA Chef Training Lab

CHEF is working with CloudShare to beta test a [Chef training lab][chef-lab].  This lab is intended for use with the Chef Fundamentals Webinar series.  Would you like to help us test this solution?  [Launch your own training lab now][chef-lab]. 

**Reset your BETA Chef Training Lab**

There is a [video on YouTube][youtube-lab-reset] that demonstrates the process of resetting your BETA Chef Training Lab.
If you're using the BETA Chef Training Lab, you may need to [launch a new instance of the lab][chef-lab] before completing [module 5][week5_webinar] or [module 6][week6_webinar].  CHEF is working with CloudShare to beta test a [Chef training lab][chef-lab].  This lab is intended for use with the Chef Fundamentals Webinar series.


[chef-lab]: http://opscode-cheflab.herokuapp.com/labs/fundamentalswebinar/ubuntu/attend
[vagrantup]:  http://vagrantup.com
[youtube-lab-reset]: http://www.youtube.com/watch?v=XJdVXAZ95xE
[youtube-training-lab]: http://www.youtube.com/watch?v=4RrzK1ozitE
[week3_webinar]: /screencasts/fundi-webinar-week-3/
[week4_webinar]: /screencasts/fundi-webinar-week-4/
[week5_webinar]: /screencasts/fundi-webinar-week-5/
[week6_webinar]: /screencasts/fundi-webinar-week-6/
