Learn Chef
==========

[![Build Status](https://magnum.travis-ci.com/chef/learn-chef.svg?token=mNqeWExVNwGqqWxVbw6y&branch=master)](https://magnum.travis-ci.com/chef/learn-chef)

Learn Chef tutorials and skills library are written in markdown and use the Middleman platform for publishing. If you want to contribute, you need to set up your workstation using the following installation procedure from the command line.

Installation
------------

1. Ensure you have Node 6+, NPM 3+, and Ruby 2.3.1. See the section below for Ubuntu instructions.

1. Clone this repository.

        $ git clone git@github.com:chef/chef-web-learn.git

1. Set your working directory.

        $ cd chef-web-learn

1. Install [bundler](http://bundler.io/), if not already installed.

        $ gem install bundler

1. Install the required Ruby gems. The dependencies are already provided for you in the Gemfile included in this repo.

        $ bundle install --without production

1. If you are running on a platform other than Mac OS or Windows, you also need to make sure you have a JavaScript runtime. For example, on Ubuntu run these commands:

        $ sudo apt-get install nodejs
        $ sudo apt-get install npm
        $ sudo ln -s /usr/bin/nodejs /usr/bin/node

1. Install node packages:

        $ npm install

Start up in development mode
----------------------------

A server process needs to be running in order to use Middleman.

1. Start the Middleman server in a new terminal window, using chef-web-learn as the working directory.

        $ npm start
        OR
        $ bundle exec middleman server

1. The site should now be available locally on port 3001 using BrowserSync for live reloading during
    development, although the HTML will also be available on port 4567 via Middleman.

        $ http://localhost:3001

If you make changes to a content file, stylesheet, or JavaScript file, and save it, the Middleman
    server will be updated in real time with the change. This allows you to preview changes that
    make you make locally.

If Middleman stops responding, kill (Ctrl-C) the server and restart it. If you make a configuration
    change, including changes to Middleman helpers, you will need to kill the development server and
    restart it.

Create a build
--------------

1. To build the site (and optimize images, compress javascript, etc), set the appropriate
    environment variables and run the build command, e.g.:

        $ NODE_ENV=production API_ENDPOINT=http://API_ENDPOINT_DOMAIN npm run build
        OR
        $ NODE_ENV=production API_ENDPOINT=http://API_ENDPOINT_DOMAIN bundle exec middleman build --clean

1. If you see errors, fix them. The exit code should be 0.

        $ echo $?
        $ 0

You can test the build by running a local development server (such as
https://www.npmjs.com/package/http-server) to serve the `build` folder.

Installing current versions of Node and Ruby on Ubuntu
------------------------------------------------------

The Node and Ruby packages for Ubuntu are outdated. Here is one method of updating them:

   ##### Install Node / NPM:
        $ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
        $ sudo apt-get install -y nodejs

   ##### Install Ruby and dependencies:
        $ sudo apt-get update
        $ sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev
        $ sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
        $ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
        $ curl -sSL https://get.rvm.io | bash -s stable
        $ source ~/.rvm/scripts/rvm
        $ rvm install 2.3.1
        $ rvm use 2.3.1 --default
        $ gem install bundler
        $ bundle install

   ##### Increase the number of inotify watches (if you see an error in dev mode):
        $ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p


Testing Middleman Helpers
----------------------------

- run `bundle exec rspec` to run all specs
- run `bundle exec guard` to auto-run specs for middleman changes


Publishing
----------

- Submit a PR against the master branch to initiate Chef Delivery review.
- When approved in Chef Delivery (for example, by creating an `@delivery approve` message in GitHub for the PR), the change will become visible in the Acceptance environment https://learn-acceptance.chef.io.
- Use `@delivery delivery` to publish to http://learn.chef.io

Contributing
------------

1. Make a new branch

1. Make changes

1. Build locally and make sure the build succeeds (exit 0)

1. Submit a [Pull Request](https://github.com/chef/chef-web-learn/pull/new)

License and Authors
-------------------

- Author:: Isa Farnik (isa@chef.io)
- Author:: Nathen Harvey (nharvey@chef.io)
- Author:: Christian Nunciato (cnunciato@chef.io)
- Author:: Seth Vargo (sethvargo@gmail.com)
- Author:: Thomas Petchel (tpetchel@chef.io)
- Author:: Nathan L Smith (smith@chef.io)
- Author:: Colin Campbell (colin@chef.io)
- Author:: Roberta Leibovitz (roberta@chef.io)

Copyright (c) 2013-2015 Chef Software, Inc. All rights reserved.
