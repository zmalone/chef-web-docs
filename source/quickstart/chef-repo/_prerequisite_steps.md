##### Prerequisite Steps
1. Sign up for a free [Chef Hosted account][chef-hosted] and download your `knife.rb` and `*.pem` files to your `~/Downloads` folder. You should have these 3 files:

        [your_organization_name]-validator.pem
        [your_username].pem
        knife.rb

    [WARN] These files are **your** credentials to the the Chef Server - do not share them with anyone else!

1. Clone the `chef-repo` into the `Development` folder from github. In Terminal:

        $ mkdir ~/Development
        $ git clone git://github.com/opscode/chef-repo ~/Development/chef-repo

1. Create the `.chef` directory and move your private files there. In Terminal:

        $ mkdir ~/Development/chef-repo/.chef
        $ mv ~/Downloads/*.pem ~/Development/chef-repo/.chef/
        $ mv ~/Downloads/knife.rb ~/Development/chef-repo/.chef/

1. "Change Directory" (`cd`) into our `chef-repo`. In Terminal:

        $ cd ~/Development/chef-repo

    [NOTE] All remaining commands should be run from this directory.

1. Verify your credentials are correct with `knife` (the CLI tool for Chef). In Terminal:

        $ knife client list

    _[TODO]_ What output do we see here?

[chef-hosted]: http://www.opscode.com/hosted-chef/ "Sign up for Hosted Chef"
