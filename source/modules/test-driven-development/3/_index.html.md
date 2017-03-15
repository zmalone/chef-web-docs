## Common Chef testing tools

This section includes the tools commonly used with Chef development.

### RuboCop

#### What and why

RuboCop is a Ruby command-line tool that performs lint and style checks based on the community-driven Ruby Style Guide. It performs static analysis of any Ruby code, which includes Chef recipes, resources, library helpers, and so forth. RuboCop can be configured via <code class="file-path">.rubocop.yml</code> to exclude certain rules, and it can be run with `–lint` to perform only lint checking, excluding all style checks. RuboCop is used in the Chef community in cookbooks to make contributions more consistent and easier to manage.

#### Phase of Chef development

RuboCop is run in pre-convergence, or in CI systems to ensure that changes are consistent with the desired style preferences in a cookbook. It comes with rake tasks that can be used in any <code class="file-path">Rakefile</code>.

#### How to get it

RuboCop is included in the Chef DK. It can be invoked via its command-line tool, `rubocop`, or it can be included in a <code class="file-path">Rakefile</code> with `RuboCop::RakeTask.new(:ruby)`.

#### More information

* [https://github.com/bbatsov/rubocop](https://github.com/bbatsov/rubocop)

### Foodcritic

#### What and why

Foodcritic is a Ruby command-line tool to perform lint checking against Chef cookbooks. It makes it easier to flag problems in cookbooks that can cause Chef to raise an exception during convergence. Cookbook authors use Foodcritic to help enforce good patterns and create higher quality cookbooks. Foodcritic includes a lot of rules, and users can write their own rules. It can also be configured to ignore certain rules through a <code class="file-path">.foodcritic</code> config file, inline comments, or command-line flags.

#### Phase of Chef development

Foodcritic is run in pre-convergence, or in CI systems such as Travis CI.

#### How to get it

Foodcritic is included in the Chef DK. It can be invoked via its command-line tool, `foodcritic`. Like RuboCop, it includes rake tasks that can be included in a <code class="file-path">Rakefile</code> with `FoodCritic::Rake::LintTask.new`.

#### More information

* [acrmp.github.io/foodcritic](http://acrmp.github.io/foodcritic/)

### ChefSpec

#### What and why

ChefSpec is a unit testing framework for Chef cookbooks. It runs tests locally without making changes to the system. ChefSpec executes quickly, as it doesn’t have to perform the normal test-and-repair actions to converge resources. It also uses Fauxhai (discussed later) data so it can be used to conditionally test against different platforms easily. ChefSpec is strongly recommended for cookbook authors as it helps protect against regressions. High-value tests in ChefSpec include:

* Multiple platforms
* Conditional branching
* Behavior driven by attributes or data bags
* Search results
* Helper methods
* Custom resources and providers

#### Phase of Chef development

ChefSpec is used in the pre-convergence phase of testing cookbooks. It is primarily used to validate that given specific inputs, especially from variable data like attributes, Chef will have an expected resource collection as an output.

#### How to get it

ChefSpec is included in the Chef DK. It is invoked using `rspec`, when `chefspec` is required in spec files.

#### More information

* [sethvargo.github.io/chefspec](http://sethvargo.github.io/chefspec/)

### Serverspec

#### What and why

Serverspec is an "outside-in" integration test framework. It is platform and tool agnostic, and is used by other configuration management systems to verify systems are configured as desired. It checks the actual state of the target node by executing commands locally, via SSH, via WinRM, or other remote transports. Serverspec is implemented in RSpec, and uses RSpec test syntax.

#### Phase of Chef development

Serverspec is used in the post-convergence phase. It tests that the actual outcome of having run Chef on a node resulted in the desired state.

#### How to get it

Serverspec is a dependency of Chef 12.1.0+ for audit mode, so it is included in the Chef DK. When used by Test Kitchen, it is installed with busser on the node being tested. To use it with Test Kitchen, create <code class="file-path">test/integration/_SUITE_/serverspec</code> directories, and busser will handle the rest.

#### More information

* [serverspec.org](http://serverspec.org)

### Chef’s audit mode

#### What and why

Chef audit mode is a feature introduced in version 12.1.0. It is a mode of running `chef-client` that allows tests (audit controls) written in recipes to run. Audit results are sent back to the Chef server and then picked up by Chef Analytics (if installed) for further analysis and processing. Audit mode is implemented as a subset of Serverspec, and thus RSpec.

Audit mode can be run as part of a `chef-client` run that converges resources on the node. For example, a recipe can have `package`, `template`, and `service` resources that get configured to their desired state, and then audit mode will validate that everything is as it should be and compliant with policy. Audit mode can also be run without converging resources. That means that same recipe that contains `package`, `template`, or `service` resources won’t modify the state of those, but the audit controls will be run.

The main benefit of using audit mode is in combination with Chef Analytics, to perform analysis of the results of a run, and send notifications about the results, e.g., through email. The language used is very specific and oriented toward auditing for compliance purposes, such as PCI, SOX, or individual organization policies. The output reports are useful from an audit documentation perspective, and that the controls are written in the recipe, we have both the documentation of intent (controls to validate), and the remediation step (resources to converge for that intent). The main way that audit mode differs from normal Serverspec is intent. With audit mode, our intent is to verify that the node is compliant with policy. With Serverspec, our intent is to verify that the state of a node after running the recipes is correct.

#### Phase of Chef development

Audit mode is run as part of the convergence phase. It runs after the node has converged all the resources in the resource collection when it is set to enabled. It can be considered "post-convergence" if it is set to audit_only.

#### How to get it

Audit mode is included with Chef 12.1.0 and higher. It is not supported in earlier versions of Chef.

#### More information

* [docs.chef.io/analytics.html#audit-mode](https://docs.chef.io/analytics.html#audit-mode)
* [docs.chef.io/dsl_recipe.html#control-group](https://docs.chef.io/dsl_recipe.html#control-group)

### Test Kitchen

#### What and why

From [GitHub](https://github.com/test-kitchen/test-kitchen):

[QUOTE] Test Kitchen is an integration tool for developing and testing infrastructure code and software on isolated target platforms.

It creates test machines, converges them, and runs post-convergence tests against them to verify their state. Test Kitchen is written in Ruby. It has a plugin system for supporting machine creation through a variety of virtual machine technologies such as Vagrant, EC2, Docker, and several others. Test Kitchen makes it easy for Chef developers to test cookbooks on a variety of platforms. It uses busser to install post-convergence integration test tools such as Serverspec or BATS that actually perform the tests.

#### Phase of Chef development

Test Kitchen is used to actually converge machines and run post-convergence tests automatically. It is invoked manually, or through a CI system.

#### How to get it

Test Kitchen is included in the Chef DK. To get started, create a <code class="file-path">.kitchen.yml</code> file in a cookbook (this can be done with `kitchen init`), and then use the kitchen commands &ndash; usually `kitchen test`, `kitchen converge`, and `kitchen verify` to work with the configured machines.

[TIP] A <code class="file-path">.kitchen.yml</code> file is created for you when you run the `chef generate cookbook` command.

#### More information

* [kitchen.ci](http://kitchen.ci)
* [docs.chef.io/kitchen.html](https://docs.chef.io/kitchen.html)
