##### Bootstrap the node

[NOTE] If you've used Vagrant before, please make sure all instances but this one are turned off (`vagrant halt`) before bootstrapping.

1. Bootstrap the virtual machine with `knife`. In Terminal:

        $ knife bootstrap localhost \
          --ssh-user vagrant \
          --ssh-password vagrant \
          --ssh-port 2222 \
          --run-list "recipe[apt],recipe[aliases],recipe[apache2]" \
          --sudo

	[NOTE] If you're behind a proxy, you'll need to use the [`--bootstrap-proxy`](http://docs.opscode.com/knife_bootstrap.html) option.

	[WARN] "__--ssh-port 2222__" may not be correct if you have multiple Vagrant VMs running. Look for which port Vagrant has selected for SSH forwarding from the output of the previous `vagrant up` command.

1. After a few seconds and some output, you should see something like this:

        localhost Chef Client finished, 18 resources updated

    This means the node "converged" successfully.

[INFO] If the bootstrap fails, or you need to retrace your steps for whatever reason, you can reset the node's keypair and the configuration on the server by using the "knife client delete vagrant.vm --yes" and "knife node delete vagrant.vm --yes" commands.
