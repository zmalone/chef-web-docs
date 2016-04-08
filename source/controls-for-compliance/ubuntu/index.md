---
title: 'Audit an Ubuntu node for compliance'
layout: lesson-overview
platform: 'Ubuntu'
logo: ubuntu.svg
order: 3
meta_tags: [{name: "ROBOTS", content: "NOINDEX, NOFOLLOW"}]
---
Whether you must comply with regulatory frameworks such as PCI, HIPAA, or Dodd-Frank, or you have internal company standards you must meet, adhering to your compliance policies helps you deliver safe, secure applications and services.

Meeting the challenge of compliance requires both planning and action, and can be broken down into these stages:

* **Analyze** &mdash; Be clear about your compliance requirements and the desired state of your infrastructure.
* **Specify** &mdash; Translate your desired state into a formal language that precisely specifies your requirements.
* **Test** &mdash; Verify whether the actual state of your infrastructure meets the desired state. Automated tests scale better than manual tests, and can be written even before a new software system or service is developed to provide a clear set of standards that must be met.
* **Certify** &mdash; Although not always required, many compliance processes require a final human sign off. The better your tests, the shorter the certification step can be.

Think about your current compliance and audit process. How can you _prove_ that the actual state of your infrastructure meets the desired state?

With Chef, you write code to describe the desired state of your infrastructure. When Chef runs, it applies the configuration only when the current state differs from the desired state. This approach is called _test and repair_.

But compliance is not only about what's _on_ the system, but what's _not_ on the system. For example, a database server in production might have certain requirements around which users can access data and which ports are open, but it may also be required to disallow access to services such as FTP and Telnet.

Chef's [audit mode](https://docs.chef.io/analytics.html#audit-mode) enables you to write _controls_, or automated test code, that check whether your requirements are being met. Like your infrastructure code, you can collaborate on, version, and deploy these controls as part of your production pipeline. Because the tests are automated, you can apply them repeatedly, giving you increased confidence that even minor changes won't break any compliance rules.  

You can run audit mode alone or you can use it along with Chef Analytics. In [Get started with Chef Analytics](/get-started-with-chef-analytics/linux/), you learned how Chef Analytics provides visibility into what's happening on your Chef server. If you use Chef Analytics with audit mode, you can write Chef Analytics rules that automatically notify the relevant people and services if an audit run exposes a problem.

<img src="/assets/images/networks/analytics.png" style="width: 100%; box-shadow: none;" alt="Your workstation, Chef server, Chef Analytics, and nodes" />

Audit mode also acts as a form of documentation. The audit tests formally define the requirements, and from the output you can generate reports that prove whether the actual state of your infrastructure meets those requirements.

You can use audit mode in environments that are not managed by Chef. You can start by using audit mode in your existing infrastructure to discover audit failures. As a second step, you can write Chef code that address those audit failures. Chef's test and repair approach helps ensure that your servers stay in compliance, and you'll have repeatable tests that you can run to prove it.

In this tutorial, you'll first use audit mode to discover an infrastructure change that, while appearing well-intentioned and functional, actually violates your compliance policy. Then you'll connect your audit and infrastructure code to Chef Analytics. Next, you'll write an additional control that highlights the need to repair existing infrastructure and you'll also have Chef Analytics issue an alert when the audit fails.

After completing this lesson, you should be able to:

* write and apply controls, both to a local virtual machine and to a node bootstrapped to your Chef server.
* verify and resolve audit failures.
* use Chef Analytics to create alerts that signal when your infrastructure falls out of compliance.

[GITHUB] The final code for this tutorial is available on [GitHub](https://github.com/learn-chef/controls-for-compliance-ubuntu).

Let's get started by ensuring you're all set up.
