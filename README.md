Learn Chef
==========

[![Build Status](https://magnum.travis-ci.com/opscode/learn-chef.svg?token=mNqeWExVNwGqqWxVbw6y&branch=master)](https://magnum.travis-ci.com/opscode/learn-chef)

Installation
------------

1. Clone the repository:

        $ git clone git@github.com:opscode/learn-chef.git

1. CD into the project:

        $ cd learn-chef

1. Bundle the projects:

        $ bundle install --without production

1. Start the server:

        $ bin/middleman server

Building
--------

1. To build the full site (and smush images, compress javascript, etc), run the following command:

        $ bundle exec middleman build --clean

1. If you see errors, fix them. The exit code should be 0.

        $ echo $?
        $ 0

Publishing
----------

- **Always submit PRs/changes against the master branch**
- Verify changes on http://learn-preprod.getchef.com/
- Merge `master` into `release`

See the [deployment documentation](doc/deploy.md) for more information.

Contributing
------------

1. **Make a new branch**

1. Make changes

1. Build locally and make sure the build succeeds (exit 0)

1. Submit a [Pull Request](https://github.com/opscode/learn-chef/pull/new)

1. (optional) Mention something in #learnchef on IRC or @learnchef on Twitter


License and Authors
-------------------

- Author:: Isa Farnik (isa@getchef.com)
- Author:: Nathen Harvey (nharvey@getchef.com)
- Author:: Christian Nunciato (cnunciato@getchef.com)
- Author:: Seth Vargo (sethvargo@gmail.com)
- Author:: Thomas Petchel (tpetchel@getchef.com)
- Author:: Nathan L Smith (smith@getchef.com)

Copyright (c) 2013-2014 Chef Software, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
