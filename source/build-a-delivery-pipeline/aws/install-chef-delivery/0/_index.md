## The installation at a glance

This tutorial creates infrastructure in AWS and depends on at least one local workstation outside of AWS. Here's a diagram:

![](delivery/delivery-scenario-architecture.svg)

The diagram breaks down into these parts:

**Delivery cluster** &ndash; These are the machines that make up a Chef Delivery installation.

At a minimum, a Delivery cluster includes Chef Delivery, Chef server, one build node, and environments to run the Acceptance, Union, Rehearsal, and Delivered stages. A Delivery cluster can also include a Chef Supermarket or a Chef Analytics server, which are outside the scope of this tutorial.

By default, the automation you'll run installs Chef Delivery, Chef server, and your build nodes on 64-bit Ubuntu 14.04 instances.

**Acceptance, Union, Rehearsal, and Delivered environments** &ndash; Delivery deploys build artifacts, or the pipeline's final output, to these environments.

For example, you might deploy SQL Server to a Windows Server environment. Or you might deploy web content and other media to an Amazon S3 bucket. In this tutorial, the Acceptance, Union, Rehearsal and Delivered stages are where you'll run the `awesome_customers` cookbook. In other words, these environments host the web application. The Customers application runs on Red Hat Enterprise Linux or CentOS.

**Administrator's workstation** &ndash; This is the machine from where an administrator installs and manages the Delivery cluster. This can be an administrator's workstation or a server on AWS with SSH access.

**Team member's workstation** &ndash; Users accesses Delivery from their workstations. Common tasks include creating projects and writing build cookbooks, submitting new features to the pipeline, and reviewing and approving changes that others submit.
