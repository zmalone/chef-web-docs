Like VirtualBox, there are two ways to install Vagrant:

* On Windows, [run the Chocolatey installer](https://chocolatey.org/packages/vagrant/). This is the easiest way to install Vagrant on Windows.
* [Download Vagrant](https://www.vagrantup.com/downloads.html) from the HashiCorp web site.

<hr>

### Windows only - Update your PATH environment variable

Like VirtualBox, the Chocolatey installer updates your `PATH` environment variable for you. If you manually installed Vagrant, you'll need to also update your `PATH` manually.

By default, Vagrant is installed to <code class="file-path">C:\HashiCorp\Vagrant\bin</code> on Windows. Run these commands to add Vagrant to your system path.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH", "Machine")
$ $vagrant_path = "C:\HashiCorp\Vagrant\bin"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$vagrant_path", "Machine")
```

<hr>
