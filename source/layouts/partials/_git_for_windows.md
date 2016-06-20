1. [Install Git for Windows](https://git-scm.com/download/win).
1. Add the application paths to your `PATH` environment variable.

Here's how to do that for the 64-bit version of Git.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH", "Machine")
$ $git_path = "C:\Program Files\Git\cmd;C:\Program Files\Git\usr\bin"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$git_path", "Machine")
```

Here's how for the 32-bit version of Git.

```ps
$ $path = [Environment]::GetEnvironmentVariable("PATH", "Machine")
$ $git_path = "C:\Program Files (x86)\Git\cmd;C:\Program Files (x86)\Git\usr\bin"
$ [Environment]::SetEnvironmentVariable("PATH", "$path;$git_path", "Machine")
```
