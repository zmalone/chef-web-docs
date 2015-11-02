## Skipped phases

There are many other types of tests you can run that we haven't discussed here. For example, the Build stage has a quality phase. You can use this phase to run additional test suites and code analysis tools that are too time consuming to run in the Verify stage. You don't want to run these tests until you know the code is approved.

In many organizations, a suite of security tests must be run before a change can be deployed. The Build phase is a good place to run these tests, as well.

Functional tests can run in the Acceptance, Union, Rehearsal and Delivered stages. These tests should give you confidence that the system is meeting its business requirements.

Even when a phase does no work, it still takes time for its recipe to run. You can omit phases entirely from the pipeline by including them in the `skip_phases` portion of your project's configuration file, located at <code class="file-path">~/Development/deliver-customers-rhel/.delivery/config.json</code>.

Here's an example that skips the phases we haven't discussed here &ndash; quality, security, and functional.

```ruby
# ~/Development/deliver-customers-rhel/.delivery/config.json
{
  "version": "2",
  "build_cookbook": {
    "name": "build-cookbook",
    "path": ".delivery/build-cookbook"
  },
  "skip_phases": ["quality", "security", "functional"],
  "build_nodes": {},
  "dependencies": []
}
```

Your changes will move more quickly through the pipeline because the phases are skipped.

![](delivery/skip-phases.png)
