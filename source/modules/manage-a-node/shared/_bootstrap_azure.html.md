Later in this module, you'll use Chef's ability to search node metadata to run `chef-client` a second time on your node. That step will require your node to have an attribute that contains its public hostname or IP address.

Because Azure does not provide metadata about an instance's public hostname or IP address, you need to set it manually during the bootstrap process.

If you're using an Azure instance as your node, append the `--json-attributes` argument to the end of your `knife bootstrap` command in this format:

```bash
# ~/learn-chef
--json-attributes '{"cloud": {"public_ip": "NODE_PUBLIC_IP_ADDRESS"}}'
```

For example:

```bash
# ~/learn-chef
--json-attributes '{"cloud": {"public_ip": "13.82.139.157"}}'
```

If your workstation is running Windows, you may need to run the bootstrap command differently. First, create a variable to hold the string as a JSON object.

```ps
# ~\learn-chef
$ $public_ip = '{"cloud": {"public_ip": "13.82.139.157"}}' | ConvertTo-Json
```

When you run the bootstrap command, pass the `--json-attributes` argument like this.

```ps
# ~\learn-chef
--json-attributes $public_ip
```
