---
title: 'Learn to build a continuous delivery pipeline for Red Hat Enterprise Linux with Chef Delivery'
layout: lesson-overview
platform: Red Hat Enterprise Linux
logo: redhat.svg
order: 1
---
[PRODNOTE] What's the earliest place we need to tell folks that they'll need a lic key? We say on the next page that you can sign up for a temporary one...

In the previous tutorials, you built a cookbook named `awesome_customers` to configure a basic but complete web application named Customers that uses Apache web server, a MySQL database, and PHP scripting.

* In [Learn to manage a basic web application](/manage-a-web-app/rhel), you built the web application iteratively by writing the cookbook on your workstation, uploading the cookbook to your Chef server, applying the cookbook to your node, and manually verifying the result.
* In [Learn to develop your infrastructure code locally](/local-development/rhel/), you learned how [Test Kitchen](http://kitchen.ci) can speed up the feedback cycle by enabling you to run the web application in an isolated environment that resembles your production environment.
* In [Learn to test your infrastructure code](/test-your-infrastructure-code/rhel), you learned how to speed up the feedback cycle even more by writing automated tests that verify the correctness, style, and behavior of your cookbook.

The Customers application looks like this:

![the Customers web application](/assets/images/misc/webapp_result.png)

Starting with local development and testing gives you confidence that your cookbooks behave like you expect in production, but how will you move your work from your development environment all the way to your production environment safely and at greater speed?

[PRODNOTE] Add the case for Delivery V.

<img src="/assets/images/networks/workstation-vm.png" style="width:40%; box-shadow: none;" alt="The Chef Delivery workflow" />

[PRODNOTE] Replace the image ^ with one for Delivery.

In this tutorial, you'll use Chef Delivery to build a continuous delivery pipeline that publishes the Customers web application to a fictitious production environment.

After completing this tutorial, you'll:

* have a working Chef Delivery installation and have your workstation configured to use it.
* know how to write a _build cookbook_ that [XYZ].
* understand each phase of the Chef Delivery pipeline.
* understand how to flow changes from your workstation all the way to your production environment.

You'll get started by setting up a Chef Delivery system and configuring your workstation to [work with it].

[GITHUB] After you complete this tutorial, you can refer back to the final version of the code on [GitHub](https://github.com/learn-chef/build-a-delivery-pipeline).
