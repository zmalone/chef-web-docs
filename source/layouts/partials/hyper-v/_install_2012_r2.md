At this point your virtual machine has an empty hard drive and is mounted to your ISO image as a virtual DVD drive. Now you need to install Windows Server 2012 R2 on the hard drive.

The `New-VM` cmdlet that you ran earlier sets this boot order:

1. Network
1. Hard disk drive
1. DVD drive

Your virtual network doesn't have a boot server and your virtual hard drive does not yet have an operating system installed on it, so the startup process automatically moves to booting from the virtual DVD drive. You'll see the Windows Server installer start automatically.

![Windows setup](misc/hyperv-windows-setup.png)

Proceed through the installation process. Two of the steps require specific options:

* Select **Windows Server 2012 Standard Evaluation (Server with a GUI)** when prompted to select the operating system you want to install.
* Choose **Custom: Install Windows only (advanced)** when prompted which type of installation do you want.

Choose the default option for the other steps.

From the **Settings** screen, you'll be prompted to create a password for the `Administrator` user. Note the password that you choose.
