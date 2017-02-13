In this tutorial, you set up a Chef compliance scanner and scanned a Windows Server 2012 R2 server against the predefined CIS Security Benchmarks.

At the [beginning of the tutorial](/tutorials/compliance-assess/windows/bring-your-own-system/), we proposed 5 stages for keeping your infrastructure in compliance. Let's review them.

* **Analyze**
* **Specify**
* **Test**
* **Remediate**
* **Certify**

You've already covered 3 of these 5 stages.

In the Analyze stage, you define your compliance requirements. In this tutorial, this means adhering to the CIS Security Benchmarks.

In the Specify stage, you translate your requirements into a formal language. The Chef compliance scanner does this for you by providing tests for the CIS Security Benchmarks. In the next tutorial, you'll learn about the testing framework the Chef compliance scanner uses, called [InSpec](http://inspec.io).

In the Test stage, you run the automated tests to see how closely your servers adhere to compliance. In this tutorial, you ran a compliance scan and noted which tests passed and which tests failed.

Knowing the state of your servers is a great first step towards meeting your compliance goals. In the next tutorial, [Remediate compliance failures​](/tutorials/compliance-remediate/windows/), you'll build upon this tutorial by implementing the Remediate stage, using the **Password Settings: Password Complexity** rule you saw in this tutorial as an example. You'll start by learning how to replicate and remediate the failure on a local virtual machine. Then you'll learn how to apply the remediation to your Windows Server 2012 R2 node and verify that the rule passes.
