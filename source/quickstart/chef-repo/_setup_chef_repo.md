##### Setup your chef-repo

1. Initialize the Chef Repo as a git repository:
        $ git init .
        $ git add .
        $ git commit -m "Initial commit"

1. Download the `apt` and `apache2` community cookbooks using `knife`. In a terminal:

        $ knife cookbook site install apt
        $ knife cookbook site install apache2

1. Look in your `cookbooks` directory. In a terminal:
	
		$ ls cookbooks

	You should now see two folders: `apt` and `apache2`.
