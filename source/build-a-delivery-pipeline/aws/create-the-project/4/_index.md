## 4. Deliver the change

After you approve the change, the change moves to the Build stage.

The unit, lint, and syntax phases run again on the build node. The tests run again in the Build stage to ensure that they continue to pass after the change is merged to `master`.

The Build stage also runs the quality and security phases. If these pass, then the publish phase runs. This phase creates an artifact (in our case, a cookbook) that is a release candidate.

![](delivery/delivery-init-build.png)

After the Build stage completes, the process moves to the Acceptance stage.

Beginning with the Acceptance stage, the pipeline switches from analyzing the project’s source code to verifying the artifacts produced in the Build stage. The goal of the Acceptance stage is for the team to make a decision about whether the change should go all the way out to production or not.

The Acceptance stage runs the provision, deploy, smoke, and functional phases. The provision phase sets up any infrastructure needed to test the artifacts. The deploy phase deploys the artifact created in the Build stage.

After the Acceptance stage completes, press the **Deliver** button. Pressing the **Deliver** button is a confirmation that the artifact can be released. The artifact will move through the next three pipeline stages automatically.

![](delivery/delivery-init-deliver.png)

Press the **Confirm** button from the dialog that appears.

![](delivery/delivery-init-confirm-delivery.png)

You'll see the process move through the Union, Rehearsal, and Delivered stages.

The Union, Rehearsal, and Delivered stages form a shared pipeline, where all the projects that make up the entire system come together. All three stages have the same phases.

The Union stage assesses the impact of the change in the context of a complete (or as close as possible) installation of the set of projects that comprise the entire system. Union is where you test for interactions between interdependent projects.

If all phases of Union succeed, then the Rehearsal stage is triggered. Rehearsal increases confidence in the artifacts and the deployment by repeating the process that occurred in Union in a different environment.

If a failure occurs in Union, Rehearsal serves a different purpose. When you submit a new change and it fixes the break in Union, you know that a sequence of two changes, one that breaks the system, and one that comes after and fixes it, results in a healthy system. You do not yet know what happens when you apply the cumulative change to an environment that never saw the failure. The Rehearsal stage provides that environment.

Delivered is the final stage of the pipeline. What "delivered" means for your system is up to you. It could mean deploying the change so that it is live and receiving production traffic, or it might mean publishing a set of artifacts so they are accessible for your customers.

Watch the change move through the Union, Rehearsal, and Delivered stages.

![](delivery/delivery-init-delivered.png)

Congratulations! You now have a functioning Chef Delivery pipeline.

Note that the pipeline did no real work &ndash; the recipe that defines each phase in your build cookbook is empty. No actual unit or syntax checks were made, and no artifacts were published. However, your `master` branch is now integrated in the system and you have a foundation to build upon. You'll add functionality to the build cookbook in the next lesson.

[COMMENT] In this tutorial, you approved and delivered your own changes. In practice, you'll need to decide with your organization the criteria for approving and shipping changes. At Chef, we follow the "four eyes" rule, where a total of four eyes is required to approve a code change. After two people approve a code change, and there are no unresolved issues, the change can be approved and move to the next pipeline stage.
