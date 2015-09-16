## Uncommon or deprecated tools

This section includes the tools that are either uncommonly used, or may be considered deprecated in favor of newer tools described above.

### Cucumber

#### What and why

Cucumber is a "plain text" based DSL (domain specific language) for writing user stories that get executed against specifications written in a language called Gherkin. It is commonly used in BDD for Ruby on Rails projects, but also has been used for Chef cookbook development.

#### Phase of Chef development

Cucumber is not commonly used in Chef cookbook development. It was previously used for post-convergence acceptance or integration testing, but most people are using Serverspec or BATS for this functionality.

#### How to get it

Cucumber is included in the Chef DK.

#### More information

* [cukes.info](https://cukes.info/)

### BATS

#### What and why

BATS is a Bourne-again shell (bash) test framework. It is simple to write tests because users can implement the exact commands they would run after logging into a system to verify it. However, it is platform specific to Unix/Linux systems that have bash installed, so it does not work on Windows systems. This makes it more difficult to test cross-platform cookbooks, so many users prefer Serverspec. As Serverspec is also the basis of Chef audit mode, it is more widely used, and we recommend Serverspec over BATS for post-convergence testing.

#### Phase of Chef development

BATS is used in the post-convergence phase. It tests that the actual outcome of running Chef on a node resulted in the desired state.

#### How to get it

BATS is not included in the Chef DK. It is installed by Test Kitchen with Busser. See the home page for more information on how to use it outside of Test Kitchen.

#### More information

* [github.com/sstephenson/bats](https://github.com/sstephenson/bats)

### minitest

#### What and why

minitest is a Ruby test framework included in the Ruby Standard Library. It is designed to be fast and easy to use. However, RSpec is more commonly used within the Chef community for non-cookbook Ruby projects (like Chef itself). It is included here because users may encounter it via the minitest-chef project present in older cookbooks. Some users may prefer it for Test Kitchen post-convergence testing.

#### Phase of Chef development

minitest is used during the post-convergence phase. Historically, it was only used as part of the minitest-chef-handler as part of a Chef run report handler. It can be used as a busser in kitchen verify.

#### How to get it

minitest is included in the Ruby Standard Library, so it’s present on any system with Ruby installed, including within the embedded Ruby included by Chef DK’s omnibus installer. When using minitest-chef-handler it is invoked through a Chef report handler. When used by Test Kitchen, it is installed with busser on the node being tested. To do this, create <code class="file-path">test/integration/_SUITE_/minitest</code> directories and busser will handle the rest.

#### More information

* [docs.seattlerb.org/minitest](http://docs.seattlerb.org/minitest/)

### minitest-chef-handler

#### What and why

The minitest-chef-handler is the original post-convergence test framework for Chef. It runs as a report handler after a successful Chef run to verify the state of the system using minitest. The handler is considered deprecated in favor of testing frameworks that are run in Test Kitchen with Busser.

#### Phase of Chef development

minitest-chef-handler is run in the post-convergence phase. It actually executes as part of the Chef run by a report handler.

#### How to get it

The minitest-handler cookbook is used to automatically install minitest-chef-handler and register it as a report handler for the run.

#### More information

* [github.com/calavera/minitest-chef-handler](https://github.com/calavera/minitest-chef-handler)
* [github.com/btm/minitest-handler-cookbook](https://github.com/btm/minitest-handler-cookbook)
