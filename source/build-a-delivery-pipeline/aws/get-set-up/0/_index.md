## The systems you'll use

Your setup will include these systems:

* A _Delivery cluster_, which are the machines that make up a Chef Delivery setup. At a minimum, a Delivery cluster includes Chef Delivery, Chef server, one build node, and environments to run your Acceptance, Union, Rehearsal, and Delivered stages. Your Chef Delivery, Chef server, and build node each runs on its own server.
* A machine from which you install and manage your Delivery cluster. This can be your workstation or what's called a _provisioning node_.
* Your workstation, from which you'll create the project, write the build cookbook, and add new features to the Customers web application.

You have flexibility in choosing the platform that runs many of these systems. They do not all need to match.

Chef Delivery, Chef server, and your build node can run on Red Hat Enterprise Linux or Ubuntu. The installation procedure explains the system requirements in greater detail.

The machine you install and manage your Delivery cluster from &ndash; your workstation or a provisioning node &ndash; can be any operating system that the Chef Development Kit (ChefDK) supports &ndash; including Windows, Mac OS, and several flavors of Linux. The installation procedure explains the system requirements in greater detail.

Chef Delivery deploys build artifacts to your Acceptance, Union, Rehearsal, and Delivered stages. For example, you might deploy SQL Server to a Windows Server environment. Or you might deploy web content and other media to an Amazon S3 bucket. In this tutorial, the Acceptance, Union, Rehearsal and Delivered stages host the Customers web application, which runs on Red Hat Enterprise Linux or CentOS.
