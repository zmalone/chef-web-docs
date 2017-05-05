---
id: sys-admin-essentials
title: 'Systems administrator essentials'
description: 'Learn about the tools, commands, and protocols that are core to administering systems.'
time_to_complete: 15 minutes
quiz_path: quizzes/sys-admin-essentials.yml
headings: [
  { label: 'Communication tools', href: '#communicationtoolsandprotocols' },
  { label: 'Linux/Unix/OSX Shell', href: '#linuxunixmacosshell' },
  { label: 'Windows PowerShell', href: '#windowspowershell' }
]
tags: [article]
video_url: 'https://player.vimeo.com/video/215939133'
---
Administering computer systems these days require a core understanding about how to connect to those machines and some core commands that allow you to query and change the state of a system. If you cannot do it manually then you can't automate it.

In this module we will focus on how these systems are reachable by other systems and some of the core commands necessary to be proficient maintainer of a system.

## Communication tools and protocols

Every system within a functioning web application communicates with one another. They communicate through various client applications running on their system with other server applications running on other systems. They may form peer-to-peer arrangements that discover themselves through a mutually agreed upon broadcast message on the network. They may check in with a central server to grab the information required to understand the state of the network.

Whatever the relationship between two systems the important part is thinking first about the manner in which they communicate with one another over the network. Each system talks to one another in an agreed manner over a shared network.

The medium in which these systems is the physical network. Then each of the systems connected to that network must know about the system they want to communicate with. But these two systems do not have a shared understanding of the same state. So it becomes important for one system to contact another; sending a message. When we think about sending messages to one another we understand there are a few mediums in which we can use. Spoken words, sign language, written word, pictures, and moving pictures. There are all manner of ways in which I can reach out to other people when I want to send a message. I can broadcast information by walking about the front door and yelling or posting that information on a social network. I can chat with them out on the street or in chat room. There are so many ways in which we can communicate with one other. Each of these methods suit the information, personality, and our intended effect in the recipient.

The same could be said for computer systems. They are able to reach out to each other in a myriad amount of ways. Each of these methods may use a variety of different approaches that best suit the information and the two systems. Generally systems will agree on a protocol in which to communicate. A protocol defines what can be said, how it is said, and sometimes the medium in which it is said. These protocols usually define acknowledgement and error responses. They ensure that the two systems communicating with one another are able to do correctly.

A very common protocol that most people are familar with is the HTTP. Hypertext Transfer Protocol which defines the conversation between a client system that requests information from a server system. The client forms a request in a particular shape and the server responds to that request with a message that fits that particula shape. This protocol allows us to visit websites, submit data that fill out in forms, provides support for interactivity when the messages.

When we talk about administering systems we need to focus on three particular protocols: SSH; WinRM; and RDP.

SSH stands for Secure Shell. This protocol allows you to initiate a connection from one system to another system. This connection creates the appearance of an interactive session where you are able to execute system commands and see those results. It is not graphical so you are limited to shell related commands and tools. SSH generally is a protocol involves connecting to another system on port 22. This connection is secure preventing other malicious actors to understand the commands sent from your system to ther target systems. You connect with a username and password or with an agreed upon key encryption.

SSH is also the name of the application that is available to initiate a connection from the source system to the target system. The target system needs to be running a SSH server that listening on the available port.

Putty is a common Windows application that provides the ability to connect to remote systems that are running an SSH server.

WinRM is a Windows specific protocol that is similar to SSH in that is about executing commands and scripts without a visual interface. WinRM is a prefered way to communicate with systems running the Windows OS as it only requires flags and settings to enable the service and not the installation, configuration and execution of an SSH server service.

Where all the previous protocols focused on commands and scripts through a text-based interface RDP, Remote Desktop Protocol, allows for one system to connect to another and receive a visual representation of that remote system desktop on the local system. This if often the most common way to administer Windows systems. While you have access to every tool and the convenience of multi-tasking it also suffers from having to deliver more data as the Operating System needs to respond to mouse and keyboard events and the windowing system needs to update and adapt as input comes in and calculations are performed.

For RDP to work the target system needs to run the RDP server. The client needs to run the RDP client. For Windows systems the application "Remote Desktop Connection" is often pre-installed. For Mac you can download "Microsoft Remote Desktop". For Linux there is "Remmina Remote Desktop Client".


### Linux/Unix/macOS shell

While operating systems have continued to improve over the years and provide a more complete graphical experience it is still not the typical way that a system administrator manages linux operating systems. This is instead accomplished through a shell which provides a text-based user experience that allows interaction through keyboard input. On your own system you can launch a terminal application that launches a shell. When you login to a remote system through SSH, Secure Shell, a shell application is launched and you are given control of it.

Bash is often the default shell on most Linux systems. In this section, you will learn how to navigate this interface and understand the core tenants of this shell. You will also learn a few essential shell commands and some resources to assist you to understand more.

When you first launch the terminal application the default shell will run and present you with a prompt. Each prompt is different but the default prompt usually shows the user currently logged in with a separator character and the name of the system itself. Additionally, the current location of where you are in the file system is often presented. The prompt usually ends with a dollar sign ($) character and is followed by a cursor that may be simply a line or box that may blink at a particular interval.

Characters pressed on the keyboard they will appear as you type them into the screen in the prompt. When you are finished typing in text you can press the `enter` or `return` key to execute the text provided. Pressing `ctrl`-`c` will abort the current task which will halt execution of a command that has been executed and take you a fresh prompt. Bash and your operating system provide a number of built-in commands. Let's explore a few of these commands.

The prompt will often provide you with your current location within the file system. A directory is a special file that can contain references to other files and directories. To see all the files within this current directory you can execute the `ls` command.

```bash
$ ls
Applications			source
Desktop			habitat
Documents				inspec
Downloads			chef-dk
```

The currently directory likely contains a number of files. If any of those file are directories you can view the contents of those directories using the same command with a single parameter, the name of the directory.

```bash
$ ls habitat
bash-completions.sh   core-plans            results
bin                   habitat               wordpress
clap-rs               habitat-example-plans
```

If any of the files are text, you can view the contents with the `cat` command with the path to the file. For particularly large text files you can use the `more` command to view the contents in a way that allows you to scroll up `k`/`up-arrow` or scroll down `j`/`down-arrow`. You can quit scrolling with pressing the `q` key.

```bash
$ cat habitat/bash_completions.sh
$ more habitat/bash_completions.sh
```

This file exists within the habitat directory so it is required to specify that part of that path first, use a forward-slash as a path separator, and then specify the name of the file. If you wanted to work with these files without having to specify the directory path before the file name you can change into this directory to make these files local. This can be done by executing the `cd` command with the path of the directory you want to change into.

```bash
$ cd habitat
$ ls
bash-completions.sh   core-plans            results
bin                   habitat               wordpress
clap-rs               habitat-example-plans
$ cat bash-completions.sh
```

All the commands are now executed locally within this directory. To return to the previous directory, the one that contains this directory you can execute the `cd` command with the parameter `..`.

```bash
$ cd ..
$ ls
Applications			source
Desktop			habitat
Documents				inspec
Downloads			chef-dk
```

All files are contained on the file system in a hierarchy that start at the root. The prompt will display your current directory but not entire path from the root of the filesystem. You can learn the full path of your current working directory by executing the `pwd` command.

```bash
$ pwd
/Users/chef
```

A path can be broken up into components. The root of the file system is represented by the initial forward-slash `/`. The root directory contains a 'Users' directory and within the 'Users' directory is a 'chef' directory.

You can use any of the commands we have seen already using a full file path. For instance, you can execute the `ls` command to view the contents of any directory given its full path from wherever you on the file system.

```bash
$ ls /
$ ls /Users
$ ls /Users/chef
```

When you launched the shell you were most likely in an directory that was important to your specific user. This is usually referred to as your home directory and has a shortcut way to describe the path with the tilde character `~`.

```bash
$ cd ~/habitat
$ pwd
/Users/chef/habitat
$ cd ~
$ pwd
/Users/chef
```

We have been exploring a few common commands that allow us to navigate and visualize all the files on the file system. Let's pause for a moment to talk about the basic structure of commands.

```bash
$ command FLAGS/OPTIONS/SUBCOMMANDS/ARGUMENTS
```

Commands start with their name. What follows after the command are a number of arguments that take the form of flags, options, subcommands and arguments.

Flags start with a single dash and are followed by a single letter. Like if you want to view the contents of a directory in long format you can use `ls -l`. Quite often a command will support a longer form of the same flag that starts with two dashes and then followed by a entire word. Like asking for the chef command-line tool for help can be done by `chef -h` or `chef --help`. The longer form is often easier to understand than the single letter form. Flags are almost always optional and can be specified in any order.

Options are like flags but require a value to follow them. Like when providing a user name or password when bootstrapping a node with the knife command `knife bootstrap ipaddress --user USERNAME --ssh-password PASSWORD`. Options are almost always optional and can be specified in any order.

Some commands require additional commands, called sub-commands, to be specified to further refine the focus of the original command. Like when working with git command to ask for the status `git status` or looking a the history of commits through a log `git log`. Commands may require multiple sub-commands to further scope the command to the correct results. These commands must be provided in a specific order.

Finally some commands may allow for optional arguments or require them to be specified. Like the ls command which when used without any arguments will show the contents of the current directory `ls`. When a valid path is provided as an argument the files within that directory will be displayed `ls ~`. These arguments are often required and must be provided in a specific order.

With all that said, nearly every command-line tool created was built and is maintained by different people. This means that sometimes they do not always adhere to structure defined above. For each command you will want to look at the help, usually through the `-h` or `--help` flag, or look at the manual written for the command, through the `man COMMAND`.

```bash
$ man ls
$ chef --help
```

### Windows PowerShell

Managing the Windows servers has predominately been accomplished through graphical experiences. As the demand to manage more and more system has arisen the need for tools that can scale to handle these systems have been created. PowerShell provides a incredibly powerful interface through a command interface similar to the existing command prompt. The benefit of Powershell is that it is both a command-line shell and a scripting language that interacts with a large number of technologies. It has a strong emphasis on consistency in the structure of commands and the object-based results that it returns.

PowerShell can be launched locally through a PowerShell prompt and even remotely through Windows Remote Management (WinRM) protocol. Executing commands is accomplished through a shell which provides a text-based user experience that allows interaction through keyboard input.

PowerShell is now a standard interface for all Microsoft software products which in turn has helped foster an ecosystem and encouraged others to follow suit. In this section, you will learn how to navigate this interface and understand the core tenants of PowerShell. You will also learn a few essential PowerShell commands and some resources to assist you to understand more.

When you first launch Windows PowerShell it will present you with a prompt. Generally each prompt will display the letters "PS" and the full directory path of where you are on the file system. The prompt is completed with a greater-than sign '>' and then followed by a cursor that is a underscore character that blinks at a particular interval.

Characters pressed on the keyboard they will appear as you type them into the screen in the prompt. When you are finished typing in text you can press the `enter` or `return` key to execute the text provided. Pressing `ctrl`-`c` will abort the current task which will halt execution of a command that has been executed and take you a fresh prompt. PowerShell provides a number of built-in commands. Let's explore the structure of commands, learn a few important commands and their aliases; or shortcuts.

The prompt will often provide you with your current location within the file system. A directory can contain references to other files and directories. To see all the files within this current directory you can execute the `dir` command.

```ps
$ dir

    Directory: C:\Users\chef

Mode             LastWriteTime       Length Name
----             -------------       ------ ----
d-----       2/24/2016 2:52 PM              .atom
...
```

The currently directory likely contains a number of files. If any of those file are directories you can view the contents of those directories using the same command with a single parameter, the name of the directory.

```ps
$ dir habitat
```

If any of the files are text, you can view the contents with the `cat` command with the path to the file.

```ps
$ cat habitat/bash_completions.sh
```

This file exists within the habitat directory so it is required to specify that part of that path first, use a back-slash as a path separator, and then specify the name of the file. If you wanted to work with these files without having to specify the directory path before the file name you can change into this directory to make these files local. This can be done by executing the `cd` command with the path of the directory you want to change into.

```ps
$ cd habitat
$ dir
bash-completions.sh   core-plans            results
bin                   habitat               wordpress
clap-rs               habitat-example-plans
$ cat bash-completions.sh
```

All the commands are now executed locally within this directory. To return to the previous directory, the one that contains this directory you can execute the `cd` command with the parameter `..`.

```ps
$ cd ..
$ dir
Applications			source
Desktop			habitat
Documents				inspec
Downloads			chef-dk
```

All files are contained on the file system in a hierarchy that start at the root of the drive. A path can be broken up into components. The root of the drive is represented by a letter.

You can use any of the commands we have seen already using a full file path. For instance, you can execute the `dir` command to view the contents of any directory given its full path from wherever you on the file system.

```ps
$ dir C:\
$ dir C:\Users
$ dir C:\Users\chef
```

When you launched PowerShell you were most likely in an directory that was important to your specific user. This is usually referred to as your home directory and has a shortcut way to describe the path with the tilde character `~`.

```ps
$ cd ~
$ dir
```

We have been exploring a few common commands that allow us to navigate and visualize all the files on the file system. These commands are shortcuts, or aliases, of PowerShell cmdlets to have a common structure. Let's pause for a moment to talk about the basic structure of PowerShell cmdlets.

```ps
$ Verb-Noun Parameters
```

Cmdlets start with a verb to describe the desired action to take with the given noun. Sometimes these verbs do not map to verbs one might use in an English sentence. The noun describes the thing the verb is acting on. The mentioned before the commands that we have issued up to now are really aliases of cmdlets that we can see by executing the Powershell cmdlet `Get-Alias ALIAS_NAME`.

```ps
$ Get-Alias dir
CommandType     Name                            Definition
-----------     ----                            ----------
Alias           dir                             Get-ChildItem
```

The verb in the command is `Get` and the noun is `ChildItem`. The `dir` alias has been provided to allow DOS users the ability to navigate PowerShell without having to learn an entirely new syntax for even the most basic operations and in most cases it is faster to express than the following:

```ps
$ Get-ChildItem C:\
```

The path to view is presented here as the first parameter. Cmdlets can support no parameter, one, or multiple parameters. These parameters can be required or optional. While the most important parameters are positioned closest to the cmdlet.

Besides the order of parameters they can be addressed by name.
