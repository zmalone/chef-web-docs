##### Xcode
Xcode is a free apple application - you wont be using it directly, but the build tools are necessary to compile Ruby on your system.

1. Install [Xcode][xcode] from the AppStore

1. Launch Xcode from the `/Applications` folder

1. Open Xcode Preferences

1. Click "Download" on "Command Line Tools"

1. Once the installation has finished, you can quit Xcode

- - -

##### rbenv
rbenv is a Ruby Version Manager - it allows you to have multiple versions of Ruby on your system and easily switch between them.

1. Install rbenv and ruby-build from homebrew. In Terminal:

        $ brew install rbenv ruby-build

1. Add rbenv to your path:

        $ echo 'eval "$(rbenv init -)"' >> ~/.bash_profile && source ~/.bash_profile

1. Install the target Ruby version:

        $ rbenv install 1.9.3-p385
        $ rbenv shell   1.9.3-p385
        $ rbenv global  1.9.3-p385


- - -

##### chef
Now install Chef as a gem:

    $ gem install chef
    $ rbenv rehash

[xcode]: https://itunes.apple.com/us/app/Xcode/id497799835?mt=12 "Download Xcode from the AppStore"
