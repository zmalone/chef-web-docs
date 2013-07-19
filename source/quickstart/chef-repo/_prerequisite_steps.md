##### Prerequisite Steps
1. Sign up for a free Opscode [Hosted Chef account][chef-hosted] and download your `knife.rb`, `[username].pem`, and `[organization_name]-validator.pem` files to your `~/Downloads` folder. You should have these 3 files:

    [NOTE] If you are unsure of where to find these files, watch the [screencast on managing .pem files][pem-screencast].

        [organization_name]-validator.pem
        [username].pem
        knife.rb

    [WARN] These files are **your** credentials to the the Chef Server - do not share them with anyone else!

1. Make a `Developement` directory and clone the [example Chef repository][chef-repo-github] from Opscode, into it. In a terminal:

        $ mkdir ~/Development
        $ git clone git://github.com/opscode/chef-repo ~/Development/chef-repo

1. Create the `.chef` directory and move your 3 private files there. In a terminal:

        $ mkdir ~/Development/chef-repo/.chef
        $ mv ~/Downloads/*.pem ~/Development/chef-repo/.chef/
        $ mv ~/Downloads/knife.rb ~/Development/chef-repo/.chef/

1. "Change Directory" (`cd`) into our `chef-repo`. In a terminal:

        $ cd ~/Development/chef-repo

    [INFO] All remaining commands should be run from within this directory.

1. Verify your credentials are correct using the `knife` command. In a terminal:

        $ knife client list

  You should see something like:

        [organization_name]-validator

    [NOTE] `knife` is the command-line (CLI) tool for use with Chef on your workstation.

[chef-hosted]: http://www.opscode.com/hosted-chef/ "Sign up for Hosted Chef"
[pem-screencast]: https://learnchef.opscode.com/screencasts/manage-pem-files/
[chef-repo-github]: http://github.com/opscode/chef-repo
