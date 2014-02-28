---
title: 'Launch a Virtual Machine'
video: 'https://www.youtube.com/embed/R5DQw8PGDiM'
layout: 'screencast'
description: 'Launch a Virtual Machine with Vagrant and VirtualBox for Chef.'
keywords: 'vagrant up, vm, virtual machine, launch, standup'
---

This tutorial will demonstrate using Chef to manage a virtual machine that is running on your local workstation. The virtual machine will be managed by Vagrant. All code in the tutorial will be tracked in git.

1. Open a terminal window.
1. Create a directory for your work and move to that directory.

        $ mkdir -p ~/projects/learnchef/getting_started
        $ cd ~/projects/learnchef/getting_started

1. Initialize a git repository

        $ git init

1. Initialize Vagrant

        $ vagrant init

1. Add the initial Vagrantfile to the git repository

        $ git add Vagrantfile
        $ git commit -m "Adding initial Vagrantfile"

1. Open the Vagrantfile in a text editor and update the contents of the file.

    ```ruby
    Vagrant::Config.run do |config|
      config.vm.box = "webserver"
      config.vm.box_url = "https://opscode-vm-bento.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04_chef-10.18.2.box"
    end
    ```

1. Launch the virtual machine:

        $ vagrant up

1. AAdd the updated Vagrantfile to the git repository:

        $ git add Vagrantfile
        $ git commit -m "Initial, bare-bones Vagrantfile with one VM"

1. Add a file named .gitignore so that git will ignore the .vagrant directory that is created when launching a virtual machine.

        $ echo '.vagrant' >> .gitignore
