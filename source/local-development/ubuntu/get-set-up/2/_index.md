## 2. Install VirtualBox

Install VirtualBox. VirtualBox manages your virtual machine instances.

### Install VirtualBox on Windows using Chocolatey

If you use [Chocolatey](https://chocolatey.org) to manage software packages on Windows, run this command to install VirtualBox.

```ps
$ choco install virtualbox
Chocolatey v0.9.9.8
Installing the following packages:
virtualbox
By installing you accept licenses for the packages.

virtualbox v5.0.4.102546

[...]

Chocolatey installed 1/1 package(s). 0 package(s) failed.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
```

### Install VirtualBox using the installer

If you're on a Linux or Mac OS workstation or don't use Chocolatey, download and install VirtualBox from the VirtualBox web site.

<a class='accent-button radius' href='https://www.virtualbox.org/wiki/Downloads' target='_blank'>Install VirtualBox&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

<hr>

### Windows only - Update your PATH environment variable

By default, VirtualBox is installed to <code class="file-path">C:\Program Files\Oracle\VirtualBox</code> on Windows. However, the installer does not add this path to your `PATH` environment variable. Run these commands to add VirtualBox to your system path.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH")
$ $vbox_path = "C:\Program Files\Oracle\VirtualBox"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$vbox_path")
```

<hr>

### Verify the installation

Now run the following command to verify that VirtualBox is installed.

```bash
# ~
$ VBoxManage --version
5.0.4r102546
```
