---
title: 'Chef Training Lab'
order: 7
description: 'Chef Training Lab'
keywords: 'chef, fundamentals, overview, webinar'
---

### Training Lab Requirements:

You will need a server or virtual machine in order to complete the training lab exercises.  There are two different options that you may use.

* [Chef Training Lab](#usethecheftraininglab) - (recommended)
* [Your own virtual machine](#bringyourownvirtualmachine)

To participate in the labs for modules [2][spring-fund-week-2], [3][spring-fund-week-3], [4][spring-fund-week-4], [5][spring-fund-week-5], and [6][spring-fund-week-6], you will need the following:

- Host name or IP address of your training lab server
- SSH username
- SSH password

##### Use the Chef Training Lab

The easiest and recommended way to complete the exercises is to [launch the Chef Training Lab][launch-training-lab].

Here's what happens next:

After [launching the Chef Training Lab][launch-training-lab], you will be taken to a registration page for CloudShare (the virtual training lab platform we are working with).

![registration page](/assets/images/quickstart/nodes/cloud-share/sign-up.png)

Once the sign up form is completed you will enter the environment. The status bar at the top will let you know that a VM is being provisioned for you.

Once provisioned, the **Start Using This Environment** button will light up. Click it.

![start using environment](/assets/images/quickstart/nodes/cloud-share/centos-start-environment.png)

You will see a CentOS 6.3 Server VM listed in the window. Click **More details** to get the required information about this VM.

![more details](/assets/images/quickstart/nodes/cloud-share/centos-more-details.png)

Write down the **External Address** for the VM and click **show password** to display the SSH user's password.

![show password](/assets/images/quickstart/nodes/cloud-share/centos-show-password.png)

Write down the **Username** and **Password** that are displayed.

You should now have the following details about your Chef Training Lab:

* External address
* SSH username
* SSH password


##### Bring your own Virtual Machine

If you'd rather not use the [Chef Training Lab](#usethecheftraininglab), you may use your own VM or server. It must meet the following criteria:

- CentOS 6+
- 512 MB RAM
- 8 GB Disk
- sudo or root level permissions


[spring-fund-week-1]: /screencasts/spring-fundamentals/week-1
[spring-fund-week-2]: /screencasts/spring-fundamentals/week-2
[spring-fund-week-3]: /screencasts/spring-fundamentals/week-3
[spring-fund-week-4]: /screencasts/spring-fundamentals/week-4
[spring-fund-week-5]: /screencasts/spring-fundamentals/week-5
[spring-fund-week-6]: /screencasts/spring-fundamentals/week-6
[chef-lab]: /screencasts/spring-fundamentals/chef-lab
[discussion-forum]: https://groups.google.com/d/forum/learnchef-fundamentals-webinar
[survey]: http://evocalize.com/consumer/survey/chef/springwebinar-2
[launch-training-lab]: http://opscode-cheflab.herokuapp.com/labs/learnchef/centos/attend
