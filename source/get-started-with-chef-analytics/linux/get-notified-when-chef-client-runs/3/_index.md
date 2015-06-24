## 3. Create a rule

Rules are essentially conditional (_if this, then that_) logic for your infrastructure events. The general syntax of a rule is:

```ruby
# Untitled
rule on <message_type>
  when
    // some condition
  then
    // some action
  end
end
```

Some message types are:

* `action` &ndash; an operation occurred on the Chef server
* `run_converge` &ndash; a `chef-client` run has occurred
* `run_resource` &ndash; a single resource was updated
* `run_control` &ndash; a control run as part of [audit mode](https://docs.chef.io/analytics.html#audit-mode) occurred

You can find all of the message types in the [Chef documentation](https://docs.chef.io/analytics_rules.html#message-types).

[COMMENT] Remember, to _converge_ a node means to run `chef-client` and bring the node towards its desired configuration.

We want a rule that emails us every time a node converges, so we'll write a rule for the `run_converge` message type.

From the Chef Analytics page in your web browser, click **Rules** and then click **+** to create a new rule. From the rule editor, click `New Rule Group 1` and rename it to `email_on_run_converge`.

![Adding a new rule](chef-analytics/add-rule.png)

Replace the default rule with this one.

```ruby
rules 'email_me_every_converge'
  rule on run_converge
  when
    true
  then
    notify("send_email", "The node {{ message.run.node_name }} just converged.")
  end
end
```

This rule matches `run_converge`, which means it is processed when `chef-client` runs on a node. The `when true` part means that the rule is always processed. The `then` part activates the `send_email` notification that you created in the previous step. The second part of the `notify` statement is the message body. `{{ message.run.node_name }}` is replaced with the name of the node when the email message is created.

Click **Save** and you are brought back to the list of rules.

![Saving the rule](chef-analytics/add-rule-save.png)
