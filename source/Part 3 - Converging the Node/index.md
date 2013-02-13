Part 3 - Converging the Node
============================

Create the Base Box
-------------------
We need a "machine" (or "node" in the Chef language) to provision. We are going to create a Virtual Machine with Vagrant + VirtualBox + Opscode VMs.

1. Create, initialize, and start the Opscode base box (one time). In Terminal:

        vagrant init opscode-ubuntu-1204 \
          https://opscode-vm.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04_chef-11.2.0.box
        vagrant up

    **[Note]** This will create a `Vagrantfile` in the root of your repository.

    *[Info]* In the future, can start the machine with:

        vagrant up

1. Save these changes to git:

        git add .
        git commit -m "Added vagrant"

1. Bootstrap the virtual machine with `knife`. In Terminal:

        knife bootstrap localhost \
          --ssh-user vagrant \
          --ssh-password vagrant \
          --ssh-port 2222 \
          --run-list "recipe[aliases],recipe[apache2],recipe[networking_basic]" \
          --sudo

    *[Info]* We are setting the `run_list` to include the three recipes we created in Part 2. There are multiple ways to configure a `run_list` - See the [Getting Started Guide][getting-started-guide] for more information

1. After a few seconds and some output, you should see something like this:

        localhost Chef Client finished, 18 resources updated

    This means the node "converged" successfully.

1. Let's verify the changes actually happened on the node. SSH into the Virtual Machine again:

        vagrant ssh

1. Try out some of our aliases!

  - Go to the `sites` path:

          vagrant@vagrant:~$ sites
          vagrant@vagrant:/etc/apache2/sites-enabled$ pwd
          /etc/apache2/sites-enabled

  - Go home with our `h` alias:

          vagrant@vagrant:/etc/apache2/sites-enabled$ h
          vagrant@vagrant:~$ pwd
          /home/vagrant

  - Finally, make sure our `EDITOR` is vim:

          vagrant@vagrant:~$ echo $EDITOR
          vim

1. Make sure apache is running!

  - Check the processes table:

          vagrant@vagrant:~$ ps aux | grep apache
          root      3156  0.0  0.8  69944  2996 ?        Ss   21:14   0:00 /usr/sbin/apache2 -k start
          www-data  3159  0.0  0.5  69676  2040 ?        S    21:14   0:00 /usr/sbin/apache2 -k start
          www-data  3161  0.0  0.7 678560  2832 ?        Sl   21:14   0:00 /usr/sbin/apache2 -k start
          www-data  3162  0.0  0.8 744160  3340 ?        Sl   21:14   0:00 /usr/sbin/apache2 -k start
          www-data  3163  0.0  0.7 678560  2832 ?        Sl   21:14   0:00 /usr/sbin/apache2 -k start
          vagrant   6477  0.0  0.2   9384   928 pts/0    S+   21:43   0:00 grep --color=auto apache

  - Download the default apache webpage:

          vagrant@vagrant:~$ curl localhost
          <html><body><h1>It works!</h1>
          <p>This is the default web page for this server.</p>
          <p>The web server software is running but no content has been added, yet.</p>
          </body></html>

That's it!
----------
You have successfully converged your first node with Chef! Pat yourself on the back and check out some [common use cases][common-use-cases] with Chef or head over to our more in-depth [Getting Started Guide][getting-started-guide].

- - -

  [common-use-cases]: http://not-done-yet "Not done yet"
  [getting-started-guide]: http://not-done-yet "Not done yet"
