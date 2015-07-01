## 2. Set up the Test Kitchen configuration file

Now we need to tell Test Kitchen a bit about the environment we want to run our cookbook in.

When you use the `chef generate cookbook` command to create a cookbook, Chef creates a file named <code class="file-path">.kitchen.yml</code> in the root directory of your cookbook. <code class="file-path">.kitchen.yml</code> defines what's needed to run Test Kitchen, including which virtualization provider to use, how to run Chef, and what platforms to run your code on.

The default <code class="file-path">.kitchen.yml</code> file looks like this.

```ruby
# ~/motd/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero

platforms:
  - name: ubuntu-12.04
  - name: centos-6.5

suites:
  - name: default
    run_list:
      - recipe[motd::default]
    attributes:
```

[COMMENT] On Linux and Mac OS, <code class="file-path">.kitchen.yml</code> is a hidden file. Run `ls -a` if you want to see it from your terminal window.

Test Kitchen can manage more than one instance at a time. The default configuration creates both an Ubuntu and an Ubuntu virtual machine. Since we want only Ubuntu, modify <code class="file-path">~/motd/.kitchen.yml</code> like this. (Be sure to replace `ubuntu-12.04` with `ubuntu-14.04`.)

```ruby
# ~/motd/.kitchen.yml
---
driver:
  name: vagrant

provisioner:
  name: chef_zero

platforms:
  - name: ubuntu-14.04
    driver:
      customize:
        memory: 256

suites:
  - name: default
    run_list:
      - recipe[motd::default]
    attributes:
```

This configuration also specifies that the virtual machine should have 256 MB of memory available to it.

Here's how the file breaks down.

* **driver** specifies the software that creates the machine. We're using Vagrant.
* **provisioner** specifies how to run Chef. We use `chef_zero` because it enables you to mimic a Chef server environment on your local machine. This allows us to work with node attributes and data bags.
* **platforms** specifies the target operating systems. We're targeting just one &ndash; Ubuntu 14.04.
* **suites** specifies what we want to apply to the virtual environment. You can have more than one suite. We define just one, named `default`. This is where we provide the run-list, which defines which recipes to run and in the order to run them. Our run-list contains one recipe &ndash; our `motd` cookbook's default recipe.

[COMMENT] When Test Kitchen runs, it downloads the base virtual machine image, called a _box_, if the image does not already exist locally. Test Kitchen can [infer the location](https://github.com/test-kitchen/kitchen-vagrant#-default-configuration) for a set number of common configurations. The Test Kitchen [documentation](https://github.com/test-kitchen/kitchen-vagrant#-configuration) explains in detail about how to provide the box name, download URL, and other configuration parameters.

[DOCS] The [Chef documentation](http://docs.chef.io/config_yml_kitchen.html) explains the structure of the <code class="file-path">.kitchen.yml</code> file in greater detail, and also explains more about the available settings.
