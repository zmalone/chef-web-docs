In this tutorial, you used Chef to remediate a failure of one of the predefined rules in the CIS Security Benchmarks.

You started with local development using Test Kitchen. Developing your code on local instances helps you to experiment and iterate more quickly.

After verifying that your cookbook properly remediates the compliance failure on a test instance, you uploaded your cookbook to the Chef server and applied the configuration to your node. You then repeated the compliance scan to verify that the firewall configuration satisfies the compliance rule.

At the [start of the previous tutorial](/tutorials/compliance-assess/ubuntu/), we proposed 5 stages that, together, will let you meet your compliance challenges:

* **Analyze**
* **Specify**
* **Test**
* **Remediate**
* **Certify**

With remediation in place, you've successfully completed 4 of these 5 stages. The final stage, **Certify**, depends on your compliance process. The Chef compliance scanner provides automated tests and reports that prove the state of your infrastructure. This independent evidence can greatly decrease the time it takes to receive a final human sign off. Also, when nodes are managed by Chef, you can use automation to repair compliance failures and ensure that the nodes remain within compliance guidelines.

The built-in compliance profiles are a great start, but they may not cover your organization's unique requirements. We're working on a tutorial that teaches you how to write custom compliance profiles. [Follow us on Twitter](https://twitter.com/learnchef) to get the latest updates.

[GITHUB] [Get the code for this tutorial](https://github.com/learn-chef/ufw) on GitHub.

You can also learn more about building a high velocity, highly compliant organization at [complianceatvelocity.com](http://complianceatvelocity.com/).
