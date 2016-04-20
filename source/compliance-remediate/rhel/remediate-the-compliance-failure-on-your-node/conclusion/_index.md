In this tutorial, you used Chef to remediate a failure to one of the predefined CIS Security Benchmarks. 

You started with local development using Test Kitchen. Developing your code on local instances helps you to experiment and iterate more quickly. 

After verifying that your cookbook properly remediates the compliance failure on a test instance, you uploaded your cookbook to the Chef server and applied the configuration to your node. You then re-ran the compliance scan to verify that the SSH configuration meets compliacne.

Here are the 5 stages to meeting your compliance challenges that we proposed at the [start of the previous tutorial](/compliance-assess/rhel/):

* **Analyze**
* **Specify**
* **Test**
* **Remediate**
* **Certify**

With remediation in place, you've successfully covered 4 of these 5 stages. The final stage, **Certify**, depends on your compliance process. With Chef Compliance, you have automated testing and reports to prove the state of your infrastructure, which can greatly decrease the time it takes to receive a final human sign off. And because your node is managed by Chef, you can use automation to repair new compliance failures and ensure that remediated failures stay good.

The built-in compliance profiles are a great start, but they may not cover your organization's unique requirements. We're working on a tutorial that teaches you how to write custom compliance profiles. [Follow us on Twitter](https://twitter.com/learnchef) to get the latest updates.

[GITHUB] [Get the code for this tutorial](https://github.com/learn-chef/ssh) on GitHub.

You can also learn more about building a high velocity, highly compliant organization at [complianceatvelocity.com](http://complianceatvelocity.com/).