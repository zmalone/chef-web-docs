## 1. Install VirtualBox

Next, install VirtualBox. VirtualBox is software that manages your virtual machine instances.

<a class='accent-button radius' href='https://www.virtualbox.org/wiki/Downloads' target='_blank'>Install VirtualBox&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

Then run the following command to verify that VirtualBox is installed.

```bash
# ~
$ VBoxManage --version
4.3.26r98988
```

[WINDOWS] By default, VirtualBox is installed to <code class="file-path">C:\Program Files\Oracle\VirtualBox</code> on Windows. However, this path is not added to the `PATH` environment variable. Either `cd` to this directory or add it to your `PATH` before you run `VBoxManage`.
