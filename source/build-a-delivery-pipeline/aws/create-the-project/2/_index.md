## 2. Create the project and the pipeline

The next step is to run `delivery init`. This command:

* creates a project in Chef Delivery, which includes a new Git repository.
* initializes the `master` branch in Delivery's Git repo from the existing `master` branch that you just cloned.
* creates a branch named `add-delivery-config`, which is based off of `master`.
* creates the <code class="file-path">.delivery</code> directory and adds to it an empty build cookbook and a configuration file.
* submits the change for review.

Run `delivery init` from your local repository directory. When prompted for a password, use the one for the user you specified when you ran `delivery setup` to configure the Delivery command-line tools during the installation procedure.

```bash
# ~/Development/deliver-customers-rhel
$ delivery init
Chef Delivery
Loading configuration from /home/thomaspetchel/Development/deliver-customers-rhel
Is /home/thomaspetchel/Development/deliver-customers-rhel a git repo?  yes
adding remote delivery: ssh://tpetchel@test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel
Remote 'delivery' added to git config!
Creating project: deliver-customers-rhel
Checking for content on the git remote delivery: No upstream content
No upstream content; pushing local content to server.
To ssh://tpetchel@test@10.194.11.99:8989/test/learn-chef/deliver-customers-rhel
*	refs/heads/master:refs/heads/master	[new branch]
Branch master set up to track remote branch master from delivery.
Done

Creating master pipeline for project: deliver-customers-rhel ... done
Generating build cookbook skeleton
Cached copy of build cookbook generator exists; skipping git clone.
PCB generate: "chef" "generate" "cookbook" ".delivery/build-cookbook" "-g" "/home/thomaspetchel/.delivery/cache/generator-cookbooks/pcb"
Git add and commit of build-cookbook
Writing configuration to /home/thomaspetchel/Development/deliver-customers-rhel/.delivery/config.json
New delivery configuration
--------------------------
{
  "version": "2",
  "build_cookbook": {
    "name": "build-cookbook",
    "path": ".delivery/build-cookbook"
  },
  "skip_phases": [],
  "build_nodes": {},
  "dependencies": []
}Chef Delivery
Loading configuration from /home/thomaspetchel/Development/deliver-customers-rhel
Review for change add-delivery-config targeted for pipeline master
Created new patchset
https://10.194.11.99/e/test/#/organizations/learn-chef/projects/deliver-customers-rhel/changes/c469f058-493d-4277-99ba-13f86014a63c
```

### Watch the Verify stage run

When you run `delivery init`, two things happen. The first stage of the pipeline, Verify, begins and the Delivery UI appears. With it, you can trace the progress of the cookbook as it moves through each stage and its associated phases.

![](delivery/delivery-init-result.png)

Ordinarily, the Verify stage runs unit, lint and syntax tests but we haven't added them yet because our purpose is to validate that the pipeline works.

The build node that's running Verify merges your changes into `master` on a temporary copy of the main repository and runs the tests against `master`.

Each phase runs on a build node. If you have multiple build nodes, phases can be run in parallel.
