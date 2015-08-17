## 2. Install the Starter Kit

Now you need to download some files that enable you to securely communicate with the Chef server. The Starter Kit provides the certificates and other files you need to do this.

[WINDOWS] On Windows, we recommend that you use PowerShell to work with Chef. On Learn Chef, we use the <code class="file-path">~</code> character in directory names, which is a common shortcut for the user's home directory on Linux, but also works in PowerShell. On Windows, <code class="file-path">~</code> refers to your home directory, for example, <code class="file-path">C:\Users\Administrator</code>.

From your workstation,

1. Navigate to the [Chef management console](https://manage.chef.io/).
1. From the **Administration** tab, select your organization.
1. Select **Starter Kit** from the menu on the left.
1. Click the **Download Starter Kit** button.
1. Click **Proceed**. Save the file <code class="file-path">chef-starter.zip</code> to your computer.
1. Create the <code class="file-path">~\chef-repo</code> directory if it does not exist and extract <code class="file-path">chef-starter.zip</code> to that location.

[WARN] Verify that your <code class="file-path">~\chef-repo</code> directory contains a <code class="file-path">.chef</code> directory to ensure that you extracted all files and folders from the Starter Kit, including hidden ones.
