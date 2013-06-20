##### Prerequisite Steps

1. Sign up for a free Opscode [Hosted Chef account][chef-hosted] and download the **Starter Kit**.

1. Extract the Starter Kit into your home directory. (It will extract as `chef-repo`)

1. "Change Directory" (`cd`) into our `chef-repo`. In Terminal:

        $ cd ~/chef-repo

    [NOTE] All remaining commands should be run from this directory.

1. Verify your connection with `knife` (the CLI tool for Chef). In Terminal:

        $ knife client list

  You should see something like:

        [your_organization_name]-validator

    [NOTE] `knife` is the command-line tool for Chef on your workstation.

[chef-hosted]: http://www.opscode.com/hosted-chef/ "Sign up for Hosted Chef"
