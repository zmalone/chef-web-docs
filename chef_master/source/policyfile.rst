=====================================================
About Policyfile
=====================================================
`[edit on GitHub] <https://github.com/chef/chef-web-docs/blob/master/chef_master/source/policyfile.rst>`__

.. tag policyfile_summary

A Policyfile is a way to manage attribute and cookbook data with a single document that is uploaded to the Chef server. The policy is associated with one or more groups of nodes. When these nodes perform a Chef client run, they utilize the Policyfile's run-list.

This page contains information about why you might use Policyfiles. For details of syntax and commands, we have a separate page on `using Policyfiles </using_policyfiles.html>`__.

.. note:: Consider the following before using Policyfiles:

   * Policyfile is not natively supported as part of a Chef Automate workflow
   * Policyfile is intended to be used with Chef server 12.3 or above, and Chef client 12.8 or above

.. end_tag

Why Policyfile?
=====================================================
For many users of Chef, using Policyfiles makes it easier to test and promote code safely. Policyfile improves the user experience and resolves real-world problems that workflows built around Chef must deal with. The following sections discuss in more detail some of the good reasons to use Policyfile, including:

* Safer development workflows
* Streamlined User experience
* Less expensive computation
* Code visibility
* Role mutability
* Cookbook mutability
* Replaces Berkshelf and the environment cookbook pattern

Safer Workflows
-----------------------------------------------------
Policyfile encourages safer workflows by making it easier to publish development versions of cookbooks to the Chef server without the risk of mutating the production versions and without requiring a complicated versioning scheme to work around cookbook mutability issues. Roles are mutable and those changes are applied only to the nodes specified by the policy. Policyfile does not require any changes to your normal workflows. Use the same repositories you are already using, the same cookbooks, and workflows. Policyfile will prevent an updated cookbook or role from being applied immediately to all machines.

Focused System Workflows
-----------------------------------------------------
The knife command line tool maps very closely to the Chef server API and the objects defined by it: roles, environments, run-lists, cookbooks, data bags, nodes, and so on. The chef-client assembles these pieces at run-time and configures a host to do useful work.

Policyfile focuses that workflow onto the entire system, rather than the individual components. For example, Policyfile describes whole systems, whereas each individual revision of the ``Policyfile.lock.json`` file uploaded to the Chef server describes a part of that system, inclusive of roles, environments, cookbooks, and the other Chef server objects necessary to configure that part of the system.

Code Visibility
-----------------------------------------------------
When running Chef without Policyfile, the exact set of cookbooks that are applied to a node is defined by:

* The node's ``run_list`` property
* Any roles that are present in the node's run-list or recursively included by those roles
* The environment, which restricts the set of valid cookbook versions for a node based on a variety of constraint operators
* Dependencies, as defined by each cookbook's metadata
* Dependency resolution picks the "best" set of cookbooks that meet dependency and environment criteria

These conditions are re-evaluated every time the chef-client runs, which can make it harder to know which cookbooks will be run by the chef-client or what the effects of updating a role or uploading a new cookbook will be.

Policyfile simplifies this behavior by computing the cookbook set on the workstation, and then producing a readable document of that solution: a ``Policyfile.lock.json`` file. This pre-computed file is uploaded to the Chef server, and is then used by all of the chef-client runs that are managed by that particular policy group.

Less Expensive Computation
-----------------------------------------------------
When running Chef without Policyfile, the Chef server loads dependency data for all known versions of all known cookbooks, and then runs an expensive computation to determine the correct set.

Policyfile moves this computation to the workstation, where it is done less frequently.

Role Mutability
-----------------------------------------------------
When running Chef without Policyfile roles are global objects. Changes to roles are applied immediately to any node that contains that role in its run-list. This can make it hard to update roles and in some use cases discourages using roles at all.

Policyfile effectively replaces roles. Policyfile files are versioned automatically and new versions are applied to systems only when promoted.

Cookbook Mutability
-----------------------------------------------------
When running Chef without Policyfile, existing versions of cookbooks are mutable. This is convenient for many use cases, especially if users upload in-development cookbook revisions to the Chef server. But this sometimes creates issues that are similar to role mutability by allowing those cookbook changes to be applied immediately to nodes that use that cookbook. Users account for this by rigorous testing processes to ensure that only fully integrated cookbooks are ever published. This process does enforce good development habits, but at the same time it shouldn't be a required part of a workflow that ends with publishing an in-development cookbook to the Chef server for testing against real nodes.

Policyfile solves this issue by using a cookbook publishing API for the Chef server that does not provide cookbook mutability. Name collisions are prevented by storing cookbooks by name and an opaque identifier that is computed from the content of the cookbook itself.

For example, name/version collisions can occur when users temporarily fork an upstream cookbook. Even if the user contributes their change and the maintainer is responsive, there may be a period of time where the user needs their fork in order to make progress. This situation presents a versioning dilemma: if the user doesn't update their own version, they must overwrite the existing copy of that cookbook on the Chef server, wheres if they do update the version number it might conflict with the version number of the future release of that upstream cookbook.

Opaque IDs
+++++++++++++++++++++++++++++++++++++++++++++++++++++
The opaque identifier that is computed from the content of a cookbook is the only place where an opaque identifier is necessary. When working with Policyfile, be sure to:

* Use the same names and version constraints as normal in the ``Policyfile.rb`` file
* Use the same references to cookbooks pulled from Chef Supermarket
* Use the same branch, tag, and revision patterns for cookbooks pulled from git
* Use the same paths for cookbooks pulled from disk

Extra metadata about the cookbook is stored and included in Chef server API responses and in the ``Policyfile.lock.json`` file, including the source of a cookbook (Chef Supermarket, git, local disk, etc.), as well as any upstream idenfiers, such as git revisions. For cookbooks that are loaded from the local disk that are in a git repo, the upstream URL, current revision ID, and the state of the repo are stored also.

The opaque identifier is mostly behind the scenes and is only visible once published to the Chef server. Cookbooks that are uploaded to the Chef server may have extended version numbers such as ``1.0.0-dev``.

Environment Cookbooks
-----------------------------------------------------
Policyfile replaces the environment cookbook pattern that is often required by Berkshelf, along with a dependency solver and fetcher. That said, Policyfile does not replace all Berkshelf scenarios.

A Policyfile Workflow
=====================================================

