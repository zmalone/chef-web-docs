## 2. Install Chef server

Run this command to install Chef server.

```bash
$ curl -L https://omnitruck.chef.io/install.sh | sudo bash -s -- -P chef-server
```

Alternatively, you can [download and install the package manually](https://downloads.chef.io/chef-server/).

### Install a text editor on your Chef server

You'll need to edit a few configuration files, so ensure you have a text editor that you're comfortable working with installed on your Chef server. If you don't have a preferred editor, we recommend `vim`. This [interactive Vim tutorial](http://www.openvim.com/tutorial.html) can help you get oriented to the commands you'll need to create, edit, and save a file.

Next, you'll modify the Chef server configuration file before you configure and start the server.
