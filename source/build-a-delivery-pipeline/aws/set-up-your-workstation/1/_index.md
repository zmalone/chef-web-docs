## 1. Install components

[TIP] If you installed Chef Delivery from your workstation, you can continue to use that same workstation. You can also skip steps 1.1, 1.2, and 1.3 and [move on to step 1.4](#step1.4).

### 1.1. Install Git

You'll need [Git](https://git-scm.com/downloads) to obtain starter code for your project and to interact with Delivery's Git server.

[WINDOWS] On Windows, Git 2.6 is not currently supported for use with Chef Delivery.

[WINDOWS] Many Windows users use Git BASH, which is part of [Git for Windows](https://git-for-windows.github.io). [posh-git](https://github.com/dahlbyk/posh-git) is another popular option, which provides access to Git from Windows PowerShell.

### 1.2. Install the Chef Development Kit

The Chef Development Kit, or Chef DK, gives you the tools needed to write Chef code from your workstation.

[Install the Chef DK](https://downloads.chef.io/chef-dk/) now if you haven't already.

Be sure to set the system Ruby; for details, see [Add Ruby to $PATH](https://docs.chef.io/install_dk.html#add-ruby-to-path).

### 1.3. Install the knife push plugin

The `knife push` plugin enables you to view the status of the build nodes in your Delivery cluster. Install the plugin like this.

```bash
$ chef gem install knife-push
```

### 1.4. Install the Delivery CLI

You'll use the `delivery` command line interface (CLI) to interact with Chef Delivery. Follow the procedure that matches your workstation OS.

[START_TABS cli Mac OS X, RHEL, Ubuntu, Windows]

[START_TAB cliMacOSX active]

1. [Download the package](https://s3.amazonaws.com/delivery-packages/cli/deliverycli-0.0.0%2B20151118205039-1.pkg).
1. Click the package and install.
1. You may need to allow the package on the machine. To do this, open **System Preferences** > **Security & Privacy**, and click **Allow**. You may also go to your <code class="file-path">~/Downloads</code> folder and right-click the package to open the installer. Accept the agreement to install the package.

[END_TAB]

[START_TAB cliWindows]

1. [Download the Delivery CLI installer](https://s3.amazonaws.com/delivery-packages/cli/delivery-cli-0.0.0%2B20151020165859-1-x64.msi).
1. Click the package and install.
1. Modify your `PATH` environment variable to include the path to the `delivery` executable. For example: <code class="file-path">C:\\chef\\delivery-cli\\bin</code>.

[END_TAB]

[START_TAB cliRHEL]

Download the Delivery CLI package like this.

```bash
$ curl -o delivery-cli.rpm https://s3.amazonaws.com/delivery-packages/cli/delivery-cli-20150408004719-1.x86_64.rpm
```

Then run this to install it.

```bash
$ sudo yum install delivery-cli.rpm
```

[END_TAB]

[START_TAB cliUbuntu]

Run this command to add packagecloud.io's repository to your `apt` sources list.

```bash
# ~
$ curl https://packagecloud.io/install/repositories/chef/current/script.deb.sh | sudo bash
```

Then run this command to install the Delivery CLI package.

```bash
# ~
$ sudo apt-get install delivery-cli
```

[END_TAB]

[END_TABS]
