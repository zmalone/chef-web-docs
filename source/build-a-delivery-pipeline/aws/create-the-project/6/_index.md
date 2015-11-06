## How to delete your project

If you ever need to start over, or you complete the tutorial and want to delete this project, your administrator needs to login to the Chef Delivery server (for example, over SSH) and run the `delivery-ctl delete-project` command.

The `delivery-ctl delete-project` command takes your enterprise, organization, and project names as arguments, like this.

```bash
$ delivery-ctl delete-project ENTERPRISE ORGANIZATION PROJECT
```

For example, for an enterprise named `chef` and an organization named `Development`, you would run this command to delete the `deliver-customers-rhel` project.

```bash
$ sudo delivery-ctl delete-project chef Development deliver-customers-rhel
Successfully deleted project: 'chef/Development/deliver-customers-rhel'
```
