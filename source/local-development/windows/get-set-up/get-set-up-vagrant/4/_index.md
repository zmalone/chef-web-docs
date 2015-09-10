## 4. Install the chef-zero-scheduled-task plugin

In [Learn to manage a basic Windows Server web application](/manage-a-web-app/windows), you connected directly to your node and ran `chef-client` to apply your cookbook. You did this to prevent the complications that arise when performing certain actions, such as a remote installation of SQL Server, over the WinRM protocol.

In practice, Chef users commonly create a scheduled task, use [push jobs](https://docs.chef.io/push_jobs.html), or set up an SSH server to run `chef-client` on their nodes.

In this tutorial, we'll use the [chef-zero-scheduled-task](https://github.com/smurawski/chef-zero-scheduled-task) Test Kitchen plugin to run our cookbooks on temporary instances. `chef-zero-scheduled-task` creates a scheduled task that runs `chef-client` immediately and connects to that task so that Test Kitchen can receive the output of the `chef-client` run.

The Chef DK does not come with this plugin, so run the following command to install it.

```bash
# ~/chef-repo
$ chef gem install chef-zero-scheduled-task
Fetching: chef-zero-scheduled-task-0.0.6.gem (100%)
Successfully installed chef-zero-scheduled-task-0.0.6
1 gem installed
```
