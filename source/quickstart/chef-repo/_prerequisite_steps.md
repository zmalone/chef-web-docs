##### Prerequisite Steps

1. Sign up for a free Opscode [Enterprise Chef account][chef-enterprise] and download the **Starter Kit**.

- `knife.rb`
- `[username].pem`
- `[organization_name]-validator.pem`

    [NOTE] If you are unsure of where to find these files, watch the [screencast on managing .pem files][pem-screencast].
    
    [WARN] These files are **your** credentials to the the Chef Server - do not share them with anyone else!

1. Make a `Developement` directory and clone the [example Chef repository][chef-repo-github] from Opscode, into it. In a terminal:

        $ mkdir ~/Development
        $ git clone git://github.com/opscode/chef-repo ~/Development/chef-repo

1. Create the `.chef` directory and move your 3 private files there. In a terminal:

        $ mkdir ~/Development/chef-repo/.chef
        $ mv ~/Downloads/*.pem ~/Development/chef-repo/.chef/
        $ mv ~/Downloads/knife.rb ~/Development/chef-repo/.chef/

1. "Change Directory" (`cd`) into `chef-repo`. In a terminal:

        $ cd ~/Development/chef-repo

    [INFO] All remaining commands should be run from within this directory.

1. Verify your credentials are correct using the `knife` command. In a terminal:

        $ knife client list

    You should see something like:

        [organization_name]-validator

    [NOTE] `knife` is a command-line tool that provides an interface between a local Chef repository and the Chef Server.

[chef-enterprise]: https://getchef.opscode.com/signup "Sign up for Enterprise Chef"
[pem-screencast]: https://learnchef.opscode.com/screencasts/manage-pem-files/
[chef-repo-github]: http://github.com/opscode/chef-repo
