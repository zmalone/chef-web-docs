If you're just looking to play with Chef, we recommend the omnibus installer. This will install Chef and Ruby on your system. However, if you already have Ruby installed, or if you would like finer control over your workstation, checkout the Advanced tab.

    $ curl -L https://www.opscode.com/chef/install.sh | sudo bash

Finally, to reduce typing in the future, add Omnibus Ruby to your path:

    $ echo 'export PATH="/opt/chef/embedded/bin:$PATH"' >> ~/.bash_profile && source ~/.bash_profile
