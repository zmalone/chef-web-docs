##### Prerequisite Steps

1. Sign up for a free Opscode [Enterprise Chef account][chef-enterprise] and download the **Starter Kit**. Alternatively:

	1. Login and navigate to [preview.opscode.com/organizations][preview-orgs]
	1. Select your organization in the middle of the page
	1. Click the "**Starter Kit**" link on the left.

		The link only becomes active after selecting your organization.

1. Extract the Starter Kit into your home directory. (It will extract as `chef-repo`). You may need to move the folder into your home directory.

1. "Change Directory" (`cd`) into your `chef-repo`. In a terminal:

        $ cd ~/chef-repo

    [INFO] All remaining commands should be run from within this directory.

1. Verify your credentials are correct using the `knife` command. In a terminal:

        $ knife client list

    You should see something like:

        [organization_name]-validator

    [NOTE] `knife` is a command-line tool that provides an interface between a local Chef repository and the Chef Server.

[chef-enterprise]: https://getchef.opscode.com/signup "Sign up for Enterprise Chef"
[pem-screencast]: https://learnchef.opscode.com/screencasts/manage-pem-files/
[chef-repo-github]: http://github.com/opscode/chef-repo
[preview-orgs]: https://preview.opscode.com/organizations/
