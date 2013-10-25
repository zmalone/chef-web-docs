##### Upload the Cookbooks
In order for our nodes to download these cookbooks, we need to upload them to the Enterprise Chef Server using `knife`. In a terminal:

    $ knife cookbook upload --all

[WARN] The Windows .msi installer for Chef 11.6.2 does not include the "erubis" gem. If you are having trouble running this on a Windows workstation, try "gem install erubis" in a privileged terminal session. This will be fixed in future versions.
