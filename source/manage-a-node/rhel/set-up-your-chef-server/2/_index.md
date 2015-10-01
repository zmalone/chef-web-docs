## 2. Install the Starter Kit

Now you need to download some files that enable you to securely communicate with the Chef server. The Starter Kit provides the certificates and other files you need to do this.

[WINDOWS] On Windows, we recommend that you use PowerShell to work with Chef. On Learn Chef, we use the <code class="file-path">~</code> character in directory names, which is a common shortcut for the user's home directory on Linux, but also works in PowerShell. On Windows, <code class="file-path">~</code> refers to your home directory, for example, <code class="file-path">C:\Users\Administrator</code>.

From your workstation,

1. Navigate to the [Chef management console](https://manage.chef.io/).
1. From the **Administration** tab, select your organization.
1. Select **Starter Kit** from the menu on the left.
1. Click the **Download Starter Kit** button.
1. Click **Proceed**. Save the file <code class="file-path">chef-starter.zip</code> to your computer.
1. Extract <code class="file-path">chef-starter.zip</code> to a working directory, for example, your home directory.

Here's how to unzip the files to your home directory on a Windows, Linux, or Mac OS workstation.

[START_TABS extractStarter Windows, Linux and Mac OS]

[START_TAB extractStarterWindows active]

```ps
$ cd ~
$ Add-Type -AssemblyName "System.IO.Compression.FileSystem"
$ [IO.Compression.ZipFile]::ExtractToDirectory(".\Downloads\chef-starter.zip", ".\")
```

[END_TAB]

[START_TAB extractStarterLinuxandMacOS]

```bash
$ cd ~
$ unzip ~/Downloads/chef-starter.zip
Archive:  /Users/user/Downloads/chef-starter.zip
  inflating: chef-repo/README.md
   creating: chef-repo/cookbooks/
  inflating: chef-repo/cookbooks/chefignore
   creating: chef-repo/cookbooks/starter/
[...]
  inflating: chef-repo/.chef/admin.pem
  inflating: chef-repo/.chef/org-validator.pem
```

[END_TAB]

[END_TABS]

[WARN] Verify that your <code class="file-path">~/chef-repo</code> directory contains a <code class="file-path">.chef</code> directory to ensure that you extracted all files and folders from the Starter Kit, including hidden ones.
