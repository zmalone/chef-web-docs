Learn Chef
==========

[![Build Status](https://magnum.travis-ci.com/chef/learn-chef.svg?token=mNqeWExVNwGqqWxVbw6y&branch=master)](https://magnum.travis-ci.com/chef/learn-chef)

Learn Chef tutorials and skills library are written in markdown and use the Middleman platform for publishing. If you want to contribute, you need to set up your workstation using the following installation procedure from the command line.

Installation
------------

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

1. Install node packages in the root folder AND in the Angular folder, lib/chef-lab-client:

        $ npm install
        $ cd lib/chef-lab-client
        $ npm install

Start up
--------

A server process needs to be running in order to use Middleman.

1. Start the Middleman server in a new terminal window, using chef-web-learn as the working directory.

        $ bin/middleman server

If Middleman stops responding, kill (Ctrl-C) the server and restart it.

Building the tutorials and skills library
-----------------------------------------

1. To build the site (and optimize images, compress javascript, etc), run the following command:

        $ bundle exec middleman build --clean

1. If you see errors, fix them. The exit code should be 0.

        $ echo $?
        $ 0

1. To see the site, open the root html on your local machine by navigating to http://localhost:4567 in your web browser.

1. If you make changes to a .md file and save it, the Middleman server will be updated in real time with the change. This allows you to preview changes that make you make locally.

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
