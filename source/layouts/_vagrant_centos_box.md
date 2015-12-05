### Download a CentOS 6.5 Vagrant box

The next step is to download a base virtual machine image, called a _box_. Here's how to download a CentOS 6.5 box.

```bash
$ vagrant box add centos-6.5 http://opscode-vm-bento.s3.amazonaws.com/vagrant/virtualbox/opscode_centos-6.5_chef-provisionerless.box
==> box: Box file was not detected as metadata. Adding it directly...
==> box: Adding box 'centos-6.5' (v0) for provider:
    box: Downloading: http://opscode-vm-bento.s3.amazonaws.com/vagrant/virtualbox/opscode_centos-6.5_chef-provisionerless.box
==> box: Successfully added box 'centos-6.5' (v0) for 'virtualbox'!
```

### Bring up an instance

Next, run these commands to bring up a CentOS 6.5 instance.

```bash
$ vagrant init centos-6.5
A `Vagrantfile` has been placed in this directory. You are now
ready to `vagrant up` your first virtual environment! Please read
the comments in the Vagrantfile as well as documentation on
`vagrantup.com` for more information on using Vagrant.
$ vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Importing base box 'centos-6.5'...
==> default: Matching MAC address for NAT networking...
[...]
    default: Guest Additions Version: 4.3.8
    default: VirtualBox Version: 5.0
==> default: Mounting shared folders...
    default: /vagrant => /home/user
```

Next, verify that you can connect to the instance and then log out.

```bash
$ vagrant ssh
Last login: Fri Mar  7 16:57:20 2014 from 10.0.2.2
[vagrant@localhost ~]$ exit
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
