#### Assumptions
- Minimal Technical Exposure
- Never used Chef before

#### Software
- Ruby (via rbenv)
- VirtualBox
- git
- Vagrant

Part 1 - Local Workstation Setup
--------------------------------
Emphasize that these are **one-time** steps.

1. Install Ruby (rbenv)
1. Install [VirtualBox](http://virtualbox.org)
1. Install [git](http://git-scm.org)
1. Install [Vagrant](http://vagrantup.org)
1. Register for hosted-chef
1. Download `knife.rb`, `organization.pem`, and `validator.pem`
1. Drop files from last step in `~/.chef`
1. Clone and bundle [chef-repo](https://github.com/opscode/chef-repo)
1. Verify

        $ knife client list

Part 2 - Working with Chef Repo
-------------------------------
Possible cookbooks: apache2, users, known_host, magic_shell.

1. Explain each folder (briefly)
1. Demonstrate community site (briefly)
1. Install Berkshelf

    ```ruby
    gem 'chef'
    gem 'berkshelf'
    ```

1. Add cookbook to `Berksfile`
1. Install cookbook

        $ bundle exec berks install

Part 3 - Converging the Node
----------------------------
1. Setup `Vagrantfile`

    ```ruby
    require 'berkshelf/vagrant'

    Vagrant::Config.run do |config|
      config.vm.host_name = "myhost.local"

      config.vm.provision :chef_client do |chef|
        chef.chef_server_url = 'http://mychefserver.com:4000'
        chef.validation_key_path = 'validation.pem'
        chef.validation_client_name = "chef-validator"
        chef.client_key_path = "/etc/chef/client.pem"

        # Add the recipe
        chef.add_recipe('my_recipe')
      end
    end
    ```

1. Bring up the box

        $ bundle exec vagrant up

1. Watch it converge

1. Verify the changes
