##### Setup your chef-repo
1. Download the `apt`, `apache2`, and `networking_basic` community cookbooks using `knife`. In a terminal:

        $ knife cookbook site install apt
        $ knife cookbook site install apache2
        $ knife cookbook site install networking_basic

1. Look in your `cookbooks` directory. In a terminal:
	
		$ ls cookbooks

	You should now see three folders: `apt`, `apache2`, and `networking_basic`.
