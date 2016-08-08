There are two ways to install VirtualBox:

* On Windows, [run the Chocolatey installer](https://chocolatey.org/packages/virtualbox/). This is the easiest way to install VirtualBox on Windows.
* [Download VirtualBox](https://www.virtualbox.org/wiki/Downloads) from the Oracle web site.

<hr>

### Windows only - Update your PATH environment variable

The Chocolatey installer updates your `PATH` environment variable for you. If you manually installed VirtualBox, you'll need to also update your `PATH` manually.

By default, VirtualBox is installed to <code class="file-path">C:\Program Files\Oracle\VirtualBox</code> on Windows. Run these commands to add VirtualBox to your system path.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH", "Machine")
$ $vbox_path = "C:\Program Files\Oracle\VirtualBox"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$vbox_path", "Machine")
```

<hr>
