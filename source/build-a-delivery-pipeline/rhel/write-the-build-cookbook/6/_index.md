## Skipped phases

There are many other types of tests you can run that we haven't discussed here. For example, the Build stage has a quality phase. You can use this phase to run additional test suites and code analysis tools that are too time consuming to run in the Verify stage. You don't want to run these tests until you know the code is approved.

In many organizations, a suite of security tests must be run before a change can be deployed. The Build phase is a good place to run these tests, as well.

Functional tests can run in the Acceptance, Union, Rehearsal and Delivered stages. These tests should give you confidence that the system is meeting its business requirements.
