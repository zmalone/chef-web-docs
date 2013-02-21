Chef Quickstart Guide
=====================

Installation
------------
1. Clone the repository:

        $ git clone git@github.com:opscode/quick-start.git

1. CD into the project:

        $ cd quick-start

1. Bundle the projects:

        $ bundle install

  If you get an error installing `charlock_holmes`, you need to install `icu4c`:

        $ brew install icu4c

  And run the `bundle` command again.

1. Start the server:

        $ bundle exec middleman server


Building
--------
1. To build the full site (and smush images, compress javascript, etc), run the following command:

        $ bundle exec middleman build --clean

1. If you see errors, fix them. The exit code should be 0.

        $ echo $?
        $ 0


Contributing
------------
1. **Make a new branch**

1. Make changes

1. Build locally and make sure the build succeeds (exit 0)

1. Submit a [Pull Request](https://github.com/opscode/quick-start/pull/new)

1. (optional) Mention something in #learnchef on IRC or @learnchef on Twitter
