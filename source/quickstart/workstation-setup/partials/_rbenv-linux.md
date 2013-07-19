###### rbenv (Linux)
rbenv is a Ruby Version Manager - it allows you to have multiple versions of Ruby on your system and easily switch between them.

[NOTE] It is assumed you are running as the `root` user from this point forward.

1. Install support packages:

        $ apt-get install build-essential git

1. Clone rbenv from the official git repository and add it to your path:

        $ git clone git://github.com/sstephenson/rbenv.git .rbenv
        $ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> .bash_profile
        $ echo 'eval "$(rbenv init -)"' >> .bash_profile

1. Reload your `.bash_profile`:

        $ source ~/.bash_profile

1. Install ruby-build:

        $ git clone git://github.com/sstephenson/ruby-build.git
        $ cd ruby-build
        $ ./install.sh

1. Install the target Ruby version:

        $ rbenv rehash
        $ rbenv install 1.9.3-p385
        $ rbenv shell   1.9.3-p385
        $ rbenv global  1.9.3-p385
