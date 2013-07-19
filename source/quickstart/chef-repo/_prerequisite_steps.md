##### Prerequisite Steps
1. Sign up for a free Opscode [Hosted Chef account][chef-hosted] and download your `knife.rb` and `*.pem` files to your `~/Downloads` folder. You should have these 3 files:

    [NOTE] If you are unsure of where to find these files, watch the [screencast on managing .pem files][pem-screencast].

        [your_organization_name]-validator.pem
        [your_username].pem
        knife.rb

    [WARN] These files are **your** credentials to the the Chef Server - do not share them with anyone else!

1. Clone the `chef-repo` into the `Development` folder from github. In a terminal:

        $ mkdir ~/Development
        $ git clone git://github.com/opscode/chef-repo ~/Development/chef-repo

1. Create the `.chef` directory and move your private files there. In a terminal:

        $ mkdir ~/Development/chef-repo/.chef
        $ mv ~/Downloads/*.pem ~/Development/chef-repo/.chef/
        $ mv ~/Downloads/knife.rb ~/Development/chef-repo/.chef/

1. "Change Directory" (`cd`) into our `chef-repo`. In a terminal:

        $ cd ~/Development/chef-repo

    [NOTE] All remaining commands should be run from this directory.

1. Verify your credentials are correct with `knife` (the CLI tool for Chef). In a terminal:

        $ knife client list

  You should see something like:

        [your_organization_name]-validator

    [NOTE] `knife` is the command-line tool for Chef on your workstation.

[chef-hosted]: http://www.opscode.com/hosted-chef/ "Sign up for Hosted Chef"
[pem-screencast]: https://learnchef.opscode.com/screencasts/manage-pem-files/
