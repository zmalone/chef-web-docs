## 2. Create a file on your node for the data bag key

Your node will need the data bag key when it accesses your data bag later in this tutorial. Let's prepare your node now.

In this step you'll copy the data bag key to the <code class="file-path">/tmp</code> directory on your node. You can copy the key file to any location that you have access to if you require it to exist in a different location.

Perform the steps that match your workstation setup.

### From a Linux or Mac OS workstation

The `scp` command securely copies files from one computer to another.

If you're using a user-name and password to connect to your node, run the following command to copy the secret key to your node. As needed, replace the IP address with your node's IP address and `root` with your user name.

```bash
# ~/chef-repo
$ scp /tmp/encrypted_data_bag_secret root@52.10.205.36:/tmp
encrypted_data_bag_secret                     100%  684     0.7KB/s   00:00
```

If you're using key-based encryption, the command looks similar to this.

```bash
# ~/chef-repo
$ scp -i ~/.ssh/my.pem /tmp/encrypted_data_bag_secret root@52.10.205.36:/tmp
encrypted_data_bag_secret                     100%  684     0.7KB/s   00:00
```

### From a Windows workstation

You need to install a program to securely copy files from Windows to Linux. [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/) and [WinSCP](http://winscp.net) are popular options.

Once you have a secure copy program set up, copy <code class="file-path">C:\\temp\\encrypted\_data\_bag\_secret</code> from your Windows workstation to the <code class="file-path">/tmp</code> directory on your node.

[TIP] The [PuTTY User Manual](http://the.earth.li/~sgtatham/putty/0.60/htmldoc/Chapter5.html) shows how to use PuTTY's PSCP utility to securely copy a file from Windows to Linux.<br>If you're using Amazon EC2 to host your node, the [AWS documentation](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html) can help get you started.
