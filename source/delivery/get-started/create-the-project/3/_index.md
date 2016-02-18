## 3. Approve the change

The next step is to approve the change. This is a manual step, where people on your team have a chance to review the code and promote it to the Build stage.

Watch the unit, lint, and syntax phases succeed. Then from the **Review** tab, scroll down to the bottom of the patchset and enter a comment.

![](delivery/delivery-init-add-comment.png)

Click the **Add Comment** button.

Scroll back to the top of the patchset and click the **Approve** button.

![](delivery/delivery-init-approve.png)

Then click **Confirm**.

![](delivery/delivery-init-approve-modal.png)

The **Approve** action merges the `add-delivery-config` branch into the `master` branch and deletes the `add-delivery-config` branch from the server.

[COMMENT] You need to first wait for the unit, lint, and syntax phases to complete before you can approve a patchset. This ensures that all tests pass before the change is merged into the target branch.
