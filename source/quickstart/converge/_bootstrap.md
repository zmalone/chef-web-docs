##### Bootstrap the node
1. Bootstrap the virtual machine with `knife`. In Terminal:

        $ knife bootstrap localhost \
          --ssh-user vagrant \
          --ssh-password vagrant \
          --ssh-port 2222 \
          --run-list "recipe[aliases],recipe[apache2],recipe[networking_basic]" \
          --sudo

1. After a few seconds and some output, you should see something like this:

        localhost Chef Client finished, 18 resources updated

    This means the node "converged" successfully.
