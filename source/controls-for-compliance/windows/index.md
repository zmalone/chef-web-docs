---
title: 'Audit a Windows Server node for compliance'
layout: lesson-overview
platform: 'Windows Server'
logo: windows.svg
order: 3
---
Whether you must comply with regulatory frameworks such as PCI, HIPAA, or Dodd-Frank, or you have internal company standards you must meet, adhering to your compliance policies helps you deliver safe, secure applications and services.

Meeting the challenge of compliance requires both planning and action, and can be broken down into these stages:

* **Analyze** &mdash; Be clear about your compliance requirements and the desired state of your infrastructure.
* **Specify** &mdash; Translate your desired state into a formal language that precisely specifies your requirements.
* **Test** &mdash; Verify whether the actual state of your infrastructure meets the desired state. Automated tests scale better than manual tests, and can be written even before a new software system or service is developed to provide a clear set of standards that must be met.
* **Certify** &mdash; Although not always required, many compliance processes require a final human sign off. The better your tests, the shorter the certification step can be.

With Chef, you write code to describe the desired state of your infrastructure. When Chef runs, it applies the configuration only when the current state differs from the desired state.

Chef's [audit mode](https://docs.chef.io/analytics.html#audit-mode) enables you to write _controls_, or automated test code, that check whether your requirements are being met. Like your infrastructure code, you can collaborate on, version, and deploy these controls as part of your production pipeline. Because the tests are automated, you can apply them repeatedly, giving you increased confidence that even minor changes won't break any compliance rules.  

You can run audit mode alone or you can use it along with Chef Analytics. In [Get started with Chef Analytics](/get-started-with-chef-analytics/linux/), you learned how Chef Analytics provides visibility into what's happening on your Chef server. If you use Chef Analytics with audit mode, you can write Chef Analytics rules that automatically notify the relevant people and services if an audit run exposes a problem.

<img src="/assets/images/networks/analytics.png" style="width: 100%; box-shadow: none;" alt="Your workstation, Chef server, Chef Analytics, and nodes" />

In this tutorial, you'll first use audit mode to discover an infrastructure change that, while appearing well-intentioned and functional, actually violates your compliance policy. Then you'll connect your audit and infrastructure code to Chef Analytics. Next, you'll write an additional control that highlights the need to repair existing infrastructure and you'll also have Chef Analytics issue an alert when the audit fails.

After completing this lesson, you'll be able to:

* write and apply controls, both to a local virtual machine and to a node bootstrapped to your Chef server.
* verify and resolve audit failures.
* use Chef Analytics to create alerts that signal when your infrastructure falls out of compliance.

[GITHUB] The final code for this tutorial is available [on GitHub](https://github.com/learn-chef/controls-for-compliance-windows).

Let's get started by ensuring you're all set up.
