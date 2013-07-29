##### Prerequisite Steps
1. Sign up for a free Opscode [Hosted Chef account][chef-hosted] and download the **Starter Kit**.

1. Extract the Starter Kit into your home directory. (It will extract as `chef-repo`). You may need to move the folder into your home directory.

1. "Change Directory" (`cd`) into your `chef-repo`. In a terminal:

        $ cd ~/chef-repo

    [INFO] All remaining commands should be run from within this directory.

1. Verify your credentials are correct using the `knife` command. In a terminal:

        $ knife client list

    You should see something like:

        [organization_name]-validator

    [NOTE] `knife` is a command-line tool that provides an interface between a local Chef repository and the Chef Server.

[chef-hosted]: http://www.opscode.com/hosted-chef/ "Sign up for Hosted Chef"
[pem-screencast]: https://learnchef.opscode.com/screencasts/manage-pem-files/
[chef-repo-github]: http://github.com/opscode/chef-repo
