## 4. Windows workstation only &ndash; install an SSH client

In this tutorial, you'll log in to your Linux instance to verify your work. To do so, you'll need an SSH client. Mac OS and most Linux distributions come with an SSH client. On Windows, you'll need to install one manually.

The easiest way to get set up is to [install Git](http://git-scm.com/download/), which includes an SSH client. [Learn more](http://www.hurryupandwait.io/blog/need-an-ssh-client-on-windows-dont-use-putty-or-cygwinuse-git).

After you install Git, open a new PowerShell window and run `git --version` to check whether the path to the Git binaries is included in your system `PATH`.

```ps
$ git --version
git version 2.7.3.windows.1
```

If you receive an error, you'll need to add Git to your `PATH` environment variable manually. Here's how to do that for the 64-bit version of Git.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH")
$ $git_path = "C:\Program Files\Git\cmd"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$git_path")
```

Here's how for the 32-bit version of Git.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH")
$ $git_path = "C:\Program Files (x86)\Git\cmd"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$git_path")
```

[WINDOWS] Many Git users use Git Bash, which is part of Git for Windows, to work with Git from Windows. [posh-git](https://github.com/dahlbyk/posh-git) is another popular option, which provides access to Git from Windows PowerShell.
