###### rbenv
rbenv is a Ruby Version Manager - it allows you to have multiple versions of Ruby on your system and easily switch between them.

1. Install rbenv and ruby-build from homebrew. In Terminal:

        $ brew install rbenv ruby-build

1. Add rbenv to your path:

        $ echo 'eval "$(rbenv init -)"' >> ~/.bash_profile && source ~/.bash_profile

1. Install the target Ruby version:

        $ rbenv rehash
        $ rbenv install 1.9.3-p385
        $ rbenv shell   1.9.3-p385
        $ rbenv global  1.9.3-p385
