## 2. Install Vagrant

Next, install Vagrant. Test Kitchen uses Vagrant to communicate with VirtualBox and to configure aspects of the virtual machine such as available memory, host name, and network settings.

### Install Vagrant on Windows using Chocolatey

If you use [Chocolatey](https://chocolatey.org) to manage software packages on Windows, run this command to install Vagrant.

```ps
$ choco install vagrant
Chocolatey v0.9.9.8
Installing the following packages:
vagrant
By installing you accept licenses for the packages.

vagrant v1.7.4

[...]

Chocolatey installed 1/1 package(s). 0 package(s) failed.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
```

### Install Vagrant using the installer

If you're on a Linux or Mac OS workstation or don't use Chocolatey, download and install Vagrant from the Vagrant web site.

<a class='accent-button radius' href='https://www.vagrantup.com/downloads.html' target='_blank'>Install Vagrant&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

<hr>

### Windows only - Update your PATH environment variable

By default, Vagrant is installed to <code class="file-path">C:\HashiCorp\Vagrant\bin</code> on Windows. However, the installer does not add this path to your `PATH` environment variable. Run these commands to add Vagrant to your system path.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH")
$ $vagrant_path = "C:\HashiCorp\Vagrant\bin"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$vagrant_path")
```

<hr>

### Verify the installation

Now run the following to verify that Vagrant is installed.

```bash
# ~
$ vagrant --version
Vagrant 1.7.4
```
