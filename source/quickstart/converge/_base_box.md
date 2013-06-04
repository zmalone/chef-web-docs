##### Create the Base Box
We need a "machine" (or "node" in the Chef language) to provision. We are going to create a Virtual Machine with Vagrant + VirtualBox + Opscode VMs.

1. Move into your working directory using the `cd` command:

        $ cd ~/Development/chef-repo

1. Create, initialize, and start the Opscode base box (one time). In Terminal:

        $ vagrant init opscode-ubuntu-1204 https://opscode-vm.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04-i386_chef-11.4.4.box --no-color

    [NOTE] This will create a `Vagrantfile` in the root of your repository.

  You should see output like:

  ```text
  A Vagrantfile has been placed in this directory. You are
  now ready to `vagrant up` your first virtual environment!

  Please read the comments in the Vagrantfile as well as documentation
  on vagrantup.com for more information on using Vagrant.
  ```

1. Start the virtual machine. In Terminal:

        $ vagrant up --no-color

  You should see output like:

  ```text
  Bringing machine 'default' up with 'virtualbox' provider...

  [default] Box 'opscode-ubuntu-1204' was not found.
  Fetching box from specified URL for the provider 'virtualbox'.

  Note that if the URL does not have a box for this provider,
  you should interrupt Vagrant now and add the box yourself.

  Otherwise Vagrant will attempt to download the full box prior
  to discovering this error.

  Downloading or copying the box...
  ```

  [WARN] This process can take up to 10 minutes. Do not interrupt the process.

  [NOTE] We are using a Virtual Machine and Vagrant here. You could just as easily use a remote server (like EC2 or Rackspace) or a physical server.
