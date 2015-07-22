---
title: 'Implement controls for compliance on Ubuntu'
layout: lesson-overview
platform: 'Ubuntu'
logo: ubuntu.svg
order: 3
---
Whether you already observe standards such as Sarbanes–Oxley, HIPAA, or Dodd-Frank, or are preparing for regulation, adhering to your organization's compliance policy helps you deliver safe and secure applications and services.

Meeting the challenge of compliance requires both planning and action, and can be broken down into these stages:

* **Analyze** &mdash; Be clear about your compliance requirements and the desired state of your infrastructure.
* **Specify** &mdash; Translate your desired state into a formal language that specifies your requirements precisely.
* **Test** &mdash; Verify whether the actual state of your infrastructure meets the desired state. Automated tests scale better than manual tests, and can be written and even before a new software system or service is developed to provide a clear set of standards that must be met.
* **Certify** &mdash; Although not always required, many compliance processes require a final human sign off. The better your tests, the shorter the certification step can be.

With Chef, you write code to describe the desired state of your infrastructure. When Chef runs, it applies the configuration only when the current state differs from the desired state.

Chef's [audit mode](https://docs.chef.io/analytics.html#audit-mode) enables you to write _controls_, or automated test code, that check whether your requirements are being met. Like your infrastructure code, you can collaborate on, version, deploy these automated tests as part of your production pipeline. And because they're automated, you can apply them repeatedly, giving you increased confidence that even minor changes won't break compliance.  

In [Get started with Chef Analytics](/get-started-with-chef-analytics/linux/), you learned how Chef Analytics provides visibility into what's happening on your Chef server. You can apply similar rules and notifications when you audit your infrastructure. If an audit run exposes a problem, Chef Analytics automatically notifies the relevant people and services.

<img src="/assets/images/networks/analytics.png" style="width: 100%; box-shadow: none;" alt="Your workstation, Chef server, Chef Analytics, and nodes" />

In this tutorial, you'll use audit mode to discover an infrastructure change that, while appearing well-intentioned and functional, actually violates your compliance policy. Then you'll connect your audit and infrastructure code to Chef Analytics, where you'll write an additional audit rule that highlights the need to repair existing infrastructure.

After completing this lesson, you'll be able to:

* write and apply audit rules, both to a local virtual machine and to a node bootstrapped to your Chef server.
* resolve and verify audit failures.
* create alerts that signal when your infrastructure falls out of compliance.

Let's get started by ensuring you're all set up to run Chef Analytics.
