---
title: 'Build a continuous delivery pipeline for Red Hat Enterprise Linux with Chef Delivery'
layout: lesson-overview
platform: Red Hat Enterprise Linux
logo: redhat.svg
order: 1
---
[PRODNOTE] Should we point the reader to our product/pricing page right away? I wouldn't want someone to invest in this tutorial just to find out it's not within reach...

Chef Delivery is a continuous delivery XXX.

* helps transform your idea from inception to production through automation.
* embraces rapid, iterative development.
* starts with local development.
* embraces collaboration.

Chef Delivery provides a common workflow for both applications and infrastructure. The workflow starts with local development, where you add a feature to your application or Chef cookbook and verify that work in a temporary environment, such as a virtual machine, that resembles your production environment. The verification process often includes running automated tests to ensure that your application or cookbook behaves like you expect and meets your quality standards and that any new features don't introduce _regressions_, or break existing functionality.

From there, you submit your code to a build _pipeline_ that consists of a series of _stages_. Each stage XxX.

[SHOW LOCAL DEV => PIPELINE DIAGRAM]

<img src="/assets/images/networks/workstation-vm.png" style="width:40%; box-shadow: none;" alt="The Chef Delivery workflow" />

Each stage breaks down into _phases_. Phases YyY.

[SHOW PHASES DIAGRAM]

<img src="/assets/images/networks/workstation-vm.png" style="width:40%; box-shadow: none;" alt="The Chef Delivery workflow" />

You configure your pipeline by writing a _build cookbook_. A build cookbook defines the &ndash; such as how to run your automated tests and how to deploy your _build artifacts_, or the . Common  build artifact include Chef cookbooks, installation packages, or compressed archive files. Common  _targets_, or destinations, of your build artifacts can include the Chef server, Chef Supermarket (the public one or one that's maintained by your organization), a package or file servers, or a source code repository, such as GitHub.

Your organization can define multiple pipelines that mimic how your business is structured. Each application or cookbook might have its own pipeline. The Union stage stages helps verify that dependencies from one pipeline on another &ndash; for example, when one cookbook depends on another [or a cookbook configures an application] &ndash; that the entire system [works as expected] when a change is made to [any one of them.]

## The scenario

This tutorial builds on the previous ones, where you built a basic but complete web application named _Customers_ that uses Apache web server, a MySQL database, and PHP scripting.

The Customers application that you've built so far looks like this:

![the Customers web application](/assets/images/misc/webapp_result.png)

The way you use Chef Delivery depends on your needs and what kinds of [build artifacts you're creating.] The `awesome_customers` cookbook, which configures the Customers application, demonstrates several commonly-used features that [you'll need to handle in a build pipeline?], such as:

* the use of cookbooks from Chef Supermarket that configure [Apache, MySQL, firewall, PHP, etc.]
* [encrypted data bags](link?) that help [secure] access to database passwords.
* automated tests that verify the correctness, style, and behavior of your cookbook.
* MOAR?

[COMMENT] You don't have to work through the previous tutorial &ndash; we provide all the code you'll need. We'll provide pointers back to the previous tutorials in case you [need to understand how a particular piece works.]

In this tutorial, you'll create a pipeline that [flows] the cookbook through each stage of the delivery pipeline all the way to a [fictitious?] production server. You'll then add two features to the web application &ndash; one that adds additional sample data and one that [displays the data on a map control] &ndash; verify each feature locally, and then[flow] those changes through the pipeline.

This scenario involves two cookbooks &ndash; the `awesome_customers` cookbook that defines how to configure the Customer web application and your build cookbook that defines your build pipeline.

After completing this tutorial, you'll:

* have a working Chef Delivery installation and have your workstation configured to use it.
* know how to write a _build cookbook_ that [XYZ].
* understand each of the stages and phase that make up a delivery pipeline.
* understand how to flow changes from your workstation all the way to your production environment.

You'll get started by setting up a Chef Delivery system and configuring your workstation.

[COMMENT] Chef Delivery requires a license key. We'll invite you to download an evaluation key on the next page.

[GITHUB] After you complete this tutorial, you can refer back to the final version of the code on [GitHub](https://github.com/learn-chef/build-a-delivery-pipeline).

--------

In the previous tutorials, you built a cookbook named  to configure a basic but complete web

* In [Learn to manage a basic web application](/manage-a-web-app/rhel), you built the web application iteratively by writing the cookbook on your workstation, uploading the cookbook to your Chef server, applying the cookbook to your node, and manually verifying the result.
* In [Learn to develop your infrastructure code locally](/local-development/rhel/), you learned how [Test Kitchen](http://kitchen.ci) can speed up the feedback cycle by enabling you to run the web application in an isolated environment that resembles your production environment.
* In [Learn to test your infrastructure code](/test-your-infrastructure-code/rhel), you learned how to speed up the feedback cycle even more by writing automated tests that verify the correctness, style, and behavior of your cookbook.



Starting with local development and testing gives you confidence that your cookbooks behave like you expect in production, but how will you move your work from your development environment all the way to your production environment safely and at greater speed?

[PRODNOTE] Add the case for Delivery V.

[PRODNOTE] Replace the image ^ with one for Delivery.

[PRODNOTE] We should probably add a callout saying where to direct additional questions so we don't get overwhelmed on Disqus.

[PRODNOTE] Judiciously call out that we're testing the `awesome_customers` cookbook and not hte build cookbook.

[PRODNOTE] Mention how you could also test your _app_ code as well &ndash; we're just testing the `awesome_customers` cookbook.

[PRODNOTE] Mention how you might have multiple pipelines &ndash; one for the app code, one for the cookbook. Each would have its own build cookbook.

In this tutorial, you'll use Chef Delivery to build a continuous delivery pipeline that publishes the Customers web application to a fictitious production environment.
