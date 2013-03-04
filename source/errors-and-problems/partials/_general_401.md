The general `Net::HTTPServerException: 401 "Unauthorized"` error will usually occur for one of two reasons.

- - -

##### Troubleshooting

1. Make sure your `client.pem` is valid.

  This can be fixed by deleting `client.pem` in `/etc/chef` and deleting the client and node with knife.

  On a management station:

        $ knife client delete FQDN -y; knife node delete FQDN -y

  On an affected node (as root):

        $ rm /etc/chef/client.pem
        $ chef-client

  When `client-client` runs, it will register the API client and generate the correct key.

1. Make sure you are using the same `node_name` as your intial `chef-client` run.

    This can happen for a number of reasons. For example, if your `client.rb` does not specify your node name and you have recently changed the systems hostname.

    Running `chef-client` with debug logging will allow you to see the node name the client is trying to authenticate with:

    ```bash
    DEBUG: Signing the request as SOME_NODE_NAME
    ```

    You can fix this by explicitly setting the `node_name` in your `client.rb` to match the name originally used to register.

    Alternatively, you can re-register using the method described in step one.