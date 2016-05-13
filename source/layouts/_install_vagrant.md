#### Download and install Vagrant

<a class='accent-button radius' href='https://www.vagrantup.com/downloads.html' target='_blank'>Install Vagrant&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

<hr>

#### Windows only - Update your PATH environment variable

By default, Vagrant is installed to <code class="file-path">C:\HashiCorp\Vagrant\bin</code> on Windows. However, the installer does not add this path to your `PATH` environment variable. Run these commands to add Vagrant to your system path.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH")
$ $vagrant_path = "C:\HashiCorp\Vagrant\bin"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$vagrant_path")
```

<hr>

#### Verify the installation

Now run the following to verify that Vagrant is installed.

```bash
# ~
$ vagrant --version
Vagrant 1.8.1
```
