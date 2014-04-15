For each AMI listed here, login with username **chef** and password **chef**. 

1. Choose an AMI. 
  * Public CentOS AMI (<a href="https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Images:filter=all-images;platform=all-platforms;visibility=public-images;search=ami-ed100c84" target="_blank">ami-ed100c84</a>) in the US East (N. Virginia) Region
  * Public Ubuntu AMI (<a href="https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Images:filter=all-images;platform=all-platforms;visibility=public-images;search=ami-0521316c" target="_blank">ami-0521316c</a>) in the US East (N. Virginia) Region
  * Public Windows Server 2012 AMI (<a href="https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Images:filter=all-images;platform=all-platforms;visibility=public-images;search=ami-97d0ccfe" target="_blank">ami-97d0ccfe</a>) in the US East (N. Virginia) Region
2. From the EC2 Management Console, click **Launch**. Follow the prompts. You can accept the default settings for all steps except the following:
  * On **Step 2**, choose your instance type. A **t1.micro** instance is the most cost-effective and should be sufficient for Learn Chef tutorials.
  * On **Step 6**, ensure these ports are open. Ensure that the **Source** column is **Anywhere**.
      * Linux: **22** (SSH), **80-90** (HTTP), **443** (SSL)
      * Windows: **3389** (RDP), **80-90** (HTTP), **5985-6000** (WinRM)
      

      Most of these ports are used by the bootstrap process, which you'll learn about next. The HTTP ports are later used by the Learn Chef tutorials, so we recommend you open them now.  
  * After you complete **Step 7**, choose **Proceed without a key pair**. 

These images are simlilar to the base images, with these modifications:

  * A **chef** account with administrator access on all images. 
  * A MOTD on Linux images.
  * Windows Remote Management (WinRM) configuration and access to port 5985 on Windows images. Specifically, we ran these commands with administrator priviledges:
 
  ```
  winrm quickconfig -q
  winrm set winrm/config/winrs '@{MaxMemoryPerShellMB="300"}'
  winrm set winrm/config '@{MaxTimeoutms="1800000"}'
  winrm set winrm/config/service '@{AllowUnencrypted="true"}'
  winrm set winrm/config/service/auth '@{Basic="true"}'
  netsh advfirewall firewall set rule name="Windows Remote Management (HTTP-In)" profile=public protocol=tcp localport=5985 remoteip=localsubnet new remoteip=any 
  ```