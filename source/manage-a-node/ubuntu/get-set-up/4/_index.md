## 4. Windows only &ndash; install an SSH client

In this tutorial, you'll log in to your Linux instance to verify your work. To do so, you'll need an SSH client. Mac OS and most Linux distributions come with an SSH client. On Windows, you'll need to install one manually.

The easiest way to get set up is to [install Git](http://git-scm.com/download/), which includes an SSH client.

After you install Git, ensure that the path to the Git binaries are included in your system `PATH`.

Here's an example that adds the default Git path, <code class="file-path">C:\\Program Files (x86)\\Git\\bin</code>, to your `PATH` environment variable.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH")
$ $git_path = "C:\Program Files (x86)\Git\bin"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$git_path")
```

[PuTTY](http://www.putty.org) is another popular SSH client for connecting to Linux machines.
