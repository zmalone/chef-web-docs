In this tutorial, you set up a Chef Compliance server and scanned a CentOS 7 server, or _node_, against the predefined CIS Security Benchmarks. 

Let's revisit the 5 stages to meeting your compliance challenges that we proposed at the [start of this tutorial](/compliance-assess/rhel/):

* **Analyze**
* **Specify**
* **Test**
* **Remediate**
* **Certify**

You've already covered 3 of these 5 stages.

In the Analyze stage, you define your compliance requirements. In this tutorial, this means adhereing to the CIS Security Benchmarks.

In the Specify stage, you translate your requirements into a formal language. Chef Compliance does this for you by providing tests for the CIS Security Benchmarks. In the next tutorial, you'll learn about the testing framework Chef Compliance uses, called [InSpec](https://www.chef.io/inspec/).

In the Test stage, you run the automated tests to see how closely your servers adhere to compliance. In this tutorial, you ran a compliance scan and noted which tests passed and which tests failed and may require further action.

Knowing the state of your servers is a great first step towards meeting your compliance goals. In the next tutorial, [Remediate compliance failures](compliance-remediate/rhel/), you'll build upon this tutorial by implementing the Remediate stage, using the **Set SSH Protocol to 2** rule as an example. You'll start by learning how to replicate and remediate the failure on a local virtual machine. Then you'll learn how to apply the remedation to your CentOS 7 node and verify that the rule passes. 

You can also learn more about building a high velocity, highly compliant organization at [complianceatvelocity.com](http://complianceatvelocity.com/).