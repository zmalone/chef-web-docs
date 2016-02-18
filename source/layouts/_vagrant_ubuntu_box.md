### Download an Ubuntu 14.04 Vagrant box

The next step is to download a base virtual machine image, called a _box_. Here's how to download an Ubuntu 14.04 box.

```bash
$ vagrant box add ubuntu-14.04 http://opscode-vm-bento.s3.amazonaws.com/vagrant/virtualbox/opscode_ubuntu-14.04_chef-provisionerless.box
==> box: Box file was not detected as metadata. Adding it directly...
==> box: Adding box 'ubuntu-14.04' (v0) for provider:
    box: Downloading: http://opscode-vm-bento.s3.amazonaws.com/vagrant/virtualbox/opscode_ubuntu-14.04_chef-provisionerless.box
==> box: Successfully added box 'ubuntu-14.04' (v0) for 'virtualbox'!
```

[WINDOWS] [Due to an issue with newer versions of Vagrant](https://github.com/mitchellh/vagrant/issues/6852), if you're using a Windows workstation and the command fails with a blank error message, [you may need to install the Microsoft Visual C++ 2010 SP1 Redistributable Package](https://www.microsoft.com/en-us/download/details.aspx?id=8328). Then try the command again.

### Bring up an instance

Next, run these commands to bring up an Ubuntu 14.04 instance.

```bash
$ vagrant init ubuntu-14.04
A `Vagrantfile` has been placed in this directory. You are now
ready to `vagrant up` your first virtual environment! Please read
the comments in the Vagrantfile as well as documentation on
`vagrantup.com` for more information on using Vagrant.
$ vagrant up --provider=virtualbox
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Importing base box 'ubuntu-14.04'...
==> default: Matching MAC address for NAT networking...
[...]
==> default: Machine booted and ready!
==> default: Checking for guest additions in VM...
==> default: Mounting shared folders...
    default: /vagrant => /home/user
```

Next, verify that you can connect to the instance and then log out.

```bash
$ vagrant ssh
Welcome to Ubuntu 14.04.3 LTS (GNU/Linux 3.19.0-25-generic x86_64)

 * Documentation:  https://help.ubuntu.com/
vagrant@vagrant:~$ exit
logout
Connection to 127.0.0.1 closed.
```

### Cleaning up

After you complete the tutorial, you can destroy your virtual machine like this.

```bash
$ vagrant destroy
    default: Are you sure you want to destroy the 'default' VM? [y/N] y
==> default: Forcing shutdown of VM...
==> default: Destroying VM and associated drives...
```
