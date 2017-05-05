---
id: chef-fundamentals-series
title: 'Chef fundamentals series'
description: 'This webinar series helps prepare you to use Chef to write infrastructure.'
keywords: 'chef, fundamentals, overview, webinar'
tags: [video]
---
This webinar series helps prepare you to use Chef to write infrastructure. Each unit in the course has hands-on exercises to reinforce the material. You'll learn Chef by using it. At the end of the class, you will have a code repository that can be used and modified to solve real business problems.

Join us as we cover:

- Overview of Chef
- Workstation and test node setup
- Conducting a first Chef run
- Node objects
- Writing Apache and MOTD cookbooks
- Roles, community cookbooks, and further resources

## Before you begin

As part of this series, we provided a free online virtual machine to help you follow along with the training materials. We no longer provide this training environment.

This series still has a ton of great information that is fundamental to the way Chef works. So in the meantime, you'll either need to provide your own virtual machine or simply skip the exercises and watch as we demonstrate them during the videos.

If you choose to bring up your own environment, launch a CentOS 6 virtual machine or server that has:

* 512 MB RAM.
* 8 GB disk space.
* a user account with `sudo` or root access.
* an IP address that you can access from another workstation computer.

### Workstation requirements

The following operating systems have been tested as workstation systems with the hands on exercises:

- Windows 7+
- macOS 10.7.3+
- Ubuntu 10.04+

Other platforms and platform versions may work without modification.

### Software requirements:

An application that will allow participants to create an SSH connection to a remote server and SCP files to a remote server.  Recommended applications:

- Windows - [Git for Windows](https://git-scm.com/download/win), which includes an SSH client, or [puTTY][puTTY].
  - Git for Windows is also bundled with the [Chef Development Kit](https://downloads.chef.io/chefdk).
- macOS - the built-in Terminal application or [iTerm2][iTerm2]
- Ubuntu - the built in Terminal application

A programmer's text editor that allows the participants to have multiple files open at one time and includes syntax highlighting.  Recommended applications, **pick one**:

- [Atom](https://atom.io/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Sublime Text 2][sublime-text-2]
- [vim][vim]
- [emacs][emacs]

The [chef-client][omnibus-installer] application which includes the `knife` command line utility.

[puTTY]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
[iTerm2]: http://www.iterm2.com/#/section/home
[sublime-text-2]: http://www.sublimetext.com/
[vim]: http://www.vim.org/
[emacs]: http://www.gnu.org/software/emacs/
[omnibus-installer]: https://downloads.chef.io/chef-client/
