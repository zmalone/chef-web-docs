##### Create the Base Box
We need a "machine" (or "node" in the Chef language) to provision. We are going to create a Virtual Machine with Vagrant + VirtualBox + Opscode VMs.

1. Move into your working directory using the `cd` command:

        $ cd ~/Development/chef-repo

1. Create, initialize, and start the Opscode base box (one time). In Terminal:

        $ vagrant init opscode-ubuntu-1204 https://opscode-vm.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04-i386_chef-11.2.0.box

    [NOTE] This will create a `Vagrantfile` in the root of your repository.

1. Start the virtual machine. In Terminal:

        $ vagrant up

  [WARN] This process can take up to 10 minutes. Do not interrupt the process.
