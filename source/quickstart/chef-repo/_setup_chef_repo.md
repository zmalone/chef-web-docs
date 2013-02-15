##### Setup your chef-repo
1. Open up the `chef-repo` in your favorite editor.

    [NOTE] If you don't have a plain text editor, download a [free trial of Sublime Text 2][sublime-text-2].

1. Download the `apache2` and `networking_basic` community cookbooks using `knife`. In Terminal:

        $ knife cookbook site install apache2
        $ knife cookbook site install networking_basic

    [NOTE] `knife` is the command-line tool for Chef on your workstation.

1. Look in your cookbooks directory and you should now see two folders, `apache2` and `networking_basic`.

[sublime-text-2]: http://www.sublimetext.com/2 "Sublime Text 2"
