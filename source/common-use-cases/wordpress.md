---
title: 'PHP Wordpress'
long_title: 'Deploy a PHP Wordpress Application with Chef'
order: 3
layout: 'common-use-case'
description: 'Learn how to setup a Wordpress site on a fresh server in less than 10 minutes with Opscode Chef! Install and configure Apache, MySQL, PHP, and more.'
---

PHP Wordpress
=================
This guide will cover installing Wordpress on a remote server. **This will not configure wordpress**, but you will have a working Wordpress installation ready for configuration via the WebUI.

If you're familiar with PHP Wordpress, you know that it has the following requirements:

1. Apache Web Server
2. MySQL Database Server
3. PHP

Additionally, we need to:

1. Download the latest Wordpress package
2. Configure Apache, MySQL, and PHP to work in harmony

We will use the [wordpress cookbook](http://community.opscode.com/cookbooks/wordpress) to automate this process.

If you do not already have Chef installed and configured on your system, please follow the [Workstation Setup](/quickstart/workstation-setup) guide.

We will be using [Berkshelf](http://berkshelf.org) - a Chef cookbook dependency manager. Install Berkshelf into Ruby using the `gem` command:

    $ gem install berkshelf

Next, create a file named `Berksfile` in your `chef-repo`. Remember, all commands should be run from inside your `chef-repo`:

```ruby
site :opscode
cookbook 'wordpress', '~> 1.1.2'
```

The first line says "use the Opscode community site for cookbooks". The second line defines the wordpress cookbook as a dependency and locks to a specific version.

Next, we need to download this cookbook from the cookbook site. We can do this by running `berks install`:

    $ berks install

This will install all the cookbooks and those cookbook's dependencies from the community site. As you can see from the output, Berkshelf downloaded the wordpress cookbook and all the dependent cookbooks such as php, apache, and mysql.

There's always an intentional disconnect between the Chef Server and your local repository. We need to "push" the cookbooks up to our Chef Server. Issue the `berks upload` command to do this:

    $ berks upload wordpress

This will upload wordpress and all of its dependencies to the remote Chef Server.

Now that the cookbooks are on the server, we need to bootstrap a node with the wordpress cookbook in the run list. We will use `knife`, the Command Line Tool for Chef, to accomplish this.

Because `knife` is a command line tool, we can use it interactively. Let's look at the help output for the `bootstrap` command:

    $ knife bootstrap --help

```text
knife bootstrap FQDN (options)
        --bootstrap-proxy PROXY_URL  The proxy server for the node being bootstrapped
        --bootstrap-version VERSION  The version of Chef to install
    -N, --node-name NAME             The Chef node name for your new node
    -s, --server-url URL             Chef Server URL
    -k, --key KEY                    API Client Key
        --[no-]color                 Use colored output, defaults to enabled
    -c, --config CONFIG              The configuration file to use
        --defaults                   Accept default values for all questions
        --disable-editing            Do not open EDITOR, just accept the data as is
    -d, --distro DISTRO              Bootstrap a distro using a template
    -e, --editor EDITOR              Set the editor to use for interactive commands
    -E, --environment ENVIRONMENT    Set the Chef environment
    -j JSON_ATTRIBS,                 A JSON string to be added to the first run of chef-client
        --json-attributes
    -F, --format FORMAT              Which format to use for output
        --hint HINT_NAME[=HINT_FILE] Specify Ohai Hint to be set on the bootstrap target.  Use multiple --hint options to specify multiple hints.
        --[no-]host-key-verify       Verify host key, enabled by default.
    -i IDENTITY_FILE,                The SSH identity file used for authentication
        --identity-file
    -u, --user USER                  API Client Username
        --prerelease                 Install the pre-release chef gems
        --print-after                Show the data after a destructive operation
    -r, --run-list RUN_LIST          Comma separated list of roles/recipes to apply
    -G, --ssh-gateway GATEWAY        The ssh gateway
    -P, --ssh-password PASSWORD      The ssh password
    -p, --ssh-port PORT              The ssh port
    -x, --ssh-user USERNAME          The ssh username
        --template-file TEMPLATE     Full path to location of template to use
        --sudo                       Execute the bootstrap via sudo
    -V, --verbose                    More verbose output. Use twice for max verbosity
    -v, --version                    Show chef version
    -y, --yes                        Say yes to all prompts for confirmation
    -h, --help                       Show this message
```

As you can see, there are many flags and parameters that we can pass to the bootstrap command.

The first parameter (and the only required parameter) is the IP Address or DNS name of the remote server. The remote server must be running SSH or WinRM.

    $ knife bootstrap IP_ADDRESS

Next, we need to give the SSH username. This defaults to the currently logged in user, but I want to SSH as root:

    $ --ssh-user root

I also want to name this node. By default, Chef will use the FQDN of the host, but we can override that here:

    $ --node-name target

Lastly, we can specify the `run_list` for this node during the bootstrap:

    $ --run-list "recipe[wordpress::default]"

Notice that I used the "recipe-bracket" notation. This is how we refer to the default recipe of the wordpress cookbook.

[NOTE] You will need to insert the correct values and flags based on your remote target machine.

When we press enter (press enter), Chef will connect to our remote machine via SSH (or WinRM for Windows machines) and install Omnibus Chef. Omnibus is a fully-isolated, self-contained Chef installation. It includes Chef, Ruby, Ohai, and many other tools that are necessary when working with Chef.

In the next step of the bootstrap process, Chef will attempt to register this node with the remote Chef Server. The node will first request a client key from the Chef Server, using the validation key. The Chef Server will respond with the client key, which the node will then sign all subsequent requests.

Finally, once the node is registered with the Chef Server, the final phase of the bootstrap process is to "run Chef". This will execute the `run_list` for this node (if you recall, we passed it in as a parameter). In other words, this will install wordpress.

During this time Chef is executing the wordpress cookbook. This cookbook handles the installation of Apache, MySQL, PHP, and the inner bindings of those tools in harmony. Once the bootstrap completes, we should have a working wordpress installation.

If you visit the server's IP Address or FQDN in a browser, you should see a working wordpress installation - all within minutes!

![Wordpress Login Screen](wordpress-login.jpg)

You could easily extend this recipe, automatically deploying blog posts and setting up configurations.
