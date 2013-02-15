##### Bootstrap the node
1. Bootstrap the virtual machine with `knife`. In Terminal:

        $ knife bootstrap localhost \
          --ssh-user vagrant \
          --ssh-password vagrant \
          --ssh-port 2222 \
          --run-list "recipe[aliases],recipe[apache2],recipe[networking_basic]" \
          --sudo

    [INFO] We are setting the `run_list` to include the three recipes we created in Part 2. There are multiple ways to configure a `run_list` - See the [Getting Started Guide][getting-started-guide] for more information

1. After a few seconds and some output, you should see something like this:

        localhost Chef Client finished, 18 resources updated

    This means the node "converged" successfully.
