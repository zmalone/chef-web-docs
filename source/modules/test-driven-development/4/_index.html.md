## Supporting tools and dependencies

This section includes the tools that support the common tools, or are their dependencies. They are included for completeness.

### Rake and Thor

#### What and why

Rake and Thor are command-line task running tools, similar to make. Tasks are written in a <code class="file-path">Rakefile</code> or <code class="file-path">Thorfile</code>, respectively. They’re both implemented in Ruby, albeit slightly differently internally. They’re listed here together because they’re often interchangeable. That is, some people prefer one over the other. Rake or Thor have tasks for running test suites, or build and release cookbooks, depending on any individual project. Some of the other tools mentioned have Rake and Thor integration, such as Foodcritic and ChefSpec.

#### Phase of Chef development

Rake and Thor are used during pre-convergence to perform tasks such as running ChefSpec/RSpec, or lint checks with RuboCop and Foodcritic. Rubygem projects usually have tasks for releasing the gem to [rubygems.org](https://rubygems.org). Cookbook projects sometimes have tasks for releasing the cookbook to Supermarket, or uploading it to a Chef server. Many projects use Travis CI to automatically run certain tasks such as unit/spec tests and lint/style checks on every commit.

#### How to Get Them

Both Rake and Thor are included in the Chef DK. To use Rake, you need a <code class="file-path">Rakefile</code>. To use Thor, you need a <code class="file-path">Thorfile</code>. Run `rake -T` or `thor -T` to get a list of tasks in a project.

#### More information

* [Example Rakefile in a cookbook](https://github.com/chef-cookbooks/chef-server/blob/master/Rakefile)
* [Example Thorfile in a cookbook](https://github.com/chef-cookbooks/chef-server/blob/master/Thorfile)
* [Example rake use in Travis CI](https://github.com/chef-cookbooks/chef-server/blob/master/.travis.yml#L11-L12)
* [docs.seattlerb.org/rake](http://docs.seattlerb.org/rake/)
* [whatisthor.com](http://whatisthor.com/)

### Guard

#### What and why

Guard is a Ruby command-line tool that handles events from filesystem modifications. It is an "auto-runner" for other tools that are described here. Most commonly this means it will run a test suite when .rb files are changed. Guard is configured with a <code class="file-path">Guardfile</code> that tells it which directories and files to monitor, and what command to run when they change.

#### Phase of Chef development

Guard is used during pre-convergence to run syntax checks with `knife cookbook test`, lint checks with `rubocop` and `foodcritic`, and unit tests with `rspec` (ChefSpec). It also can be used to run `kitchen converge` or `kitchen verify` when recipes change to automatically run Test Kitchen.

#### How to get it

Guard is included in the Chef DK. For specific integration with Test Kitchen, use the `guard-kitchen` gem.

#### More information

* [Example Guardfile](https://github.com/chef/chef-dk/blob/master/Guardfile)
* [guardgem.org](http://guardgem.org/)

### RSpec

#### What and why

RSpec is a Test Driven Development (TDD) or Behavior Driven Development (BDD) framework. It is used widely in the Ruby community for testing, and it is extensible for creating new testing frameworks. As such, ChefSpec and Serverspec (and thus Chef audit mode) are based on RSpec. Chef Software, Inc. uses RSpec for testing the Chef product and other Ruby-based tools and libraries we develop. RSpec is also the basis of the "pedant" testing framework that validates the server products &ndash; Chef server, Chef Analytics, Chef Delivery.

#### Phase of Chef development

RSpec is used by ChefSpec during pre-convergence. It is used by audit mode (via Serverspec) in convergence. It is also used by Serverspec in post-convergence.

#### How to get it

RSpec is a dependency of ChefSpec and Serverspec, so it is included in the Chef DK. To include it in other non-cookbook projects, add it to a <code class="file-path">Gemfile</code> for installation with bundler. Most of the Ruby-based projects related to Chef use RSpec for their unit tests.

#### More information

* [rspec.info](http://rspec.info)

### Fauxhai

#### What and why

Fauxhai is a tool for mocking out [Ohai](https://docs.chef.io/ohai.html) data to provide node attributes for testing. Fauxhai is used within ChefSpec. Most cookbook developers don’t use Fauxhai directly, unless they’re contributing support for a new platform to it.

#### How to get it

Fauxhai is a dependency of ChefSpec, so it is included in the Chef DK.

#### More information

* [github.com/customink/fauxhai](https://github.com/customink/fauxhai)

### Busser

#### What and why

From the project README:

[QUOTE] Busser is a test setup and execution framework designed to work on remote nodes whose system dependencies cannot be relied upon.

Busser is used by Test Kitchen to support running post-convergence tests. It has a plugin-based architecture that allows different test frameworks to be used.

#### Phase of Chef development

Busser is used during post-convergence automatically by Test Kitchen during the kitchen verify step.

#### How to get it

Busser is automatically installed by Test Kitchen.

#### More information

* [github.com/test-kitchen/busser](https://github.com/test-kitchen/busser)
