#### Download and install VirtualBox

<a class='accent-button radius' href='https://www.virtualbox.org/wiki/Downloads' target='_blank'>Install VirtualBox&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

<hr>

#### Windows only - Update your PATH environment variable

By default, VirtualBox is installed to <code class="file-path">C:\Program Files\Oracle\VirtualBox</code> on Windows. However, the installer does not add this path to your `PATH` environment variable. Run these commands to add VirtualBox to your system path.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH")
$ $vbox_path = "C:\Program Files\Oracle\VirtualBox"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$vbox_path")
```

<hr>

#### Verify the installation

Now run the following command to verify that VirtualBox is installed.

```bash
# ~
$ VBoxManage --version
5.0.4r102546
```
